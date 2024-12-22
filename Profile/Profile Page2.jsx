import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default ({ loggedIn }) => {
    useEffects(()) => {}, []};

    const { uid } = useParams();

    return {
        <div>
            {uid} - {loggedIn}
        </div>
    }