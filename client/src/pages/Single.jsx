import React, { useContext, useEffect, useState } from 'react';
import Delete from "../images/delete.png";
import Edit from "../images/edit.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from '../components/Menu';
import axios from 'axios';
import moment from "moment";
import { AuthContext } from '../context/authContext';
import DOMPurify from "dompurify";

const Single =  () =>{

    const [post, setPost] = useState([]);

    const location = useLocation()

    const navigate = useNavigate()

    const postId = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser);


    const handleDelete = async ()=>{
        try{
            await axios.delete(`/api/posts/${postId}`)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`/api/posts/${postId}`)
                setPost(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[postId]);



    return (
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="" />
                    <div className="info">
                        <span>{post?.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>

                   {
                    currentUser.username === post.username && (
                        <div className="edit">
                        <Link to={`/write?edit=2`} state={post}>
                        <img src={Edit} alt="" />
                        </Link>
                        <img onClick={handleDelete} src={Delete} alt="" />
                    </div>
                        )
                   } 
                </div>
                <h1>{post?.title}</h1>
             
                <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>  

            </div>
            <div className="menu"><Menu cat={post.cat}/></div>
           
        </div>
    )
}

export default Single;
