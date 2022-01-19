import React, { useState } from "react";

const EditUserForm = (props) => {    
    const[user,setUser] = useState(props.currentUser);

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setUser({...user,[name]:value});
    }

    return(
        <form onSubmit={ (event) => {
            event.preventDefault()
            props.updatedUser(user.id,user)
        }}>
            <label>
                Name
                <input type="text" name="name" value={user.name} onChange={handleInputChange}/>
            </label>
            <label>
                User Name
                <input type="text" name="username" value={user.username} onChange={handleInputChange}/>
            </label>
            <button>Update User</button>
        </form>
    );

}

export default EditUserForm;