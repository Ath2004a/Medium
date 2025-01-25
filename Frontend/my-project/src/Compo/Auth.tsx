import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInputs } from "@asc2812/medium-common"
import axios  from 'axios'
import { BACKEND_URL } from "../config"

export const Auth = function({ type } : { type: "signin" | "signup" })
{
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInputs>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest()
    {   try
        {
            const res =await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = res.data;
            localStorage.setItem("token", jwt);
            navigate("/blog")
        }
        catch(e)
        {
            alert("Yoo!!!!")
        }
    }



    return(
        <div className="h-screen flex items-center justify-center">
            <div>
                <div>
                    <div className="text-4xl font-bold px-10">
                        Create an account
                    </div>

                    <div className="text-gray-500 pt-2 text-center text-lg">
                        {type === "signin" ? "Don't have a account" : "Already have an account?"}   

                        <Link to={type === "signin" ? "/signup" :  "/signin"} className="underline decoration-blue-900 pl-2">{type === "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>

                    {type === "signup" ? <UsernameInput label="Username" placeholder="Username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value,
                        })
                    }}/> : null }  

                    <UsernameInput label="Email" placeholder="Example@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}/>

                    
                    <UsernameInput label="Password" type={"password"} placeholder="Password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}/>

                    <div className="pt-5">
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                    </div>

                </div>
            </div>
        </div> 
    )
}

interface usernameInputstype{
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void
}

function UsernameInput({ label, placeholder, onChange , type } : usernameInputstype)
{
    return(
        <div>
            <div>
            <label className="block mb-2 text-lg font-medium text-black-900 pt-5">{label}</label>
            <input  onChange={onChange}  type={type} id="first_name" className="bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
        </div>
    )
}
