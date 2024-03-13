# Shopping WebApp by Manvinderjit

`Live Link`: [Shopping App](https://2023-top-project-shopping-cart.pages.dev/)

A Vite-React Webapp e-commerce portal allows customers to purchase products. It makes use of Bootstrap 5, React Bootstrap, React Redux, React Router Dom, and JWT technologies.

Is a part of a two-app ecosystem for an organization selling computer hardware. Leverages RESTful APIs provided by the [Inventory Management App](https://ia.manvinderjit.com/), which is the other app in the ecosystem. 

The app ecosystem consists of two user roles:
- `Customers:` They use this [Shopping App](https://2023-top-project-shopping-cart.pages.dev/) to place orders.
- `Employees`: They use the [Inventory App](https://ia.manvinderjit.com) to perform inventory and logistics operations, including processing orders received through this `Shopping App`. Promos and products displayed on the `Shopping App` are also managed through the `Inventory App`.

# 1. Description

Shopping App is an e-commerce store that supports the following functions:

1. `E-commerce Store`: It allows customers to purchase items.
2. `Register and Login`: Customers can register and log-in to place orders.
3. `Cart Functionality`: Customers can add items to cart and checkout.
4. `Order History`: Customers can view their order history.
5. `Manage Orders`: Customers can manage their orders and cancel them as required.

## Tech Stack

### Core Development Stack
The `Shopping App` makes use of the following technologies and packages:
- `React Vite`: React is used for the front-end with Vite build tool.
- `React Redux`: React Redux is used for state management.
- `React Bootstrap 5`: Bootstrap is used for CSS styling.
- `HTML Fetch`: RESTful API calls are made using HTML Fetch.
- `JWT Tokens`: Authentication is established through JWT tokens stored in Redux state.

### Deployment Stack
The `Shopping App` is deployed using following technologies:
- `CI/CD Pipeline With GitHub`: A CI/CD pipeline is created to automatically deploy newly implemented features to the production environment.
- `Cloud Flare Pages`: The application is deployed via Cloud Flare pages that automatically builds and deploys when changes are pushed to the `prodtest` branch (will change to `production` branch once the project is complete).

