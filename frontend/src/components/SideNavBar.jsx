import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { routelinks } from "../pages/links";
import { USERTYPE } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {  checkAuthenticationAsync } from "../redux/authSlice";
import { getLocalItem } from "../localStrorage";
import { jwtDecode } from "jwt-decode";

const SideNavBar = () => {
  // write all the links here
  const [links, setLinks] = useState([]);
  const user = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();
  const handleLinks = (val) => {
    try {
      switch (val) {
        case USERTYPE.professional:
          setLinks(routelinks.ProfessionalLinks);
          break;
        case USERTYPE.employer:
          setLinks(routelinks.employerLinks);
          break;
        case USERTYPE.staff:
          setLinks(routelinks.staffLinks);
          break;
        case USERTYPE.root:
          setLinks(routelinks.rootLinks);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    const fetchData = async () => {
      try {
        await dispatch(checkAuthenticationAsync());
        let token = getLocalItem("token");
        let decode = jwtDecode(token);
        console.log(decode);
        handleLinks(decode.userType);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  return (
    <aside>
      <div className="w-48 h-screen mt-2 ml-3 bg-gray-900 p-4 space-y-2">
        {/* Navigation links */}
        <nav>
          {/* Repeat this structure for each menu item */}
          {links.map((item, index) => {
            return (
              <NavLink
                to={item.link}
                key={index}
                className="flex items-center p-2 mt-2 text-xs text-white hover:bg-blue-200 rounded link"
              >
                {/* Use your icons library here */}
                <span className="ml-3">{item.title}</span>
              </NavLink>
            );
          })}

          {/* ... other nav items */}
        </nav>
      </div>
    </aside>
  );
};

export default SideNavBar;
