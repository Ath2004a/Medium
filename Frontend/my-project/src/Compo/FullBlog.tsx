import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { AvatarAppBar } from "./AvatarAppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = function({ blogs } : { blogs: Blog }){
    return(
        <div>

            <Appbar/>

            <div className="flex justify-center pt-4">
                <div className="grid grid-cols-12 w-full pt-10 max-w-screen-2xl px-10">
                
                    <div className="col-span-8">
                        <div className="text-5xl font-bold">
                            {blogs.title}
                        </div>

                        <div className="text-stone-400 font-bold text-sm pt-3   ">
                        Posted on 2nd Dec 2024
                        </div>

                        <div className="pt-3">
                            {blogs.content}
                        </div>
                    </div>

                    <div className="col-span-4 pl-10">

                        <div className="text-base font-bold text-gray-500">
                            Author :-
                        </div>
                        
                        <div className="flex pt-2">
                            <div className="flex justify-center flex-col ">
                                <AvatarAppBar name={blogs.Users.name}/>
                            </div>

                           <div className="pl-3">
                                <div className="text-xl font-bold">
                                    {blogs.Users.name}
                                </div>

                                <div className="pt-2">
                                    Unleashing Imagination, One Page at a Time or how about Ink Dreams: Turning Thoughts into Timeless Tales?
                                </div>
                           </div>
                        </div>

                       
                    </div>
                </div>
            </div>

        </div>
    )
}