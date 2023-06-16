const addToCart=document.getElementById("addToCartButton")

const inputQuant=document.getElementById("input-quantity")

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

function checkProduct(){
    let listItems = cartList.getElementsByTagName("li")
    for (let i = 0; i <= listItems.length - 1; i++) {
        if(listItems[i].id ==pName){
            return true
        }
    }
    return false
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
    addToCart.innerHTML="Adding to cart..."
    const myTimeout = setTimeout(()=>{
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
        addToCart.innerHTML="Add to Cart"
    }, 400);
})



