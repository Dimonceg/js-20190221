import Component from '../Component.js'

export default class ShoppingCart extends Component {
  constructor(element, props) {
    super(element, props)

    this.render()
  }
  render() {
    const { basketItems } = this.props;
    this.element.innerHTML = `
      <div>
        <p>Shopping Cart</p>
        <ul>
          ${basketItems.map(item => `
            <li>
              ${item}
              <button>X</button>
            </li>
          `).join('')}
        </ul>
        </div>
        `
      }
    }
    