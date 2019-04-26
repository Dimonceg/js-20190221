import Component from '../Component.js'

export default class PhonesCatalog extends Component {
  constructor(element, props) {
    super(element, props)

    this.render()

    this.on('click', '[data-element]', (event) => {
      const phoneId = event.delegeteTarget.dataset.phoneId
      this.props.onPhoneSelected(phoneId)
    })

    this.on('click', '[data-add]', () => {
      const phoneId = event.delegeteTarget.dataset.phoneId
      this.props.addPhone(phoneId)
    })
  }
  render() {
    this.element.innerHTML = `
      <div>
        <ul class="phones">
          ${this.props.phones.map(phone => `
            <li class="thumbnail">
              <a href="#!/phones/${phone.id}" data-element data-phone-id="${phone.id}" class="thumb">
                <img alt="${phone.name}" src="${phone.imageUrl}">
              </a>

              <div class="phones__btn-buy-wrapper">
                <a class="btn btn-success" data-add data-phone-id="${phone.id}">
                  Add
                </a>
              </div>

              <a href="#!/phones/${phone.id}" data-element data-phone-id="${phone.id}">${phone.name}</a>
              <p>${phone.snippet}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    `
  }
}