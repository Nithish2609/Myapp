import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";

const Noodles = (props) => {
    const [noodles,setNoodles] = useState([]);
    useEffect(() => {
        axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json").then(res => {
            setNoodles(res.data);
        })
        .catch(err => console.error(err));
    },[]);
    const columns= ['Brand','Variety','Style','Country','Stars','Top Ten']
    console.log(noodles)
    return (
        <React.Fragment>
            <p>Hello</p>
        {/* <table>
            {columns.map(col => {
            return (
                <>
                <th>{col}</th>
                {
                    noodles?.map((noodle,i )=> {
                    return  (<td key={i+'d'}>{noodle[col]}</td>)})
            // return <td key={i+'d'}>{noodle.name}</td>
            // return <p key={i}>{noodle.name}</p>
                }
                </>
            )})}
        </table> */}
        </React.Fragment>

    );
};

export default Noodles;