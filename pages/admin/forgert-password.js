import Head from 'next/head'
import { useRouter } from 'next/router';
import React,{useState} from 'react'
import { toast } from 'react-toastify';

function forgetPassword(props) {

  const [email, setEmail] = useState('')
  const router=useRouter();
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handlerSendingEmail = async (e) => {
    e.preventDefault();
   
      if(email===""){
        toast.warn("Email is required!")
      }else{
        if(!isValidEmail(email)){
          toast.error("Please enter valid email!")
        }else{
          try {
            const response = await fetch(`/api/auth/admin/forgetpassword`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
          
            if (response.ok) {
              
              toast('Send email from your device!');
              router.push('/admin/login');
            } else {
              // Handle login error
              console.error('Failed sending email!');
              toast.error("Failed sending email and your not exsit account!");
            }
          } catch (error) {
            console.error('An error occurred during login:', error);
            toast.error('Check internet your divice')
          }
      }
    }
  }



  return (
    <>
    <Head>
        <title>Admin | Forget Password</title>
      </Head>
    <section className={`text-gray-${props.mode==='light'?900:100} my-24 mb-72 body-font`}>
  <div className="container px-5 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-3">Admin Forget Password</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base"> Admin Email address associated with your account. Enter the email address you used to forget Password</p>
    </div>
    <div className="flex lg:w-1/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
      <div className="relative flex-grow w-full">
        <label htmlFor="email" className="leading-7 text-sm">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <button onClick={handlerSendingEmail} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Email→</button>
    </div>
  </div>
</section>
    </>
  )
}

export default forgetPassword