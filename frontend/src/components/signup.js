import React,{ useState } from 'react';
import Register from './register';

function Signup() {
    const [role,setRole]=useState('');

    const handleRole=(e)=>{
        setRole(e.target.value);
        console.log(e.target.value);
    }
    return (    
        <div>
               <h3 class="">Welcome to Health and Wellness </h3>
            
            <div class="mb-3 row">
                <span class="col-sm-2"> Doctor <input onClick={handleRole} class="col-sm-1" type="radio" name="wellnes" value="PROVIDER" /> </span>
                 <span class="col-sm-2"> Patient<input onClick={handleRole} class="col-sm-1" type="radio" name="wellnes" value="PATIENT" /> </span>

            </div>
            <Register role={role} />
        </div>
    );
}       

export default Signup;