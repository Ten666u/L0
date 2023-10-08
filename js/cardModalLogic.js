import { state } from "./state.js"

const modal = document.getElementById("cardModal")

const openCloseCardModal = () => { 

    if(modal.classList.contains("hidden")){
        modal.classList.remove("hidden")

        const cardPayModal = document.getElementById(state.cardPay)
        cardPayModal.checked = true
        return
    }

    modal.classList.add("hidden")
}

//Изменение карты
const chooseCardModal = () => {
    const basketCard = document.getElementById("basketCard")
    const orderCard = document.getElementById("orderCard")

    const chooseCard = modal.querySelector('input[name="card"]:checked')

    state.cardPay = chooseCard.id

    basketCard.classList = `basket_card-icon ${chooseCard.value}`
    orderCard.classList = `basket_card-icon ${chooseCard.value}`

    openCloseCardModal()
}

export { openCloseCardModal, chooseCardModal }