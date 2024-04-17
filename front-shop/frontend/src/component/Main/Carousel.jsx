import React, { Children, cloneElement, useEffect, useState } from "react"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"

const PAGE_WIDTH = 87

export default function Carousel({children}) {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const arrowClickLeft = () => {
        setOffset((current) => {
            const newOffset = current + PAGE_WIDTH
            return Math.min(newOffset, 0)
        })
    }
    const arrowClickRight = () => {
        setOffset((current) => {
            const newOffset = current - PAGE_WIDTH
            const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
            return Math.max(newOffset, maxOffset)
        })
    }
    useEffect(() => {
        setPages(
            Children.map(children, child => {
                return cloneElement(child, {
                    style: {
                        height: '100%',
                        minWidth: `${PAGE_WIDTH}rem`,
                        maxWidth: `${PAGE_WIDTH}rem`
                    }
                })
            })
        )
    }, [])
    return (
        <div className="main-container">
            <FaChevronLeft className="arrow" onClick={arrowClickLeft} />
            <div className="window">
                <div className="all-pages-container" style={{
                    transform: `translateX(${offset}rem)`,
                    transition: 'all ease .5s'
                }}>
                    {pages}
                </div>
            </div>
            <FaChevronRight className="arrow" onClick={arrowClickRight} />
        </div>
    )
}