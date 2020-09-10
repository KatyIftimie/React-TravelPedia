import React, { useState, useForm } from 'react'
import axios from 'axios';

export default function AddRental() {

    const { addRental, handleSubmit } = useForm({});
    const [addMsj, setAddMsj] = useState("");

    const onSubmit = (rental) {

        axios.post(LOGIN_API, user)
            .then((res) => {
                if (res.status === 200) {
                    setAddMsj(res.data);
                })
            .catch((err) => {
                setAddMsj(err.response.data);
            });



        return (
            <div className="container">
                <form onSubmit={(e) => e.preventDefault}>
                    <label>Email: </label>
                    <input
                        type="text"
                        name="email"
                        ref={register({
                            required: true,
                        })}
                        placeholder="Email"
                    />
                </form>
            </div>
        )
    }
