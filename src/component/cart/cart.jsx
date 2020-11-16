import React, { useState, useEffect } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Header from '../header/header';
import { useHistory } from 'react-router-dom';

export const Cart = () => {

    const history = useHistory();

    const [products, setProducts] = useState(null);
    const [bill, setBill] = useState(0);
    const [pamount, setPamount] = useState(0);


    const fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/vi/products");
        setProducts(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const calculatePrice = async (prodId, amount) => {
         await axios.post('http://localhost:8080/api/vi/order', {
            id: uuidv4(),
            purchaseList: {
                [prodId]: {amount}
            }
        })
        .then(response => setBill(bill + response.data.price));
    }

    const onAdd = (prodId, amount) => {
        calculatePrice(prodId, amount);
        console.log("Bill: "+bill)
    }

    const onValueChanged = (e) => {
        setPamount(e.target.value);
    }

    const onPricingListBtnClick = () => {
        history.push({
            pathname: `pricingList`
        });
    }

    const loadProducts = () => {
        return(<div>
            {products && products.map((product) => {
            return (<div>
                <div className={product.id} key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Carton Price: {product.cartonPrice}</p>
                    <p>Units per carton: {product.unitsPerCarton}</p>
                </div>
                <input className={product.id+"input"} placeholder="No of units" type="number" id="Number of units" min={1} onChange={onValueChanged}></input>
                <button className={product.id+"btn"} onClick={onAdd(product.id, pamount)}>Add</button>
            </div>)
            })}
        </div>)
    }

    return (<>
        <div>
            <Header></Header>
            {loadProducts()}
            <br/>
            <button>Calculate Bill</button>
            <button onClick={onPricingListBtnClick}>Go to pricing details</button>
        </div>
    </>)
}

export default Cart;