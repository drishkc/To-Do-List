
const blur = document.querySelector(".blur")
const lists = document.querySelector(".lists")
const submit = document.querySelector(".submitBtn")

submit.addEventListener('click', () => {
    let usrInpPara = document.querySelector(".msgField")
    const del = document.createElement("span")
    del.innerText = "x"
    let li = document.createElement("li")
    li.classList.add ("contOne")
    li.innerText = usrInpPara.value
    lists.appendChild(li)
    li.appendChild(del)
    usrInpPara.value = ""
});
lists.addEventListener('click', (e)=> {
    const item = e.target.closest(".contOne")
    if(!item) return

    item.classList.toggle("checked")
    item.classList.toggle("liChecked")
})
