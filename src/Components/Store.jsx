import React, { useState, useEffect } from "react";
import Axios from "axios"
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Pagination from "./Pagination";

function Store(props){
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [fil, setFil] = useState([])
    const [totalpages, setTotalpages] = useState([])
    const navigate = useNavigate()

    function api(){
            Axios.get("https://api.jikan.moe/v4/top/anime?"+props.url).then(
            (respond) => {
                setData(respond.data.data)
                for(let i=1;i<=respond.data.pagination.last_visible_page/5;i++){
                    let obj = {
                        page: i
                    }
                    setTotalpages(totalpages => [...totalpages, obj])
                }
            }
        )
    }

    useEffect(() => {
        api()
    },[])    
    
    function type(event){
        setName(event.target.value)
    }

    function click(event){
        // const filters = data.filter(f => f.titles[0].title === name)
        // setFil(filters)
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

    return(
        <form onSubmit={click}>
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
            </div>
            <div>
                {totalpages.slice(0,20).map(m => <Pagination page={m.page}/>)}
            </div>
        </form>
    )
}

export default Store