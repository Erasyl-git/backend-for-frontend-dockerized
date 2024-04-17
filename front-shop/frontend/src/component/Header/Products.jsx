import React from "react";
import { useAlert } from "../../examples/Alert/AlertComponent";
import { Link } from "react-router-dom"
import { TbBread } from "react-icons/tb";
import { LuMilk, LuCupSoda } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { PiHandSoapBold } from "react-icons/pi";




export default function Products() {
        const search = useAlert()
        return (
                <ul className="products-table" onClick={() => {
                        search.setSearchItem('')
                        search.setTextInput('')
                }}>
                        <Link to="/drinks">
                                <li className="icon soda">
                                        <LuCupSoda className="product soda-icon"/>
                                        <p>Напитки</p>
                                </li>
                        </Link>
                        <Link to="/faster-food">
                                <li className="icon food">
                                        <MdOutlineFoodBank className="product food-icon"/>
                                        <p>Полуфабрикаты</p>
                                </li>
                        </Link>
                        <Link to="/fast-food">
                                <li className="icon fast">
                                        <IoFastFoodOutline className="product fastfood-icon"/>
                                        <p>Быстрая еда</p>
                                </li>
                        </Link>
                        <Link to="/milks">
                                <li className="icon milk">
                                        <LuMilk className="product milk-icon"/>
                                        <p>Молочные продукты</p>
                                </li>
                        </Link>
                        <Link to="/fruitpage-vegetable">
                                <li className="icon fruit">
                                        <GiFruitBowl className="product fruit-icon"/>
                                        <p>Овощи и фрукты</p>
                                </li>
                        </Link>
                        <Link to="/bread-product">
                                <li className="icon bread">
                                        <TbBread className="product bread-icon"/>
                                        <p>Мучные продукты</p>
                                </li>
                        </Link>
                        <Link to="home-product">
                                <li className="icon home">
                                        <PiHandSoapBold className="product home-icon"/>
                                        <p>Хоз. товары</p>
                                </li>
                        </Link>
                </ul>
        )
    }