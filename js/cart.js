const shoppingCart=document.getElementById("shoppingCart")
const overlay=document.getElementById("overlay")
const addToCart=document.getElementById("addToCartButton")
const cartExit=document.getElementById("cartExit")

const inputQuant=document.getElementById("input-quantity")
const cartList=document.getElementById("cartList")
const bagQuantity=document.getElementById("greenpack-input")
const total=document.getElementById("total")

var pName=localStorage.getItem("product")
var Name

if(pName==='giftcard'){
    Name='Gift Card'
}
else if(pName==='mug'){
    Name='Mug'
}
else if(pName==='bluepack'){
    Name='Blue Canvas Backpack'
}
else if(pName==='greenpack'){
    Name='Green Backpack'
}
else if(pName==='tent'){
    Name='White Tent'
}

function openCart(){
    shoppingCart.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function checkProduct(){
    const listItems = cartList.getElementsByTagName("li")
    for (let i = 0; i <= listItems.length - 1; i++) {
        if(listItems[i].id ==pName){
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

function addProduct(){
    let newProduct=`
        <li id="${pName}">
            <div class="cart-image">
                <img src="${image}" alt="">
            </div>
            <div class="cart-product-details">
                <p class="cart-product-name">${Name}</p>
                <p class="price cart-price">${price}</p>
                <button onclick="removeProduct(this)">Remove</button>
            </div>
            <input type="number" min="0" class="cart-quantity" value="${inputQuant.value}" id="${pName}-input" onChange="cartChange()">
        </li>
    `
    cartList.insertAdjacentHTML("beforeend",newProduct)
}


addToCart.addEventListener("click",()=>{
    openCart()
    let alreadyExisting=checkProduct()
    if(alreadyExisting){
        let quant=document.getElementById(`${pName}-input`)
        quant.value=Number(quant.value)+Number(inputQuant.value)
    }

    else{
        addProduct()
    }
    cartChange()
})

cartExit.addEventListener("click",()=>{
    shoppingCart.classList.add('hidden')
    overlay.classList.add('hidden')
})


