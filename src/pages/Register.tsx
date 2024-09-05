import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../features/api/apiSlice";
import { ThemeContext } from "../contexts/ThemeContext";
import { isApiResponseError } from "../application/helpers";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const PASSWORD_REGEX = /(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

const checkContainsUpperCase = (str: string): boolean => {
  return /A-Z/.test(str);
};

const Register = (): React.JSX.Element => {

  const { themeClasses } = useContext(ThemeContext);

  const [userEmail, setUserEmail] = useState<string>("");
  const [isUserEmailValid, setIsUserEmailValid] = useState<boolean | null>(null);
  const [userEmailErrorMsg, setUserEmailErrorMsg] = useState<string>("");

  const [userPassword, setUserPassword] = useState<string>("");
  const [isUserPasswordValid, setIsUserPasswordValid] = useState<boolean | null>(null);
  const [userPasswordErrorMsg, setUserPasswordErrorMsg] = useState<string>("");
  
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");
  const [isUserConfirmPasswordValid, setIsUserConfirmPasswordValid] = useState<boolean | null>(null);
  const [userConfirmPassErrorMsg, setUserConfirmPassErrorMsg] = useState<string>("");

  const [
    registerUser,
    {
      data: registrationData,
      isSuccess: isRegistrationSuccess,
      isError: isRegistrationError,
      error: registrationError,
    },
  ] = useRegisterUserMutation();

  const validateEmail = (email: string): void => {
    if (!email.match(EMAIL_REGEX)) {
      setIsUserEmailValid(false);
      setUserEmailErrorMsg(
        email.trim() === "" ? "Email can not be empty!" : "Email must be in a valid format!"
      );
    } else if (email.match(EMAIL_REGEX)) {
      setIsUserEmailValid(true);
      setUserEmailErrorMsg("");
    } else {
      setIsUserEmailValid(null);
      setUserEmailErrorMsg("");
    }
  };

  const validatePassword = (passwordValue: string, confirmPasswordValue:string): void => {
    // Reset Error    
    setIsUserPasswordValid(null);
    setUserPasswordErrorMsg("");

    // Check if password is empty
    if(passwordValue.trim() === '') {
      setIsUserPasswordValid(false);
      setUserPasswordErrorMsg('Password can\'t be empty!');
    } // Check if password is invalid
    else if (!passwordValue.match(PASSWORD_REGEX)) { 
      setIsUserPasswordValid(false);
      // Check if password length is at least five
      if (passwordValue.length < 5) {
        setUserPasswordErrorMsg("Password must be atleast 5 characters!");
      } 
      // Check if password has an Uppercase character
      else if (!checkContainsUpperCase(passwordValue)) {
        setUserPasswordErrorMsg("Password must have atleast 1 uppercase char!");
      }
    } 
    // Check if passwords don't match
    else if (passwordValue.match(PASSWORD_REGEX) && passwordValue !== confirmPasswordValue) {
      setIsUserPasswordValid(false);
      setIsUserConfirmPasswordValid(false);
      setUserPasswordErrorMsg('Passwords must match!');
      setUserConfirmPassErrorMsg("Passwords must match!");
    } 
    // Check if passwords are valid and match
    else if (passwordValue.match(PASSWORD_REGEX) && passwordValue === confirmPasswordValue) {
      setIsUserPasswordValid(true);
      setUserPasswordErrorMsg('');
      setUserConfirmPassErrorMsg("");
    }
  }

  const validateConfirmPassword = (passwordValue: string, confirmPasswordValue:string): void => {
    // Reset Errors
    setIsUserConfirmPasswordValid(null);
    setUserConfirmPassErrorMsg("");
    // Check if confirm password is empty
    if (confirmPasswordValue.trim() === "") {
      setIsUserConfirmPasswordValid(false);
      setUserConfirmPassErrorMsg("Confirm Password can't be empty!");
    } else if (passwordValue !== confirmPasswordValue) {
      setIsUserPasswordValid(false);
      setUserConfirmPassErrorMsg("Passwords must match!");
    } 
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "userEmail") {
      setUserEmail(e.currentTarget.value.trim());
      validateEmail(e.currentTarget.value.trim());
    }
    if (e.currentTarget.name === "userPassword") {
      setUserPassword(e.currentTarget.value.trim());
      validatePassword(e.currentTarget.value.trim(), userConfirmPassword);
      validateConfirmPassword(e.currentTarget.value.trim(), userConfirmPassword);
    }
    if (e.currentTarget.name === "confirmPassword") {
      setUserConfirmPassword(e.currentTarget.value.trim());
      validatePassword(userPassword, e.currentTarget.value.trim());
      validateConfirmPassword(userPassword, e.currentTarget.value);
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validateEmail(userEmail);
    validatePassword(userPassword, userConfirmPassword);
    validateConfirmPassword(userPassword, userConfirmPassword);
    if (isUserEmailValid && isUserPasswordValid) {      
      await registerUser({ userEmail, userPassword });
    }
  };

  useEffect(() => {
    if(isRegistrationSuccess) {
      setUserEmail('');
      setIsUserEmailValid(null);
      setUserEmailErrorMsg('');
      setUserPassword('');
      setIsUserPasswordValid(null);
      setUserPasswordErrorMsg("");
      setUserConfirmPassword("");
      setUserConfirmPassErrorMsg("");
      
    }
  }, [isRegistrationSuccess]);

  const content: React.JSX.Element = (
    <section id="section-login" className="h-full flex-grow flex">
      <div className="w-full min-h-full flex flex-col justify-center ">
        <div className="mb-4">
          <h2
            className={`text-center text-2xl font-bold ${themeClasses.textClass}`}
          >
            Sign Up For Our Website
          </h2>
        </div>
        <div className="flex justify-center mb-4">
          {isRegistrationError === true ? (
            <p
              aria-label="Registration Status"
              className=" text-red-400"
            >{`Error! ${
              isApiResponseError(registrationError)
                ? registrationError.data.error
                : JSON.stringify(registrationError)
            }`}</p>
          ) : (
            <></>
          )}
          {isRegistrationSuccess === true ? (
            <p
              aria-label="Registration Status"
              className=" text-emerald-600"
            >{`Success! ${registrationData?.message}`}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="min-w-72 mx-auto sm:w-full max-w-sm">
          <form className="flex flex-col gap-3" action="">
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
                onChange={onInputValueChange}
                value={userEmail}
                required
                className={`mt-2 block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
              />
              <span
                aria-label="Error for User Email"
                className={`flex justify-center pt-1 h-6 text-red-400`}
              >
                {!isUserEmailValid ? userEmailErrorMsg : ""}
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
              </div>
              <div className="mt-2">
                <input
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  onChange={onInputValueChange}
                  required
                  value={userPassword}
                  className={`mt-2 block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
                />
              </div>
              <span
                aria-label="Error for User Password"
                className={`flex justify-center pt-1 h-6 text-red-400`}
              >
                {!isUserPasswordValid ? userPasswordErrorMsg : ""}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="confirmPassword"
                  className={`block text-sm font-medium leading-6 ${themeClasses.textClass}`}
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={onInputValueChange}
                  value={userConfirmPassword}
                  required
                  className={`mt-2 block w-full rounded-md border-0 p-1.5 ${themeClasses.textClass} shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.textClass} ${themeClasses.inputBgClass}`}
                />
              </div>
              <span
                aria-label="Error for User Confirm Password"
                className={`flex justify-center pt-1 h-6 text-red-400`}
              >
                {!isUserConfirmPasswordValid ? userConfirmPassErrorMsg : ""}
              </span>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 ${themeClasses.textClass} shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${themeClasses.primaryBgClass} ${themeClasses.primaryBgHoveredClass}`}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm ">
            <span className={`mr-2 ${themeClasses.textClass}`}>
              Already have an account?
            </span>
            <Link
              to="/login"
              className={`font-semibold ${themeClasses.textHighlightedClass} ${themeClasses.textHoveredClass}`}
            >
              Log in Here!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );

  return content;
}

export default Register;