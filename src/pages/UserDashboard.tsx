import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "../components/button/Button";
import { apiSlice, useCancelSubscriptionMutation, useGetSubscriptionStatusQuery, useSubscribeToOffersMutation } from "../features/api/apiSlice";
import Spinner from "../components/utility/Spinner";
import { isApiResponseError } from "../application/helpers";
import { useDispatch } from "react-redux";

const UserDashboard = (): React.JSX.Element => {
    const username: string | null = useAppSelector(getCurrentUserDetails);
    const token: string | null = useAppSelector(getCurrentToken);
    const navigate = useNavigate();
    const { themeClasses } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
      data: userSubStatus,
      isSuccess: isSuccessSubStatus,
      isLoading: isLoadingSubStatus,
      isError: isErrorSubStatus,
      error: errorSubStatus,
    } = useGetSubscriptionStatusQuery(undefined);

    const [
      subscribeToOffers,
      { 
        data: dataSubscribe,
        isSuccess: isSuccessSubscribe,        
        isLoading: isSubscribeLoading,
        isError: isSubscribeError,
        error: subscribeError,
      },
    ] = useSubscribeToOffersMutation();

    const [
      cancelSubscription,
      {
        data: dataCancelSubscription,
        isSuccess: isSuccessCancelSubscription,
        isLoading: isCancelSubscriptionLoading,
        isError: isCancelSubscriptionError,
        error: cancelsubscriptionError,
      },
    ] = useCancelSubscriptionMutation();

    useEffect(() => {
        if(!token || token === null) navigate('/login');
    },[navigate, token]);

    useEffect(() => {
      dispatch(apiSlice.util.invalidateTags(['SubStatus']));
    },[dispatch]);

    useEffect(() => {
      if(isSuccessCancelSubscription) {
        setSuccessMessage(dataCancelSubscription.message);
      }
    },[isSuccessCancelSubscription, dataCancelSubscription]);

    useEffect(() => {
      if (isSuccessSubscribe) {
        setSuccessMessage(dataSubscribe.message);
      }
    }, [isSuccessSubscribe, dataSubscribe]);

    const handleSubscribe = async () => {
      await subscribeToOffers(undefined);
    };

    const handleCancelSubscription = async () => {
      await cancelSubscription(undefined);
    };

    const content: React.JSX.Element = (
      <div
        className={`w-full h-full flex flex-col justify-center items-center ${themeClasses.textClass} my-auto`}
      >
        <h2
          className={`my-6 text-center text-2xl font-medium ${themeClasses.textClass}`}
        >
          Dashboard
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center h-full m-auto">
          <p className={`${themeClasses.textClass}`}>Welcome {username}</p>
          {!isLoadingSubStatus &&
            !isSubscribeLoading &&
            successMessage && (
              <p className="text-emerald-600">
                {successMessage}
              </p>
            )}          
          {isErrorSubStatus && (
            <div>{`${
              isApiResponseError(errorSubStatus)
                ? errorSubStatus.data
                : JSON.stringify(errorSubStatus)
            }`}</div>
          )}
          {isSubscribeError && (
            <div>{`${
              isApiResponseError(subscribeError)
                ? subscribeError.data
                : JSON.stringify(subscribeError)
            }`}</div>
          )}

          {isCancelSubscriptionError && (
            <div>{`${
              isApiResponseError(cancelsubscriptionError)
                ? cancelsubscriptionError.data
                : JSON.stringify(cancelsubscriptionError)
            }`}</div>
          )}
          <div
            className={`flex flex-col justify-center items-center gap-2 border rounded-md p-4 ${themeClasses.primaryBorderClass}`}
          >
            <h2
              className={`font-bold text-xl ${themeClasses.textHighlightedClass} ul`}
            >
              Subscription Status
            </h2>

            {isLoadingSubStatus ||
            isSubscribeLoading ||
            isCancelSubscriptionLoading ? (
              <Spinner label="Loading..." />
            ) : null}
            {!isErrorSubStatus &&
              !isLoadingSubStatus &&
              isSuccessSubStatus &&
              ((userSubStatus.subscribed === true && (
                <>
                  <p>You are currently subscribed!</p>
                  <p>
                    Click on the Unsubscribe button to stop subscription emails!
                  </p>
                  <div>
                    <Button
                      ariaLabel="unsubscribe-products"
                      buttonLabel="Unsubscribe"
                      onClick={handleCancelSubscription}
                    />
                  </div>
                </>
              )) ||
                (userSubStatus.subscribed === false && (
                  <>
                    <p>You are currently not subscribed!</p>
                    <p>
                      Click on the Subscribe button to be notified whenever a
                      new product is launched!
                    </p>
                    <p>
                      You will receive an email on your registered email address
                      to confirm your subscription.
                    </p>
                    <p>
                      Once you confirm subscription, we will notify you whenever
                      we add a new product!
                    </p>
                    <div>
                      <Button
                        ariaLabel="subscribe-products"
                        buttonLabel="Subscribe"
                        onClick={handleSubscribe}
                      />
                    </div>
                  </>
                )) ||
                (userSubStatus.subscribed === "pending" && (
                  <>
                    <p className="text-center">
                      Subscription confirmation pending! <br /> Check your email
                      for a confirmation link.
                    </p>
                  </>
                )))}
          </div>
        </div>
      </div>
    );
    
    return content;
}

export default UserDashboard;
