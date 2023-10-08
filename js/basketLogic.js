import { arrayItems } from "./serverData.js"
import { state } from "./state.js";

import { findParent } from "./utilsDOM.js";

import { rerenderDetails } from "./detailsRender.js";

const selectAllCheckBox = document.getElementById("selectAllCheckBox")

//Складывание товаров
const hideBasketItemsBtn = document.getElementById("hideBasketItemsBtn")
const hideAbsenceItemsBtn = document.getElementById("hideAbsenceItemsBtn")
const headerAbsenceList = document.getElementById("headerAbsenceList")
const basketItemsList = document.getElementById("basketItemsList")
const absenceItemList = document.getElementById("absenceItemList")
const absenceItemCounter = document.getElementById("absenceItemCounter")
const absenceLine = document.getElementById("absenceLine")
const basketFormLine = document.getElementById("basketFormLine")
const selectAll = document.getElementById("selectAll")
const itemsHiddenTxt = document.getElementById("itemsHiddenTxt")

const hideBasketItems = (e) =>{
    const target = e.target

    basketItemsList.classList.toggle("hide")
    headerAbsenceList.classList.toggle("basket_hidden")
    selectAll.classList.toggle("hide")
    itemsHiddenTxt.classList.toggle("not_hidden")
    target.classList.toggle("items_hidden")
    basketFormLine.classList.toggle("basket_hidden")

    let quantity = state.countQuantity()
    let sum = state.items.reduce((sum, elem) =>{
        if(elem.choose == true){
            sum += elem.newPrice * elem.quantity
        }
        return sum
    }, 0)

    let quantityStr = ""

    let n = Math.abs(quantity) % 100

    if (n >= 5 && n <= 20) {
        quantityStr  = `${quantity} товаров`
    }

    n %= 10
    if (n === 1) {
        quantityStr = `${quantity} товар`
    }
    else if (n >= 2 && n <= 4) {
        quantityStr  = `${quantity} товара`
    }
    else {
        quantityStr  = `${quantity} товаров`
    }

    itemsHiddenTxt.textContent = quantityStr + " · " + sum.toLocaleString() + " сом"
}


const hideAbsenceItem = (e) =>{
    const target = e.target
    absenceItemList.classList.toggle("hide")
    absenceLine.classList.toggle("hide")
    headerAbsenceList.classList.toggle("items_hidden")
    target.classList.toggle("items_hidden")
}

const checkBoxItemChange = (e) =>{
    const target = e.target
    const itemContainer = findParent(target, "basket_item")
    const itemNumber = itemContainer.id.at(-1)
    let itemState = state.items[itemNumber]

    itemState.choose = !itemState.choose
    rerenderDetails()
}

const itemPlus = (e) =>{
    const target = e.target
    const itemContainer = findParent(target, "basket_item")
    const itemNumber = itemContainer.id.at(-1)
    const itemQuantity = itemContainer.querySelector(".item_quantity")
    const countMinus = itemContainer.querySelector(".count_minus")
    const itemPriceNew = itemContainer.querySelector(".item_price-new")
    const itemPriceOld = itemContainer.querySelector(".item_price-old")
    const itemState = state.items[itemNumber]
    let obj = arrayItems[itemNumber]

    if(countMinus.disabled == true){
        countMinus.disabled = false
    }

    itemState.quantity++
    itemQuantity.textContent = itemState.quantity
    itemPriceNew.textContent = state.countItemPrice(itemNumber).toLocaleString()
    
    itemPriceOld.textContent = state.countItemOldPrice(itemNumber).toLocaleString() + " сом"

    itemPriceOld.insertAdjacentHTML(
        "beforeend",
        `
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
        `
    );


    if(String(itemPriceNew.textContent).length > 6){
        itemPriceNew.classList.add("big_price")
    }

    let limitQuantity =  arrayItems[itemNumber].left.reduce((sum, elem) =>{
        return sum += elem
    }, 0)

    if(itemState.quantity == limitQuantity){
        target.disabled = true
    }

    rerenderDetails()
}

const itemMinus = (e) =>{
    const target = e.target

    const itemContainer = findParent(target, "basket_item")
    const itemNumber = itemContainer.id.at(-1)
    const itemQuantity = itemContainer.querySelector(".item_quantity")
    const countPlus = itemContainer.querySelector(".count_plus")
    const itemPriceNew = itemContainer.querySelector(".item_price-new")
    const itemPriceOld = itemContainer.querySelector(".item_price-old")
    const itemState = state.items[itemNumber]
    
    if(countPlus.disabled == true){
        countPlus.disabled = false
    }

    itemState.quantity--
    itemQuantity.textContent = itemState.quantity
    itemPriceNew.textContent = state.countItemPrice(itemNumber).toLocaleString()

    itemPriceOld.textContent = state.countItemOldPrice(itemNumber).toLocaleString() + " сом"
    
    if(String(itemPriceNew.textContent).length <= 6){
        itemPriceNew.classList.remove("big_price")
    }

    if(itemState.quantity == 1){
        target.disabled = true
    }
    rerenderDetails()
}

const changeColorBtn = (e) => {
    e.target.classList.toggle("item_like-clicked")
}

const renderCheckEmptyBasket = () =>{
    if((basketItemsList.children.length == 0) && (absenceItemList.children.length == 0)){
        const basketPage = document.querySelector(".basket_page")
        basketPage.classList.add("basket_empty")
        basketPage.innerHTML = ''
        basketPage.insertAdjacentHTML(
            "beforeend",
            `
                <div class="basket_empty-container">
                    <h2 class="basket_container-header">В корзине пока пусто</h2>
                    <form action="https://www.wildberries.ru/">
                        <button class="order_button">
                            <span class="order_button-txt">
                                Перейти на главную
                            </span>
                        </button>
                    </form>
                </div>
            `
        );
    }
}

const deleteBasketItem = (e) =>{
    let target = e.target
    let itemContainer = findParent(target, "basket_item")
    let itemNumber = itemContainer.id.at(-1)
    state.items[itemNumber].choose = false

    itemContainer.parentNode.removeChild(itemContainer)

    renderCheckEmptyBasket()
    rerenderDetails()

    console.log(basketItemsList.childNodes.length);
    if(basketItemsList.childNodes.length == 1){
        const basketHeader = document.querySelector(".basket_buttons-items")
        const basketFormLine = document.getElementById("basketFormLine")
        basketHeader.classList.add("hide")
        basketFormLine.classList.add("hide")
    }
}

const deleteAbsenceItem = (e) =>{
    let target = e.target
    let itemContainer = findParent(target, "absence_item")
    itemContainer.parentNode.removeChild(itemContainer)
    

    let itemsCounter = Number(absenceItemCounter.textContent) - 1
    absenceItemCounter.textContent = itemsCounter
    
    if(itemsCounter == 0){
        absenceLine.parentNode.removeChild(absenceLine)
        headerAbsenceList.parentNode.removeChild(headerAbsenceList)
    }

    renderCheckEmptyBasket()
}

const selectAllItems = (e) => {
    const target = e.target
    const checkboxes = document.getElementsByName("item-checkbox");

    for (let i = 0; i <= checkboxes.length - 1; i++) {
        if(checkboxes[i].checked != target.checked){
            checkboxes[i].checked = target.checked
            checkboxes[i].dispatchEvent(new Event('change'))
        }
    }
};

selectAllCheckBox.addEventListener("click", selectAllItems)
hideBasketItemsBtn.addEventListener("click", hideBasketItems)
hideAbsenceItemsBtn.addEventListener("click", hideAbsenceItem)

export { checkBoxItemChange, itemPlus, itemMinus, changeColorBtn, deleteAbsenceItem, deleteBasketItem }