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
        oldPrice: 11000,
        left: [30, 15],
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

const basket = document.querySelector(".basket_items-list");

//Заполняем товары в корзине
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
                <input type="checkbox" class="wb-checkbox" name="item-checkbox" onchange="checkBoxItemChange()">
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

    itemButtons.insertAdjacentHTML(
        "beforeend",
        `
        <div class="item_count">
            <button class="count_minus" disabled>
                <span class="font_count count_content">−</span>
            </button>
            <span class="item_quantity">1</span>
            <button class="font_count count_plus" onclick = "itemPlus(this)">+</button>
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

    itemCounter.insertAdjacentHTML(
        "beforeend",
        `
        <div class="item_price-container" id = "priceContainer-${i}">
            <span class="item_price-new" id = "itemPriceNew-${i}">${obj.newPrice.toLocaleString()}</span>
            <span class="item_price-currency">сом</span>
            <button class="item_price-old"  id = "itemPriceOld-${i}">
                ${obj.oldPrice.toLocaleString()} сом
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

    //Добавляем предмет в доставку
    const deliveryItemPic = createTagWithClass("div", "delivery_item-pic")
    const firstItemsArrival = document.getElementById("firstItemsArrival")
    const deliveryItemList = firstItemsArrival.querySelector(".delivery_item-list")

    deliveryItemPic.style.background = picture
    deliveryItemPic.id = `deliveryItemPic${i}`

    deliveryItemList.appendChild(deliveryItemPic)
}

const absenceBasket = document.querySelector(".absence_item-list");

// Заполняем отсутствующие товары
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

const personalAddressList = document.getElementById("personalAddressList")

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

const pointAddressList = document.getElementById("pointAddressList")

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

    console.log(objAddress)
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
        checkboxes[i].checked = e.checked;
        checkboxes[i].dispatchEvent(new Event('change'))
    }
};

const hideAbsenceBtn = document.getElementById("hideAbsenceItems")
const headerAbsenceList = document.getElementById("headerAbsenceList")
const absenceItemList = document.getElementById("absenceItemList")
const absenceLine = document.getElementById("absenceLine")
const absenceItemCounter = document.getElementById("absenceItemCounter")

const hideAbsenceItem = (e) =>{
    absenceItemList.classList.toggle("hide")
    absenceLine.classList.toggle("hide")
    headerAbsenceList.classList.toggle("items_hidden")
    e.classList.toggle("items_hidden")
}

const checkBoxItemChange = () =>{
    console.log("jopa")
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
    let parent = findParent(e, classParent)
    parent.parentNode.removeChild(parent)
}

const deleteAbsenceItem = (e, classParent) =>{
    let parent = findParent(e, classParent)
    parent.parentNode.removeChild(parent)

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
    const item = arrayItems[itemNumber]

    if(countMinus.disabled == true){
        countMinus.disabled = false
    }

    newPriceArray[itemNumber] += item.newPrice
    itemQuantity.textContent = Number(itemQuantity.textContent) + 1
    itemPriceNew.textContent = newPriceArray[itemNumber].toLocaleString()
    
    if(String(itemPriceNew.textContent).length > 6){
        itemPriceNew.classList.add("big_price")
    }

    if(itemQuantity.textContent == item.left[0]){
        e.disabled = true
    }
    console.log(newPriceArray)
    countTotalPrice()
}

const totalPrice = document.getElementById("totalPrice")

const countTotalPrice = () =>{
   let total = newPriceArray.reduce((sum, value) => sum + value)
   totalPrice.textContent = total.toLocaleString()

   totalPrice.insertAdjacentHTML(
    "beforeend",
    `
        <span class="total_detail-currency"> сом</span>
    `
);
}

countTotalPrice()