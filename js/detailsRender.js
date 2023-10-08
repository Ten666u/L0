import { state } from "./state.js"
import { arrayItems } from "./serverData.js";

import { createTagWithClass } from "./utilsDOM.js";

const deliveryItemsList = document.getElementById("deliveryItemsList")
const deliveryData = document.getElementById("deliveryData")

const totalQuantity = document.getElementById("totalQuantity")
const pcTotalQuantity = document.getElementById("pcTotalQuantity")
const mobTotalQuantity = document.getElementById("mobTotalQuantity")
const totalPrice = document.getElementById("totalPrice")
const totalWithOutDiscount = document.getElementById("totalWithOutDiscount")
const discount = document.getElementById("discount")
const orderButtonTxt = document.getElementById("orderButtonTxt")

const checkItems = () =>{
    for(let item of state.items){
        if(item.choose){
            return true
        }
    }
    return false
}
const renderDeliveryItems = () =>{
    deliveryItemsList.innerHTML = ""
    let itemChoose = checkItems()

    let secondDelivery = false

    if(itemChoose){
        deliveryItemsList.insertAdjacentHTML(
            "beforeend",
            `
                <div class="basket_delivery-section basket_delivery-item" id="delivery5-7">
                    <span class="delivery_point-txt">5—6 февраля</span>
                    <div class="delivery_item-list"></div>
                </div>
            `
        );

        const deliveryItems = deliveryItemsList.querySelector(".delivery_item-list")

        for(let i = 0; i <= state.items.length - 1; i++){
            let item = state.items[i]
            let obj = arrayItems[i]

            if(item.choose == true){
                let deliveryItemPic = createTagWithClass("div", "delivery_item-pic")
                let picture = "url(./assets/item_pic/" + arrayItems[i].picture + ")";
                deliveryItemPic.style.background = picture

                let itemAmount = createTagWithClass("div", "delivery_item-amount")
                
                if(item.quantity > 1){

                    if(item.quantity <= obj.left[0]){
                        itemAmount.textContent = item.quantity
                        deliveryItemPic.appendChild(itemAmount)
                    }
                    else{
                        secondDelivery = true
                        itemAmount.textContent = obj.left[0]
                        deliveryItemPic.appendChild(itemAmount)
                    }
                }
                
                deliveryItems.appendChild(deliveryItemPic)
            }
        }
    }

    if(secondDelivery){
        deliveryItemsList.insertAdjacentHTML(
            "beforeend",
            `
                <div class="basket_delivery-section basket_delivery-item">
                    <span class="delivery_point-txt">7—8 февраля</span>
                    <div class="delivery_item-list"></div>
                </div>
            `
        );

        let deliveryItems = deliveryItemsList.querySelectorAll(".delivery_item-list")
        deliveryItems = deliveryItems[deliveryItems.length - 1]

        for(let i = 0; i <= state.items.length - 1; i++){
            let item = state.items[i]
            let obj = arrayItems[i]
            if(arrayItems[i].left.length > 1){
                let deliveryItemPic = createTagWithClass("div", "delivery_item-pic")
                let picture = "url(./assets/item_pic/" + arrayItems[i].picture + ")";
                deliveryItemPic.style.background = picture
                let amount = item.quantity - obj.left[0]

                let itemAmount = createTagWithClass("div", "delivery_item-amount")

                if(amount > 1){

                    if(amount <= obj.left[1]){
                        itemAmount.textContent = amount
                        deliveryItemPic.appendChild(itemAmount)
                    }
                    else{
                        itemAmount.textContent = obj.left[1]
                        deliveryItemPic.appendChild(itemAmount)
                    }
                }
                
                deliveryItems.appendChild(deliveryItemPic)
            }
        }
    }

    const renderDeliveryData = () =>{
        if(deliveryItemsList.children.length == 2){
            deliveryData.textContent = "5–8 фев."
        }
        else if(deliveryItemsList.children.length == 1){
            deliveryData.textContent = "5–6 фев."
        }
        else{
            deliveryData.textContent = ""
        }
    }
    
    renderDeliveryData()
}

const renderTotalQuantity = () =>{
    let quantity = state.countQuantity()

    let n = Math.abs(quantity) % 100

    if (n >= 5 && n <= 20) {
        totalQuantity.textContent = `${quantity} товаров`
    }

    n %= 10
    if (n === 1) {
        totalQuantity.textContent = `${quantity} товар`
    }
    else if (n >= 2 && n <= 4) {
        totalQuantity.textContent = `${quantity} товара`
    }
    else {
        totalQuantity.textContent = `${quantity} товаров`
    }

    pcTotalQuantity.textContent = quantity
    mobTotalQuantity.textContent = quantity

    if(quantity == 0){
        pcTotalQuantity.classList.add("hide")
        mobTotalQuantity.classList.add("hide")
    }
    else if(quantity != 0 && pcTotalQuantity.classList.contains("hide")&& mobTotalQuantity.classList.contains("hide")){
        pcTotalQuantity.classList.remove("hide")
        mobTotalQuantity.classList.remove("hide")
    }
}

const renderTotalPrice = () =>{
   let total = state.countTotalPrice()
   totalPrice.textContent = total.toLocaleString()

   totalPrice.insertAdjacentHTML(
    "beforeend",
    `
        <span class="order_total-currency"> сом</span>
    `
    );
}

const renderTotalWithOutDiscount = () =>{
    let totalNotDiscount = state.countTotalWithOutDiscount()

    totalWithOutDiscount.textContent = totalNotDiscount.toLocaleString()

    totalWithOutDiscount.insertAdjacentHTML(
        "beforeend",
        `
            <span class="total_detail-currency"> сом</span>
        `
    );
}

const renderDiscount = () =>{
    let totalDiscount = state.countDiscount()

    discount.textContent = "−" + totalDiscount.toLocaleString()

    discount.insertAdjacentHTML(
        "beforeend",
        `
            <span class="total_detail-currency"> сом</span>
        `
    );
}

const renderPayImmediately = () =>{
    if(state.isPayImmediately){
        orderButtonTxt.textContent = `Оплатить ${state.countTotalPrice().toLocaleString()} сом`
    }
}

const rerenderDetails = () =>{
    renderDeliveryItems()
    renderTotalQuantity()
    renderTotalPrice()
    renderTotalWithOutDiscount()
    renderDiscount()
    renderPayImmediately()
}

export { rerenderDetails }