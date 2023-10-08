const checkINN = (e, btnPressed = false) =>{
    const target = e.target
    const INN = target.value
    const error = document.getElementById("errorINN")

    if((INN.length == 0) && !btnPressed){
        return
    }

    if((INN.length == 0) && btnPressed){
        error.classList.remove("not_error")
        error.textContent = "Укажите ИНН"
        target.classList.add("invalid")

        return
    }

    if(INN.length < 14){
        error.classList.remove("not_error")
        error.textContent = "Проверьте ИНН"
        target.classList.add("invalid")

        return
    }

    return true
}

const checkInputINN = (e) =>{
    const target = e.target
    const onlyNumber = /[0-9]/g
    const error = document.getElementById("errorINN")

    str = target.value

    str.match(onlyNumber) ? target.value = str.match(onlyNumber).join("") : target.value = ""

    if(str.length == 14){
        error.classList.add("not_error")
        error.textContent = "Для таможенного оформления"
        target.classList.remove("invalid")
    }
}

const checkInputPhone = (e) =>{
    const target = e.target
    const onlyNumber = /[0-9]/g
    const errorPhone = document.getElementById("errorPhone")

    str = target.value.match(onlyNumber)

    if(str == null){
        target.value = ""
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

    target.value = phoneStr

    if(phoneStr.length == 16){
        errorPhone.textContent = ""
        target.classList.remove("invalid")
    }
}

const checkPhone = (e, btnPressed = false) =>{
    const target = e.target
    const phoneStr = target.value
    const error = document.getElementById("errorPhone")

    if((phoneStr.length == 0) && !btnPressed){
        return
    }

    if((phoneStr.length == 0) && btnPressed){
        error.textContent = "Укажите номер телефона"
        target.classList.add("invalid")
        return
    }

    if(phoneStr.length < 16){
        error.textContent = "Формат: +9 999 999 99 99"
        target.classList.add("invalid")
        return
    }

    return true
}

const checkFirstName = (e, btnPressed = false) =>{
    const target = e.target
    const nameStr = target.value
    const error = document.getElementById("errorFirstName")

    if(!nameStr && btnPressed){
        error.textContent = "Укажите имя"
        target.classList.add("invalid")
    }

    if(nameStr && !btnPressed){
        error.textContent = ""
        target.classList.remove("invalid")
    }

    return true
}

const checkInputFirstName = (e) =>{
    const target = e.target
    const nameStr = target.value
    const error = document.getElementById("errorFirstName")

    if(nameStr){
        error.textContent = ""
        target.classList.remove("invalid")
    }
}

const checkSecondName = (e, btnPressed = false) =>{
    const target = e.target
    const secondNameStr = target.value
    const error = document.getElementById("errorSecondName")

    if(!secondNameStr && btnPressed){
        error.textContent = "Введите фамилию"
        target.classList.add("invalid")
        return
    }
    
    if(secondNameStr && !btnPressed){
        error.textContent = ""
        target.classList.remove("invalid")
        return
    }

    return true
}

const checkInputSecondName = (e) =>{
    const target = e.target
    const nameStr = target.value
    const error = document.getElementById("errorSecondName")

    if(nameStr){
        error.textContent = ""
        target.classList.remove("invalid")
    }
}

const validEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

const checkEmail = (e, btnPressed = false) =>{
    const target = e.target
    const email = target.value
    const error = document.getElementById("errorEmail")

    let emailValid = validEmail(email)

    if(!emailValid && btnPressed){
        error.textContent = "Укажите электронную почту"
        target.classList.add("invalid")
        return
    }

    if(!email && !btnPressed){
        error.textContent = ""
        target.classList.remove("invalid")
        return
    }

    if(!emailValid && !btnPressed){
        error.textContent = "Проверьте адрес электронной почты"
        target.classList.add("invalid")
        return
    }

    return true
}

const checkInputEmail = (e) =>{
    const target = e.target
    let email = target.value
    const error = document.getElementById("errorEmail")

    email = validEmail(email)

    if(email){
        error.textContent = ""
        target.classList.remove("invalid")
    }
}

export { checkINN, checkInputINN, checkPhone, checkInputPhone, checkFirstName, checkInputFirstName, checkSecondName, checkInputSecondName, checkEmail, checkInputEmail }