import { useState } from "react";


let modalOpen = ''
export { modalOpen }
const ModalWindow = () => {
    const [modal, setModal] = useState('modal')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [btn, setBtn] = useState(<button className="btn btn-danger"></button>)
    
    const _createModalWindow = (options) => {
        setModal("open")
        setTitle(options.title)
        setBody(options.body)
        setBtn(options.footer)
        removeOverflow()
        setTimeout(() => {
            setModal("modal-open")
        }, 0)
    }
    modalOpen = _createModalWindow

    const _removeModalWindow = () => {
        setModal("modal-hide")
        addOverflow()
        setTimeout(() => {
            setModal("modal")
        }, 300)   
    }

    function removeOverflow() {
        document.body.style.cssText = `
            overflow: hidden;
        `
    }

    function addOverflow() {
        document.body.style.cssText = `
            overflow: auto;
        `
    }

    return (
        <>
            <div className={modal}>
                <div className="modal-overlay" onClick={_removeModalWindow}>
                    <div className="modal-window">
                        <div className="modal-header">
                            <span className="modal-title">{title}</span>
                            <span className="modal-close" onClick={_removeModalWindow}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <p>{body}</p>
                        </div>
                        <div className="modal-footer">
                            {btn}
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}
 
export default ModalWindow;