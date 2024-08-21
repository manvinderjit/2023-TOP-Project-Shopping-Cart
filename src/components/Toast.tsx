import { useSelector, useDispatch } from "react-redux";
import { removeToastAlert } from "../features/toast/toastSlice";
import { getAllToastAlerts } from "../features/toast/toastSlice";
import { useEffect } from "react";

let alertBackgroundColor: string = 'bg-blue-400';
let alertTextColor:string = 'text-blue-800';

function setToastCss(type: string): void {
  switch (type) {
    case "success":
      alertBackgroundColor ="bg-emerald-400" ;
      alertTextColor = "text-green-900";
      break;
    case "error":
      alertBackgroundColor = "bg-red-400";
      alertTextColor = "text-red-900";
      break;
    default:
      alertBackgroundColor = "bg-yellow-100";
      alertTextColor = "text-orange-800";
  }
}

const Toast = () => {
  const toastAlerts = useSelector(getAllToastAlerts);
  const dispatch = useDispatch();

  const content =
    toastAlerts.length > 0 ? (
      <div className="z-10 fixed flex w-full justify-end top-20 right-40 duration-1000 flex-col items-end gap-4">
        {toastAlerts.map((toast) => {
          setToastCss(toast.toastType);
          return (
            <div
              className={`border rounded-lg px-4 py-2 w-96 flex justify-between items-center font-medium text-sm
                  ${alertBackgroundColor} ${alertTextColor}
                `}
              key={toast.toastId}
            >
              <span>{toast.toastTextContent}</span>
              <button
                aria-label={`Close Alert ${toast.toastTextContent}`}
                onClick={() => {
                  dispatch(removeToastAlert(toast.toastId));
                }}
                className={`rounded-md hover:bg-green-900 hover:bg-opacity-30 `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 "
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    ) : (
      <></>
    );

  return content;
}

export default Toast;
