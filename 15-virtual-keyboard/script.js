const keyboard = {
  elements: {
    main: null,
    keyContainer: null,
    keys: [],
  },

  eventHandlers: {
    onInput: null,
    onClose: null,
  },

  props: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div')
    this.elements.keyContainer = document.createElement('div')

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard-hidden')
    this.elements.keyContainer.classList.add('keyboard-keys')
    this.elements.keyContainer.appendChild(this._createKeys())
    this.elements.keys =
      this.elements.keyContainer.querySelectorAll('.keyboard-key')

    // Add to DOM
    this.elements.main.appendChild(this.elements.keyContainer)
    document.body.appendChild(this.elements.main)

    // Open keyboard with textarea selection
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(
          element.value,
          (currentValue) => (element.value = currentValue)
        )
      })
    })
  },

  _createKeys() {
    const fragment = document.createDocumentFragment()
    const keyLayout = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'caps',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'enter',
      'done',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '?',
      'space',
    ]

    // Create HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`
    }

    // Generate the keyboard
    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button')
      const insertLineBreak =
        ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1

      // Add classes
      keyElement.setAttribute('type', 'button')
      keyElement.classList.add('keyboard-key')

      //
      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard-key-wide')
          keyElement.innerHTML = createIconHTML('backspace')

          keyElement.addEventListener('click', () => {
            this.props.value = this.props.value.substring(
              0,
              this.props.value.length - 1
            )
            this._triggerEvent('onInput')
          })
          break

        case 'caps':
          keyElement.classList.add(
            'keyboard-key-wide',
            'keyboard-key-activatable'
          )
          keyElement.innerHTML = createIconHTML('keyboard_capslock')

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock()
            keyElement.classList.toggle(
              'keyboard-key-active',
              this.props.capsLock
            )
          })
          break

        case 'enter':
          keyElement.classList.add('keyboard-key-wide')
          keyElement.innerHTML = createIconHTML('keyboard_return')

          keyElement.addEventListener('click', () => {
            this.props.value += `\n`
            this._triggerEvent('onInput')
          })
          break

        case 'space':
          keyElement.classList.add('keyboard-key-extra-wide')
          keyElement.innerHTML = createIconHTML('space_bar')

          keyElement.addEventListener('click', () => {
            this.props.value += ` `
            this._triggerEvent('onInput')
          })
          break

        case 'done':
          keyElement.classList.add('keyboard-key-wide', 'keyboard-key-dark')
          keyElement.innerHTML = createIconHTML('check_circle')

          keyElement.addEventListener('click', () => {
            this.close()
            this._triggerEvent('onClose')
          })
          break

        default:
          keyElement.textContent = key.toLocaleLowerCase()

          keyElement.addEventListener('click', () => {
            this.props.value += this.props.capsLock
              ? key.toUpperCase()
              : key.toLocaleLowerCase()
            this._triggerEvent('onInput')
          })
      }

      fragment.appendChild(keyElement)

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'))
      }
    })

    return fragment
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.props.value)
    }
  },

  _toggleCapsLock() {
    this.props.capsLock = !this.props.capsLock

    this.elements.keys.forEach((key) => {
      if (key.childElementCount === 0) {
        key.textContent = this.props.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLocaleLowerCase()
      }
    })
  },

  open(initialValue, onInput, onClose) {
    this.props.value = initialValue || ''
    this.eventHandlers.onInput = onInput
    this.eventHandlers.onClose = onClose
    this.elements.main.classList.remove('keyboard-hidden')
  },

  close() {
    this.props.value = ''
    this.eventHandlers.onInput = onInput
    this.eventHandlers.onClose = onClose
    this.elements.main.classList.add('keyboard-hidden')
  },
}

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init()

  // food for thought
  //   keyboard.open('decode', (currentValue) => {
  //       console.log('Value change here it is' + currentValue);
  //   }), currentValue => {
  //       console.log('keyboard closed! finishing value is ' + currentValue);
  //   }
})


