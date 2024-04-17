const ProductDOM = ({ products, modalDescriptionWindow, appendProductBasket }) => {
    return (
        <div className="produts_list_block">
            {products.length >= 1 ? products.map(product => {
                return(
                    <div className="drinks" key={product.id} onClick={(e) => {
                        appendProductBasket(e)
                    }}>
                        <div className="box">
                            <div className="img_block">
                                <button type="button" style={{
                                    margin: '0',
                                    padding: '0',
                                    border: 'none',
                                    outline: 'none'
                                }} onClick={() => {
                                    modalDescriptionWindow({
                                        body: <div className="body_product" style={{fontSize: '400'}}>
                                                <div>
                                                    <span><img src={product.image} alt={product.product_display_name} style={{
                                                        width: '240px',
                                                        height: '240px',
                                                        marginBottom: '10px'
                                                    }}/></span>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginLeft: '1rem'
                                                }}>
                                                    <span>{product.product_display_name} {product.price} {product.currency}</span>
                                                    <span>{product.description}</span>
                                                </div>
                                                </div>
                                    })
                                }}>
                                <img src={product.image} height="240px" width="220px" alt="Где картинки Ера!"/>
                                </button>
                            </div>
                            <div className="product_name_price">
                                <p style={{margin: '10px 0 5px 0', padding: '0'}}>{product.product_display_name}</p>
                                <p style={{margin: '5px 0 5px 0', padding: '0'}}>{product.price} KZT</p>
                            </div>
                            <div className="btn_block" style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <button style={{margin: '0 0 7px 0'}} type="button" className="btn btn-primary" data-btn="add_basket" data-id={product.id}>Добавить в корзину</button>
                                <button style={{margin: '0 0 7px 0'}} type="button" className="btn btn-success">Купить</button>
                            </div>
                        </div> 
                    </div>)})
                    : <div className="content">
                        <span>Товара нет в наличии</span>
                    </div>       
                }
        </div>
    )
}
 
export default ProductDOM;