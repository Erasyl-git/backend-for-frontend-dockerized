import React, { useState } from "react";
import { useCallback } from "react";
import AddList from "./addList";


const Callback = () => {
    const [count, setCount] = useState(0)
    const [colored, setColored] = useState(false)

    const styles = {
        color: colored ? 'darkred' : 'lightgreen',
        margin: '10px 10px 0'
    }

    const generateItemsFromAPI = useCallback(() => {
        return new Array(count).fill('').map((_, i) => `Элемент ${i + 1}`)
    }, [count])

    return (
        <>
            <p style={styles}>Количество элементов: {count}</p>
            <button type="button" className="btn btn-primary m-2" onClick={() => setCount(prev => prev + 1)}>Добавить</button>
            <button type="button" className="btn btn-danger m-2" onClick={() => setCount(prev => {
                if (prev > 0) {
                    return prev - 1
                } else if (prev === 0) {
                    return prev
                }
            })}>Убавить</button>
            <button type="button" className="btn btn-warning m-2" onClick={() => setColored(prev => !prev)}>Изменить</button>

            <AddList getItems={generateItemsFromAPI} />
        </>
    )
}

export default Callback