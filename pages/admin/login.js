import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


export default function Login(props) {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


//   // Handle form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!email || !password) {
//       toast.error('Please fill in both email and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       // Call login API here (Example: axios.post('/api/login', { email, password }))
//       // For the sake of this demo, we'll simulate a successful login with a timeout.
//       const response = await axios.post('/api/admin/login', { email, password });
//       console.log(response);
//       if(response.status === 200){
//         toast.success('Login successful!');
//         router.push('/admin/home'); // Redirect to the dashboard or main page
//       }else{
//         toast.error('Login failed!');
//       }     
//       setLoading(false);


//       setTimeout(() => {
//         // Assume successful login
//         toast.success('Login successful!');
//         router.push('/admin/home'); // Redirect to the dashboard or main page
//         setLoading(false);
//       }, 1500);
//     } catch (error) {
//       setLoading(false);
//       toast.error('Failed to login. Please try again.');
//     }
//   };

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

const handleLogin = async (e) => {
    e.preventDefault();
    if(email==="" && password===""){
     toast.warn("Email and password is required!")
    }else{
      if(email===""){
        toast.warn("Email is required!")
      }else if(password===""){
        toast.warn("Password is required!")
      }else{
        if(isValidEmail(email)){
        try {
          const response = await fetch(`/api/auth/admin/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const json =await response.json();
          if (response.ok) {
            // Handle successful login
            toast.success('Login successfully!');
            localStorage.setItem('adminToken',json.authtoken);
            // localStorage.setItem('adminName',json.adminName);
            localStorage.setItem('adminEmail',json.adminEmail);
            router.push('/admin');
          } else {
            // Handle login error
            console.error('Login failed!');
            toast.error("Login failed correct email and password!");
          }
        } catch (error) {
          console.error('An error occurred during login:', error);
          toast.error('Check internet your divice!')
        }
      }else{
        toast.error("Please enter valid email!")

      }
      }

  }
}


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
         {/* The Navbar and Footer bar is Hide   */}
         <style jsx global>{`
           nav {
            display: none;
           }
            footer {
            display: none;
           }
            text-color :#000000;
          
           
   `}</style>
      <div className="bg-white text-black p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1   border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Forgot Password Link
          <div className="text-center">
            <a href="/admin/forgert-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          {/* Sign Up Link (optional) *
          <div className="text-center mt-4">
            <p className="text-sm">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a></p>
          </div> */}
        </form>
      </div>
    </div>
  );
}
