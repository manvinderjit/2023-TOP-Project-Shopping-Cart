import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails, logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../features/api/apiSlice";

const UserDashboard = () => {
    const username = useAppSelector(getCurrentUserDetails);
    const token = useAppSelector(getCurrentToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
      data: userOrders,
      isLoading: isLoadingUserOrders,
      isSuccess: isSuccessUserOrders,
      isError: isErrorUserOrders,
      error: errorUserOrders,
    } = useGetUserOrdersQuery(token);

    // const orders = dispatch(useGetUserOrdersQuery(token));

    const handleLogout = () => {
        dispatch(logOut());
    }

    useEffect(() => {
        if(!token || token === null) navigate('/login');
    },[navigate, token])

    useEffect(() => {
      if (isSuccessUserOrders) console.log(userOrders);
    }, [isSuccessUserOrders, userOrders]);

    const content = (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2>Dashboard</h2>
        <p>Welcome {username}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-48 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>
      </div>
    );
    
    return content;
}

export default UserDashboard;
