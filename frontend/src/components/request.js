import React,{ useState } from 'react';
import Register from './register';

function Request() {
    const [message, setMessage] = useState('');
   const [formData, setFormData] = useState({
        date: '',
        steps: '',
        sleeptime: '',
        waterintake: ''
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
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
                    date: formData.date,
                    steps: formData.steps,
                    sleeptime: formData.sleeptime,
                    waterintake: formData.waterintake,
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
               <h3 class="">Welcome to Health and Wellness </h3>
            
             <form onSubmit={handleSubmit}>
                <div class="mb-3 row">
                    <label class="col-sm-2">Date:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
             
                <div class="mb-3 row">
                    <label class="col-sm-2">Step Covered:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="text"
                            name="steps"
                            value={formData.steps}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div class="mb-3 row">
                    <label class="col-sm-2">Sleeping HR's:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="text"
                            name="sleeptime"
                            value={formData.sleeptime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div class="mb-3 row">
                    <label class="col-sm-2">Water Consumed:</label>
                    <div class="col-sm-3">
                        <input
                            class="form-control"
                            type="text"
                            name="waterintake"
                            value={formData.waterintake}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div class="mb-3 row">
                    <button type="submit" class="col-sm-1 btn btn-primary">Submit</button>
                </div>
           </form>
        </div>
    );
}       

export default Request;