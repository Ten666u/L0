import { personalArray, pointArray } from "./serverData.js";
import { state } from "./state.js";

import { findParent } from "./utilsDOM.js";

const modal = document.getElementById("deliveryModal")
const personalAddressList = document.getElementById("personalAddressList")
const pointAddressList = document.getElementById("pointAddressList")

const pointAddressBtn = document.getElementById("pointAddressBtn")
const personalAddressBtn = document.getElementById("personalAddressBtn")

const openDeliveryModalBtn = document.getElementById("openDeliveryModalBtn")
const openDeliveryModalPenBtn = document.getElementById("openDeliveryModalPenBtn")
const closeDeliveryModalBtn = document.getElementById("closeDeliveryModalBtn")
const chooseDeliveryModalBtn = document.getElementById("chooseDeliveryModalBtn")

const openModal = () => {
    pointAddressBtn.classList = personalAddressBtn.classList = "delivery_type-btn"

    if(state.address[0] == "personal"){
        choosePersonalList()
        
        const choosedAddress = document.getElementById(`personalAddress${state.address[1]}`)
        choosedAddress.checked = true
        modal.classList.toggle("hidden")
        return
    }

    choosePointList()
    const choosedAddress = document.getElementById(`pointAddress${state.address[1]}`)
    choosedAddress.checked = true
    modal.classList.toggle("hidden")
}

const hideModal = () => {
    modal.classList.toggle("hidden")
}

const deletePointAddress = (e) => {
    const target = e.target
    const parent = findParent(target, 'choose_address')
    const address = parent.querySelector(".wb-radio")

    if(state.address[0] == "point" && address.id.at(-1) == state.address[1]){
        return
    }

    if(pointAddressList.querySelectorAll(".choose_address").length == 1){
        target.disabled = true
        return
    }

    if(state.address[0] == "point"){
        const choosedAddress = document.getElementById(`pointAddress${state.address[1]}`)
        choosedAddress.checked = true
    }

    parent.parentNode.removeChild(parent)
}

const deletePersonalAddress = (e) => {
    const target = e.target
    const parent = findParent(target, "choose_address")
    const address = parent.querySelector(".wb-radio")

    if(state.address[0] == "personal" && address.id.at(-1) == state.address[1]){
        return
    }

    if(personalAddressList.querySelectorAll(".choose_address").length == 1){
        target.disabled = true
        return
    }

    if(state.address[0] == "personal"){
        const choosedAddress = document.getElementById(`personalAddress${state.address[1]}`)
        choosedAddress.checked = true
    }

    parent.parentNode.removeChild(parent)
}

const choosePointList = () =>{
    personalAddressList.classList.add("hideAddress")
    pointAddressList.classList.remove("hideAddress")
    personalAddressBtn.classList.remove("type_btn-pressed")
    pointAddressBtn.classList.add("type_btn-pressed")
}

const choosePersonalList = () =>{
    pointAddressList.classList.add("hideAddress")
    personalAddressList.classList.remove("hideAddress")
    pointAddressBtn.classList.remove("type_btn-pressed")
    personalAddressBtn.classList.add("type_btn-pressed")
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
        state.address = ["point", chooseAddress.value]
    }

    else if(personalAddressBtn.classList.contains("type_btn-pressed")){
        const chooseAddress = personalAddressList.querySelector("input[name='address-personal']:checked")
        objAddress = personalArray[chooseAddress.value]

        basketDeliveryType.textContent = "Курьером"
        basketPointDetail.classList.add("hide")

        orderDeliveryType.textContent = "Доставка курьером"
        state.address = ["personal", chooseAddress.value]
    }

    basketAddress.textContent = orderAddress.textContent = objAddress.address
    hideModal()
}

pointAddressBtn.addEventListener("click", choosePointList)
personalAddressBtn.addEventListener("click", choosePersonalList)
chooseDeliveryModalBtn.addEventListener("click", chooseAddress)

openDeliveryModalBtn.addEventListener("click", openModal)
openDeliveryModalPenBtn.addEventListener("click", openModal)
closeDeliveryModalBtn.addEventListener("click", hideModal)

export { deletePersonalAddress, deletePointAddress }