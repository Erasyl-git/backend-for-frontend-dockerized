import React, { useState, useRef } from "react";
import Products from "./Products";
import { useAlert } from "../../examples/Alert/AlertComponent";
import { Link } from "react-router-dom"
import { FiMenu, FiSearch } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbBread } from "react-icons/tb";
import { LuMilk, LuCupSoda } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { PiHandSoapBold } from "react-icons/pi";
import { MdOutlineDomainVerification } from "react-icons/md";


// { searchItem, setSearchItem }

export default function Header() {
    // Данные для бургер меню
    const [stateButton, setStateButton] = useState(false) 
    const [burger_class, setBurgerClass] = useState('menu_icon') 
    const [menu_class, setMenuClass] = useState('menu hidden') 
    const [opacity, setOpacity] = useState('opacity_block hidden') 
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    
    // Ссылки на DOM элементы
    const searchInput = useRef(null)
    

    // Данные для поиска по сайту
    const search = useAlert()

    // Функции для удаление и добавление скролла
    function disabledScroll() {
        document.body.style.cssText = `
            overflow: hidden;
        `
    }

    function enabledScroll() {
        document.body.style.cssText = `
            overflow: auto;
        `
    }

    return (
        <header>
            <div className="header_div">
                <span className="title">
                    <h1>KHAN</h1>
                </span>
                <span className={burger_class} onClick={() => {
                    if (!isMenuClicked) {
                        setStateButton(true)
                        setBurgerClass('menu_icon')
                        setMenuClass('menu visible')
                        setOpacity('opacity_block visible')
                        disabledScroll()
                    } else {
                        setStateButton(false)
                        setBurgerClass('menu_icon')
                        setMenuClass('menu hidden')
                        setOpacity('opacity_block hidden')
                        enabledScroll()
                    }
                        setIsMenuClicked(!isMenuClicked)
                }}>
                    {stateButton ? <IoCloseOutline className="icon_menu"/> : <FiMenu className="icon_menu"/>}
                </span>
                <div>
                    <form onSubmit={(e) => {
                        const inputText = searchInput.current.value
                        const inputTextNew = search.searchItem = inputText
                        e.preventDefault()
                        if (inputTextNew.length > 0) {
                            search.setSearchItem(inputTextNew)
                        } else if (inputTextNew.length === 0) {
                            search.setSearchItem('')
                        }
                    }}>
                        <div className="search_control_block">
                            <input ref={searchInput} className="search-input" type="text"  placeholder="Поиск" autoFocus autoComplete="off" value={search.textInput} onKeyUp={(event) => {
                                const enter = event.key === 'Enter'
                                if (enter) {
                                    search.setSearchItem(event.target.value)
                                    event.preventDefault()
                                }
                            }} onChange={e => search.setTextInput(e.target.value)}/>
                            <button className="btn-search"><FiSearch className="search-icon"/></button>
                        </div>
                    </form>
                </div>
                <ul className="table" onClick={() => {
                    search.setSearchItem('')
                    search.setTextInput('')
                }}>
                    <Link to="">
                        <li>
                            <MdOutlineDomainVerification className="home-icon"/>
                            <p>Главная</p>
                        </li>
                    </Link>
                    <Link to="/profile">
                        <li>
                            <CgProfile className="profile-icon"/>
                            <p>Профиль</p>
                        </li>
                    </Link>
                    <Link to="/basket">
                        <li>
                            <SlBasket className="basket-icon"/>
                            <p>Корзина</p>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="child_header_div">
                <div className="products">
                    <Products />
                </div>
            </div>

            <div className={opacity} onClick={() => {
                if (isMenuClicked) {
                    setStateButton(false)
                    setBurgerClass('menu_icon')
                    setMenuClass('menu hidden')
                    setOpacity('opacity_block hidden')
                    enabledScroll()
                }
                    setIsMenuClicked(!isMenuClicked)
            }}>
                <div className={menu_class}>
                    <div className="icons">
                        <ul className="catalog" onClick={() => {
                            search.setSearchItem('')
                            search.setTextInput('')
                        }}>
                            <h1>Каталог</h1>
                            <Link to="/bread-product">
                                <li className="list_icon">
                                    <span>
                                        <TbBread />
                                        <p>Мучные продукты</p>
                                    </span>
                                </li>
                            </Link>
                            <Link to="/milks">
                                <li className="list_icon">
                                    <span>
                                        <LuMilk />
                                        <p>Молочные продукты</p>
                                    </span>
                                </li>
                            </Link>
                            <Link to="/drinks">
                                <li className="list_icon">
                                    <span>
                                        <LuCupSoda />
                                        <p>Напитки</p>
                                    </span>
                                </li>
                            </Link>
                            <Link to="/fast-food">
                                <li className="list_icon">
                                    <span>
                                        <IoFastFoodOutline />
                                        <p>Быстрая еда</p>
                                    </span>
                                </li>
                            </Link>
                            <Link to="/faster-food">
                                <li className="list_icon">
                                    <span>
                                        <MdOutlineFoodBank />
                                        <p>Полуфабрикаты</p>
                                    </span>
                                </li>
                            </Link>
                            <Link to="/fruitpage-vegetable">
                                <li className="list_icon">
                                    <span>
                                        <GiFruitBowl />
                                        <p>Овощи и фрукты</p>
                                    </span>
                                </li>
                            </Link>
                            <Link to="/home-product">
                                <li className="list_icon">
                                    <span>
                                        <PiHandSoapBold />
                                        <p>Хоз. товары</p>
                                    </span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}