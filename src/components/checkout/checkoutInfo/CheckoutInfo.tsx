import { useState } from "react";

const CheckoutInfo = (): React.JSX.Element => {

  const [isSameBillingInfo, setIsSameBillingInfo] = useState<boolean>(true);

  const toggleSameBillingInfo = () =>
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
              className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
            />
            {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="mt-4 font-semibold text-xl">Payments Details</h3>
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
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              dir="auto"
              spellCheck="false"
              // onChange={}
              className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
            />
            {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
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
              placeholder="xxxx xxxx xxxx xxxx"
              disabled
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              dir="auto"
              spellCheck="false"
              // onChange={}
              className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
            />
            {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
          </div>
          <div className="w-full flex justify-between ">
            <div className="flex flex-col gap-2">
              <label htmlFor="ccExpiry" className="block text-sm font-medium">
                Expiry Date
              </label>
              <input
                placeholder="MM/YY"
                maxLength={5}
                autoCorrect="off"
                autoComplete="off"
                dir="auto"
                spellCheck="false"
                disabled
                inputMode="numeric"
                aria-label="Credit Card Expiry Date"
                className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
              />
            </div>
            <div className="w-1/4 flex flex-col gap-2">
              <label htmlFor="ccCVV" className="block text-sm font-medium">
                CVV
              </label>
              <input
                placeholder="CVV"
                autoCapitalize="none"
                maxLength={3}
                autoCorrect="off"
                autoComplete="off"
                dir="auto"
                spellCheck="false"
                inputMode="numeric"
                aria-label="Required"
                disabled
                className="w-full block rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mt-4 font-semibold text-xl">Shipping Address</h3>
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="#, Street Name, Landmark etc."
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              dir="auto"
              spellCheck="false"
              className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
            />
            {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
          </div>
          <div className="flex gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State / Province
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">
                Postal Code
              </label>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
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
            <label htmlFor="">Same as shipping information.</label>
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
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  dir="auto"
                  spellCheck="false"
                  className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
                />
                {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="#, Street Name, Landmark etc."
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  dir="auto"
                  spellCheck="false"
                  className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
                />
                {/* <span className={`flex justify-center pt-1 h-6 ${isLoginError} text-red-400`}>
                        {inputUserEmailError
                        ? inputUserEmailErrorMsg
                        : ""}
                    </span> */}
              </div>
              <div className="flex gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium">
                    State / Province
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6"
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
