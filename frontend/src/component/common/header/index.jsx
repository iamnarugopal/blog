import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="shrink-0 py-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="">
            <div className="text-white text-3xl font-bold uppercase">
              <Link to="/">My Blog</Link>
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              <Link className="btn btn-outline-primary" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
