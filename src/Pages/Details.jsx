import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Details(){
    const location = useLocation()
    const [name, setName] = useState("")
    const navigate = useNavigate()
    console.log(location.state)
    if (location.state.Year===null){
        location.state.Year="Null"
    }
    if (location.state.Type===null){
        location.state.Type="Null"
    }
    if (location.state.Status===null){
        location.state.Status="Null"
    }
    if (location.state.Episodes===null){
        location.state.Episodes="Null"
    }
    if (location.state.Synopsis===null){
        location.state.Synopsis="Null"
    }
    if (location.state.Season===null){
        location.state.Season="Null"
    }
    if (location.state.Background===null){
        location.state.Background="Null"
    }

    function type(event){
        setName(event.target.value)
    }

    function click(event){
        // const filters = data.filter(f => f.titles[0].title === name)
        // setFil(filters)
        navigate("/search",{
            state:{
                Name: name,
                }
            })
        setName("")
    }

    return(
        <div>
            <div className="heading">
                <a href="/" className="title"><img className="title" src="https://cdn-icons-png.flaticon.com/512/5611/5611024.png"/></a>
                <a className="h" href="/"><h1 className="h">Home</h1></a>                        
                <a className="h" href="/movies"><h1 className="h">Movies</h1></a>
                <a className="h" href="/ova"><h1 className="h">OVA</h1></a>
                <a className="h" href="/ona"><h1 className="h">ONA</h1></a>
                <a className="h" href="/special"><h1 className="h">Special</h1></a>
                <input value={name} onChange={type} name="search" type="text" placeholder="Search anime..."/>
                <Link className="link"
                    to="/search"
                    state={{
                        Name: name
                    }}><button className="button" onClick={click}>Search</button></Link>
            </div>
            <div className="a">
                <div className="a1">
                    <img className="detailImg" src={location.state.Image}/>
                </div>
                <div className="a2">
                    <h3>{location.state.Name}</h3>
                    <br></br>
                    <b className="detailMain">Synopsis</b>
                    <p>{location.state.Synopsis}</p>
                    <br></br>
                    <b className="detailMain">Background</b>
                    <p>{location.state.Background}</p>
                    <br></br>
                    <b className="detailMain">Trailer</b>
                    <br></br>
                    <iframe width="92%" height="360" src={location.state.Source} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                    picture-in-picture" allowFullScreen/>
                </div>
                <div className="a3">
                    <p><b className="detailSide">Year:</b> {location.state.Year}</p>
                    <p><b className="detailSide">Type:</b> {location.state.Type}</p>
                    <p><b className="detailSide">Episodes:</b> {location.state.Episodes}</p>
                    <p><b className="detailSide">Status:</b> {location.state.Status}</p>
                    <p><b className="detailSide">Rating:</b> {location.state.Rating}</p>
                    <p><b className="detailSide">Season:</b> {location.state.Season}</p>                    
                </div>
            </div>
        </div>
    )
}

export default Details