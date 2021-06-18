import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import axios from "axios";
import { formatOptions } from "../Util/Utilities"

const User = () => {
    const [users, setUsers] = useState([])
    const role = ["", "owner", "admin", "member"]
    useEffect(() => {
        axios({
            url: `${env.API_URI}/users`,
            method: "GET",
            headers: {
                "x-apikey": env.API_KEY
            }
        }).then(val => setUsers(val.data.users)).catch(e => setUsers(e.data))
    }, [])
    return (
        <div className="mt-5">
            <p>User page</p>
            { users.map(v => {
                return (
                    <ul key={v._id} className="mt-5 mb-5 mx-auto">
                        <li>id: { v._id }</li>
                        <li>role: { role[v.role] }</li>
                        <li>username: { v.username }</li>
                        <li>email: { v.email }</li>
                        <li>created at: { new Date(v.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                        <li>updated at: { new Date(v.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
                    </ul>
                )
            }) }
        </div>
    )
}

export default User;
