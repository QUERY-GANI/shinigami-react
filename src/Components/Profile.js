import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { formatOptions, userCrud } from "../Util/Utilities"

const Profile = () => {
    const [GlobalState, setGlobalState] = useContext(GlobalContext)

    let id = false
    try {
        id = jwtDecode(localStorage.getItem("token"))._id
    } catch {
        setGlobalState({ type: "logout", payload: null })
    }

    const deleteAccount = event => {
        event.preventDefault()
        Swal.fire({
            text: "Are you sure you want to delete your account?",
            showDenyButton: true,
            icon: "warning",
        }).then(result => {
            if (result.isConfirmed) {
                userCrud("delete", {}, id).then(val => {
                    Swal.fire({ title: "Success delete", text: val.data.message, icon: "success" })
                    setGlobalState({ type: "logout", payload: null })
                }).catch(e => {
                    Swal.fire({ title: "Failed to delete account", text: e.msg, icon: "error" })
                })
            }
        })
    }
    return (
        <div className="flex absolute w-full h-full bg-gray-900 text-gray-50">
            <div className="flex flex-col m-auto justify-between p-5 rounded-md bg-gray-700 w-1/2 h-1/2">
                <div className="self-center font-bold text-xl">
                    <h1>User Profile Page</h1>
                </div>
                <div className="self-center bg-gray-600 p-5">
                    <p className="text-lg font-medium">{ GlobalState.user.email }</p>
                    <p className="text-xs font-thin text-gray-300">{ GlobalState.user._id }</p>
                </div>
                <div className="flex justify-around bg-gray-600 py-5 w-1/2 self-center">
                    <div>
                        <p className="text-sm font-medium">Created at</p>
                        <p className="text-xs font-thin">{ new Date(GlobalState.user.createdAt).toLocaleDateString("id", formatOptions()) }</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-right">Updated at</p>
                        <p className="text-xs font-thin">{ new Date(GlobalState.user.updatedAt).toLocaleDateString("id", formatOptions()) }</p>
                    </div>
                </div>
                <div className="flex justify-around bg-gray-600 py-5">
                    <Link className="bg-indigo-600 rounded p-2 border border-indigo-800" to="/edit">
                        Edit account
                    </Link>
                    { GlobalState.user.role === "ADMIN" && (
                    <Link className="bg-indigo-600 rounded p-2 border border-indigo-800" to="/user">
                        List user
                    </Link>
                    ) }
                    <button className="bg-indigo-600 rounded p-2 border border-indigo-800 focus:outline-none" onClick={deleteAccount}>
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile;
