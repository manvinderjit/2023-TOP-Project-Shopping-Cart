import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";
import { store } from "../src/application/store";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { validateEmail, validatePassword } from "./test-helpers";
import { apiSlice } from "../src/features/api/apiSlice";

interface registerFormDatable {
  userEmail: string | null;
  userPassword: string | null;
}

// Use msw to intercept the network request during the test,
export const handlers = [
  // Register request handler
  http.post('https://ia.manvinderjit.com/api/register', async ({ request }) => {
    const requestData: registerFormDatable = await request.json();
    // Case 1 Register: If no email or password is provided
    if (
      !requestData.userEmail ||
      requestData.userEmail.trim() === "" ||
      !requestData.userPassword ||
      requestData.userPassword.trim() === ""
    ) {
      return HttpResponse.json(
        { error: "Email or password can't be empty." },
        { status: 400 }
      );
    }
    // Case 2 Register: If email or password is invalid
    else if (
      !validateEmail(requestData.userEmail.trim()) ||
      !validatePassword(requestData.userPassword.trim())
    ) {
      return HttpResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }
    // Case 3 Register: If email and password is valid
    else if (
      validateEmail(requestData.userEmail.trim()) &&
      validatePassword(requestData.userPassword.trim())
    ) {
      // Sub Case a. Register: If email already exists
      if (requestData.userEmail.trim() === "emailExists@abc.com") {
        return HttpResponse.json(
          {
            error: "User with the email already exists.",
          },
          { status: 400 }
        );
      } else {
        return HttpResponse.json(
          {
            message: `New user created with ${requestData.userEmail}`,
            id: "dummyId660f71e55db9034d4",
            username: `${requestData.userEmail}`,
          },
          { status: 201 }
        );
      }
    }
    // Case Default Register: Otherwise Return Error
    else {
      return HttpResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    
  })
];

describe("Register Page", () => {

  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  // Expectations
  it("should render the Register Page", () => {
    expect(screen.getByText(/Sign Up For Our Website/i)).toBeInTheDocument();
  });

  it("should render 'Register' link in the Navigation bar in #646cff color", () => {
    const navItemRegister = screen.getByRole("link", { name: 'Register' });
    expect(navItemRegister.parentElement?.classList.contains('text-[#646cff]')).toBe(true);
  });

  it("should render the Email Input Textbox", () => {
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('id', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('name', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('required');
  });

  it("should render the Password Input Textbox", () => {
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute('id', 'userPassword');
    expect(screen.getByLabelText("Password")).toHaveAttribute('name', 'userPassword');
    expect(screen.getByLabelText("Password")).toHaveAttribute('required');
  });

  it("should render the Confirm Passoword Input Textbox", () => {
    expect(screen.getByLabelText("Confirm Password" )).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password" )).toHaveAttribute('id', 'confirmPassword');
    expect(screen.getByLabelText("Confirm Password" )).toHaveAttribute('name', 'confirmPassword');
    expect(screen.getByLabelText("Confirm Password" )).toHaveAttribute('required');
  });

  it("should render the submit Sign Up button", () => {
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toHaveAttribute("type", "submit");
  });

  it("should render the 'Log In Here' link", () => {
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Log In Here/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Log In Here/i })).toHaveAttribute("href", "/login");
  });
  
});

describe("should redirect to Login", () => {

  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
      render(
        <Provider store={store}>
          <RouterProvider router={_router} />
        </Provider>
    );
  });

  it("should redirect to Login via the 'Log In Here' link", async() => {
    // Pre Expectataion 
    expect(_router.state.location.pathname).toBe("/register");
    expect(screen.getByText(/Sign Up For Our Website/i)).toBeInTheDocument();
    const linkLogInHere = screen.getByRole("link", { name: /Log In Here/i });
    expect(linkLogInHere).toBeInTheDocument();
    expect(linkLogInHere).toHaveAttribute("href", "/login");

    // Action: Click on 'Log In Here'
    fireEvent.click(linkLogInHere);

    // Post Expectations: Render Login Page
    await waitFor(async() => {
      expect(_router.state.location.pathname).not.toBe("/register");
      expect(_router.state.location.pathname).toBe("/login");
      expect(await screen.queryByText(/Sign Up For Our Website/i)).not.toBeInTheDocument();
      expect(await screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();
    });

  });
  
});

describe("should render validation errors", () => {
  
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
      render(
        <Provider store={store}>
          <RouterProvider router={_router} />
        </Provider>
    );
  });

  it("should render 'Email can not be empty' error if userEmail is empty", () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail.value).toBe("");
    expect(screen.queryByText("Email can not be empty!")).not.toBeInTheDocument();

    const buttonSignUp = screen.getByRole("button", { name: /sign up/i });
    expect(buttonSignUp).toBeInTheDocument();
    expect(buttonSignUp).toHaveAttribute("type", "submit");

    // Action: Click Sign Up Button
    fireEvent.click(buttonSignUp);

    // Post Expectations
    expect(inputUserEmail.value).toBe("");
    expect(screen.getByText('Email can not be empty!')).toBeInTheDocument();
  });

  it("should render 'Email can not be empty' error if userEmail is deleted after entering", () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail.value).toBe("");
    expect(screen.queryByText("Email can not be empty!")).not.toBeInTheDocument();

    // Action: Enter email address and remove it
    fireEvent.change(inputUserEmail, { target: { value: "email@abc.com" } });
    expect(inputUserEmail.value).toBe("email@abc.com");
    expect(screen.queryByText("Email can not be empty!")).not.toBeInTheDocument();
    fireEvent.change(inputUserEmail, { target: { value: "" } });

    // Post Expectations
    expect(inputUserEmail.value).toBe("");
    expect(screen.getByText('Email can not be empty!')).toBeInTheDocument();
  });
  
  it("should validate userEmail and render error messages" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail.value).toBe("");
    expect(screen.queryByText(/Email must be in a valid format/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Email can not be empty/i)).not.toBeInTheDocument();

    // Case 1: Incorrect email format
    // Action: Enter email in incorrect format
    fireEvent.change(inputUserEmail, { target: { value: "e" } });

    // Post Expectations
    // It should render email error
    expect(inputUserEmail.value).toBe("e");
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();
    expect(screen.queryByText(/Email can not be empty/i)).not.toBeInTheDocument();

    // Case 2: Incorrect email format
    // Action: Secondary incorrect email format
    fireEvent.change(inputUserEmail, { target: { value: "email@" } });

    // Post Expectations
    // It should render email error
    expect(inputUserEmail.value).toBe("email@");
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();
    expect(screen.queryByText(/Email can not be empty/i)).not.toBeInTheDocument();

    // Case 3: Incorrect email format
    // Action: Tertiary incorrect email format
    fireEvent.change(inputUserEmail, { target: { value: "email@abc." } });

    // Post Expectations
    // It should render email error
    expect(inputUserEmail.value).toBe("email@abc.");
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();
    expect(screen.queryByText(/Email can not be empty/i)).not.toBeInTheDocument();
  });

  it("should render 'Password can not be empty' error if userPassword is empty", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toBe("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();

    const buttonSignUp = screen.getByRole("button", { name: /sign up/i });
    expect(buttonSignUp).toBeInTheDocument();
    expect(buttonSignUp).toHaveAttribute("type", "submit");

    // Action: Click Sign Up Button
    fireEvent.click(buttonSignUp);

    // Post Expectations
    expect(inputUserPassword.value).toBe("");
    expect(screen.getByText("Password can't be empty!")).toBeInTheDocument();
  });

  it("should render 'Confirm Password can not be empty' error if confirmPassword is empty", () => {
    // Pre Expectations
    const inputUserConfirmPassword = screen.getByLabelText("Confirm Password");
    expect(inputUserConfirmPassword).toBeInTheDocument();
    expect(inputUserConfirmPassword.value).toBe("");
    expect(screen.queryByText("Confirm Password can't be empty!")).not.toBeInTheDocument();

    const buttonSignUp = screen.getByRole("button", { name: /sign up/i });
    expect(buttonSignUp).toBeInTheDocument();
    expect(buttonSignUp).toHaveAttribute("type", "submit");

    // Action: Click Sign Up Button
    fireEvent.click(buttonSignUp);

    // Post Expectations
    expect(inputUserConfirmPassword.value).toBe("");
    expect(screen.getByText("Confirm Password can't be empty!")).toBeInTheDocument();
  });

});

describe("should validate userPassword", () => {
  
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
      render(
        <Provider store={store}>
          <RouterProvider router={_router} />
        </Provider>
    );
  });

  it("should render 'Password must be atleast 5 characters' error if password length is lower than five (= 1)", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();

    // Action: Enter Password
    fireEvent.change(inputUserPassword, { target: { value: "a" } });

    // Post Expectations
    expect(inputUserPassword.value).toEqual("a");
    expect(screen.getByText("Password must be atleast 5 characters!")).toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
  });

  it("should render 'Password must be atleast 5 characters' error if password length is lower than five (= 4)", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();

    // Action: Enter Password
    fireEvent.change(inputUserPassword, { target: { value: "admi" } });

    // Post Expectations
    expect(inputUserPassword.value).toEqual("admi");
    expect(screen.getByText("Password must be atleast 5 characters!")).toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
  });

  it("should not render 'Password must be atleast 5 characters' error if password length reaches five", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();    
    expect(inputUserPassword.value).toEqual("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();

    // Action: Enter Password
    fireEvent.change(inputUserPassword, { target: { value: "admin" } });

    // Post Expectations
    expect(inputUserPassword.value).toEqual("admin");
    expect(screen.queryByText("Password must be atleast 5 characters!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
  });

  it("should render 'Password must be atleast 5 characters' error if password length drops lower than five again", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();

    // Action: Enter Password greater than five and reduce its length to lower than five
    fireEvent.change(inputUserPassword, { target: { value: "Admin" } });
    expect(inputUserPassword.value).toEqual("Admin");
    expect(screen.queryByText("Password must be atleast 5 characters!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    fireEvent.change(inputUserPassword, { target: { value: "Admi" } });

    // Post Expectations
    expect(inputUserPassword.value).toEqual("Admi");
    expect(screen.getByText("Password must be atleast 5 characters!")).toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
  });

  it("should render 'Password must have atleast 1 uppercase char!' error if password has no uppercase char and password length is >= 5 ", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must have atleast 1 uppercase char!")).not.toBeInTheDocument();

    // Action: Enter a Password greater than five but with no uppercase
    fireEvent.change(inputUserPassword, { target: { value: "admina" } });
    // Post Expectations
    expect(inputUserPassword.value).toEqual("admina");    

    // Post Expectations
    expect(inputUserPassword.value).toEqual("admina");
    expect(screen.getByText("Password must have atleast 1 uppercase char!")).toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();
  });

  it("should not render 'Password must have atleast 1 uppercase char!' error if password has an uppercase char", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must have atleast 1 uppercase char!")).not.toBeInTheDocument();

    // Action: Enter a Password greater than five but with no uppercase and then add an uppercase
    fireEvent.change(inputUserPassword, { target: { value: "admin1" } });
    expect(inputUserPassword.value).toEqual("admin1");
    expect(screen.getByText("Password must have atleast 1 uppercase char!")).toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();
    fireEvent.change(inputUserPassword, { target: { value: "Admin1" } });
    expect(inputUserPassword.value).toEqual("Admin1");

    // Post Expectations
    expect(inputUserPassword.value).toEqual("Admin1");
    expect(screen.queryByText("Password must have atleast 1 uppercase char!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password can't be empty!")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be atleast five characters!")).not.toBeInTheDocument();
    
  });

});

describe("should match userPassword and confirmPassword", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  it("should render 'Passwords must match!' error if userPassword and confirmPassword don't match", () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");

    const inputUserConfirmPassword = screen.getByLabelText("Confirm Password");
    expect(inputUserConfirmPassword).toBeInTheDocument();
    expect(inputUserConfirmPassword.value).toEqual("");

    // Actions: Enter userPassword
    fireEvent.input(inputUserPassword, { target: { value: 'Admin'}});
    fireEvent.input(inputUserConfirmPassword, { target: { value: "Adimn" } });

    // Post Expectations
    expect(inputUserPassword.value).toEqual("Admin");
    expect(inputUserConfirmPassword.value).toEqual("Adimn");
    expect(screen.getAllByText('Passwords must match!')).toHaveLength(2);

  });
});

describe("should register user", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(apiSlice.util.resetApiState());
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should register user and render success message", async() => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail.value).toBe("");

    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");

    const inputUserConfirmPassword = screen.getByLabelText("Confirm Password");
    expect(inputUserConfirmPassword).toBeInTheDocument();
    expect(inputUserConfirmPassword.value).toEqual("");
    
    const buttonSignUp = screen.getByRole("button", { name: /sign up/i });
    expect(buttonSignUp).toBeInTheDocument();

    // Actions: Enter userEmail, userPassword, and confirmPassword
    fireEvent.input(inputUserEmail, { target: { value: "email@abc.com" } });
    fireEvent.input(inputUserPassword, { target: { value: 'Admin'}});
    fireEvent.input(inputUserConfirmPassword, { target: { value: "Admin" } });
    expect(inputUserEmail.value).toBe("email@abc.com");
    expect(inputUserPassword.value).toEqual("Admin");
    expect(inputUserConfirmPassword.value).toEqual("Admin");
    fireEvent.click(buttonSignUp);

    // Post Expectations
    await waitFor (async() => { 
      expect(await screen.getByText("Success! New user created with email@abc.com")).toBeInTheDocument();
      expect(inputUserEmail.value).toBe("");
      expect(inputUserPassword.value).toEqual("");
      expect(inputUserConfirmPassword.value).toEqual("");
    });
  });
});

describe("should not register user and render errors", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/register"],
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(apiSlice.util.resetApiState());
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should not register user and render error message", async() => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail.value).toBe("");

    const inputUserPassword = screen.getByLabelText("Password");
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword.value).toEqual("");

    const inputUserConfirmPassword = screen.getByLabelText("Confirm Password");
    expect(inputUserConfirmPassword).toBeInTheDocument();
    expect(inputUserConfirmPassword.value).toEqual("");
    
    const buttonSignUp = screen.getByRole("button", { name: /sign up/i });
    expect(buttonSignUp).toBeInTheDocument();

    // Actions: Enter userEmail, userPassword, and confirmPassword
    fireEvent.input(inputUserEmail, { target: { value: "emailExists@abc.com" } });
    fireEvent.input(inputUserPassword, { target: { value: 'Admin'}});
    fireEvent.input(inputUserConfirmPassword, { target: { value: "Admin" } });
    expect(inputUserEmail.value).toBe("emailExists@abc.com");
    expect(inputUserPassword.value).toEqual("Admin");
    expect(inputUserConfirmPassword.value).toEqual("Admin");
    fireEvent.click(buttonSignUp);

    // Post Expectations
    await waitFor (async() => { 
      expect(await screen.getByText(/Error! User with the email already exists/i)).toBeInTheDocument();
      expect(inputUserEmail.value).toBe("emailExists@abc.com");
      expect(inputUserPassword.value).toEqual("Admin");
      expect(inputUserConfirmPassword.value).toEqual("Admin");
    });
  });

});
