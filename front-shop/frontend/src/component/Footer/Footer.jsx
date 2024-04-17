import React from "react";
import Table from "./Table";
import { FaTelegramPlane, FaInstagram, FaYoutube, FaCcMastercard, FaCcVisa, FaCcPaypal } from "react-icons/fa";


export default class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
                <footer>
                    <Table /> 
                    <div className="main-messanger">
                        <p>Мы в соц.сетях</p>
                        <div className="messanger-block">
                            <span>
                                <FaTelegramPlane className="telegram"/>
                            </span>
                            <span>
                                <a href="https://www.instagram.com/_geobbels_me262_/" target="_blank" rel="noreferrer"><FaInstagram className="instagram"/></a>
                            </span>
                            <span>
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer"><FaYoutube className="youtube"/></a>
                            </span>
                        </div>
                        <div className="phone-number">
                            <p className="number">+7 775 623 79 22</p>
                            <span className="text">Справочная служба</span>
                        </div>
                    </div>
                </footer>
                <div className="block_footer">
                    <div className="market_name">
                        <div>
                            <h1>KHAN</h1>
                            <p>© 2024 Любое использование контента без письменного разрешения запрещено</p>
                        </div>
                    </div>
                    <div className="cards">
                        <div>
                            <span>
                                <FaCcMastercard className="mastercard"/>
                            </span>
                            <span>
                                <FaCcVisa className="visa"/>
                            </span>
                            <span>
                                <FaCcPaypal className="paypal"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}