// const posts = [
//     {
//         id:1,
//         title:"Lorem ipsum bla blah",
//         desc:"Lorem ipsum bla blah",
//         img:"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=sph"

import axios from "axios";
import { useEffect, useState } from "react";

    
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
const Menu =({cat}) =>{

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/posts/?cat=${cat}`);
          setPosts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [cat]);

    return (
        <div className="menu">
            <h1>Other posts you may like </h1>
            {posts.map(post=>{
                return (
                <div className="post" key={post.id}>
                    <img src={`../upload/${post.img}`}alt=""/>
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                </div>

                )
            })}

        </div>
    )
}

export default Menu;