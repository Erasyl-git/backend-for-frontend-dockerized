import React, { useEffect, useState } from "react";

function App() {
    const [ type, setType ] = useState('Users')
    const [ data, setData ] = useState([])
    const [ pos, setPos ] = useState({
        x: 0, y: 0
    })
    const listener = event => {setPos(()=>{return{x:event.clientX,y:event.clientY}})}
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}/3`)
          .then(response => response.json())
          .then(json => setData(json))

        return () => {
            window.removeEventListener('mousemove', listener)
        }
    }, [type])

    useEffect(() => {
        window.addEventListener('mousemove', listener)
        return () => {
            window.removeEventListener('mousemove', listener)
        }
    }, [])
    
    return (
        <div>
            <h2 className="result m-2">Result: {type}</h2>

            <button className="btn btn-success m-2" onClick={() => setType('Users')}>Users</button>
            <button className="btn btn-primary m-2" onClick={() => setType('Todos')}>Todos</button>
            <button className="btn btn-secondary m-2" onClick={() => setType('Posts')}>Posts</button>
        
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <pre>{JSON.stringify(pos, null, 2)}</pre>
        </div>
    )
}

export default App