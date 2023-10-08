import { arrayItems } from "./serverData.js"
import { state } from "./state.js";

import { createTagWithClass } from "./utilsDOM.js";

import {checkBoxItemChange, itemPlus, itemMinus, changeColorBtn, deleteAbsenceItem, deleteBasketItem } from "./basketLogic.js"

const basket = document.getElementById("basketItemsList")
const absenceBasket = document.querySelector(".absence_item-list");

//Заполняем товары в корзине
const renderBasketItem = () => {
    for (let i = 0; i <= arrayItems.length - 1; i++) {
        let obj = arrayItems[i];
    
        let item = createTagWithClass("div", "basket_item");
        item.id = `item-${i}`
        item.insertAdjacentHTML("beforeend", '<div class="item_list-info"></div>');
    
        let itemInfo = item.querySelector(".item_list-info");
    
        //Добавляем кнопку
        itemInfo.insertAdjacentHTML(
            "beforeend",
            `<div class="item_choice-btn">
                <label class="custom-checkbox">
                    <input type="checkbox" class="wb-checkbox" name="item-checkbox"" checked>
                </label>
            </div>`
        );
    
        //Добавляем картинку
        let basketItemPic = createTagWithClass("div", "basket_item-pic");
        let picture = "url(./assets/item_pic/" + obj.picture + ")";
        basketItemPic.style.background = picture
        itemInfo.append(basketItemPic);
    
        //Добавляем информацию по товару
        let itemDetail = createTagWithClass("div", "basket_item-info");
        itemDetail.insertAdjacentHTML(
            "beforeend",
            `
            <a class="item_info-name" href=#>${obj.name}</a>
        `
        );
    
        itemInfo.append(itemDetail);
    
        let itemColorSize = createTagWithClass("div", "item_color_size");
    
        if (obj.hasOwnProperty("color")) {
            itemColorSize.insertAdjacentHTML(
                "beforeend",
                `
                <span class="item_info-detail item_color">Цвет: ${obj.color}</span>
            `
            );
        }
    
        if (obj.hasOwnProperty("size")) {
            itemColorSize.insertAdjacentHTML(
                "beforeend",
                `
                <span class="item_info-detail item_size-txt">Размер:&ensp;</span><span class="item_info-detail item_size"> ${obj.size}</span>
            `
            );
        }
    
        if (
            itemColorSize.querySelector(".item_color") ||
            itemColorSize.querySelector(".item_size")
        ) {
            itemDetail.append(itemColorSize);
        }
    
        //Добавляем склад и продавца и подсказку
        itemDetail.insertAdjacentHTML(
            "beforeend",
            `
            <span class="item_info-detail item_info-owner">${obj.owner}</span>
            <div class='item_storage-container'>
                <span class="item_info-detail item_info-storage">${obj.storage}</span>
                <button class="info_icon">
                    <div class = "item_hint">
                        <div class = "hint_storage">${obj.storageDoc}</div>
                        <div class = "hint_txt">ОГРН: ${obj.ogrn}</div>
                        <div class = "hint_txt">${obj.storageAddress}</div>
                    </div>
                </button>
            </div>
            `
        );
    
        let itemCounter = createTagWithClass("div", "item_list-counter");
        let itemButtons = createTagWithClass("div", "item_buttons");
        let itemState = state.items[i]
        let buttonPlusDisable = ""
        
        if(itemState.quantity == obj.left[0] && obj.left.length == 1){
            buttonPlusDisable = "disabled"
        }
        
        let buttonMinusDisable = ""

        if(itemState.quantity == 1){
            buttonMinusDisable = "disabled"
        } 

        itemButtons.insertAdjacentHTML(
            "beforeend",
            `
            <div class="item_count">
                <button class="font_count count_minus" ${buttonMinusDisable}>
                    −
                </button>
                <span class="item_quantity">${itemState.quantity}</span>
                <button class="font_count count_plus" ${buttonPlusDisable}>+</button>
            </div>
            `
        );
        itemCounter.append(itemButtons);
    
        if (obj.left[0] < 3) {
            itemButtons.insertAdjacentHTML(
                "beforeend",
                `
                <span class="item_left">Осталось ${obj.left[0]} шт.</span>
                `
            );
        }
    
        itemButtons.insertAdjacentHTML(
            "beforeend",
            `
            <div class="item_like-delete">
                <button class="item_like">
                    <img src="./assets/images/like-icon.svg" alt="" class="item_like-icon">
                </button>
                <button class="item_delete">
                    <img src="./assets/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
        
        let countPrice = state.countItemPrice(i).toLocaleString()
        
        let classPrice = 'item_price-new'

        if(countPrice.length > 6){
            classPrice = "item_price-new big_price"
        }

        itemCounter.insertAdjacentHTML(
            "beforeend",
            `
            <div class="item_price-container" id = "priceContainer-${i}">
                <span class="${classPrice}" id = "itemPriceNew-${i}">${state.countItemPrice(i).toLocaleString()}</span>
                <span class="item_price-currency">сом</span>
                <button class="item_price-old"  id = "itemPriceOld-${i}">
                    ${state.countItemOldPrice(i).toLocaleString()} сом
                    <div class="price_hint">
                        <div class="price_hint-txt">
                            <div>Скидка ${obj.persentDiscount}%</div>
                            <div>Скидка покупателя 10%</div>
                        </div>
                        <div class="price_hint-discount">
                            <div>${obj.discount} сом</div>
                            <div>−30 сом</div>
                        </div>
                    </div>
                </button>
            </div>
            `
        );
    
        //Добавляем правый блок товара
        item.append(itemCounter);
        //Добавляем элемент на страницу
        basket.append(item);
    }

    //Оживляем кнопки предметов
    const wbCheckbox = basket.querySelectorAll(".wb-checkbox")
    const itemsMinBtn = basket.querySelectorAll(".count_minus")
    const itemsPlusBtn = basket.querySelectorAll(".count_plus")
    const itemLike = basket.querySelectorAll(".item_like")
    const itemDelete = basket.querySelectorAll(".item_delete")

    for(let i = 0; i <= arrayItems.length - 1; i++){
        itemsMinBtn[i].addEventListener("click", itemMinus)
        itemsPlusBtn[i].addEventListener("click", itemPlus)
        wbCheckbox[i].addEventListener("change", checkBoxItemChange)
        itemLike[i].addEventListener("click", changeColorBtn)
        itemDelete[i].addEventListener("click", deleteBasketItem)
    }
}

// Заполняем отсутствующие товары
const renderAbsentItem = () =>{
    for (let i = 0; i <= arrayItems.length - 1; i++) {
        let obj = arrayItems[i];
    
        let item = createTagWithClass("div", "basket_item");
        item.classList.add("absence_item");
        item.insertAdjacentHTML("beforeend", '<div class="item_list-info"></div>');
    
        let itemInfo = item.querySelector(".item_list-info");
    
        //Добавляем картинку
        let picture = createTagWithClass("div", "basket_item-pic");
        picture.classList.add("absence_item-pic");
        picture.style.background = "url(./assets/item_pic/" + obj.picture + ")";
        itemInfo.append(picture);
    
        //Добавляем информацию по товару
        let itemDetail = createTagWithClass("div", "basket_item-info");
        itemDetail.classList.add("absence_item-info");
        itemDetail.insertAdjacentHTML(
            "beforeend",
            `
            <a class="item_info-name absence_txt " href=#>${obj.name}</a>
        `
        );
    
        itemInfo.append(itemDetail);
    
        let itemColorSize = createTagWithClass("div", "item_color_size");
    
        if (obj.hasOwnProperty("color")) {
            itemColorSize.insertAdjacentHTML(
                "beforeend",
                `
                <span class="item_info-detail item_color absence_txt">Цвет: ${obj.color}</span>
            `
            );
        }
    
        if (obj.hasOwnProperty("size")) {
            itemColorSize.insertAdjacentHTML(
                "beforeend",
                `
                <span class="item_info-detail item_size-txt absence_txt">Размер:&ensp;</span><span class="item_info-detail item_size absence_txt"> ${obj.size}</span>
            `//
            );
        }
    
        if (
            itemColorSize.querySelector(".item_color") ||
            itemColorSize.querySelector(".item_size")
        ) {
            itemDetail.append(itemColorSize);
        }
    
        let itemCounter = createTagWithClass("div", "item_list-counter");
        let itemButtons = createTagWithClass("div", "item_buttons");
        itemButtons.classList.add("item_buttons-absence");
    
        itemCounter.append(itemButtons);
    
        itemButtons.insertAdjacentHTML(
            "beforeend",
            `
            <div class="item_like-delete">
                <button class="item_like">
                    <img src="./assets/images/like-icon.svg" alt="" class="item_like-icon">
                </button>
                <button class="item_delete">
                    <img src="./assets/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
    
        //Добавляем правый блок товара
        item.append(itemCounter);
        //Добавляем элемент на страницу
        absenceBasket.append(item);
    }

    const itemLike = absenceBasket.querySelectorAll(".item_like")
    const itemDelete = absenceBasket.querySelectorAll(".item_delete")

    for(let i = 0; i <= arrayItems.length - 1; i++){
        itemLike[i].addEventListener("click", changeColorBtn)
        itemDelete[i].addEventListener("click", deleteAbsenceItem)
    }
}

export { renderBasketItem, renderAbsentItem }