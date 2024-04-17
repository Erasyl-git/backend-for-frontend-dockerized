import { useAlert } from "./Alert/AlertComponent";

const Test = () => {
    const alert = useAlert()

    return (
        <div>
            <h1>Практика в использовании Context</h1>
            <button onClick={() => alert.show('Этот текс премиком из Test.jsx')} className="btn btn-success m-2">Показать alert</button>
            <button onClick={() => alert.hide()} className="btn btn-danger">Скрыть alert</button>
        </div>
    )
}
 
export default Test;