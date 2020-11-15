import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Cart = () => {

    const [products, setProducts] = useState(null);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/vi/products");
        setProducts(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const loadProducts = () => {
        return(<div>
            {products && products.map((product, index) => {
            return (<div>
                <div>
                    <h2>{product.name}</h2>
                    <p>Carton Price: {product.cartonPrice}</p>
                    <p>Units per carton: {product.unitsPerCarton}</p>
                </div>
                <input className="" type="number" id="Number of units" min={1}></input>
                <button>Add</button>
            </div>)
            })}
        </div>)
    }

    return (<>
        <div>
            {loadProducts()}
            <br/>
            <button>Calculate Bill</button>
        </div>
    </>)
}

export default Cart;