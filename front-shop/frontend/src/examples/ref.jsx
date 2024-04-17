import React, { useState, useEffect, useRef } from "react";

function App() {
    // const [renderCount, setRenderCount] = useState(0)
    const renderCount = useRef(1)
    const [value, setValue] = useState('initial')
    const inputRef = useRef(null)
    const prevValue = useRef('')

    useEffect(() => {
        renderCount.current++
        console.log(inputRef.current)
    })
    useEffect(() => {
        prevValue.current = value
    }, [value])
    const focus = () => inputRef.current.focus()
    return (
        <div>
            <h3>{prevValue.current}</h3>
            <h4>{renderCount.current}</h4>
            <input ref={inputRef} type="text" onChange={e => setValue(e.target.value)} value={value}/>
            <button className="btn btn-success" onClick={focus}>focus</button>
        </div>
    )
}

export default App