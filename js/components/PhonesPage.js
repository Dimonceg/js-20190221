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
      basketItems: []
    }
    
    this.render()
  }

  init() {
    this.initComponent(Filter)
    this.initComponent(ShoppingCart, {
      basketItems: this.state.basketItems,
    })
    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: (phoneId) => {
        this.setState({
          selectedPhone: getById(phoneId)
        })
      },
      addPhone: (phoneId) => {
        this.setState({
          basketItems: [...this.state.basketItems, phoneId],
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
        this.setState({
          basketItems: [...this.state.basketItems, phoneId],
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