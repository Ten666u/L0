const createTagWithClass = (tagName, className) => {
    let tag = document.createElement(tagName);

    if (className) {
        tag.classList.add(className);
    }

    return tag;
};

const findParent = (elem, classParent) =>{
    if(elem.parentElement.classList.contains(classParent)){
        return elem.parentElement
    }

    return findParent(elem.parentElement, classParent)
}

export { createTagWithClass, findParent }