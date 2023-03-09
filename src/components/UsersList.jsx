import React from 'react'
import axios from 'axios'

const UsersList = ({user,getAllUsers, setUsersEditInfo, setShow}) => {

    const deleteUser = (id) =>{
        const url =`https://users-crud-api-production.up.railway.app/api/v1/users/${id}`
        axios.delete(url,id)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }
    const editUser = () =>{
        setUsersEditInfo(user)
    }
  return (
    <article className='user_card'>
        <div className='user_info'>
            <h3 className='user_name'>{user["firstName"]} {user["lastName"]} </h3>
            <span>Email</span>
            <h4 className='user_email'>{user.email}</h4>
            <span>Phone</span>
            <h4 className='user_email'>{user.phone}</h4>
            <span>Birthday</span>
            <h3 className='user_birthday'>{user.birthday}</h3>
        </div>

        <div className="user_btns">
            <button className='user_btn red' onClick={()=>deleteUser(user.id)}><i className='bx bx-trash'></i></button>
            <button className='user_btn' onClick={()=>{editUser();setShow(true)}}><i className='bx bx-edit-alt' ></i></button>
        </div>
    </article>
  )
}

export default UsersList