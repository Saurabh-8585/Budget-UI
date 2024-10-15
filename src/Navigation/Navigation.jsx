import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import SignInPage from '../Pages/Auth/SignIn';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Header from '../Layout/Header';
import CategoryContextProvider from '../Context/CategoryContext';
import { RefreshProvider } from '../Context/RefreshContext';


function Navigation() {
    const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY
    return (
        <>
            <div className='h-screen w-screen flex flex-col'>
                <ClerkProvider
                    publishableKey={PUBLISHABLE_KEY}
                    signInFallbackRedirectUrl="/dashboard"
                    signUpFallbackRedirectUrl="/dashboard"
                >
                    <CategoryContextProvider>
                        <RefreshProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<SignInPage />} />
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <>
                                                <SignedIn>
                                                    <Header />
                                                    <Dashboard />
                                                </SignedIn>

                                                <SignedOut>
                                                    <RedirectToSignIn />
                                                </SignedOut>
                                            </>
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </RefreshProvider>
                    </CategoryContextProvider>
                </ClerkProvider>
            </div>
        </>
    );
}

export default Navigation;