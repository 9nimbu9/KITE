import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Pagination(props){
    const navigate = useNavigate()

    function pageClick(){
        navigate("/pageNo",{
            state:{
                Page: props.page,
            }
        })
    }

    return(
        <div className="areas">
            <Link
            to="/pageNo"
            state={{
                Page: props.page,
            }}>
            <button className="button" style={{width: "50px"}} onClick={pageClick}>{props.page}</button></Link>
        </div>
    )
}

export default Pagination