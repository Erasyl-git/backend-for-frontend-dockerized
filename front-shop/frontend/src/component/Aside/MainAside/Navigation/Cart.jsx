import { useState, useEffect } from "react";
import axios from "axios";
import CartHeader from "./CartHeader";
import Product from "./Product";
import CartFooter from "./CartFooter";
import ModalMessageWindow from "../../Assistant/Registration/Modal/ModalMessage";
import { modalMessageOpen } from "../../Assistant/Registration/Modal/ModalMessage";



const Cart = () => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState({
        priceTotal: products.reduce((prev, curr) => {
            return prev + curr.total_price
        }, 0),
        count: products.reduce((prev, curr) => {
            return prev + curr.quantity
        }, 0)
    })

    useEffect(() => {
        setTotal({
            priceTotal: products.reduce((prev, curr) => {
                return prev + curr.total_price
            }, 0),
            count: products.reduce((prev, curr) => {
                return prev + curr.quantity
            }, 0)
        })
    }, [products])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000${JSON.parse(localStorage.getItem('cart_url'))}`)
        .then(response => {
            setProducts([response.data])
        })
        .catch(data => {
            console.log(data)
        })
    }, [])

    const changeValueServer = (id, value) => {
            return products.map((product) => {
                if (product.product.id === id) {
                    const fetchUpdate = async () => {
                        const response = await axios.patch(`http://127.0.0.1:8000/cart/update/`, {
                            "user": JSON.parse(localStorage.getItem("username_json")),
                            "product": product.product.id,
                            "quantity": value,
                            "total_price": product.total_price
                        })
                        return response
                    }
                    fetchUpdate()
                }
                return product
            })
    }

    const updateProduct = () => {
            return products.map((product) => {
                if (product) {
                    const fetchUpdate = async () => {
                        const response = await axios.patch(`http://127.0.0.1:8000/cart/update/`, {
                            "user": JSON.parse(localStorage.getItem("username_json")),
                            "product": product.product.slug,
                            "quantity": product.quantity,
                            "total_price": product.total_price
                        })
                        return response
                    }
                    fetchUpdate()
                }
                return product
            })
    }

    const deleteProduct = (id) => {
        setProducts((products) => {
            return products.filter((product) => {
                return id !== product.product.id
            })
        })
    }

    const deleteProductServer = (id) => {
        return products.filter((product) => {
            if (product.product.id === id) {
                axios
                    .delete(`http://127.0.0.1:8000/cart/delete/`, {
                        data: {
                            "username": JSON.parse(localStorage.getItem("username_json")),
                            "product": product.product.slug
                        }
                    })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(data => {
                        console.log(data.data)
                    })
            }
            return product
        })
    }

    const increase = (id) => {
        setProducts((products) => {
            return products.map((product) => {
                if (product.product.id === id) {
                    return {
                        ...product,
                        quantity: ++product.quantity,
                        total_price: product.quantity * +product.product.price
                    }
                }
                return product
            })
        })
    }

    const decrease = (id) => {
        setProducts((products) => {
            return products.map((product) => {
                if (product.product.id === id) {
                    if (product.quantity === 1) {
                        return product 
                    } else if (product.quantity > 1) {
                        return {
                            ...product,
                            quantity: product.quantity - 1 > 1 ? product.quantity - 1 : 1,
                            total_price: (product.quantity - 1 > 1 ? --product.quantity : 1) * +product.product.price
                        }
                    }
                    
                }
                return product
            })
        })
    }

    const changeValue = (id, value) => {
        setProducts((products) => {
            return products.map((product) => {
                if (product.product.id === id) {
                    return {
                        ...product,
                        quantity: value,
                        total_price: value * +product.product.price
                    }
                }
                return product
            })
        })
    }
    
    const datas = products.map((product) => {
        return <Product
            key={product.product.id}
            product={product.product}
            quantity={product.quantity}
            total_price={product.total_price}
            deleteProduct={deleteProduct}
            increase={increase}
            decrease={decrease}
            changeValue={changeValue}
            changeValueServer={changeValueServer}
            deleteProductServer={deleteProductServer}
            modalMessageOpen={modalMessageOpen}
        />
    })

    return (
        <>
            {products.length > 0 ?
                <section className="cart">
                    <CartHeader />
                    {datas}
                    <CartFooter 
                        total={total}
                        updateProduct={updateProduct}
                    />
                </section> : 
                <div>
                    <h3>Корзина пуста</h3>
                </div>
            }
            <ModalMessageWindow />
        </>
    )
}
 
export default Cart;