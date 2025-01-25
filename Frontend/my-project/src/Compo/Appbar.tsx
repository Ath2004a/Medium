import { Link } from "react-router-dom";
import { AvatarAppBar } from "./AvatarAppBar";

export const Appbar = function () {
    return (
        <div className="border-b flex justify-between px-10 py-4 w-full items-center">

            {/* Left Section: Logo */}
            <div className="flex items-center">
                <Link to={'/blogs'}>
                    <div className="text-2xl font-bold text-gray-800 cursor-pointer">
                        Medium
                    </div>
                </Link>
            </div>

            {/* Right Section: Button and Avatar */}
            <div className="flex items-center space-x-4">
                <Link to={"/publish"}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        New
                    </button>
                </Link>
                
                <AvatarAppBar name={"Atharv"} />
            </div>
        </div>
    );
};
