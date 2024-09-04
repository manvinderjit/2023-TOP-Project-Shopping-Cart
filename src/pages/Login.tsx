import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/api/apiSlice";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../application/reduxHooks";
import { setCredentials } from "../features/auth/authSlice";
import { addToastAlert, removeToastAlert } from "../features/toast/toastSlice";
import { nanoid } from "@reduxjs/toolkit";
import { ThemeContext } from "../contexts/ThemeContext";

const isEmailValidRegEx:RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Login = ():React.JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { themeClasses } = useContext(ThemeContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');  
  const [inputUserEmailError, setInputUserEmailError] = useState<boolean>(false);
  const [inputUserEmailErrorMsg, setInputUserEmailErrorMsg] = useState<string>('');
  const [inputUserPasswordError, setInputUserPasswordError] = useState<boolean>(false);

  const [loginUser, {
    data: loginData,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
  }] = useLoginUserMutation();

  const checkIsEmailValid = (email:string): void => {
    if (!email.match(isEmailValidRegEx)) {
      setInputUserEmailError(true);
      setInputUserEmailErrorMsg(email.trim() === '' ? '' : 'Email must be in a valid format!');
    } else {
      setInputUserEmailError(false);
    }
  }
  
  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name === "userEmail") {
      setInputUserEmailError(false);
      setInputUserEmailErrorMsg("");
      setUserEmail(e.currentTarget.value);
      checkIsEmailValid(e.currentTarget.value);
    }
    if (e.currentTarget.name === "userPassword") {
      setInputUserPasswordError(false);
      setUserPassword(e.currentTarget.value);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (userEmail.trim() === "") {
      setInputUserEmailError(true);
      setInputUserEmailErrorMsg("Email can't be empty");
    }
    if (userPassword.trim() === "") setInputUserPasswordError(true);

    if (
      userEmail &&
      userPassword &&
      !inputUserEmailError &&
      !inputUserPasswordError
    ) {
      await loginUser({ userEmail, userPassword });
    }
  };

  useEffect(() => {
    if(isLoginSuccess) {
      const toastId = nanoid();
      dispatch(setCredentials({ username: userEmail, accessToken: loginData.token }));
      dispatch(addToastAlert({ toastId, toastTextContent:'Login Successful!', toastType:'success' }));
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      setTimeout(() => {
        dispatch(removeToastAlert(toastId));
      }, 3000);
    }
  })

  const content: React.JSX.Element = (
    <section id="section-login" className="h-full flex-grow flex">
      <div className="w-full min-h-full flex flex-col justify-center ">
        <div className="mb-4">
          <h2
            className={`text-center text-2xl font-bold ${themeClasses.textClass}`}
          >
            Log in To Your Account
          </h2>
        </div>
        <div className="flex justify-center mb-4">
          {isLoginError === true ? (
            <p className=" text-red-400">{`Error! ${loginError?.data?.error}`}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="min-w-72 mx-auto sm:w-full max-w-sm">
          <form className="flex flex-col gap-2" action="">
            <div>
              <label
                htmlFor="userEmail"
                className={`block text-sm font-medium ${themeClasses.textClass}`}
              >
                Email Address
              </label>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                onChange={handleOnInputChange}
                required
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
              />
              <span
                className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}
              >
                {inputUserEmailError ? inputUserEmailErrorMsg : ""}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="userPassword"
                  className={`block text-sm font-medium leading-6 ${themeClasses.textClass}`}
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className={`font-semibold ${themeClasses.textHighlightedClass} ${themeClasses.textHoveredClass}`}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  required
                  onChange={handleOnInputChange}
                  className={`mt-2 block w-full rounded-md border-0 p-1.5  shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
                />
                <span
                  className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}
                >
                  {inputUserPasswordError ? "Password can't be empty!" : ""}
                </span>
              </div>
            </div>
            <div className="flex flex-col  mt-4">
              <button
                type="button"
                onClick={handleLogin}
                className={`flex w-full justify-center rounded-md ${themeClasses.primaryBgClass} ${themeClasses.primaryBgHoveredClass} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm ">
            <span
              className={`mr-2 h-6  ${themeClasses.textClass}`}
            >
              Not a member?
            </span>
            <Link
              to="/register"
              className={`font-semibold ${themeClasses.textHighlightedClass} ${themeClasses.textHoveredClass}`}
            >
              Sign Up Now!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );

  return content;
}

export default Login;
