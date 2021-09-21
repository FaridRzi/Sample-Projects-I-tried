// Variables
const cartItems = document.querySelector('.cart-items')
const productCenter = document.querySelector('.products-center')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const cartOverlay = document.querySelector('.cart-overlay')
const cartDOM = document.querySelector('.cart')
const closeCart = document.querySelector('.close-cart')
const clearCart = document.querySelector('.clear-cart')
const cartBtn = document.querySelector('.cart-btn')
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
              Add to cart
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
      let inCart = cart.find(item => item.id === id)
      if (inCart) {
        button.innerText = 'In Cart'
        button.disabled = true
      }
      button.addEventListener('click', (event) => {
        event.target.innerText = 'In Cart'
        event.target.disabled = true
        // Get product from products based button ids
        let cartItem = { ...Storage.getProuct(id), amount: 1 }
        cart = [...cart, cartItem]
        Storage.saveCart(cart)
        this.setCartValues(cart)
        this.displayCartItem(cartItem)
        this.showCart()
      })
    })
  }
  setCartValues(cart) {
    let tempTotal = 0
    let itemTotal = 0
    cart.map((item) => {
      tempTotal += item.amount * item.price
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
  // Show and hide the cart
  showCart() {
    cartOverlay.classList.add('transparentBcg')
    cartDOM.classList.add('showCart')
  }
  hideCart() {
    cartOverlay.classList.remove('transparentBcg')
    cartDOM.classList.remove('showCart')
  }
  // Adding the products to the cart
  populate(cart) {
    cart.forEach((item) => {
      this.displayCartItem(item)
    })
  }
  // Loading previous items in the cart
  setupAPP() {
    cart = Storage.getCart()
    this.setCartValues(cart)
    this.populate(cart)
    cartBtn.addEventListener('click', this.showCart)
    closeCart.addEventListener('click', this.hideCart)
  }

  cartLogic() {
    clearCart.addEventListener('click', () => {
      this.clearCart()
    })

    // cart functionality including the adding and removing items from the cart
    cartContent.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target
        let id = removeItem.dataset.id
        cartContent.removeChild(removeItem.parentElement.parentElement)
        this.removeItem(id)
      } else if (event.target.classList.contains('fa-chevron-up')) {
        let addAmount = event.target
        let id = addAmount.dataset.id
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount += 1
        Storage.saveCart(cart)
        this.setCartValues(cart)
        addAmount.nextElementSibling.innerText = tempItem.amount
      } else if (event.target.classList.contains('fa-chevron-down')) {
        let reduceAmount = event.target
        let id = reduceAmount.dataset.id
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount -= 1
        if (tempItem.amount > 0) {
          Storage.saveCart(cart)
          this.setCartValues(cart)
          reduceAmount.previousElementSibling.innerText = tempItem.amount
        } else {
          cartContent.removeChild(reduceAmount.parentElement.parentElement)
          this.removeItem(id)
        }
      }
    })
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id)
    // console.log(cartItems)
    cartItems.forEach((id) => this.removeItem(id))
    // console.log(cartContent.children)
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0])
    }

    this.hideCart()
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id)
    this.setCartValues(cart)
    Storage.saveCart(cart)
    let button = this.getSingleButton(id)
    button.disabled = false
    button.innerHTML = '<i class="fas fa-shopping-cart"></i> add to cart'
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id)
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
  // static clearCart() {
  //   localStorage.removeItem('cart')
  //   cartContent.innerHTML = `<div></div>`
  //   cartTotal.innerText =   0
  //   cartItems.innerText = 0
  // }
  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []
  }
}

//

// clearCart.addEventListener('click', () => {
//   Storage.clearCart()
// })

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI()
  const products = new Products()

  //setup application
  ui.setupAPP()

  // get all products
  products
    .getProducts()
    .then((product) => {
      ui.displayProducts(product)
      Storage.saveProducts(product)
    })
    .then(() => {
      ui.getBagButtons()
      ui.cartLogic()
    })
})
