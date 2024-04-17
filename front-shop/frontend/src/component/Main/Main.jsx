import React from "react";
import Carousel from "./Carousel";
import Household from "./Household";
import Stock from "./Stock";

export default class Main extends React.Component {
    render() {
        return (
            <>
                <main>
                    <div className="carousel">
                        <Carousel>
                            <div className="item item-1"></div>
                            <div className="item item-2"></div>
                            <div className="item item-3"></div>
                        </Carousel>
                    </div>
                    <div>
                        <Household />
                    </div>
                    <div>
                        <Stock />
                    </div>
                </main>
            </>
        )
    }
}