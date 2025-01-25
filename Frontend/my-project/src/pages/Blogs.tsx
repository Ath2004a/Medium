import { Appbar } from "../Compo/Appbar"
import { BlogCard } from "../Compo/BlogCard"
import { Skeleton } from "../Compo/Skeleton"
import { useBlogs } from "../hooks"

export const Blogs = function()
{
    const {loading, blogs} = useBlogs()

    if(loading)
    {
        return <div>
            <Appbar/>

            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </div>
        </div>
    }

    return(
        <div>

            <div>
                <Appbar/>
            </div>

            <div className="flex justify-center">

            <div className="w-full max-w-3xl">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id} 
                        id={blog.id}
                        authorName={blog.Users?.name || "Author"}
                        title={blog.title || "No Title"}
                        content={blog.content || "No Content"}
                        publishDate={"1/19/2025"}
                    />
                ))}

            </div>

            </div>
        </div>
        
    )
}