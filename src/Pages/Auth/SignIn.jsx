import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
    return <SignIn
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
    />
}

export default SignInPage