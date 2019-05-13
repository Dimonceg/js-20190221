import Component from '../Component.js'

export default class ShoppingCart extends Component {
  constructor(element, props) {
    super(element, props)

    this.render()

    this.on('click', '[data-remove]', (event) => {
      const item = event.delegeteTarget.dataset.item
      this.props.onRemove(item)
    })
  }
  render() {
    const { basketItems } = this.props;
    this.element.innerHTML = `
      <div>
        <p>Shopping Cart</p>
        <ul>
          ${Object.keys(basketItems).map(item => `
            <li>
              ${item} - ${basketItems[item]}
              <button data-remove data-item="${item}">X</button>
            </li>
          `).join('')}
        </ul>
        </div>
        `
      }
    }
    