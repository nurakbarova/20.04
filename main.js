let cards = document.querySelectorAll(".card")
let addToCardBtn = []
let count = document.querySelector(".count")
let totalSpan = document.querySelector(".total")
cards.forEach((card) => {
    addToCardBtn.push(card.children[1].children[3])

})

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("product")) {
        let basket = []
        localStorage.setItem("product", JSON.stringify(basket))
    }
})

addToCardBtn.forEach((add) => {
    add.addEventListener("click", (e) => {
        let productName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        let productPrice = e.target.previousElementSibling.children[0].textContent
        let productDesc = e.target.previousElementSibling.previousElementSibling.textContent
        let productId = e.target.parentElement.parentElement.getAttribute("data-id")

        let product = {
            id: productId,
            name: productName,
            price: productPrice,
            desc: productDesc,
            count: 0
        }
        let basket = JSON.parse(localStorage.getItem("product")) || [];

        let existed = basket.find((basketItem) => basketItem.id == productId)

        if (existed) {
            existed.count++;
        }
        else {
            basket.push(product)
        }

        count.textContent = basket.length;

        let total = basket.reduce((total, value) => {
            let t = Number(value.price) * Number(value.count)
            return total + t;
        }, 0)

        totalSpan.textContent = total;
        localStorage.setItem("product", JSON.stringify(basket))

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `${product.name.toUpperCase()} added to basket !`,
            showConfirmButton: false,
            timer: 1500
        })
    })
})