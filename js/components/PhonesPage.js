import Component from '../Component.js'
import Filter from './Filter.js'
import ShoppingCart from './ShoppingCart.js'
import PhoneViewer from './PhoneViewer.js'
import PhonesCatalog from './PhonesCatalog.js'
import { getAll, getById} from '../api/phones.js'

export default class PhonesPage extends Component {
  constructor(element) {
    super(element)
    
    this.state = {
      phones: getAll(),
      selectedPhone: null,
      basketItems: {
        'phone1': 1,
        'phone2': 2,
      }
    }
    
    this.render()
  }

  init() {
    this.initComponent(Filter)
    this.initComponent(ShoppingCart, {
      basketItems: this.state.basketItems,
      onRemove: (itemToRemove) => {
        const newBasketItems = this.state.basketItems
        delete newBasketItems[itemToRemove]
        this.setState({
          basketItems: newBasketItems
        })
      }
    })
    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: (phoneId) => {
        this.setState({
          selectedPhone: getById(phoneId)
        })
      },
      addPhone: (phoneId) => {
        const oldBasketItems = this.state.basketItems
        this.setState({
          basketItems: {
            ...this.state.basketItems,
            [phoneId]: oldBasketItems[phoneId] ? oldBasketItems[phoneId] +1 : 1
          }
        })
      }
    })
    this.initComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      backToCatalog: () => {
        this.setState({
          selectedPhone: null
        })
      },
      addPhone: (phoneId) => {
        const oldBasketItems = this.state.basketItems
        this.setState({
          basketItems: {
            ...this.state.basketItems,
            [phoneId]: oldBasketItems[phoneId] ? oldBasketItems[phoneId] + 1 : 1
          },
        })
      }
    })
  }

  render() {
    this.element.innerHTML = `
    <div class="row">
      <div class="col-md-2">
        <section>
          <div data-component="Filter"></div>
        </section>

        <section>
          <div data-component="ShoppingCart"></div>
        </section>
      </div>
      
      <div class="col-md-10">
        ${this.state.selectedPhone ? `
          <div data-component="PhoneViewer"></div>
        `:`
          <div data-component="PhonesCatalog"></div>
        `}
      </div>
    </div>
    `
    this.init()
  }
  
}