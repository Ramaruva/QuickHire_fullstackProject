import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const staffLinks = [
  {
    title: "Professional Reviews",
    link: "/home/professionalReviews",
  },
  {
    title: "Empolyer Reviews",
    link: "/home/empolyerReviews",
  },
  {
    title: "Professional lists",
    link: "/home/ProfessionalLists",
  },
  {
    title: "Empolyer Lists",
    link: "/home/empolyerLists",
  },
  {
    title: "Notifications",
    link: "/home/notifications",
  },
  {
    title: "Settings",
    link: "/home/Settings",
  },
];

const employerLinks = [
  {
    title: "Create Job",
    link: "/home/CreateJobs",
  },
  {
    title: "Job Lists",
    link: "/home/JobLists",
  },
  {
    title: "Notifications",
    link: "/home/notifications?user=empolyer",
  },
  {
    title: "Payments",
    link: "/home/payments",
  },
  {
    title: "Settings",
    link: "/home/Settings?user=empolyer",
  },
];
const ProfessionalLinks = [
  {
    title: "Browse Jobs",
    link: "/home/BrowseJobs",
  },
  {
    title: "Matched Jobs",
    link: "/home/MatchedJobs",
  },
  {
    title: "Payments",
    link: "/home/Payments",
  },
  {
    title: "Settings",
    link: "/home/Settings?user=professional",
  },
];

const rootLinks = [
  {
    title: "Create Staff Accounts",
    link: "/home/createAccount",
  },
  {
    title: "Staff Accounts",
    link: "/home/staffAccounts",
  },
];
const SideNavBar = () => {
  // write all the links here
  const [links, setLinks] = useState(rootLinks);
  const handleLinks = (val) => {
    try {
      switch (val) {
        case "Professional":
          setLinks(ProfessionalLinks);
          break;
        case "Empolyer":
          setLinks(employerLinks);
          break;
        case "staff":
          setLinks(staffLinks);
          break;
        case "root":
          setLinks(rootLinks);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      handleLinks(userDetails?.role);
    } catch (error) {
      console.log(error);
    }
  }, []);
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
