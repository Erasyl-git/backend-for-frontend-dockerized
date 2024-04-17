import React, { useEffect, useState } from "react";
import axios from "axios";



export default function Practics() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/catalog/category/food/product/?format=json')
          .then((data) => {
            setArticles(data.data)
          })
    }, [])

    return (
        <div>
            {articles.map(article => {
                return (
                    <div key={article.id}>
                        <img src={article.img} height="500px" width="500px" alt="NETU FOTO" />
                    </div>
                )
            })}
        </div>
    )
}