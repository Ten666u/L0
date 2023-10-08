import { arrayItems } from "./serverData.js";
import { state } from "./state.js";

//Рендер
import { renderBasketItem, renderAbsentItem } from "./basketRender.js";
import { rerenderDetails } from "./detailsRender.js";
import { renderPersonalAddressList, renderPointAddressList } from "./deliveryModalRender.js";

//Поведение инпутов
import { checkINN, checkInputINN, checkPhone, checkInputPhone, checkFirstName, checkInputFirstName, checkSecondName, checkInputSecondName, checkEmail, checkInputEmail } from "./basketFormLogic.js"

import { openCloseCardModal, chooseCardModal } from "./cardModalLogic.js";

const mobileWidth = window.matchMedia("(max-width: 1000px)");

const selectPayImmediatelyBtn = document.getElementById("selectPayImmediatelyBtn")

const openCardModalBtn = document.getElementById("openCardModalBtn")
const openCardModalPenBtn = document.getElementById("openCardModalPenBtn")
const closeCardModalBtn = document.getElementById("closeCardModalBtn")
const chooseCardModalBtn = document.getElementById("chooseCardModalBtn")

const inputFirstName = document.getElementById("inputFirstName")
const inputSecondName = document.getElementById("inputSecondName")
const inputEmail = document.getElementById("inputEmail")
const inputPhone = document.getElementById("inputPhone")
const inputINN = document.getElementById("inputINN")

const orderButton = document.getElementById("orderButton")

//Оплатить сразу
const selectPayImmediately = (e) => {
    const target = e.target
    const payDetailBasket = document.getElementById("payDetailBasket");
    const payDetailOrder = document.getElementById("payDetailOrder");
    const orderButtonTxt = document.getElementById("orderButtonTxt");

    if (target.checked) {
        state.isPayImmediately = true
        document.getElementById("payDetailBasket").style.display = "none";
        payDetailOrder.style.display = "none";
        orderButtonTxt.textContent = `Оплатить ${state.countTotalPrice().toLocaleString()} сом`;
    } else {
        state.isPayImmediately = false
        payDetailBasket.style.display = "block";
        payDetailOrder.style.display = "block";
        orderButtonTxt.textContent = "Заказать";
    }
};

//Медиа-Запрос для телефонов
function printLog(isMobileSize) {
    let size = isMobileSize

    if(size){
        const floatingLabelMail = document.getElementById("floatingLabelMail")
        floatingLabelMail.textContent = "Электронная почта"

        for(let i = 0; i <= arrayItems.length - 1; i++){
            const item = document.getElementById(`item-${i}`)
            const itemPrice = document.getElementById(`priceContainer-${i}`)
            const oldContainer = item.querySelector(".item_list-counter")

            if(oldContainer.querySelector(".item_price-container")){
                oldContainer.removeChild(itemPrice)
                const newContainer = item.querySelector(".basket_item-info")
                newContainer.prepend(itemPrice)
            }
            else{
                return
            }
        }
    }

    else{
        const floatingLabelMail = document.getElementById("floatingLabelMail")
        floatingLabelMail.textContent = "Почта"

        for(let i = 0; i <= arrayItems.length - 1; i++){
            const item = document.getElementById(`item-${i}`)
            const itemPrice = document.getElementById(`priceContainer-${i}`)
            const oldContainer = item.querySelector(".basket_item-info")

            if(oldContainer.querySelector(".item_price-container")){
                oldContainer.removeChild(itemPrice)
                const newContainer = item.querySelector(".item_list-counter") //.item_list-counter
                newContainer.append(itemPrice)
            }
            else{
                return
            }
        }
    }
}

//Проверка полей в форме данных
const orderAllInput = () =>{
    const personalFormAnchor = document.getElementById("personalFormAnchor")

    let scrollFlag = checkFirstName({target: inputFirstName}, true) & checkSecondName({target: inputSecondName}, true) &  checkEmail({target: inputEmail}, true) & checkPhone({target: inputPhone}, true) & checkINN({target: inputINN}, true)

    if(!scrollFlag){
        personalFormAnchor.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
}

mobileWidth.addEventListener("change", function (event) {printLog(event.matches);});

openCardModalBtn.addEventListener("click", openCloseCardModal)
openCardModalPenBtn.addEventListener("click", openCloseCardModal)
closeCardModalBtn.addEventListener("click", openCloseCardModal)
chooseCardModalBtn.addEventListener("click", chooseCardModal)

//Инпуты при выходе из поля ввода
inputFirstName.addEventListener("blur", checkFirstName)
inputSecondName.addEventListener("blur", checkSecondName)
inputEmail.addEventListener("blur", checkEmail)
inputPhone.addEventListener("blur", checkPhone)
inputINN.addEventListener("blur", checkINN)

//Инпуты при вводе
inputFirstName.addEventListener("input", checkInputFirstName)
inputSecondName.addEventListener("input", checkInputSecondName)
inputEmail.addEventListener("input", checkInputEmail)
inputPhone.addEventListener("input", checkInputPhone)
inputINN.addEventListener("input", checkInputINN)

selectPayImmediatelyBtn.addEventListener("click", selectPayImmediately)
orderButton.addEventListener("click", orderAllInput)

//=========================================> Рендер страницы
renderBasketItem()
renderAbsentItem()
rerenderDetails()

//Рендер модального окна доставки
renderPersonalAddressList()
renderPointAddressList()