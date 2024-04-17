import ModalWindow from "../../Assistant/Registration/Modal/Modal"
import { modalOpen } from "../../Assistant/Registration/Modal/Modal"

const CartFooter = ({ total, updateProduct }) => {
    const { priceTotal, count } = total
    const priceFormatter = new Intl.NumberFormat()
    return (
        <>
            <div className="cart__footer">
                <div className="cart-footer__count">{count} единицы</div>
                <div className="cart-footer__price">{priceFormatter.format(priceTotal)} KZT</div>
            </div>
            <div>
                <button className="btn btn-primary mt-4" type="button" onClick={() => {
                    updateProduct()
                }}>Сохранить</button>
                <button className="btn btn-success mt-4 ms-2" type="button" onClick={() => {
                    return modalOpen({
                        title: "Покупка невозможна",
                        body: "Данная функция отсутствует на сайте",
                        footer: <button type="button" className="btn btn-danger">Закрыть</button>
                    })
                }}>Купить</button>
            </div>
            <ModalWindow />
        </>
    )
}
 
export default CartFooter;