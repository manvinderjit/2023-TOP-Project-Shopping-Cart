import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const CheckoutInfo = (): React.JSX.Element => {

  const { themeClasses } = useContext(ThemeContext);
  const [isSameBillingInfo, setIsSameBillingInfo] = useState<boolean>(true);

  const toggleSameBillingInfo = (): void =>
    isSameBillingInfo
      ? setIsSameBillingInfo(false)
      : setIsSameBillingInfo(true);

    const content: React.JSX.Element = (
      <div className="flex flex-col gap-6 col-span-1 p-10 w-5/6 mx-auto">
        <div>
          <h3 className="my-4 font-semibold text-xl">Contact Information</h3>
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              // onChange={}
              required
              className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
            />
            {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="mt-4 font-semibold text-xl">Payment Details</h3>
          <div>
            <label htmlFor="ccName" className="block text-sm font-medium">
              Name on Card
            </label>
            <input
              id="ccName"
              name="ccName"
              type="text"
              placeholder="John Doe"
              disabled
              required
              // onChange={}
              className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
            />
          </div>
          <div>
            <label htmlFor="ccNumber" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              id="ccNumber"
              name="ccNumber"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              maxLength={23}
              required
              placeholder="xxxx xxxx xxxx xxxx"
              disabled
              // onChange={}
              className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
            />
          </div>
          <div className="w-full flex justify-between ">
            <div className="flex flex-col gap-2">
              <label htmlFor="ccExpiry" className="block text-sm font-medium">
                Expiry Date
              </label>
              <input
                id="ccExpiry"
                name="ccExpiry"
                placeholder="MM/YY"
                maxLength={5}
                disabled
                required
                aria-label="Credit Card Expiry Date"
                className={`block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
              />
            </div>
            <div className="w-1/4 flex flex-col gap-2">
              <label htmlFor="ccCVV" className="block text-sm font-medium">
                CVV
              </label>
              <input
                id="ccCVV"
                name="ccCVV"
                placeholder="CVV"
                maxLength={3}
                required
                aria-label="Credit Card CVV"
                disabled
                className={`w-full block rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mt-4 font-semibold text-xl">Shipping Address</h3>
          <div>
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-medium"
            >
              Shipping Address
            </label>
            <input
              id="shippingAddress"
              name="shippingAddress"
              type="text"
              required
              placeholder="#, Street Name, Landmark etc."
              className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State / Province
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mt-4 font-semibold text-xl">Billing Information</h3>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="isBillingSame"
              name="isBillingSame"
              onChange={toggleSameBillingInfo}
              checked={isSameBillingInfo}
            />
            <label htmlFor="isBillingSame">Same as shipping information.</label>
          </div>
          {!isSameBillingInfo ? (
            <>
              <div>
                <label
                  htmlFor="payerName"
                  className="block text-sm font-medium"
                >
                  Payer Name
                </label>
                <input
                  id="payerName"
                  name="payerName"
                  type="text"
                  placeholder="John Doe"
                  className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
                />
              </div>
              <div>
                <label
                  htmlFor="billingAddress"
                  className="block text-sm font-medium"
                >
                  Bill Address
                </label>
                <input
                  id="billingAddress"
                  name="billingAddress"
                  type="text"
                  placeholder="#, Street Name, Landmark etc."
                  className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor="billingCity"
                    className="block text-sm font-medium"
                  >
                    Bill City
                  </label>
                  <input
                    id="billingCity"
                    name="billingCity"
                    type="text"
                    className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="billingState"
                    className="block text-sm font-medium"
                  >
                    Bill State / Province
                  </label>
                  <input
                    name="billingState"
                    id="billingState"
                    type="text"
                    className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="billingPostalCode"
                    className="block text-sm font-medium"
                  >
                    Bill Postal Code
                  </label>
                  <input
                    id="billingPostalCode"
                    name="billingPostalCode"
                    type="text"
                    className={`mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 ${themeClasses.inputRingClass} ${themeClasses.inputBgClass}`}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  
    return content;
}

export default CheckoutInfo;
