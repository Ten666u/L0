let arrayItems = [
    {
        name: "Футболка UZcotton мужская",
        picture: "first_item.png",
        color: "белый",
        size: [56].join("/"),
        owner: "Коледино WB",
        storage: "OOO Вайлдберриз",
        storageDoc: "OOO «ВАЙЛДБЕРРИЗ»",
        ogrn: "1067746062449",
        storageAddress: "ул. Ленинская Слобода, 26, стр. 3, Москва этаж 3",
        newPrice: 522,
        oldPrice: 1051,
        left: [2],
        discount: 300,
        persentDiscount: 55
    },
    {
        name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
        picture: "second_item.png",
        color: "прозрачный",
        owner: "Коледино WB",
        storage: "OOO Мегапрофстиль",
        storageDoc: "OOO «МЕГАПРОФСТИЛЬ»",
        ogrn: "5167746237148",
        storageAddress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
        newPrice: 10500,
        oldPrice: 11500,
        left: [184, 50],
        discount: 300,
        persentDiscount: 55,
    },
    {
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber‑Castell',
        picture: "third_item.png",
        owner: "Коледино WB",
        storage: "OOO Вайлдберриз",
        storageDoc: "OOO «ВАЙЛДБЕРРИЗ»",
        ogrn: "1067746062449",
        storageAddress: "ул. Ленинская Слобода, 26, стр. 3, Москва этаж 3",
        newPrice: 247,
        oldPrice: 475,
        left: [2],
        discount: 300,
        persentDiscount: 55,
    },
];

const personalArray = [
    {
        address: "Бишкек, улица Табышалиева, 57"
    },
    {
        address: "Бишкек, улица Жукеева-Пудовкина, 77/1"
    },
    {
        address: "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1"
    }
]

const pointArray = [
    {
        address: "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
        rating: "",
        time: [10, 20]
    },
    {
        address: "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
        rating: 4.99,
        time: [11, 21]
    },
    {
        address: "г. Бишкек, улица Табышалиева, д. 57",
        rating: 4.99,
        time: [9, 19]
    }
]

const itemsState = [
    {
        quantity: 1,
        newPrice: 522,
        oldPrice: 1051,
        choose: true
    },
    {
        quantity: 200,
        newPrice: 10500,
        oldPrice: 11500,
        choose: true
    },
    {
        quantity: 2,
        newPrice: 247,
        oldPrice: 475,
        choose: true
    }
]


// let arrayCards = [
//     {

//     }
// ]

const newPriceArray = []

const createTagWithClass = (tagName, className) => {
    let tag = document.createElement(tagName);

    if (className) {
        tag.classList.add(className);
    }

    return tag;
};

const countQuantity  = () =>{
    return itemsState.reduce((sum, elem) => {
        if(elem.choose == true){
            return sum + elem.quantity
        }
        return sum
    }, 0)
}

const countItemPrice = (index) =>{
    return itemsState[index].quantity * itemsState[index].newPrice
}

const countItemOldPrice = (index) =>{
    return itemsState[index].quantity * itemsState[index].oldPrice
}

const basket = document.getElementById("basketItemsList")

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
                    <input type="checkbox" class="wb-checkbox" name="item-checkbox" onchange="checkBoxItemChange(this)" checked>
                </label>
            </div>`
        );
    
        //Добавляем картинку
        let basketItemPic = createTagWithClass("div", "basket_item-pic");
        let picture = "url(./styles/item_pic/" + obj.picture + ")";
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
        let itemState = itemsState[i]
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
                <button class="count_minus" onclick = "itemMinus(this)" ${buttonMinusDisable}>
                    <span class="font_count count_content">−</span>
                </button>
                <span class="item_quantity">${itemState.quantity}</span>
                <button class="font_count count_plus" onclick = "itemPlus(this)" ${buttonPlusDisable}>+</button>
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
                <button class="item_like" onClick = "changeColorBtn(this)">
                    <img src="./styles/images/like-icon.svg" alt="" class="item_like-icon">
                </button>
                <button class="item_delete" onclick="deleteBasketItem(this, 'basket_item')">
                    <img src="./styles/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
        
        let countPrice = countItemPrice(i).toLocaleString()
        
        let classPrice = 'item_price-new'

        if(countPrice.length > 6){
            classPrice = "item_price-new big_price"
        }

        itemCounter.insertAdjacentHTML(
            "beforeend",
            `
            <div class="item_price-container" id = "priceContainer-${i}">
                <span class="${classPrice}" id = "itemPriceNew-${i}">${countItemPrice(i).toLocaleString()}</span>
                <span class="item_price-currency">сом</span>
                <button class="item_price-old"  id = "itemPriceOld-${i}">
                    ${countItemOldPrice(i).toLocaleString()} сом
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
    
        newPriceArray.push(obj.newPrice)
    }
}

const absenceBasket = document.querySelector(".absence_item-list");

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
        picture.style.background = "url(./styles/item_pic/" + obj.picture + ")";
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
                <button class="item_like" onClick = "changeColorBtn(this)">
                    <img src="./styles/images/like-icon.svg" alt="" class="item_like-icon">
                </button>
                <button class="item_delete" onclick = "deleteAbsenceItem(this, 'absence_item')">
                    <img src="./styles/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
    
        //Добавляем правый блок товара
        item.append(itemCounter);
        //Добавляем элемент на страницу
        absenceBasket.append(item);
    }
    
}

const deliveryItemsList = document.getElementById("deliveryItemsList")
const deliveryData = document.getElementById("deliveryData")

const checkItems = () =>{
    for(item of itemsState){
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

        for(let i = 0; i <= itemsState.length - 1; i++){
            let item = itemsState[i]
            let obj = arrayItems[i]

            if(item.choose == true){
                let deliveryItemPic = createTagWithClass("div", "delivery_item-pic")
                let picture = "url(./styles/item_pic/" + arrayItems[i].picture + ")";
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

        deliveryItems = deliveryItemsList.querySelectorAll(".delivery_item-list")
        deliveryItems = deliveryItems[deliveryItems.length - 1]

        for(let i = 0; i <= itemsState.length - 1; i++){
            let item = itemsState[i]
            let obj = arrayItems[i]
            if(arrayItems[i].left.length > 1){
                let deliveryItemPic = createTagWithClass("div", "delivery_item-pic")
                let picture = "url(./styles/item_pic/" + arrayItems[i].picture + ")";
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
            deliveryData.textContent = "5-8 фев."
        }
        else if(deliveryItemsList.children.length == 1){
            deliveryData.textContent = "5-6 фев."
        }
        else{
            deliveryData.textContent = ""
        }
    }
    
    renderDeliveryData()
}

const rerenderDetails = () =>{
    renderDeliveryItems()
    renderTotalQuantity()
    countTotalPrice()
    countTotalWithOutDiscount()
    countDiscount()
}

const totalQuantity = document.getElementById("totalQuantity")
const pcTotalQuantity = document.getElementById("pcTotalQuantity")
const mobTotalQuantity = document.getElementById("mobTotalQuantity")

const renderTotalQuantity = () =>{
    let quantity = countQuantity()

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

const totalPrice = document.getElementById("totalPrice")

const countTotalPrice = () =>{
   let total = itemsState.reduce((sum, elem) => {
    if(elem.choose == true){
        return sum += elem.newPrice * elem.quantity
    }
    return sum
}, 0) 
   totalPrice.textContent = total.toLocaleString()

   totalPrice.insertAdjacentHTML(
    "beforeend",
    `
        <span class="total_detail-currency"> сом</span>
    `
    );
}

const totalWithOutDiscount = document.getElementById("totalWithOutDiscount")

const countTotalWithOutDiscount = () =>{
    let totalNotDiscount = itemsState.reduce((sum, elem) => {
        if(elem.choose == true){
            return sum += elem.oldPrice * elem.quantity
        }
        return sum
    }, 0)

    totalWithOutDiscount.textContent = totalNotDiscount.toLocaleString()

    totalWithOutDiscount.insertAdjacentHTML(
        "beforeend",
        `
            <span class="total_detail-currency"> сом</span>
        `
    );
}

const discount = document.getElementById("discount")

const countDiscount = () =>{
    let totalDiscount = itemsState.reduce((sum, elem) => {
        if(elem.choose == true){
            return sum += elem.oldPrice * elem.quantity - elem.newPrice * elem.quantity
        }
        return sum
    }, 0)

    discount.textContent = "−" + totalDiscount.toLocaleString()

    discount.insertAdjacentHTML(
        "beforeend",
        `
            <span class="total_detail-currency"> сом</span>
        `
    );
}

const personalAddressList = document.getElementById("personalAddressList")
    
const renderPersonalAddressList = () =>{
    for(let i = 0; i <= personalArray.length - 1; i++){
        let addressObj = personalArray[i]
        let checked = ""

        i == 0 ? checked = "checked" : checked = ""

        personalAddressList.insertAdjacentHTML(
            "beforeend",
            `
            <div class="choose_address">
                <input type="radio" value="${i}" name="address-personal" id="personalAddress${i}" class="wb-radio" ${checked}/>
                <label for="personalAddress${i}">
                    <span class="label_txt">${addressObj.address}</span>
                </label>
                <button class="item_delete" onclick="deletePersonalAddress(this, 'choose_address')">
                    <img src="./styles/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
    }
}

const pointAddressList = document.getElementById("pointAddressList")

const renderPointAddressList = () =>{
    for(let i = 0; i <= pointArray.length - 1; i++){
        let addressObj = pointArray[i]
        let checked = ""
    
        i == 0 ? checked = "checked" : checked = ""
    
        pointAddressList.insertAdjacentHTML(
            "beforeend",
            `
            <div class="choose_address">
                <input type="radio" value="${i}" name="address-point" id="pointAddress${i}" class="wb-radio" ${checked}/>
                <label for="pointAddress${i}">
                    <span class="label_txt">${addressObj.address}</span>
                    <div class="delivery_point-detail">
                        <span class="rating_picture"></span>
                        <span class="point_detail-txt">${addressObj.rating}</span>
                        <span class="point_detail-txt absence">Пункт выдачи</span>
                    </div>
                </label>
                <button class="item_delete" onclick="deletePointAddress(this, 'choose_address')">
                    <img src="./styles/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
    }
}


//=========================================> Рендер страницы
renderBasketItem()
renderAbsentItem()
renderDeliveryItems()
renderTotalQuantity()
countTotalPrice()
countTotalWithOutDiscount()
countDiscount()

//Рендер модальных окон
renderPersonalAddressList()
renderPointAddressList()


const selectPayImmediately = (e) => {
    const payDetailBasket = document.getElementById("payDetailBasket");
    const payDetailOrder = document.getElementById("payDetailOrder");
    const orderButtonTxt = document.getElementById("orderButtonTxt");

    if (e.checked) {
        document.getElementById("payDetailBasket").style.display = "none";
        payDetailOrder.style.display = "none";
        orderButtonTxt.textContent = `Оплатить`;
    } else {
        payDetailBasket.style.display = "block";
        payDetailOrder.style.display = "block";
        orderButtonTxt.textContent = "Заказать";
    }
};

//=======================================> Медиа-Запрос для телефонов
const mobileWidth = window.matchMedia("(max-width: 1000px)");

function printLog(isMobileSize) {
    let size = isMobileSize

    if(size){
        let floatingLabelMail = document.getElementById("floatingLabelMail")
        floatingLabelMail.textContent = "Электронная почта"

        for(let i = 0; i <= arrayItems.length - 1; i++){
            let item = document.getElementById(`item-${i}`)
            let itemPrice = document.getElementById(`priceContainer-${i}`)
            let oldContainer = item.querySelector(".item_list-counter")

            if(oldContainer.querySelector(".item_price-container")){
                oldContainer.removeChild(itemPrice)
                let newContainer = item.querySelector(".basket_item-info")
                newContainer.prepend(itemPrice)
            }
            else{
                return
            }
        }
    }

    else{
        let floatingLabelMail = document.getElementById("floatingLabelMail")
        floatingLabelMail.textContent = "Почта"

        for(let i = 0; i <= arrayItems.length - 1; i++){
            let item = document.getElementById(`item-${i}`)
            let itemPrice = document.getElementById(`priceContainer-${i}`)
            let oldContainer = item.querySelector(".basket_item-info")

            if(oldContainer.querySelector(".item_price-container")){
                oldContainer.removeChild(itemPrice)
                let newContainer = item.querySelector(".item_list-counter") //.item_list-counter
                newContainer.append(itemPrice)
            }
            else{
                return
            }
        }
    }
}

printLog(mobileWidth.matches);

mobileWidth.addEventListener("change", function (event) {
    printLog(event.matches);
});

const changeColorBtn = (e) => {
    e.classList.toggle("item_like-clicked")
}

const openHideModal = (idModal) => {
    let modal = document.getElementById(idModal)
    modal.classList.toggle("hidden")
}

//======================================>Изменение карты
const switchCard = () => {
    let basketCard = document.getElementById("basketCard")
    let orderCard = document.getElementById("orderCard")

    let chooseCard = document.querySelector('input[name="card"]:checked').value

    let oldCard = basketCard.classList[1]

    orderCard.classList.remove(oldCard)
    basketCard.classList.remove(oldCard)

    basketCard.classList.add(chooseCard)
    orderCard.classList.add(chooseCard)

    openHideModal("cardModal")
}

//======================================>Изменение доставки
const choosePointList = (e) =>{
    personalAddressList.classList.add("hideAddress")
    pointAddressList.classList.remove("hideAddress")

    let personalAddressBtn = document.getElementById("personalAddressBtn")
    personalAddressBtn.classList.remove("type_btn-pressed")

    e.classList.add("type_btn-pressed")
}

const choosePersonalList = (e) =>{
    pointAddressList.classList.add("hideAddress")
    personalAddressList.classList.remove("hideAddress")

    let pointAddressBtn = document.getElementById("pointAddressBtn")
    pointAddressBtn.classList.remove("type_btn-pressed")

    e.classList.add("type_btn-pressed")
}

const chooseAddress = () =>{
    let orderDeliveryType = document.getElementById("orderDeliveryType")
    let orderAddress = document.getElementById("orderAddress")

    let basketDeliveryType = document.getElementById("basketDeliveryType")
    let basketAddress = document.getElementById("basketAddress")
    let basketPointDetail = document.getElementById("basketPointDetail")
    let basketDeliveryData = document.getElementById("basketPointTime")
    let pointRating = document.getElementById("pointRating")

    let pointAddressBtn = document.getElementById("pointAddressBtn")
    let personalAddressBtn = document.getElementById("personalAddressBtn")
    let objAddress = {}
    
    if(pointAddressBtn.classList.contains("type_btn-pressed")){
        let chooseAddress = pointAddressList.querySelector("input[name='address-point']:checked")
        objAddress = pointArray[chooseAddress.value]

        basketDeliveryType.textContent = "Пункт выдачи"
        basketPointDetail.classList.remove("hide")
        pointRating.textContent = objAddress.rating
        basketDeliveryData.textContent = `Ежедневно с ${objAddress.time[0]} до ${objAddress.time[1]}`

        orderDeliveryType.textContent = "Доставка в пункт выдачи"
    }

    else if(personalAddressBtn.classList.contains("type_btn-pressed")){
        let chooseAddress = personalAddressList.querySelector("input[name='address-personal']:checked")
        objAddress = personalArray[chooseAddress.value]

        basketDeliveryType.textContent = "Курьером"
        basketPointDetail.classList.add("hide")

        orderDeliveryType.textContent = "Доставка курьером"
    }

    basketAddress.textContent = orderAddress.textContent = objAddress.address
    openHideModal('deliveryModal')
}

//===================================================> Инпуты в форме данных
const checkINN = (e, btnPressed = false) =>{
    let INN = e.value
    let error = document.getElementById("errorINN")

    if((INN.length == 0) && !btnPressed){
        return
    }

    if((INN.length == 0) && btnPressed){
        error.classList.remove("not_error")
        error.textContent = "Укажите ИНН"
        e.classList.add("invalid")

        return
    }

    if(INN.length < 14){
        error.classList.remove("not_error")
        error.textContent = "Проверьте ИНН"
        e.classList.add("invalid")

        return
    }
}

const checkInputINN = (e) =>{
    let onlyNumber = /[0-9]/g
    let error = document.getElementById("errorINN")

    str = e.value

    str.match(onlyNumber) ? e.value = str.match(onlyNumber).join("") : e.value = ""

    if(str.length == 14){
        error.classList.add("not_error")
        error.textContent = "Для таможенного оформления"
        e.classList.remove("invalid")
    }
}

const checkInputPhone = (e) =>{
    let onlyNumber = /[0-9]/g
    let errorPhone = document.getElementById("errorPhone")

    str = e.value.match(onlyNumber)

    if(str == null){
        e.value = ""
        return
    }
    else{
        str.length >= 12 ? str = str.slice(0, 11) : str = str
    }

    str ? str = str.join("") : str = ""
    let phoneStr = ""

    for(let i = 0; i <= str.length - 1; i++){

        if(i == 0){
            phoneStr = "+" + str[i]
        }

        else if(i == 1 || i == 4){
            phoneStr = phoneStr + " " + str[i]

        }

        else if(i == 7 || i == 9){
            phoneStr = phoneStr + "-" + str[i]
        }

        else{
            phoneStr = phoneStr + str[i]
        }    
    }

    e.value = phoneStr

    if(phoneStr.length == 16){
        errorPhone.textContent = ""
        e.classList.remove("invalid")
    }
}

const checkPhone = (e, btnPressed = false) =>{
    let phoneStr = e.value
    let error = document.getElementById("errorPhone")

    if((phoneStr.length == 0) && !btnPressed){
        return
    }

    if((phoneStr.length == 0) && btnPressed){
        error.textContent = "Укажите номер телефона"
        e.classList.add("invalid")
        return
    }

    if(phoneStr.length < 16){
        error.textContent = "Формат: +9 999 999 99 99"
        e.classList.add("invalid")
        return
    }
}

const checkFirstName = (e, btnPressed = false) =>{
    let nameStr = e.value
    let error = document.getElementById("errorFirstName")

    if(!nameStr && btnPressed){
        error.textContent = "Укажите имя"
        e.classList.add("invalid")
    }
    if(nameStr && !btnPressed){
        error.textContent = ""
        e.classList.remove("invalid")
    }
}

const checkInputFirstName = (e) =>{
    let nameStr = e.value
    let error = document.getElementById("errorFirstName")

    if(nameStr){
        error.textContent = ""
        e.classList.remove("invalid")
    }
}

const checkSecondName = (e, btnPressed = false) =>{
    let secondNameStr = e.value
    let error = document.getElementById("errorSecondName")

    if(!secondNameStr && btnPressed){
        error.textContent = "Введите фамилию"
        e.classList.add("invalid")
        return
    }
    if(secondNameStr && !btnPressed){
        error.textContent = ""
        e.classList.remove("invalid")
        return
    }
}

const checkInputSecondName = (e) =>{
    let nameStr = e.value
    let error = document.getElementById("errorSecondName")

    if(nameStr){
        error.textContent = ""
        e.classList.remove("invalid")
    }
}

const validEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

const checkEmail = (e, btnPressed = false) =>{
    let email = e.value
    let error = document.getElementById("errorEmail")

    emailValid = validEmail(email)

    if(!emailValid && btnPressed){
        error.textContent = "Укажите электронную почту"
        e.classList.add("invalid")
        return
    }
    if(!email && !btnPressed){
        error.textContent = ""
        e.classList.remove("invalid")
        return
    }
    if(!emailValid && !btnPressed){
        error.textContent = "Проверьте адрес электронной почты"
        e.classList.add("invalid")
        return
    }
}

const checkInputEmail = (e) =>{
    let email = e.value
    let error = document.getElementById("errorEmail")

    email = validEmail(email)

    if(email){
        error.textContent = ""
        e.classList.remove("invalid")
    }
}

const orderAllInput = () =>{
    let INN = document.getElementById("inputINN")
    let phone = document.getElementById("inputPhone")
    let firstName = document.getElementById("inputFirstName")
    let secondName = document.getElementById("inputSecondName")
    let email = document.getElementById("inputEmail")
    let personalFormAnchor = document.getElementById("personalFormAnchor")

    checkINN(INN, true)
    checkPhone(phone, true)
    checkFirstName(firstName, true)
    checkSecondName(secondName, true)
    checkEmail(email, true)

    if(mobileWidth.matches){
        personalFormAnchor.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
}

//=============================>

const selectAllItems = (e) => {
    let checkboxes = document.getElementsByName("item-checkbox");

    for (let i = 0; i <= checkboxes.length - 1; i++) {
        if(checkboxes[i].checked != e.checked){
            checkboxes[i].checked = e.checked
            checkboxes[i].dispatchEvent(new Event('change'))
        }
    }
};

const hideBasketItemsBtn = document.getElementById("hideBasketItemsBtn")
const hideAbsenceBtn = document.getElementById("hideAbsenceItems")
const headerAbsenceList = document.getElementById("headerAbsenceList")
const absenceItemList = document.getElementById("absenceItemList")
const absenceLine = document.getElementById("absenceLine")
const absenceItemCounter = document.getElementById("absenceItemCounter")
const basketFormLine = document.getElementById("basketFormLine")
const selectAll = document.getElementById("selectAll")
const itemsHiddenTxt = document.getElementById("itemsHiddenTxt")

const hideBasketItems = (e) =>{
    basketItemsList.classList.toggle("hide")
    headerAbsenceList.classList.toggle("basket_hidden")
    selectAll.classList.toggle("hide")
    itemsHiddenTxt.classList.toggle("not_hidden")
    e.classList.toggle("items_hidden")
    basketFormLine.classList.toggle("basket_hidden")

    let quantity = countQuantity()
    let sum = itemsState.reduce((sum, elem) =>{
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
    absenceItemList.classList.toggle("hide")
    absenceLine.classList.toggle("hide")
    headerAbsenceList.classList.toggle("items_hidden")
    e.classList.toggle("items_hidden")
}

const checkBoxItemChange = (e) =>{
    let itemContainer = findParent(e, "basket_item")
    let itemNumber = itemContainer.id.at(-1)
    let itemState = itemsState[itemNumber]

    itemState.choose = !itemState.choose
    rerenderDetails()
}

//=============================>Кнопки удаления
const findParent = (elem, classParent) =>{
    if(elem.parentElement.classList.contains(classParent)){
        return elem.parentElement
    }

    return findParent(elem.parentElement, classParent)
}

const deletePointAddress = (e, classParent) => {
    let parent = findParent(e, classParent)

    if(pointAddressList.querySelectorAll(".choose_address").length == 1){
        e.disabled = true
        return
    }
    parent.parentNode.removeChild(parent)
}

const deletePersonalAddress = (e, classParent) => {
    let parent = findParent(e, classParent)

    if(personalAddressList.querySelectorAll(".choose_address").length == 1){
        e.disabled = true
        return
    }
    parent.parentNode.removeChild(parent)
}

const deleteBasketItem = (e, classParent) =>{
    let itemContainer = findParent(e, classParent)
    let itemNumber = itemContainer.id.at(-1)
    itemsState[itemNumber].choose = false

    itemContainer.parentNode.removeChild(itemContainer)

    if(basketItemsList.children.length == 0){
        let basketPage = document.querySelector(".basket_page")
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
    rerenderDetails()
}

const deleteAbsenceItem = (e, classParent) =>{
    let itemContainer = findParent(e, classParent)
    itemContainer.parentNode.removeChild(itemContainer)
    

    let itemsCounter = Number(absenceItemCounter.textContent) - 1
    absenceItemCounter.textContent = itemsCounter
    
    if(itemsCounter == 0){
        absenceLine.parentNode.removeChild(absenceLine)
        headerAbsenceList.parentNode.removeChild(headerAbsenceList)
    }
}

//=============================>Реализация корзины
const itemPlus = (e) =>{
    const itemContainer = findParent(e, "basket_item")
    const itemNumber = itemContainer.id.at(-1)
    const itemQuantity = itemContainer.querySelector(".item_quantity")
    const countMinus = itemContainer.querySelector(".count_minus")
    const itemPriceNew = itemContainer.querySelector(".item_price-new")
    const itemPriceOld = itemContainer.querySelector(".item_price-old")
    const itemState = itemsState[itemNumber]
    let obj = arrayItems[itemNumber]

    if(countMinus.disabled == true){
        countMinus.disabled = false
    }

    itemState.quantity++
    itemQuantity.textContent = itemState.quantity
    itemPriceNew.textContent = countItemPrice(itemNumber).toLocaleString()
    
    itemPriceOld.textContent = countItemOldPrice(itemNumber).toLocaleString() + " сом"

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
        e.disabled = true
    }

    rerenderDetails()
}

const itemMinus = (e) =>{
    const itemContainer = findParent(e, "basket_item")
    const itemNumber = itemContainer.id.at(-1)
    const itemQuantity = itemContainer.querySelector(".item_quantity")
    const countPlus = itemContainer.querySelector(".count_plus")
    const itemPriceNew = itemContainer.querySelector(".item_price-new")
    const itemPriceOld = itemContainer.querySelector(".item_price-old")
    const itemState = itemsState[itemNumber]

    if(countPlus.disabled == true){
        countPlus.disabled = false
    }

    itemState.quantity--
    itemQuantity.textContent = itemState.quantity
    itemPriceNew.textContent = countItemPrice(itemNumber).toLocaleString()

    itemPriceOld.textContent = countItemOldPrice(itemNumber).toLocaleString() + " сом"
    
    if(String(itemPriceNew.textContent).length <= 6){
        itemPriceNew.classList.remove("big_price")
    }

    if(itemState.quantity == 1){
        e.disabled = true
    }

    rerenderDetails()
}