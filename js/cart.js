const shoppingCart=document.getElementById("shoppingCart")
const overlay=document.getElementById("overlay")
const addToCart=document.getElementById("addToCartButton")
const cartExit=document.getElementById("cartExit")


addToCart.addEventListener("click",()=>{
    shoppingCart.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

cartExit.addEventListener("click",()=>{
    shoppingCart.classList.add('hidden')
    overlay.classList.add('hidden')
})