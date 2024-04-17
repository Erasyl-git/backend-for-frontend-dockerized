import React from "react";
import { Component } from './examples/Alert/AlertComponent';
import Layout from "./component/Layout/Layout";
import Main from "./component/Main/Main";
import Drinks from "./component/Aside/MainAside/Catalog/Drinks";
import Milkpage from "./component/Aside/MainAside/Catalog/Milkpage";
import Fruitpage from "./component/Aside/MainAside/Catalog/Fruitpage";
import FastFood from "./component/Aside/MainAside/Catalog/FastFood";
import Bread from "./component/Aside/MainAside/Catalog/BreadProduct";
import FasterFood from "./component/Aside/MainAside/Catalog/FasterFood";
import HomeProduct from "./component/Aside/MainAside/Catalog/HomeProduct";
import Profile from "./component/Aside/MainAside/Navigation/Profile";
import LogIn from "./component/Aside/Assistant/Registration/Login";
import SignIn from "./component/Aside/Assistant/Registration/Signin";
import Update from "./component/Aside/Assistant/Registration/Update";
import Basket from "./component/Aside/MainAside/Navigation/Basket";
import Notfoundpage from "./component/Aside/MainAside/Navigation/Notfoundpage";
import { Routes, Route } from "react-router-dom";
import './css/style.css';


export default function App() {
    return (
        <Component>
            <Routes>
                <Route path="" element={<Layout/>}>
                    <Route index element={<Main />}/>
                    <Route path="/drinks" element={<Drinks/>} />
                    <Route path="/milks" element={<Milkpage/>} />
                    <Route path="/fruitpage-vegetable" element={<Fruitpage/>} />
                    <Route path="/fast-food" element={<FastFood />} />
                    <Route path="/bread-product" element={<Bread/>} />
                    <Route path="/faster-food" element={<FasterFood/>} />
                    <Route path="/home-product" element={<HomeProduct/>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/signin" element={<SignIn />} />
                    <Route path="/profile/login" element={<LogIn />} />
                    <Route path="/profile/update" element={<Update />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="*" element={<Notfoundpage />} />
                </Route>
            </Routes>
        </Component>
        
    )
}