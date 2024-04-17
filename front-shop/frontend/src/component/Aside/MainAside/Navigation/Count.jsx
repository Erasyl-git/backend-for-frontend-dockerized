const Count = ({ quantity, increase, decrease, id, changeValue, updateProductIncrease, updateProductDecrease, changeValueServer }) => {
    return (
        <div className="count">
            <div className="count__box">
                <input type="number" className="count__input" min="1" max="100" value={quantity} onChange={(e) => {
                    changeValue(id, +e.target.value)
                    changeValueServer(id, +e.target.value)
                }}/>
            </div>
            <div className="count__controls">
                <button type="button" className="count__up" style={{border: 'none', background: 'transparent'}} onClick={() => {
                    increase(id)
                }}>
                    <img src="./img/icons/icon-up.svg" alt="Increase" />
                </button>
                <button type="button" className="count__down" style={{border: 'none', background: 'transparent'}} onClick={() => {
                    decrease(id)
                }}>
                    <img src="./img/icons/icon-down.svg" alt="Decrease" />
                </button>
            </div>
        </div>
    )
}
 
export default Count;