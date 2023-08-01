const shoppingCart=document.getElementById("shoppingCart")
const overlay=document.getElementById("overlay")
const cartExit=document.getElementById("cartExit")
const cartList=document.getElementById("cartList")
const cartCount=document.getElementById("cartCount")

document.cookie = "username=John Doe; expires=Thu, 18 Dec 2024 12:00:00 UTC";

let currentCart=localStorage.getItem("cart")
currentCart=JSON.parse(currentCart)
var NAME,PRICE

function openCart(){
    cartChange()
    shoppingCart.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function exitCart(){
    console.log("clicked exitCart")
    shoppingCart.classList.add('hidden')
    overlay.classList.add('hidden')
    let listItems = cartList.getElementsByTagName("li")
    let cartData=[];
    for (let i = 0; i <= listItems.length - 1; i++) {
        let item=listItems[i].id
        let quant=document.getElementById(`${item}-input`)
        cartData.push({name:item,quantity:quant.value})
    }
    console.log(cartData)
    localStorage.setItem("cart",JSON.stringify(cartData))
    currentCart=localStorage.getItem("cart")
    currentCart=JSON.parse(currentCart)
    console.log("cart exited "+currentCart.length)
    cartCount.innerHTML=currentCart.length
}

if(currentCart){
    cartCount.innerHTML=currentCart.length
}

function cartChange(){
    let listItems = cartList.getElementsByTagName("li")
    let products=[]
    for (let i = 0; i <= listItems.length - 1; i++) {
        products.push(listItems[i].id)
    }
    // console.log(products)
    var priceTotal=0
    products.forEach((product)=>{
        if(product=="giftcard"){
            let quant=document.getElementById('giftcard-input')
            priceTotal += quant.value * 25
        }
        else if(product=="bluepack"){
            let quant=document.getElementById('bluepack-input')
            priceTotal += quant.value * 95
        }
        else if(product=="tent"){
            let quant=document.getElementById('tent-input')
            priceTotal += quant.value * 200
        }
        else if(product=="mug"){
            let quant=document.getElementById('mug-input')
            priceTotal += quant.value * 35
        }
        else if(product==="greenpack"){
            let bagQuantity=document.getElementById("greenpack-input")
            priceTotal+=bagQuantity.value*125
        }
    })
    total.innerHTML=`$ ${priceTotal}.00 USD`
}

let removeProduct=(object)=>{
    console.log("remove")
    object.parentElement.parentElement.remove()
    cartChange()
}

// cartExit.addEventListener("click",()=>{
//     console.log("clicked exit..")
//     shoppingCart.classList.add('hidden')
//     overlay.classList.add('hidden')
//     let listItems = cartList.getElementsByTagName("li")
//     let cartData=[];
//     for (let i = 0; i <= listItems.length - 1; i++) {
//         let item=listItems[i].id
//         let quant=document.getElementById(`${item}-input`)
//         cartData.push({name:item,quantity:quant.value})
//     }
//     console.log(cartData)
//     localStorage.setItem("cart",JSON.stringify(cartData))
//     currentCart=localStorage.getItem("cart")
//     currentCart=JSON.parse(currentCart)
//     console.log("cart exited "+currentCart.length)
//     cartCount.innerHTML=currentCart.length
// })


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
    // console.log(product)
    cartList.insertAdjacentHTML("beforeend",product)
})






