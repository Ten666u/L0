import { personalArray, pointArray } from "./serverData.js";

import { findParent } from "./utilsDOM.js";

const personalAddressList = document.getElementById("personalAddressList")
const pointAddressList = document.getElementById("pointAddressList")

const pointAddressBtn = document.getElementById("pointAddressBtn")
const personalAddressBtn = document.getElementById("personalAddressBtn")


const openDeliveryModalBtn = document.getElementById("openDeliveryModalBtn")
const openDeliveryModalPenBtn = document.getElementById("openDeliveryModalPenBtn")
const closeDeliveryModalBtn = document.getElementById("closeDeliveryModalBtn")
const chooseDeliveryModalBtn = document.getElementById("chooseDeliveryModalBtn")

const openHideModal = (idModal) => {
    return () => {
        let modal = document.getElementById(idModal)
        modal.classList.toggle("hidden")
    }
}

const deletePointAddress = (e) => {
    let target = e.target

    let parent = findParent(target, 'choose_address')

    if(pointAddressList.querySelectorAll(".choose_address").length == 1){
        target.disabled = true
        return
    }
    parent.parentNode.removeChild(parent)
}

const deletePersonalAddress = (e) => {
    let target = e.target
    let parent = findParent(target, "choose_address")

    if(personalAddressList.querySelectorAll(".choose_address").length == 1){
        target.disabled = true
        return
    }
    parent.parentNode.removeChild(parent)
}

const choosePointList = (e) =>{
    personalAddressList.classList.add("hideAddress")
    pointAddressList.classList.remove("hideAddress")
    personalAddressBtn.classList.remove("type_btn-pressed")
    e.target.classList.add("type_btn-pressed")
}

const choosePersonalList = (e) =>{
    pointAddressList.classList.add("hideAddress")
    personalAddressList.classList.remove("hideAddress")
    pointAddressBtn.classList.remove("type_btn-pressed")
    e.target.classList.add("type_btn-pressed")
}

const chooseAddress = () =>{
    const orderDeliveryType = document.getElementById("orderDeliveryType")
    const orderAddress = document.getElementById("orderAddress")

    const basketDeliveryType = document.getElementById("basketDeliveryType")
    const basketAddress = document.getElementById("basketAddress")
    const basketPointDetail = document.getElementById("basketPointDetail")
    const basketDeliveryData = document.getElementById("basketPointTime")
    const pointRating = document.getElementById("pointRating")

    const pointAddressBtn = document.getElementById("pointAddressBtn")
    const personalAddressBtn = document.getElementById("personalAddressBtn")
    let objAddress = {}
    
    if(pointAddressBtn.classList.contains("type_btn-pressed")){
        const chooseAddress = pointAddressList.querySelector("input[name='address-point']:checked")
        objAddress = pointArray[chooseAddress.value]

        basketDeliveryType.textContent = "Пункт выдачи"
        basketPointDetail.classList.remove("hide")
        pointRating.textContent = objAddress.rating
        basketDeliveryData.textContent = `Ежедневно с ${objAddress.time[0]} до ${objAddress.time[1]}`

        orderDeliveryType.textContent = "Доставка в пункт выдачи"
    }

    else if(personalAddressBtn.classList.contains("type_btn-pressed")){
        const chooseAddress = personalAddressList.querySelector("input[name='address-personal']:checked")
        objAddress = personalArray[chooseAddress.value]

        basketDeliveryType.textContent = "Курьером"
        basketPointDetail.classList.add("hide")

        orderDeliveryType.textContent = "Доставка курьером"
    }

    basketAddress.textContent = orderAddress.textContent = objAddress.address
    openHideModal('deliveryModal')()
}

pointAddressBtn.addEventListener("click", choosePointList)
personalAddressBtn.addEventListener("click", choosePersonalList)
chooseDeliveryModalBtn.addEventListener("click", chooseAddress)

openDeliveryModalBtn.addEventListener("click", openHideModal("deliveryModal"))
openDeliveryModalPenBtn.addEventListener("click", openHideModal("deliveryModal"))
closeDeliveryModalBtn.addEventListener("click", openHideModal("deliveryModal"))

export { deletePersonalAddress, deletePointAddress }