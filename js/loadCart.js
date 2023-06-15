currentCart=localStorage.getItem("cart")
currentCart=JSON.parse(currentCart)
var NAME,PRICE
const OGprice={
    "giftcard":25,
    "greenpack":125,
    "bluepack":95,
    "tent":200,
    "mug":35
}

const real={
    "giftcard":"Gift Card",
    "greenpack":"Green Backpack",
    "bluepack":"Blue Canvas Backpack",
    "tent":"White Tent",
    "mug":"Coffe Mug"
}

currentCart.forEach((obj)=>{
    if(obj.name==='giftcard'){
        NAME="Gift Card"
        PRICE=25
    }
    else if(obj.name==='bluepack'){
        NAME="Blue Canvas Backpack"
        PRICE=95
    }
    else if(obj.name==='greenpack'){
        NAME="Green Backpack"
        PRICE=125
    }
    else if(obj.name==='tent'){
        NAME="White Tent"
        PRICE=200
    }
    else if(obj.name==='mug'){
        NAME="Coffe Mug"
        PRICE=35
    }
    
    let product=`
    <li id="${obj.name}">
        <div class="cart-image">
            <img src="assets-3/${obj.name}.jpeg" alt="">
        </div>
        <div class="cart-product-details">
            <p class="cart-product-name">${NAME}</p>
            <p class="price cart-price">$ ${PRICE}.00 USD</p>
            <button onclick="removeProduct(this)">Remove</button>
        </div>
        <input type="number" min="0" class="cart-quantity" value="${obj.quantity}" id="${obj.name}-input" onChange="cartChange()">
    </li>
    `
    console.log(product)
    cartList.insertAdjacentHTML("beforeend",product)
})






