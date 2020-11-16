import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from '../header/header';
import './priceGuide.scss'

export const PriceGuide = () => {

    const [priceDetails, setPriceDetails] = useState(null);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/vi/priceDetails");
        setPriceDetails(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const loadPriceDetails = () => {
        return (
            <div className="peng-table">
                <table>
                    <th className="peng-th">Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    {priceDetails && priceDetails.map((detail, index) => {
                        return (
                            <tr>
                                <td>{detail.productName}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.quantityPrice.toFixed(2)}</td>
                            </tr>
                        )
                    })}

                </table>
            </div>
        )
    }

    return (
        <>
            <Header></Header>
            {loadPriceDetails()}
        </>
    )
}

export default PriceGuide;