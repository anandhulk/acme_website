const productName=document.getElementById("productName")
const productPrice=document.getElementById("productPrice")
const productImage=document.getElementById("productImage")

let name=localStorage.getItem("product")
let price=localStorage.getItem("price")
let image=localStorage.getItem("image")

if(name==='giftcard'){
    name='Gift Card'
}
else if(name==='mug'){
    name='Mug'
}
else if(name==='bluepack'){
    name='Blue Canvas Backpack'
}
else if(name==='greenpack'){
    name='Green Backpack'
}
else if(name==='tent'){
    name='White Tent'
}


productName.innerHTML=name
productPrice.innerHTML=price
productImage.src=image