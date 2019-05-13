import Component from '../Component.js'

export default class PhoneViewer extends Component {
    constructor(element, props) {
        super(element, props)

        this.state = {
            selectedImage: this.props.phone.images[0],
        }
        
        this.render()

        this.on('click', '[data-back]', () => {
            this.props.backToCatalog()  
        })

        this.on('click', '[data-images]', (event) => {
            const imageSrc = event.delegeteTarget.dataset.imageUrl
            this.setState({
                selectedImage: imageSrc,
            })
        })

        this.on('click', '[data-add]', () => {
            this.props.addPhone(this.props.phone.id)
        })
    }
    
    render() {
        const { phone } = this.props;
        this.element.innerHTML = `
            <div>
                <img class="phone" src="${ this.state.selectedImage }">

                <button data-back>Back</button>
                <button data-add>Add to basket</button>
            
                <h1>${phone.name}</h1>
            
                <p>${phone.additionalFeatures}</p>
            
                <ul class="phone-thumbs">
                ${phone.images.map(function(img){
                    return `<li><img src="${img}" data-images data-image-url="${img}"></li>`
                }).join('')}
                </ul>
            </div>
        `
    }
}