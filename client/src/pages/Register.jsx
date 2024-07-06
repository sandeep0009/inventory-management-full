import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { z } from 'zod';
import { Button } from 'primereact/button';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../queries/Auth.query';
const Register = () => {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser,registerUserResponse]=useRegisterUserMutation();
  const navigate=useNavigate();

  const formValidation = z.object({
    name:z.string(),
    email: z.string().email("invalid email address"),
    password: z.string().min(8, "minimum length of password to be 8").max(20, "max length of password to be 20")
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      formValidation.parse(formData);
      const {data,error}=await registerUser(formData);
      if(error){
        console.log(error.data.message);
        return
      }

      localStorage.setItem('token',data.userObject.token);
      navigate('/');
     
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.reduce((acc, cur) => {
          acc[cur.path[0]] = cur.message;
          return acc;
        }, {});
        setError(errorMessage);
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-[#eee]'>
      <div className="w-[96%]md:w-[70%] lg:w-1/3 shadow-md rounded-md py-10 px-4 bg-white">
        <form onSubmit={handleSubmit} >
        <div className="mb-5 py-1">
            <label htmlFor="name">Name</label>
            <InputText
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              unstyled
              className='w-full outline-none py-3 px-2 border-[.1px] border-zinc-400 rounded-md'
              placeholder='Enter your name'
            />
            {error.name && <span className='text-red-500'>{error.name}</span>}
          </div>
          <div className="mb-5 py-1">
            <label htmlFor="email">Email</label>
            <InputText
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              unstyled
              className='w-full outline-none py-3 px-2 border-[.1px] border-zinc-400 rounded-md'
              placeholder='Enter your email'
            />
            {error.email && <span className='text-red-500'>{error.email}</span>}
          </div>

          <div className="mb-3 py-1">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <InputText
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                unstyled
                className='w-full outline-none py-3 px-2 border-[.1px] border-zinc-400 rounded-md pr-10'
                placeholder='****'
              />
              <Button
                type="button"
                icon={showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                onClick={handleShowPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-button-text p-button-plain"
                aria-label="Show password"
              />
            </div>
            {error.password && <span className='text-red-500'>{error.password}</span>}
          </div>

          <Button type='submit' className='w-full bg-blue-500 text-white py-3 px-2 flex items-center justify-center'>Submit</Button>
        </form>
        <div className="mb-3 py-1 flex justify-end">
          <p className='inline-flex items-center gap-1'>Already have Account?<Link to={'/login'} className='font-bold text-blue-700'>Register</Link></p>

        </div>
      </div>
    </div>
  );
}

export default Register;
