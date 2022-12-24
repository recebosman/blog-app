import Model from "./Model";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (user) {
      await logout();
      navigate("/login");
      toast.success("Logout successful");
    }
  };

  return (
    <>
      {user && (
        <div className="navbar bg-neutral h-[75px] ">
          {isSubmitting && (
            <div className="alert alert-success">
              <div>
                <span>Message sent successfully.</span>
              </div>
            </div>
          )}
          <div className="flex-1">
            <Link to="/">
              <a className="btn btn-ghost normal-case tracking-widest text-4xl md:text-3xl">
                Blog
                <span className="text-info">App</span>
              </a>
            </Link>
          </div>
          <div className="flex-1 gap-3 hidden text-xl md:flex">
            <button className="btn text-info  tracking-widest hover:text-[#D2B3FF]">
              Home
            </button>
            <button className="btn text-info tracking-widest hover:text-[#D2B3FF] ">
              Categories
            </button>
            <Model
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              className="btn text-info tracking-widest  hover:text-[#D2B3FF] "
            />
          </div>

          <div className="flex-none gap-2">
            <div className="form-control hidden md:flex">
              <input
                type="text"
                placeholder="Search"
                className="input w-40 input-bordered"
              />
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
