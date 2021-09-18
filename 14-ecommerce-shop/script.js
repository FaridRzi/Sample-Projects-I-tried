// Variables
const cartItems = document.querySelector('.cart-items')
const productCenter = document.querySelector('.products-center')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const cartOverlay = document.querySelector('.cart-overlay')
const cartDOM = document.querySelector('.cart')
// cart items
let cart = []
let buttonsDOM = []

// Getting the products from Local
class Products {
  async getProducts() {
    try {
      let result = await fetch('products.json')
      let data = await result.json()
      let products = data.items
      products = products.map((item) => {
        const { title, price } = item.fields
        const image = item.fields.image.fields.file.url
        const { id } = item.sys
        return { title, price, id, image }
      })
      return products
    } catch (error) {
      console.log(error)
    }
  }
}

// Display products. This class gets the data from products and shows them
class UI {
  displayProducts(products) {
    let result = ''
    products.forEach((product) => {
      result += `
          <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="${product.image.split(/(\\|\/)/g).pop()}"
              class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              Add to bag
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
          `
    })
    productCenter.innerHTML = result
  }

  getBagButtons() {
    // The spread operator converts a node list to an array
    const buttons = [...document.querySelectorAll('.bag-btn')]
    buttonsDOM = buttons
    buttons.forEach((button) => {
      let id = button.dataset.id
      let inCart = cart.find((item) => {
        item.id === id
      })
      if (inCart) {
        button.innerText = 'In Cart'
        button.disabled = true
      }
      button.addEventListener('click', (event) => {
        event.target.innerText = 'In Cart'
        event.target.disabled = true
        // Get product from products based button ids
        let cartItem = { ...Storage.getProuct(id), amount: 1 }
        // Add product to the
        cart = [...cart, cartItem]
        // save cart in local storage
        Storage.saveCart(cart)
        // set cart values
        this.setCartValues(cart)
        // add cart item/ display cart item
        this.displayCartItem(cartItem)
        // Show the cart + overlay
        this.showCart()
      })
    })
  }
  setCartValues(cart) {
    let tempTotal = 0
    let itemTotal = 0
    cart.map((item) => {
      tempTotal += item.amount * item.price
      console.log()
      itemTotal += item.amount
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
    cartItems.innerText = itemTotal
  }
  displayCartItem(item) {
    const div = document.createElement('div')
    div.classList.add('cart-item')
    div.innerHTML = `
    <img src="${item.image}" alt="${item.image.split(/(\\|\/)/g).pop()}">
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item" data-id=${item.id}>remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i>
                </div>
    `
    cartContent.appendChild(div)
  }

  showCart() {
    cartOverlay.classList.add('transparentBcg')
    cartDOM.classList.add('showCart')
  }
}

// Local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products))
  }
  static getProuct(id) {
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find((product) => product.id === id)
  }
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI()
  const products = new Products()

  // get all products
  products
    .getProducts()
    .then((product) => {
      ui.displayProducts(product)
      Storage.saveProducts(product)
    })
    .then(() => {
      ui.getBagButtons()
    })
})
