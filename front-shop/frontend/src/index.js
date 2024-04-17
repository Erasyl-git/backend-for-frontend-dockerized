import React from "react"
import * as ReactDOMClient from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"


const root = ReactDOMClient.createRoot(document.querySelector('#container'))
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)