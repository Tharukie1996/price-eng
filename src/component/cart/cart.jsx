import React, { useState, useEffect } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Header from '../header/header';
import { useHistory } from 'react-router-dom';
import './cart.scss'

export const Cart = () => {

    const history = useHistory();

    const [products, setProducts] = useState(null);
    const [bill, setBill] = useState(0);
    const [pamount, setPamount] = useState(0);
    const [productId, setProuductId] = useState(null);
    const [prevPId, setPrevPId] = useState(null);
    const [prevAmount, setPrevAmount] = useState(null);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/vi/products");
        setProducts(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const calculatePrice = async (prodId, amount, prevId, prevAmount) => {
        await axios.post('http://localhost:8080/api/vi/order', {
            id: uuidv4(),
            purchaseList: {
                [prodId]: amount,
                [prevId]: prevAmount
            }
        })
            .then(response => setBill(response.data.price));
        console.log("BILL: " + bill)
    }

    const onCalcBtn = () => {
        calculatePrice(productId, pamount, prevPId, prevAmount);
        console.log("Bill: " + bill);
    }

    const onValueChanged = (e, prodid) => {
        if (prevPId === null || prevPId === prodid) {
            setPrevPId(prodid);
            setPrevAmount(e.target.value);
        }
        else {
            setPamount(e.target.value);
            setProuductId(prodid);
        }
    }

    const onPricingListBtnClick = () => {
        history.push({
            pathname: `pricingList`
        });
    }

    const loadProducts = () => {
        return (<div>
            {products && products.map((product) => {
                return (<div key={product.id}>
                    <div className={product.id}>
                        <h2>{product.name}</h2>
                        <p>Carton Price: {product.cartonPrice}</p>
                        <p>Units per carton: {product.unitsPerCarton}</p>
                    </div>
                    <input className={product.id + "input"} placeholder="No of units" type="number" id="Number of units" min={1} onChange={(e) => { onValueChanged(e, product.id) }}></input>
                </div>)
            })}
        </div>)
    }

    return (<>
        <div>
            <Header></Header>
            {loadProducts()}
            <br />
            <button onClick={onCalcBtn}>Calculate Bill</button>
            <button onClick={onPricingListBtnClick}>Go to pricing details</button>
            <br />
            <p>Your Bill is: {bill}</p>
            <p className="peng-info">*You will receive a 10% discount when buying 3 or more cartons.</p>
        </div>
    </>)
}

export default Cart;