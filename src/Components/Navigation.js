import React, { useContext } from "react";
import env from "react-dotenv";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";

const Navigation = () => {
    const [GlobalState, setGlobalState] = useContext(GlobalContext)
    const logoutHandler = (element) => {
        element.preventDefault()
        Swal.fire({
            text: "Are you sure to logout?",
            showDenyButton: true,
            icon: "question",
        }).then(result => {
            if (result.isConfirmed) {
                setGlobalState({ type: "logout", payload: null })
            }
        })
    }
    return (
        <div className="flex justify-between p-5 bg-red-400">
            <div>
                <h1 className="md:font-bold font-semibold text-gray-900 lg:text-xl md:text-lg text-xs">{ env.APP_NAME }</h1>
            </div>
            <div className="flex items-center justify-around text-gray-700 lg:text-lg md:text-sm text-xs">
                <NavLink to="/" exact={true} className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Home</NavLink>
                {(!GlobalState.user || !GlobalState.token || !GlobalState.isLoggedIn) && (
                    <>
                        <NavLink to="/login" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">
                            Register
                        </NavLink>
                    </>
                )}

                {(GlobalState.user && GlobalState.token && GlobalState.isLoggedIn) && (
                    <>
                        <NavLink to="/profile" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">
                            Profile
                        </NavLink>
                        <NavLink to="/features" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">
                            Features
                        </NavLink>
                        <button className="lg:px-2.5 px-1 hover:text-gray-800 focus:outline-none" onClick={logoutHandler}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navigation;
