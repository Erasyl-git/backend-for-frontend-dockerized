import React, { useContext, useReducer, useState } from "react";

const AlertContext = React.createContext()

export const useAlert = () => {
    return useContext(AlertContext)
}

const SHOW_ALERT = 'show'
const HIDE_ALERT = 'hide'

const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT: return {...state, visible: true, text: action.text};
        case HIDE_ALERT: return {...state, visible: false}
        default: return state
    }
}

export const Component = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        visible: false,
        text: ''
    })
    const [searchItem, setSearchItem] = useState('')
    const [textInput, setTextInput] = useState('')

    const show = text => dispatch({ type: SHOW_ALERT, text })
    const hide = () => dispatch({ type: HIDE_ALERT })

    return (
        <AlertContext.Provider value={{
            visible: state.visible,
            text: state.text,
            searchItem: searchItem,
            textInput: textInput,
            show, hide, setSearchItem, setTextInput
        }}>
            {children}
        </AlertContext.Provider>
    )
}