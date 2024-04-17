import React from "react";
import { useState } from "react";
import { useEffect } from "react";



export default function AddList({ getItems }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const newItems = getItems()
        console.log('render')
        setItems(newItems)
    }, [getItems])

    return (
        <ul>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    )
}