import React, { useState } from "react"

function App() {
    const [ click, setClick ] = useState(0)
    const [ state, setState ] = useState({
        title: 'Сапарбек Ализа',
        date: Date.now()
    })
    function ingrement() {
        setClick((prevState) => {
            return prevState + 1
        })
        setClick(prev => prev + 1)
    }
    function decrement() {
        setClick((prevState) => {
            return prevState - 1
        })
        setClick(prev => prev - 1)
    }
    function updateState() {
        setState(prev => {
            return {
                ...prev,
                title: 'Покемон Пиражков'
            }
        })
    }
    return (
        <div>
            <h1 className="m-2">Счетчик: {click}</h1>
            <button className="btn btn-success m-1" onClick={ingrement}>Добавить</button>
            <button className="btn btn-danger m-1" onClick={decrement}>Убрать</button>
            <button className="btn btn-primary m-1" onClick={updateState}>Изменить название</button>

            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    )
}

export default App