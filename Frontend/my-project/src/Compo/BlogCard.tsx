    import { Link } from "react-router-dom"

interface BlogCardInputs{
    id: string
    authorName: string
    title: string,
    content: string,
    publishDate: string,
}


export const BlogCard = function({ authorName, title, content, publishDate ,id } : BlogCardInputs){

    return (
        <Link to={`/blog/${id}`}>
            <div className="p-3 pt-4 border-b border-gray-200 pb-2">
                <div className="font-light font-bold flex">

                    <div className="flex justify-center flex-col pr-2">
                        <Avatar name={ authorName } />
                    </div>

                    <div className="text-black flex justify-center flex-col">
                        {authorName}
                    </div>    
                    
                    <div className="pl-1 flex justify-center flex-col">
                        .
                    </div>

                    <div className="pl-1 text-gray-500 flex justify-center flex-col">
                        {publishDate}
                    </div>

                </div>

                <div className="font-semibold text-2xl pt-2 cursor-pointer hover:underline">
                    {title}
                </div>

                <div className="font-light text-md">
                    {content.slice(0, 200) + '...'}
                </div>

                <div className="text-stone-500 text-xs pt-4">
                    {`${Math.ceil(content.length / 100)} minutes ago`}
                </div>
            </div>
        </Link>
    )
}

interface avatarInput{
    name: string,
}

export function Avatar({ name }: avatarInput)
{
    return(
        <div>
            <div className="relative inline-flex items-center justify-center w-6 h-6  overflow-hidden bg-slate-700 rounded-full">
             <span className="font-medium text-xs text-white ">{name[0]}</span>
            </div>
        </div>
    )
}