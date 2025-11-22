import React, { useState } from 'react';

function Register({ role }) {


    
const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', 
        age: '',
        weight: '', 
        bp: '',
        exp: '',
        specialization: '',
        role: role   
    });

    const handleChange = (e) => {
       
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: role,
                    age: formData.age,
                    weight: formData.weight,
                    bp: formData.bp,
                    exp: formData.exp,
                    specialization: formData.specialization,
                 }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Registration successful!');
            } else {
                setMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } 
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div class="mb-3 row">
                    <label class="col-sm-2">Name:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>




                <div class="mb-3 row">
                    <label class="col-sm-2">Email:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-2">Password:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="password"
                            name="password"

                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                {role === 'PATIENT' && (
                    <div>
                        <div class="mb-3 row">
                            <label class="col-sm-2">Age:</label>
                            <div class="col-sm-3">
                                <input
                                    class="form-control"
                                    name='age'
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2">weight:</label>
                            <div class="col-sm-3">
                                <input
                                    class="form-control"
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2">BP:</label>
                            <div class="col-sm-3">
                                <input
                                    class="form-control"
                                    name='bp'
                                    type="number"
                                    value={formData.bp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                )}
                {role === 'PROVIDER' && (
                    <>

                        <div class="mb-3 row">
                            <label class="col-sm-2">Experinece:</label>
                            <div class="col-sm-3">
                                <input
                                    class="form-control"
                                    type="number"
                                    name='exp'
                                    value={formData.exp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2">Specialisation:</label>
                            <div class="col-sm-3">
                                <input
                                    class="form-control"
                                    type="text"
                                    value={formData.stream}
                                    name = "specialization"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}


                <div class="mb-3 row">
                    <button type="submit" class="col-sm-1 btn btn-primary">Submit</button>
                </div>


            </form>
            <div class="alert alert-info" role="alert">
                     {message && <p>{message}</p>}
            </div>
           
        </div>
    );
}

export default Register;