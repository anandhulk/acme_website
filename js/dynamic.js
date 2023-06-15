
async function redirect(productName,priceIn){
    let image=`assets-3/${productName}.jpeg`
    await localStorage.setItem("product",productName)
    await localStorage.setItem("price",`$ ${priceIn}.00 USD`)
    await localStorage.setItem("image",image)
    location.assign("product-description.html")
    
}


