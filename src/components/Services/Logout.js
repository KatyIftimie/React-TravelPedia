import React from 'react'
import { Redirect } from "react-router";

export default function Logout() {
    sessionStorage.clear();

    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}
