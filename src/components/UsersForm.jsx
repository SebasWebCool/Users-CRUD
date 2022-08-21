import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const UsersForm = ({ getAllUsers, usersEditInfo, setShow, show }) => {

    const defaultValues = {
        email: ``,
        password: ``,
        first_name: ``,
        last_name: ``,
        birthday: ``
    }

    const createUser = (data) => {
        const url = `https://users-crud1.herokuapp.com/users/`
        axios.post(url, data)
            .then(
                res => {
                    console.log(res.data)
                    getAllUsers()
                }
            )
            .catch(err => console.log(err))
    }


    useEffect(() => {
        reset(usersEditInfo)
    }, [usersEditInfo])

    const editUserInfo = (data) => {
        const url = `https://users-crud1.herokuapp.com/users/${usersEditInfo.id}/`
        axios.patch(url, data)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }
    const { register, handleSubmit, reset } = useForm()

    const submit = (data) => {
        // console.log(data);
        if (usersEditInfo) {
            editUserInfo(data)
        } else {
            createUser(data)
            reset(defaultValues)
        }
         setShow(false)
    }

    const closeForm = () => {
        setShow(false)
        reset(defaultValues)
    }

    return (
        <div className={show ? 'form_cont': `none`} >

            <form className='form_users' action="" onSubmit={handleSubmit(submit)}>
                <h2>New User</h2>
                <div className='form_inf'>
                    <label htmlFor="email"><i className='bx bx-envelope' ></i></label>
                    <input {...register("email")} type="text" id='email' placeholder='email' />

                </div>

                <div className='form_inf'>
                    <label htmlFor="password"><i className='bx bxs-lock' ></i></label>
                    <input {...register("password")} type="password" id='password' placeholder='password' />

                </div>

                <div className='form_inf3'>
                    <label htmlFor="first_name"><i className='bx bxs-user' ></i></label>
                    <input {...register("first_name")} type="text" id='first_name' placeholder='first name' />

                    <label htmlFor="last_name"></label>
                    <input {...register("last_name")} type="text" id='last_name' placeholder='last name' />
                </div>

                <div className='form_inf'>
                    <label htmlFor="birthday"><i className='bx bx-cake'></i></label>
                    <input {...register("birthday")} type="date" id='birthday' />

                </div>
                <button className='form_btn'>Create</button>
                <button onClick={closeForm} className='btn_x'><i className='bx bx-x-circle'></i></button>
            </form>
        </div>
    )
}

export default UsersForm