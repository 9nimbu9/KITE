import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Card from "../Components/Card";
import Loading from "../Components/Loading";

function Search(){
    const location = useLocation()
    const navigate = useNavigate()
    const [fil, setFil] = useState([])
    const [name, setName] = useState(location.state.Name)

    function api(){
        Axios.get("https://api.jikan.moe/v4/anime?letter="+name).then(
        (respond) => {
            setFil(respond.data.data)
            setName("")
        })
    }
    useEffect(() => {
        api()
    },[]) 
    
    function type(event){
        setName(event.target.value)
    }

    function click(){
        if(name!==""){
            api()
            navigate("/search",{
                state:{
                    Name: name,
                }
            })
        }
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
            <div className="area">
                {fil.length!==0?fil.map(m => <Card season={m.season} source={m.trailer.embed_url} background={m.background} key={m.mal_id} id={m.mal_id} rating={m.rating} status={m.status} type={m.type} episodes={m.episodes} year={m.aired.prop.from.year} synopsis={m.synopsis} name={m.title} image={m.images.jpg.image_url}/>):
                <Loading img={name}/>}
            </div> 
        </div>
    )
}

export default Search