import { useState } from "react";

let modalDescriptionWindow = ''
const ModalDescriptionWindow = () => {
    const [modal, setModal] = useState('modal')
    const [body, setBody] = useState('')

    const _createModalWindow = (options) => {
        setModal("open")
        setBody(options.body)
        removeOverflow()
        setTimeout(() => {
            setModal("modal-open")
        }, 0)
    }
    modalDescriptionWindow = _createModalWindow

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
        document.body.querySelector('[data-window]').style.cssText = `
            overflow: scroll;
            width: 800px;
        `
    }

    function addOverflow() {
        document.body.style.cssText = `
            overflow: auto;
        `
        document.body.querySelector('[data-window]').style.cssText = `
            overflow: hidden;
            width: 800px;
        `
    }
    
    return (
        <div className={modal}>
            <div className="modal-overlay" onClick={_removeModalWindow}>
                <div className="modal-window" data-window>
                    <div className="modal-header">
                        <span className="modal-title">Описание товара</span>
                        <span className="modal-close" onClick={_removeModalWindow}>&times;</span>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={_removeModalWindow}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default ModalDescriptionWindow;
export { modalDescriptionWindow }