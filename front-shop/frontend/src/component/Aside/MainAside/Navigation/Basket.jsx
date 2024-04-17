import React from "react";
import Cart from "./Cart";



export default function Basket() { 
    return (
        <>
            <section className="section-cart">
                <div className="section-cart__header">
                    <div className="header__container">
                        <h1 className="title-1">Корзина товаров</h1>
                    </div>
                </div>
                <div className="section-cart__body">
                    <div className="body__container">

                        <Cart />

                    </div>
                </div>
            </section>
        </>
    )
}