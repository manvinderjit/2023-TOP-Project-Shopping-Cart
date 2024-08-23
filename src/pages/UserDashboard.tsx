import { useEffect } from "react";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails, logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../features/api/apiSlice";

const UserDashboard = () => {
    const username = useAppSelector(getCurrentUserDetails);
    const token = useAppSelector(getCurrentToken);
    const navigate = useNavigate();

    const {
      data: userOrders,
      isLoading: isLoadingUserOrders,
      isSuccess: isSuccessUserOrders,
      isError: isErrorUserOrders,
      error: errorUserOrders,
    } = useGetUserOrdersQuery(token);

    useEffect(() => {
        if(!token || token === null) navigate('/login');
    },[navigate, token])

    // TODO: Display user Orders
    // useEffect(() => {
    //   if (isSuccessUserOrders) console.log(userOrders);
    // }, [isSuccessUserOrders, userOrders]);

    const content = (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2>Dashboard</h2>
        <p>Welcome {username}</p>
      </div>
    );
    
    return content;
}

export default UserDashboard;
