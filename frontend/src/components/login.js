

import React from 'react';



const Login =()=>{
    return(
        <div>
            <h2>Login</h2>
    
                <form className=''>
                    <div class="mb-3 row">
                         <label class="col-sm-2">Username:</label>
                         <div class="col-sm-3">
                                    <input type="text"  required />        
                         </div>
                       
                    </div>
                     <div class="mb-3 row">
                         <label class="col-sm-2">Password:</label>
                          <div class="col-sm-3">
<input type="password" required />
                          </div>
                        
                    </div>
                     <div class="mb-3 row">
                                <button class="col-sm-1 btn btn-primary" type="submit">Login</button>
                     </div>
                   
                </form>
                
        </div>
    )
}

export default Login;