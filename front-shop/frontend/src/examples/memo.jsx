import React, { useEffect, useMemo, useState } from "react";

function complexComputed(num) {
    let i = 0
    while(i < 1000000000) i++
    return num * 2
}

function App() {
    const [number, setNumber] = useState(42)
    const [colored, setColored] = useState(false)
    const computed = useMemo(() => {
        return complexComputed(number)
    }, [number]) 
    const styles = useMemo(() => ({
        color: colored ? 'green' : 'red'
    }), [colored])
    useEffect(() => {
        console.log('lol')
    }, [styles])
    return (
        <div>
            <h4 className="m-2" style={styles}>Counter: {computed}</h4>

            <button className="btn btn-success m-2" onClick={() => setNumber(prev => prev + 1)}>+</button>
            <button className="btn btn-danger m-2" onClick={() => setNumber(prev => prev - 1)}>-</button>
            <button className="btn btn-warning m-2" onClick={() => setColored(prev => !prev)}>Изменить</button>
        </div>
    )
}

export default App