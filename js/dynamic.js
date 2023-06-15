// function to change to description change
// set image price name dynamcially inside the function using var
// set it inside id or local storage
// do all other functions in cart.js



async function redirect(productName,priceIn){
    let image=`assets-3/${productName}.jpeg`
    await localStorage.setItem("product",productName)
    await localStorage.setItem("price",`$ ${priceIn}.00 USD`)
    await localStorage.setItem("image",image)
    location.replace("product-description.html")
    
}


