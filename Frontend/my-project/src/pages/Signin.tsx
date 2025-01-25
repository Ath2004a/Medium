import { Quotes } from "../Compo/Quotes"
import { Auth } from "../Compo/Auth"

export const Signin = function(){
    return(
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth type="signin"/>
                </div>

                <div className="hidden lg:block">
                    <Quotes />
                </div>
            </div>
        </div>
    )
}