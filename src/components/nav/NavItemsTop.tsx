import { Link } from "react-router-dom";

const NavItemsTop = (): React.JSX.Element => {

    const content: React.JSX.Element =   
    (
      <ul className="flex flex-row mr-auto">
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <Link to="/">Home</Link>
        </li>
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <Link to="/login">Login</Link>
        </li>
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <Link to="/register">Register</Link>
        </li>
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    );

    return content;
};

export default NavItemsTop;
