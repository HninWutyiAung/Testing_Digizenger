import logo from "/images/Digizenger2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import HamburgerMenu from "./Hamburger.jsx";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <section className="relative z-20">
      <nav className="nav_container fixed bg-white w-full grid grid-cols-[30%_10%_50%] gap-x-[2rem] border-b-2 border-slate-100">
        <img
          src={logo}
          className="w-[170px] h-[50px] ml-[10rem] my-[0.3rem] mx-auto edsn_logo"
          alt="Digizenger Logo"
        />
        <div className="burger text-[#00BCD4] duration-100" onClick={toggleMenu}>
          <HamburgerMenu />
        </div>
        <ul className="normal_menu hidden sm:flex flex-row gap-x-[3rem] self-center text-sm">
          <Link to="/home"><li className="first hover:text-[#00BCD4]">Home</li></Link>
          <Link to="course"><li className="second hover:text-[#00BCD4]">Products</li></Link>
          <Link to="pricing"><li className="hover:text-[#00BCD4]">About Us</li></Link>
          <Link to="about"><li className="hover:text-[#00BCD4]">Download App</li></Link>
          <Link to="/signup">
            <span className="sign_up_button text-[18px] bg-[#0097A7] hover:bg-[#00BCD4] text-white px-[20px] py-[10px] rounded-md">Sign Up</span>
          </Link>
          <Link to="/">
            <span className="text-[#00BCD4] hover:text-black font-bold">Login</span>
          </Link>
        </ul>
      </nav>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-white border-l-2 border-slate-100 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-[#00BCD4] text-2xl">✕</button>
        </div>
        <ul className="flex flex-col p-4 space-y-6 text-sm">
          <Link to="/" onClick={toggleMenu}><li className="hover:text-[#00BCD4]">Home</li></Link>
          <Link to="course" onClick={toggleMenu}><li className="hover:text-[#00BCD4]">Products</li></Link>
          <Link to="pricing" onClick={toggleMenu}><li className="hover:text-[#00BCD4]">About Us</li></Link>
          <Link to="about" onClick={toggleMenu}><li className="hover:text-[#00BCD4]">Download App</li></Link>
          <Link to="/signup" onClick={toggleMenu}>
            <span className="text-[18px] bg-[#0097A7] hover:bg-[#00BCD4] text-white px-[10px] py-[5px] rounded-md">Sign Up</span>
          </Link>
          <Link to="login" onClick={toggleMenu}>
            <span className="text-[#00BCD4] hover:text-black font-bold">Login</span>
          </Link>
        </ul>
      </div>
    </section>
  );
}

export default Nav;
