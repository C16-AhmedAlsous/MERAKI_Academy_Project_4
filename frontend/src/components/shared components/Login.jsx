import React from 'react'

const Login = () => {
  return (
    <div>
        <input type="text" placeholder='email'onChange={(e) => {
          setFirstName(e.target.value);
        }}/>
        <input type="text" placeholder='password'/>
    </div>
  )
}

export default Login