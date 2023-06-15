const shoppingCart=document.getElementById("shoppingCart")
const overlay=document.getElementById("overlay")
const addToCart=document.getElementById("addToCartButton")
const cartExit=document.getElementById("cartExit")

const inputQuant=document.getElementById("input-quantity")
const cartList=document.getElementById("cartList")
const bagQuantity=document.getElementById("bag-input")
const total=document.getElementById("total")

console.log(localStorage.getItem("product"))

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

function cartChange(){
    const listItems = cartList.getElementsByTagName("li")
    let products=[]
    for (let i = 0; i <= listItems.length - 1; i++) {
        products.push(listItems[i].id)
    }
    console.log(products)
    var priceTotal=0
    let currentQuant
    products.forEach((product)=>{
        if(product=="gift-card"){
            currentQuant=document.getElementById('gift-input')
            priceTotal+=currentQuant.value*25
        }
        else{
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

addToCart.addEventListener("click",()=>{
    openCart()
    let alreadyExisting=checkProduct()
    if(alreadyExisting){
        const giftQuantity=document.getElementById("gift-input")
        giftQuantity.value=Number(giftQuantity.value)+Number(inputQuant.value)
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
                <button onclick="removeProduct(this)">Remove</button>
            </div>
            <input type="number" min="0" class="cart-quantity" value="${inputQuant.value}" id="gift-input" onChange="cartChange()">
        </li>
        `
        cartList.insertAdjacentHTML("beforeend",newProduct)
    }
    cartChange()
})

cartExit.addEventListener("click",()=>{
    shoppingCart.classList.add('hidden')
    overlay.classList.add('hidden')
})


