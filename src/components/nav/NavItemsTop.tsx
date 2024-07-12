const NavItemsTop = (): React.JSX.Element => {

    const content: React.JSX.Element =   
    (
      <ul className="flex flex-row mr-auto">
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <a href="/home">Home</a>
        </li>
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <a href="/login">Login</a>
        </li>
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <a href="/register">Register</a>
        </li>
        <li className="flex flex-col justify-center text-center w-24 text-l">
          <a href="/cart">Cart</a>
        </li>
      </ul>
    );

    return content;
};

export default NavItemsTop;
