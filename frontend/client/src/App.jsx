import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import NotFoundPage from './pages/NotFoundPage'
import LoadingSpinner from "./component/LoadingSpinner"
import DashboardPage from "./pages/DashboardPage"
import { Routes, Route } from "react-router-dom"
import FloatingShape from './component/FloatingShape'
import { Toaster } from "react-hot-toast"
import { useAuthStore } from './store/authStore'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
const { isAuthenticated, user } = useAuthStore();
if(!isAuthenticated){
  return <Navigate to="/login" replace/>
}
if(!user.isVerified){
  return <Navigate to="/verify-email" replace/>
}
return children;
}
//redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace/>
  }
  return children
}
const RedirectUnknownRoute = () => {
  return  <Navigate to="/" replace/>
}
function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
checkAuth();
  }, [checkAuth])
  if(isCheckingAuth) {
    return <LoadingSpinner />
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape 
      color="bg-green-500"
      size="w-64 h-64"
      top="-5%"
      left="10%"
      delay={0}
      />
      <FloatingShape 
      color="bg-green-500"
      size="w-48 h-48"
      top="-5%"
      left="10%"
      delay={0}
      />
      <FloatingShape 
      color="bg-green-500"
      size="w-32 h-32"
      top="-5%"
      left="10%"
      delay={0}
      />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }/>
        <Route 
        path="/signup" 
        element={
      <RedirectAuthenticatedUser>
       <SignUpPage />
      </RedirectAuthenticatedUser>
    }/>
        <Route path="/login" element={
      <RedirectAuthenticatedUser>
       <LoginPage />
      </RedirectAuthenticatedUser>
        }/>
        <Route path="/verify-email" element={<EmailVerificationPage />}/>
                <Route path="/forgot-password" element={
                  <RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                  </RedirectAuthenticatedUser>
}/>
<Route
path='/reset-password/:token'
element={
  <RedirectAuthenticatedUser>
    <ResetPasswordPage />
  </RedirectAuthenticatedUser>
}
>
</Route>
{/* Catch all routes */}
<Route
path='*'
element={
  <RedirectUnknownRoute />
}
>

</Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
