import axios from "axios";
import  { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  


  const onSubmit = async (input) => {
    const userInput = {
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
   
    };
  try {
    await axios.post(`${process.env.REACT_APP_HOST}/api/v1/auth/register`,userInput);
    navigate('/login')
  } catch (error) {
    console.log(error)
  }
  };

  useEffect(()=>{
    const success=JSON.parse(localStorage.getItem('auth'))?.success;
    if(success){
      navigate('/analytics')
    }
     // eslint-disable-next-line
  },[])
  

  return (
    <>
      <section className="bg-[#D4F3F6] h-screen flex  flex-col justify-center ">
        <h1 className=" font-roboto mx-auto mb-3 text-lg font-semibold text-[#05494F] ">
          Sign Up
        </h1>
        <div className=" mx-auto w-full max-w-md rounded-lg bg-white p-7 drop-shadow-lg dark:bg-neutral-700">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                {...register("name", { required: true })}
                className="block py-2.5 font-poppins px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
                 {errors.name && <p className="text-[#d95454] font-roboto text-[10px]"> name is required.</p>}
              <label className="peer-focus:font-medium font-poppins absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                {...register("email", { required: true })}
                className="block py-2.5 font-poppins px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
                 {errors.email && <p className="text-[#d95454] font-roboto text-[10px]"> email is required.</p>}
              <label className="peer-focus:font-medium font-poppins absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                {...register("phone", { required: true })}
                className="block py-2.5 font-poppins px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
                 {errors.phone && <p className="text-[#d95454] font-roboto text-[10px]"> phone No is required.</p>}
              <label className="peer-focus:font-medium font-poppins absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone No
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                {...register("password", { required: true })}
                className="block py-2.5 font-poppins px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
                 {errors.password && <p className="text-[#d95454] font-roboto text-[10px]"> password is required.</p>}
              <label className="peer-focus:font-medium font-poppins absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
       
       

            <button
                type="submit"
                className="inline-block w-full bg-[#19A5B1] font-inter  rounded  px-6 py-2 mt-5 mb-4 text-xs md:text-base font-medium capitalize leading-normal text-white  hover:shadow-btn__shadow   duration-500 ease-in  transform active:scale-75 transition-transform"
              >
                Sign up
              </button>
            <div className="flex items-center justify-center font-inter ">
              <span className="text-base font-normal">
                Already have account?
              </span>
              <Link
                to={"/login"}
                className="font-poppins font-semibold text-[#05494F] text-[12px]  "
              >
                Login here
              </Link>
            </div>
          </form>
          <p>{}</p>
        </div>
       
      </section>
    </>
  );
};

export default Register;