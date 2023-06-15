const shoppingCart=document.getElementById("shoppingCart")
const overlay=document.getElementById("overlay")
const addToCart=document.getElementById("addToCartButton")
const cartExit=document.getElementById("cartExit")

const inputQuant=document.getElementById("input-quantity")
const cartList=document.getElementById("cartList")
const bagQuantity=document.getElementById("bag-input")
const total=document.getElementById("total")



function openCart(){
    shoppingCart.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function checkProduct(){
    const listItems = cartList.getElementsByTagName("li")
    for (let i = 0; i <= listItems.length - 1; i++) {
        if(listItems[i].id =="gift-card"){
            return true
        }
    }
    return false
}


let giftChange=()=>{
    const giftQuantity=document.getElementById("gift-input")
    let giftPrice=giftQuantity.value*25
    let bagPrice=bagQuantity.value*125
    let price=giftPrice+bagPrice
    total.innerHTML=`$ ${price}.00 USD`
}

let bagChange=()=>{
    const giftQuantity=document.getElementById("gift-input")
    let giftPrice=giftQuantity.value*25
    let current=bagQuantity.value
    let bagPrice=current*125
    let price=giftPrice+bagPrice
    total.innerHTML=`$ ${price}.00 USD`
    
}



addToCart.addEventListener("click",()=>{
    openCart()
    let alreadyExisting=checkProduct()
    if(alreadyExisting){
        quantity.value=Number(quantity.value)+Number(inputQuant.value)
    }
    else{
        let newProduct=`
        <li id="gift-card">
            <div class="cart-image">
                <img src="assets-3/gift-card.jpeg" alt="">
            </div>
            <div class="cart-product-details">
                <p class="cart-product-name">Gift Card</p>
                <p class="price cart-price">$ 25.00 USD</p>
                <button>Remove</button>
            </div>
            <input type="number" min="0" class="cart-quantity" value="${inputQuant.value}" id="gift-input" onChange="giftChange()">
        </li>
        `
        cartList.insertAdjacentHTML("beforeend",newProduct)
        giftChange()
    }
    
})

cartExit.addEventListener("click",()=>{
    shoppingCart.classList.add('hidden')
    overlay.classList.add('hidden')
})


