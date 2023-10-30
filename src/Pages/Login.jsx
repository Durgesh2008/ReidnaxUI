import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // navigator

  const navigate = useNavigate();

 
  const onSubmit = async (input) => {
    console.log(input)
    try {
    
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/api/v1/auth/login`,
        { username: input.username, password: input.password }
      );
      const data = await res.data;
  
      if (data.success) {
        localStorage.setItem("auth",JSON.stringify(data));
        navigate('/analytics')
       
       
      } else {
       
       alert("error in login")
      }
    } catch (err) {
     console.log(err)
    }
  };

 
useEffect(()=>{
  const success=JSON.parse(localStorage.getItem('auth'))?.success;
  if(success){
    navigate('/analytics')
  }
},[])

  return (
    <>
      <section className="bg-[#D4F3F6] h-screen flex  flex-col justify-center ">
        <h1 className=" font-roboto mx-auto mb-3 text-lg font-semibold text-[#05494F] ">
          Sign In
        </h1>
        <div className=" mx-auto w-full max-w-md rounded-lg bg-white p-7 drop-shadow-lg dark:bg-neutral-700">
          <form onSubmit={handleSubmit(onSubmit)}>
  
            {/* <!--Email input--> */}
            <div className="relative mb-7">
              <input
                type="text"
                {...register("username", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {errors.username && (
                <p className="text-[#d95454] font-roboto text-[10px]">
                  {" "}
                  username is required.
                </p>
              )}
              <label className="peer-focus:font-medium absolute font-poppins text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Username
              </label>
            </div>

            <div className="relative mb-7">
              <input
                type="password"
                {...register("password", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {errors.password && (
                <p className="text-[#d95454] font-roboto text-[10px]">
                  {" "}
                  Password is required.
                </p>
              )}
              <label className="peer-focus:font-medium absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>

            {/* <!--Submit button--> */}
            <div className="w-full mx-auto ">
             
              <button
                  type="submit"
                  className="inline-block w-full text-center bg-[#19A5B1] font-inter  rounded  px-6 py-2 mt-5 mb-4 text-xs md:text-base font-medium capitalize leading-normal text-white  hover:shadow-btn__shadow   duration-500 ease-in transform active:scale-75 transition-transform"
                >
                  Login
                </button>
            </div>
            <div className="flex items-center justify-center font-inter ">
              <span className="text-base font-normal">
              New user?
              </span>
              <Link
                to={"/"}
                className="font-poppins font-semibold text-[#05494F] text-[12px]  "
              >
               Sign Up
              </Link>
            </div>
          </form>
        </div>
     
      </section>
    </>
  );
};

export default Login;
