interface authorName{
    name: string,
}

export const AvatarAppBar = function({name} : authorName){
    return(
        <div>
            <div className="relative inline-flex items-center justify-center w-9 h-9  overflow-hidden bg-slate-700 rounded-full">
             <span className="font-medium text-lg text-white ">{name[0]}</span>
            </div>
        </div>
    )
}