import { useState } from "react";


let modalMessageOpen = ''
const ModalMessageWindow = () => {
    const [modal, setModal] = useState('modal_2')
    let closeable = false

    const _createModalWindow = () => {
        if (closeable) {
            return console.log("modal window destroy")
        } else {
            setModal("modal_2")
            removeOverflow()
            setTimeout(() => {
                setModal("modal_2_open")
            }, 0)
        }
    }
    modalMessageOpen = _createModalWindow

    const _removeModalWindow = () => {
        setModal("modal_2_hide")
        closeable = true
        setTimeout(() => {
            setModal("modal_2")
            addOverflow()
            closeable = false
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
        <div className={modal} data-modal>
            <div className="modal_overlay" onClick={() => {
                _removeModalWindow()
            }}>
                <div className="modal_window">
                    <div className="modal_header">
                        <span className="modal_title">Товар успешно удален</span>
                        <span className="modal_close" onClick={() => {
                            _removeModalWindow()
                        }}>&times;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default ModalMessageWindow;
export { modalMessageOpen }