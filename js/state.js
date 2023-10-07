const state = {
    
    items: [
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
    ],

    countQuantity: function(){
        return this.items.reduce((sum, elem) => {
            if(elem.choose == true){
                return sum + elem.quantity
            }
            return sum
        }, 0)
    },

    countItemPrice: function(index){
        return this.items[index].quantity * this.items[index].newPrice
    },

    countItemOldPrice: function(index){
        return this.items[index].quantity * this.items[index].oldPrice
    },

    countTotalPrice: function(){
            
        return this.items.reduce((sum, elem) => {
                if(elem.choose == true){
                    return sum += elem.newPrice * elem.quantity
                }
                return sum
            }, 0) 
    },

    countTotalWithOutDiscount: function(){
        return this.items.reduce((sum, elem) => {
                if(elem.choose == true){
                    return sum += elem.oldPrice * elem.quantity
                }
                return sum
            }, 0)
    },

    countDiscount: function(){
        return this.items.reduce((sum, elem) => {
            if(elem.choose == true){
                return sum += elem.oldPrice * elem.quantity - elem.newPrice * elem.quantity
            }
            return sum
        }, 0)
    },
}

export { state }