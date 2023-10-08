import { personalArray, pointArray } from "./serverData.js";

import { deletePointAddress, deletePersonalAddress } from "./deliveryModalLogic.js";

const personalAddressList = document.getElementById("personalAddressList")
const pointAddressList = document.getElementById("pointAddressList")
 
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
                <button class="item_delete">
                    <img src="./assets/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
    }

    const itemDeleteBtn = personalAddressList.querySelectorAll(".item_delete")

    for(let i = 0; i <= personalArray.length - 1; i++){
        itemDeleteBtn[i].addEventListener("click", deletePersonalAddress)
    }
}

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
                <button class="item_delete">
                    <img src="./assets/images/delete-icon.svg" alt="" class="item_delete-icon">
                </button>
            </div>
            `
        );
    }

    const itemDeleteBtn = pointAddressList.querySelectorAll(".item_delete")

    for(let i = 0; i <= pointArray.length - 1; i++){
        itemDeleteBtn[i].addEventListener("click", deletePointAddress)
    }
}

export { renderPersonalAddressList, renderPointAddressList }