import React from "react";
import TopNavBar from "../components/TopNavBar";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
 
const LandingPage = () => {
  const mainFeaturedPost = {
    title: "",
    description: "Connecting Ambition with Opportunity",
    image: "/assets/mainbanner2.webp",
    imageText: "main image description",
    linkText: "",
  };
  const featuredPosts = [
    {
      title: "Employer Registration",
      headline: "Empower Your Future",
      description: "Partner with Talent, Foster Growth",
      image:
        "https://images.unsplash.com/photo-1570126618953-d437176e8c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw0fHxjb21wYW5pZXN8ZW58MXx8fHwxNzA2ODAwNjk2fDA&ixlib=rb-4.0.3&q=80&w=1080",
      imageLabel: "Image Text",
    },
    {
      title: "Professional Registration",
      headline: "Unleash Your Potential",
      description: "Where Skills Meet Their Match",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzMnx8T2ZmaWNlfGVufDF8fHx8MTcwNjgwMDM1MXww&ixlib=rb-4.0.3&q=80&w=1080",
      imageLabel: "Image Text",
    },
  ];
 
  return (
    <div className="max-h-screen flex flex-col">
      <TopNavBar isLandingPage={true} />
      <main>
        <div className="ml-2 py-2 mt-1 mr-2 sm:ml-10 sm:mr-10">
          <MainFeaturedPost post={mainFeaturedPost} />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-start">
          {featuredPosts.map((post, index) => (
            <div key={index} className="m-2 sm:m-4 w-full md:w-1/2 lg:w-1/3">
              <FeaturedPost key={post.title} post={post} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
 
export default LandingPage;
 
{
  /* // <div>
//         <Link to={"/SignIn"}>SignIn</Link>
//       </div>
//       <Link to={"/SignUp"}>SignUp</Link> */
}