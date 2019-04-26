import Component from '../Component.js'

export default class PhoneViewer extends Component {
    constructor(element, props) {
        super(element, props)

        this.render()
        
        this.on('click', '[data-back]', () => {
            this.props.backToCatalog()  
        })

        this.on('click', '[data-images]', (event) => {
            const phone = document.querySelector('.phone')
            phone.src = event.delegeteTarget.src
        })

        this.on('click', '[data-add]', () => {
            this.props.addPhone(this.props.phone.id)
        })
    }
    
    render() {
        const { phone } = this.props;
        this.element.innerHTML = `
            <div>
                <img class="phone" src="${phone.images[0]}">

                <button data-back>Back</button>
                <button data-add>Add to basket</button>
            
            
                <h1>${phone.name}</h1>
            
                <p>${phone.additionalFeatures}</p>
            
                <ul class="phone-thumbs">
                ${phone.images.map(function(img){
                    return `<li><img src="${img}" data-images></li>`
                }).join('')}
                </ul>
            </div>
        `
    }
}