import { useAlert } from "./AlertComponent" 

const Alert = () => {
    const alert = useAlert()

    if (!alert.visible) return null

    return (
        <div className={"alert alert-danger"} style={{cursor: 'pointer'}} onClick={alert.hide}>
            {alert.text}
        </div>
    )
}
 
export default Alert;