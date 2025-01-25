import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    content: string,
    title: string,
    id: string,
    Users: {
        name: string
    }
}

export const useBlogs = function()
{
    const [loading, setLoading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([])

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log("API Response:", response.data);
                setblogs(response.data.data); // Fallback to an empty array
                setLoading(false);
            })
    }, []);
    
    return{
        loading, 
        blogs,
    }
}


export const useBlog = function({ id } : { id: string })
{
    const [loading, setLoading] = useState(true);
    const [blog, setblog] = useState<Blog>()

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log("API Response:", response.data);
                setblog(response.data.data); // Fallback to an empty array
                setLoading(false);
            })
    }, [id]);
    
    return{
        loading, 
        blog,
    }
}