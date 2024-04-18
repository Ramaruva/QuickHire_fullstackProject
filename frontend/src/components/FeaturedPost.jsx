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
 
  const handleNavigation = () => {
    console.log(post);
    const type = post.title === "Employer Registration" ? "Employer" : "Professional";
    navigate(`/RegistrationPage?type=${type}`);
  };
 
  return (
    <Grid item xs={12} md={6} lg={4}>
      <CardActionArea component="a" onClick={handleNavigation}>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, marginTop:3 }}>
          <CardContent sx={{ flex: 1 }}>
            <div className="bg-blue-100 rounded-lg p-2 m-3 ">
              <div className="flex flex-col items-center justify-between">
                <Typography component="h2" variant="h5" className="font-bold text-blue-900 m-3 p-3" align="center">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" className="text-blue-700 m-3 p-3" align="center">
                  {post.headline}
                </Typography>
                <Typography variant="body2" className="text-gray-700 m-3 p-3" align="center">
                  {post.description}
                </Typography>
                <Button variant="contained" color="primary" className="m-3" onClick={handleNavigation}>
                  Sign Up
                </Button>
              </div>
            </div>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 200, marginTop:4, marginBottom:4, height:280, display: { xs: 'none', sm: 'block' } }}
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