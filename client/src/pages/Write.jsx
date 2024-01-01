import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React,{useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
const Write =  () =>{

    const state = useLocation().state

    const navigate = useNavigate();

    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');




    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

      const handleChange= (html)=> {
        setValue(html);
    }

    const upload = async ()=>{
        try{
            const formData = new FormData();

            formData.append("file",file);
            const res = await axios.post("/api/upload",formData);
            return res.data;

        }catch(err){
            console.log(err)

        }
    }

    const handleClick = async e =>{
        e.preventDefault()
       const imgUrl =  await upload()

       try{
        state ? await axios.put(`/api/posts/${state.id}`,{
            title,
            desc:value,
            cat,
            img:file ? imgUrl : "",
        })
        : await axios.post(`/api/posts`,{
            title,
            desc:value,
            cat,
            img:file ? imgUrl : "",
            date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")


        });

        navigate("/")


       }catch(err){
        console.log(err)
       }
    }

    return (
        <div className='add'>
            <div className="content">
                <input type="text" value={getText(title)} placeholder='title'  onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                <ReactQuill className='editor' theme="snow" value={value} onChange={handleChange} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                       <b>Status</b> Draft 
                    </span>


                    <input 
                    type="file"
                    id="file"
                    name=""
                    
                    onChange={(e)=>setFile(e.target.files[0]) } 
                    />
                    

                    <div className="buttons">
                    <button>Save as a draft</button>
                    <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <input type='radio' checked={cat==="art"} name='cat' value="art" id="art" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor='art'>Art</label>
                    <input type='radio' checked={cat==="tech"} name='cat' value="tech" id="tech" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor='tech'>tech</label>
                    <input type='radio' checked={cat==="sports"} name='cat' value="sports" id="sports" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor='sports'>sports</label>
                    <input type='radio' checked={cat==="food"} name='cat' value="food" id="food" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor='food'>food</label>

                </div>
            </div>
        </div>
    )
}

export default Write;