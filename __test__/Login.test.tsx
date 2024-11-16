import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routerConfig from "./routerConfig";
import { store } from "../src/application/store";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { apiSlice, apiURL } from "../src/features/api/apiSlice";

interface loginFormDatable {
  userEmail: string | null,
  userPassword: string | null
}

// Use msw to intercept the network request during the test,
export const handlers = [
  // Log in request handler
  http.post(`${apiURL}/api/login`, async ({ request }) => {
    const requestData: loginFormDatable = await request.json();
    // Case 1 Log In: If no email or password is provided
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
    // Case 2 Log In: If email and password is correct
    else if (
      requestData.userEmail.trim() === "email@abc.com" &&
      requestData.userPassword.trim() === "Admin1"
    ) {
      return HttpResponse.json({ token: "token" }, { status: 200 });
    }
    // Case 3 Log In: If email or password is incorrect
    else if (
      requestData.userEmail.trim() !== "email@abc.com" ||
      requestData.userPassword.trim() !== "Admin1"
    ) {
      return HttpResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }
    // Case Default Log In: Otherwise Return Error
    else {
      return HttpResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    
  })
];

describe("should render Login Page", async () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/login"],
  });
    
  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  // Post Expectations
  it("should render Login Page", () => {
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();
  });

  it("should render Email Input Textbox", () => {
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email address/i })).toHaveAttribute('id', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email address/i })).toHaveAttribute('name', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email address/i })).toHaveAttribute('required');
  });

  it("should render Password Input Textbox", () => {
    expect(screen.getByLabelText(/password/i )).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('id', 'userPassword');
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('name', 'userPassword');
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('required');
  });

  it("should render the Submit button", () => {
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toHaveAttribute("type", "button");
  });

  it("should render the 'Forgot password' link", () => {
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
  });

  it("should render the 'Sign Up Now' link", () => {
    expect(screen.getByRole('link', { name: /sign up now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up now/i })).toHaveAttribute("href", "/register");
  });
  
});

describe("should render Login error messages", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/login"],
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });
  
  it("should not submit empty form and render error messages" , () => {
    // Pre Expectations
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    expect(inputUserEmail.value).toBe("");

    const inputUserPassword =  screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id","userPassword");
    expect(inputUserPassword).toHaveAttribute("name","userPassword");
    expect(inputUserPassword).toHaveAttribute("required");
    expect(inputUserPassword.value).toBe("");

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");

    // Action
    fireEvent.click(buttonSignIn);

    // Post Expectations
    // It should update input values
    expect(inputUserEmail.value).toBe("");
    expect(inputUserPassword.value).toBe("");
    // It should show email error
    expect(screen.getByText(/Email can't be empty/i)).toBeInTheDocument();
    // It should show password error
    expect(screen.getByText(/Password can't be empty/i)).toBeInTheDocument();
  });

  it("should not submit form with userEmail empty but Password entered and render error messages" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    expect(inputUserEmail.value).toBe("");

    const inputUserPassword =  screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id","userPassword");
    expect(inputUserPassword).toHaveAttribute("name","userPassword");
    expect(inputUserPassword).toHaveAttribute("required");
    expect(inputUserPassword.value).toBe("");

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");

    // Action
    fireEvent.change(inputUserPassword, { target: { value: "password" } });
    fireEvent.click(buttonSignIn);

    // Post Expectations
    // It should update input values
    expect(inputUserEmail.value).toBe("");
    expect(inputUserPassword.value).toBe("password");
    // It should show email error
    expect(screen.getByText(/Email can't be empty/i)).toBeInTheDocument();
    // It should show not show password error
    expect(screen.queryByText(/Password can't be empty/i)).not.toBeInTheDocument();
  });

  it("should not submit form with userEmail entered but Password empty and render error messages" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", {
      name: /email address/i,
    });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    expect(inputUserEmail.value).toBe("");

    const inputUserPassword = screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id", "userPassword");
    expect(inputUserPassword).toHaveAttribute("name", "userPassword");
    expect(inputUserPassword).toHaveAttribute("required");
    expect(inputUserPassword.value).toBe("");

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");

    // Action
    fireEvent.change(inputUserEmail, { target: { value: "email@abc.com" } });
    fireEvent.click(buttonSignIn);

    // Post Expectations
    // It should update input values
    expect(inputUserEmail.value).toBe("email@abc.com");
    expect(inputUserPassword.value).toBe("");
    // It should not render email error
    expect(screen.queryByText(/Email can't be empty/i)).not.toBeInTheDocument();
    // It should render password error
    expect(screen.getByText(/Password can't be empty/i)).toBeInTheDocument();
  });

  it("should validate userEmail and render error message" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");

    // Case 1: Incorrect email format
    // Action: Enter email in incorrect format
    fireEvent.change(inputUserEmail, { target: { value: "e" } });

    // Post Expectations
    // It should render email error
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();

    // Case 2: Incorrect email format
    // Action: Secondary incorrect email format
    fireEvent.change(inputUserEmail, { target: { value: "email@" } });

    // Post Expectations
    // It should render email error
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();

    // Case 3: Incorrect email format
    // Action: Tertiary incorrect email format
    fireEvent.change(inputUserEmail, { target: { value: "email@abc." } });

    // Post Expectations
    // It should render email error
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();
  });
});

describe("should remove userEmail and userPassword error messages when input is valid" , () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/login"],
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  it("should remove 'Email can't be empty' error when email is entered" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    expect(inputUserEmail.value).toBe("");
    expect(screen.queryByText(/Email must be in a valid format/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Email can't be empty/i)).not.toBeInTheDocument();

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");

    // Pre Action: Generate error messages
    fireEvent.click(buttonSignIn);
    // It should render email required error message
    expect(screen.getByText(/Email can't be empty/i)).toBeInTheDocument();
    
    // Action: Enter email 
    fireEvent.change(inputUserEmail, { target: { value: "e" } });
    
    // Post Expectations
    // It should not render email required error message
    expect(screen.queryByText(/Email can't be empty/i)).not.toBeInTheDocument();

  });

  it("should remove 'Password can't be empty' error when password is entered" , () => {
    // Pre Expectations
    const inputUserPassword = screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id", "userPassword");
    expect(inputUserPassword).toHaveAttribute("name", "userPassword");
    expect(inputUserPassword).toHaveAttribute("required");
    expect(inputUserPassword.value).toBe("");
    expect(screen.queryByText(/Password must be in a valid format/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password can't be empty/i)).not.toBeInTheDocument();

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");

    // Pre Action: Generate error messages
    fireEvent.click(buttonSignIn);
    // It should render password required error message
    expect(screen.getByText(/Password can't be empty/i)).toBeInTheDocument();
    
    // Action: Enter password 
    fireEvent.change(inputUserPassword, { target: { value: "A" } });
    
    // Post Expectations
    // It should not render password required error message
    expect(screen.queryByText(/Password can't be empty/i)).not.toBeInTheDocument();

  });

  it("should remove email validation error message if userEmail input is valid" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    
    // Pre Action: Enter email in invalid format
    fireEvent.change(inputUserEmail, { target: { value: "emais" } });
    // It should render email error
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();
    
    // Action: Change email to valid format from invalid
    fireEvent.change(inputUserEmail, { target: { value: "email@abc.com" } });

    // Post Expectations
    // It should not render email error
    expect(screen.queryByText(/Email must be in a valid format/i)).not.toBeInTheDocument();
    
  });

  it("should remove email validation error message if userEmail input is deleted" , () => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    
    // Pre Action: Enter email in invalid format
    fireEvent.change(inputUserEmail, { target: { value: "email@" } });
    expect(screen.getByText(/Email must be in a valid format/i)).toBeInTheDocument();

    // Action: Delete entered email
    fireEvent.change(inputUserEmail, { target: { value: "" } });

    // Post Expectations
    // It should not render email error
    expect(screen.queryByText(/Email must be in a valid format/i)).not.toBeInTheDocument();
    
  });

});

describe("should handle log in", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/login"],
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
    }
  );

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it('should not call backend and render validation error for empty email or password', async() => {
    // Pre Expectations
    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");
    expect(inputUserEmail.value).toEqual("");

    const inputUserPassword =  screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id","userPassword");
    expect(inputUserPassword).toHaveAttribute("name","userPassword");
    expect(inputUserPassword).toHaveAttribute("required");
    expect(inputUserPassword.value).toEqual("");

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");
    
    // Actions
    await waitFor(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Post Expectations
    await waitFor (async() => {
      expect( await screen.queryByText(/Email or password can't be empty./i)).not.toBeInTheDocument();
      expect( await screen.queryByText(/Invalid request./i)).not.toBeInTheDocument();
      expect( await screen.getByText(/Email can't be empty/i)).toBeInTheDocument();
      expect( await screen.getByText(/Password can't be empty/i)).toBeInTheDocument();
    });
  });

  it('should not log in user and render error for incorrect email or password', async() => {

    // Pre Expectations
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();

    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");

    const inputUserPassword =  screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id","userPassword");
    expect(inputUserPassword).toHaveAttribute("name","userPassword");
    expect(inputUserPassword).toHaveAttribute("required");

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");
    
    // Actions
    await waitFor(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), { target: { value: "email@abc.com" } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Post Expectations
    await waitFor (async() => expect( await screen.findByText(/Error! Invalid email or password/i)).toBeInTheDocument());

  });

  it("should log in user and redirect to 'Dashboard'", async() => {

    // Pre Expectations
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();

    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();
    expect(inputUserEmail).toHaveAttribute("id", "userEmail");
    expect(inputUserEmail).toHaveAttribute("name", "userEmail");
    expect(inputUserEmail).toHaveAttribute("required");

    const inputUserPassword =  screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    expect(inputUserPassword).toHaveAttribute("id","userPassword");
    expect(inputUserPassword).toHaveAttribute("name","userPassword");
    expect(inputUserPassword).toHaveAttribute("required");

    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignIn).toHaveAttribute("type", "button");
    
    // Actions
    await waitFor(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), { target: { value: "email@abc.com" } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "Admin1" } });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Post Expectations
    await waitFor(async() => {
      expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
      expect(await screen.findByText(/Login Successful/i)).toBeInTheDocument();
      expect(await screen.findByText(/Welcome email@abc.com/i)).toBeInTheDocument();
      expect(_router.state.location.pathname).toEqual("/dashboard");
      setTimeout(async() => expect(await screen.findByText(/Login Successful/i)).not.toBeInTheDocument(), 4000);
    });

  });
});

describe("should handle log out", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/login"],
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
    }
  );

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should log out user and redirect to 'Login'", async() => {

    // Pre Expectations
    expect(_router.state.location.pathname).toEqual("/login");
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();

    const inputUserEmail = screen.getByRole("textbox", { name: /email address/i });
    expect(inputUserEmail).toBeInTheDocument();

    const inputUserPassword =  screen.getByLabelText(/password/i);
    expect(inputUserPassword).toBeInTheDocument();
    
    const buttonSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(buttonSignIn).toBeInTheDocument();
    
    // Pre Actions: Log in user
    await waitFor(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), { target: { value: "email@abc.com" } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "Admin1" } });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Post Pre Action Expectations
    await waitFor(async() => {
      expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
      expect(await screen.findByText(/Login Successful/i)).toBeInTheDocument();
      expect(await screen.findByText(/Welcome email@abc.com/i)).toBeInTheDocument();
      expect(_router.state.location.pathname).toEqual("/dashboard");
      setTimeout(async() => expect(await screen.findByText(/Login Successful/i)).not.toBeInTheDocument(), 4000);      
    });

    setTimeout(async() => {
      expect(_router.state.location.pathname).toEqual("/dashboard");
      expect(_router.state.location.pathname).not.toEqual("/login");
      // Action 1: Expand User Account Tools Menu
      const buttonUserAccountTools = screen.getByRole("button", { name: "User Account Tools" });
      expect(buttonUserAccountTools).toBeInTheDocument();
      fireEvent.click(buttonUserAccountTools);
      
      // Action 2: Click 'Logout' button to log out user
      const buttonLogout = screen.getByRole("menu-item", { name: "Logout" });
      expect(buttonLogout).toBeInTheDocument();
      fireEvent.click(buttonLogout);
      
      // Post Expectations
      await waitFor(() => {
        expect(_router.state.location.pathname).toEqual("/login");
        expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();
        expect(_router.state.location.pathname).not.toEqual("/dashboard");
        expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
      });
    }, 4000);

  });
});
