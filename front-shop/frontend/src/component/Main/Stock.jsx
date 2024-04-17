import React from "react";


export default class Stock extends React.Component {
    render() {
        return (
            <div className="main-block-stock">
                <div className="block-stock">
                    <h3>Акции</h3>
                    <div className="stocks">
                        <div className="stock stock-1"></div>
                        <div className="stock stock-2"></div>
                        <div className="stock stock-3"></div>
                        <div className="stock stock-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}