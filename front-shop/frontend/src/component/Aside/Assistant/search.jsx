import axios from "axios"

export default function Exp(searchElement, setFn, url) {
    const filterUsers = (searchText, list) => {
        if (!searchText) {
            return list
        }
        return list.filter(({ name }) => {
            return name.toLowerCase().includes(searchText.toLowerCase())
        })
    }
    const Timeout = setTimeout(() => {
            axios
                .get(url)
                .then(data => {
                    const filteredUsers = filterUsers(searchElement, data.data)
                    setFn(filteredUsers)
                })
                .catch(data => {
                    console.log(data)
                })
    }, 400)

    return () => clearTimeout(Timeout)
}