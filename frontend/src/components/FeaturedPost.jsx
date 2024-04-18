import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FeaturedPost(props) {
  const { post } = props;
  const navigate = useNavigate();
  const handleNavigation = () =>{
     console.log(post)
     if(post.title=="Employer Registration"){
        navigate("/RegistrationPage?type=Employer");
     }else{
        navigate("/RegistrationPage?type=Professional");
     }
  }
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={handleNavigation}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <div className="bg-blue-100 rounded-lg p-2 m-3 ">
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-xl text-center font-bold text-blue-900 m-3 p-3">
                  {post.title}
                </h1>
                <h3 className="text-blue-700 text-xs font-semibold m-3 p-3">
                  {post.headline}
                </h3>
                <p className="text-gray-700 text-xs font-semibold m-3 p-3">
                  {post.description}
                </p>
                <button className="bg-blue-500 text-white text-sm py-2 m-3 px-2 rounded hover:bg-blue-600">
                  Sign Up
                </button>
              </div>
            </div>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 300,
              height: 400,
              display: { xs: "none", sm: "block" },
            }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
