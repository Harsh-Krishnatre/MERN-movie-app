import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white font-semibold tracking-wide">
              MovieApp
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center text-sm ${isActive ? "text-teal-400" : "text-gray-300 hover:text-white"}`
                }
              >
                <AiOutlineHome className="mr-1" size={20} /> Home
              </NavLink>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `flex items-center text-sm ${isActive ? "text-teal-400" : "text-gray-300 hover:text-white"}`
                }
              >
                <MdOutlineLocalMovies className="mr-1" size={20} /> Movies
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!userInfo && (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center text-sm text-gray-300 hover:text-white"
                >
                  <AiOutlineLogin className="mr-1" size={20} /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-sm text-gray-300 hover:text-white"
                >
                  <AiOutlineUserAdd className="mr-1" size={20} /> Register
                </Link>
              </div>
            )}

            {userInfo && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-sm text-gray-200 hover:text-white focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <span>{userInfo.username}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-44 rounded bg-white py-2 text-gray-700 shadow-lg">
                    {userInfo.isAdmin && (
                      <li>
                        <Link to="/admin/movies/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}

            <button
              className="md:hidden inline-flex items-center justify-center rounded p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center text-sm ${isActive ? "text-teal-400" : "text-gray-300"}`
                }
              >
                <AiOutlineHome className="mr-2" size={18} /> Home
              </NavLink>
              <NavLink
                to="/movies"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center text-sm ${isActive ? "text-teal-400" : "text-gray-300"}`
                }
              >
                <MdOutlineLocalMovies className="mr-2" size={18} /> Movies
              </NavLink>

              {!userInfo ? (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center text-sm text-gray-300">
                    <AiOutlineLogin className="mr-2" size={18} /> Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex items-center text-sm text-gray-300">
                    <AiOutlineUserAdd className="mr-2" size={18} /> Register
                  </Link>
                </>
              ) : (
                <>
                  {userInfo.isAdmin && (
                    <Link to="/admin/movies/dashboard" onClick={() => setMobileOpen(false)} className="text-sm text-gray-300">
                      Dashboard
                    </Link>
                  )}
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm text-gray-300">
                    Profile
                  </Link>
                  <button onClick={() => { setMobileOpen(false); logoutHandler(); }} className="text-left text-sm text-gray-300">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
