import React, { useEffect, useState } from "react";
import UserInfoManager from '../../Services/RailsApi/UserInfoManager';
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';

export const EditUserPresentation = () => {
    const userId = useSelector(state => state.user.id);
    console.log(userId)
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [description, setDescription] = useState("");
    const [github_link, setGithub_Link] = useState("");

    const getUserDetail = async() => {
        const detail = await UserInfoManager.getDetails(userId)
        console.log(detail)
        setFirst_Name(detail.data.first_name)
        setLast_Name(detail.data.last_name)
        setDescription(detail.data.description)
        setGithub_Link(detail.data.github_link)
    }

    useEffect (() => {
        getUserDetail()
    }, []);

    const history = useHistory();

    const updateUserDetails = async (e) => {
        e.preventDefault();
        const response = await UserInfoManager.updateDetails(userId, first_name, last_name, description, github_link);
        Promise.resolve(response)
        history.push(`/user/dashboard`)
    };

    return (
        <div>
            <h3>Modifier ma présentation</h3>
            <div>
                <form>
                    <label>
                        Prénom
                        <input
                        type="text"
                        value={first_name? first_name : ""}
                        onChange={(e)=>setFirst_Name(e.target.value)}
                        />
                    </label>
                    <label>
                        Nom
                        <input
                        type="text"
                        value={last_name? last_name : ""}
                        onChange={(e)=>setLast_Name(e.target.value)}
                        />
                    </label>
                    <label>
                        Description
                        <input
                        type="text"
                        value={description? description : ""}
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Lien GitHub
                        <input
                        type="text"
                        value={github_link? github_link : ""}
                        onChange={(e)=>setGithub_Link(e.target.value)}
                        />
                    </label>
                    <button onClick={updateUserDetails}>sauvegarder</button>
                </form>
            </div>
        </div>
    );

};