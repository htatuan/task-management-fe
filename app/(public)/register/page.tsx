import React from 'react'
import RegisterForm from './form'

const RegisterPage = () => {
  return (
    <div
      className="h-screen flex flex-col  
                    items-center justify-center"
    >
      <p className="text-green-700 text-xl mb-3">Register New Account</p>
      <div className="w-full max-w-xs">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage