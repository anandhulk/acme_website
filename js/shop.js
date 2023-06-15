const giftBtn=document.getElementById("giftBtn")
const tentBtn=document.getElementById("tentBtn")
const accessBtn=document.getElementById("accessBtn")
const packBtn=document.getElementById("packBtn")

//products containers
const gift=document.getElementById("giftcard")
const access=document.getElementById("access")
const bluepack=document.getElementById("bluepack")
const greenpack=document.getElementById("greenpack")
const tent=document.getElementById("tent")


giftBtn.addEventListener("click",()=>{
    access.classList.add('hidden')
    bluepack.classList.add('hidden')
    greenpack.classList.add('hidden')
    tent.classList.add('hidden')
    gift.classList.remove('hidden')
})

accessBtn.addEventListener("click",()=>{
    access.classList.remove('hidden')
    bluepack.classList.add('hidden')
    greenpack.classList.add('hidden')
    gift.classList.add('hidden')
    tent.classList.add('hidden')
})

packBtn.addEventListener("click",()=>{
    access.classList.add('hidden')
    bluepack.classList.remove('hidden')
    greenpack.classList.remove('hidden')
    gift.classList.add('hidden')
    tent.classList.add('hidden')
})

tentBtn.addEventListener("click",()=>{
    access.classList.add('hidden')
    bluepack.classList.add('hidden')
    greenpack.classList.add('hidden')
    gift.classList.add('hidden')
    tent.classList.remove('hidden')
})