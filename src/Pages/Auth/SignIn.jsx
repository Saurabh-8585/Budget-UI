import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <SignIn
                signInFallbackRedirectUrl="/dashboard"
                signUpFallbackRedirectUrl="/dashboard"
            />
        </div>
    )
}

export default SignInPage