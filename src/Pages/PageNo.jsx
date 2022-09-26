import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import Axios from "axios";
import Loading from "../Components/Loading";

function PageNo(){
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [totalpages, setTotalpages] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [p, setP] = useState(location.state.Page)
    console.log(location.state)
    
    function api(){
        Axios.get("https://api.jikan.moe/v4/top/anime?page="+p).then(
        (respond) => {
            setData(respond.data.data)
            for(let i=1;i<=respond.data.pagination.last_visible_page/5;i++){
                let obj = {
                    page: i
                }
                setTotalpages(totalpages => [...totalpages, obj])
            }
        })
    }
    useEffect(() => {
        api()
    },[])

    function type(event){
        setName(event.target.value)
    }

    function click(event){
        if(name!==""){
            navigate("/search",{
                state:{
                    Name: name,
                    }
                })
            setName("")
            event.preventDefault()   
        }
    }

    function pageRefresh(){
            api()
    }

    return(
        <div>
            <div>
                {/* On clicking "Anime" You get redirected to the main page */}
                <div className="heading" style={{color:"white"}}>
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
            </div>
            <div className="area">
            {data.length!==0?data.map(m => <Card key={m.mal_id} source={m.trailer.embed_url} season={m.season} background={m.background} rating={m.rating} status={m.status} type={m.type} 
            episodes={m.episodes} year={m.aired.prop.from.year} id={m.mal_id} synopsis={m.synopsis} name={m.title} 
            image={m.images.jpg.image_url}/>):<Loading/>}
            </div>
            <h5 onChange={pageRefresh}>{location.state.Page}</h5>
        </div>
    )
}

export default PageNo