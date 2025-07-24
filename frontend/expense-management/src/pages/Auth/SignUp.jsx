import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    // Basic validation
    if (!fullname || !email || !password || !confirmPassword) {
      seterror("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      seterror("Please enter a valid email.");
      return;
    }

    if (password.length < 8) {
      seterror("Password must be at least of 8 characters.");
      return;
    }

    if(password !== confirmPassword){
      seterror("Password do not match");
      return;
    }

    // Clear error and proceed
    seterror("");

    //SignUp API call
  };

  //handle sign up Form Submit
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Start your journey to smarter spending!
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        <Input
        value={fullname}
        onChange={({ target }) => setFullName(target.value)}
        label="Full Name"
        placeholder="John Watson"
        type="text"
        />

        <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="john@example.com"
        type="text"
        />

<div className='col-span-2'>
        <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"
        />

        <Input
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
        label=" Confirm Password"
        placeholder="Confirm your password"
        type="password"
        />
        </div>
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        
                <button type="submit" className='btn-primary'>
                  SIGNUP
                </button>
        
                <p className='text-[13px] text-slate-800 mt-3'>
                  Already have an account?{" "}
                  <Link className="font-medium text-purple-500 underline" to="/login">
                  Login
                  </Link>
                </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp