import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function UserPage(props){

    const initialUserState = {
        user:{},
        loading:true
    }

    const[user,setUser] =useState(initialUserState);

    useEffect( () =>{
            const getUser = async() => {

            const {data} = await axios('https://api.github.com/users/itasworkshop');
            setUser(data);
            console.log(user);
            }        
            getUser()
    },[]);

    return user.loading ? (
        <h1>Loading...</h1>

    ) 
    :(
        <div className="container">
            <h1>{user.id} Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Bio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.bio}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}