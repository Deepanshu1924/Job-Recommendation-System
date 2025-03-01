import React from 'react'
const Login = (props) => {
  return (
    <div className ="" style={{margin : "20vh"}}>
    <form className="container w-50 p-5 bg-info-subtle rounded-2">
        <label className='p-1' > Username : </label><br />
        <input className='p-1 w-100 rounded-2 border-0 px-3 fs-5' name='username' required type="text" placeholder='Enter the Username'/><br />
        <label className='p-1' > Password : </label><br />
        <input className='p-1 w-100 rounded-2 border-0 px-3 fs-5' required name='password' type="text" placeholder='Enter the password'/><br />
        <label className='p-1' > Confirm Password : </label><br />
        <input className='p-1 w-100 rounded-2 border-0 px-3 fs-5' required name='confirmPassword' type="text" placeholder='Enter the Confirm password'/><br />
        <br />
        <button type='submit' className='btn btn-success w-100 fs-4' onClick={props.lod}>Login</button>
    </form>
    </div>
  )
}

export default Login
