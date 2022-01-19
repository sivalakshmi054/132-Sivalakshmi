import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
//CRUD application using React Hooks

const App = () =>{
  const userData = [
    {id:101,name:"Rajesh",username:'rajesh121'},
    {id:102,name:"Raj",username:'raj121'},
    {id:103,name:"Suraj",username:'suraj121'}
  ];

  const[users,setUsers] = useState(userData);

  const addUser = (user) => {
    user.id = users.length+101
    setUsers([...users,user]);
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id!==id ));
  }

  const[editing,setEditing] = useState(false);

  const initialFormState = {id:null,name:'',username:''};

  const[currentUser,setCurrentUser] = useState(initialFormState);

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({id:user.id,name:user.name,username:user.username});
  }

  const updatedUser = (id,updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => user.id === id ? updatedUser:user))
  }

  return(
    <div className="container">
      <h1>CRUD Application- My-App</h1>
      <div className='flex-row'>
        <div className='flex-large'>
          { editing ? (
            <div>
              <h2>Edit User</h2>
              <EditUserForm setEditing={setEditing} currentUser={currentUser} updatedUser={updatedUser}/> 
            </div>
          ):(
            <div>
              <h2>Add User</h2>
              <AddUserForm adduser={addUser}/> 
            </div> 
          )}      
        </div>
        <div className='flex-large'>
          <h2>View Users Data: </h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
        </div>
      </div>
    </div>
  );

}

export default App;