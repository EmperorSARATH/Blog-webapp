import React, { useEffect, useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import  "../style.scss";
import axios from 'axios';
// const posts = [
//     {
//         id:1,
//         title:"Lorem ipsum bla blah",
//         desc:"Lorem ipsum bla blah",
//         img:"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=sph"
    
//     },
//     {
//         id:2,
//         title:"Lorem ipsum bla blah",
//         desc:"Lorem ipsum bla blah",
//         img:"https://cdn.sanity.io/images/tlr8oxjg/production/5c3120359be5c4f225cd7b817811217041b759ab-1192x668.png?w=3840&q=80&fit=clip&auto=format"
    
//     },
//     {
//         id:3,
//         title:"Lorem ipsum bla blah",
//         desc:"Lorem ipsum bla blah",
//         img:"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=sph"
    
//     },
//     {
//         id:4,
//         title:"Lorem ipsum bla blah",
//         desc:"Lorem ipsum bla blah",
//         img:"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=sph"
    
//     },
// ]
const Home =  () =>{

    const [posts, setPosts] = useState([]);

    const cat = useLocation().search

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }



    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`/api/posts${cat}`)
                setPosts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[cat]);


    return (
        <div className='home'>
            <div className='posts'>
            {posts.map((post)=>{
                return (
                <div className='post' key={post.id}>
                    <div className="img" alt="">
                        <img src={`../upload/${post.img}`} alt=""/>                       
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        </Link>
                        <p>{getText(post.desc.slice(0,200))}...</p>
                        <button>Read more</button>
                    </div>
                </div>

                )
            })}

            </div>

        </div>
    )
}
export default Home;