import axios from "axios"
import { Appbar } from "../Compo/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = function(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate()
    return(
        <div>
            <Appbar/>

            <div className="flex justify-center p-5 px-10">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-4 text-lg"placeholder="Search (title)"/>
            </div>

            <Textarea onChange={(e) => {
                setContent(e.target.value)
            }}/>

            <div className="pl-10">
                <button  
                    onClick={async () => {
            
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content,
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    });
                        navigate(`/blogs/${response.data.id}`); // Redirect using ID
                    }}  
                    type="submit" 
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish Blogs
                </button>
            </div>
        </div>
       
    )
}

function Textarea({ onChange } : { onChange: (e : ChangeEvent<HTMLTextAreaElement>) => void }){
    return(
        <div className="p-2 px-10">
            <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2 bg-white rounded-b-lg ">
                        <textarea onChange={onChange} id="editor" rows="10" className="block w-full px-0 text-sm text-gray-800 bg-white focus:border-blue-200" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}