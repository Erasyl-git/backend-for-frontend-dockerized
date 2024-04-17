import Count from "./Count"


const Product = ({ product, quantity, total_price, deleteProduct, increase, decrease, changeValue, changeValueServer, deleteProductServer, modalMessageOpen }) => {
    const { product_display_name, image, id } = product
    const priceFormatter = new Intl.NumberFormat()
    return (
        <section className="product_body">
            <div className="product__img"><img src={`http://127.0.0.1:8000${image}`} alt={product_display_name} width="120px" /></div>
            <div className="product__title">{product_display_name}</div>
            <div className="product__count">
                <Count
                    quantity={quantity}
                    increase={increase}
                    decrease={decrease}
                    changeValue={changeValue}
                    changeValueServer={changeValueServer}
                    id ={id}/>
            </div>
            <div className="product__price">{priceFormatter.format(total_price)} KZT</div>
            <div className="product__controls">
                <button type="button" style={{border: 'none', background: 'transparent'}} onClick={() => {
                    deleteProduct(id)
                    modalMessageOpen()
                    deleteProductServer(id)
                }}>
                    <img src="./img/icons/cross.svg" alt="Delete" />
                </button>
            </div>
        </section>
    )
}
 
export default Product