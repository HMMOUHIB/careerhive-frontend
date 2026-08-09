import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import './feedback.css';
import { tokens } from "../../theme";
import Ratingstart from "./fbreactbit/Ratingstart";
import instagram from './instagram.png';
import careerhive from './carrer.png';


import insta2 from './insta2 (2).png';


import SocialLink from "./fbreactbit/SocialLink";
import Start from "./fbreactbit/Start";
import FadeContent from "../../components/Reactbit/Animation2";
import ClickSpark from "../../components/Reactbit/ClickSpark";
import Star1 from '../team/Treactbit/Star1';
const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    
    <Box m="20px">
      <ClickSpark
  sparkColor='#fff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
<div className="header">
      <p>Your Team  </p> <span> Reviews</span> 
       <div className="startanimation"><Start /></div> 
     </div>
<div className="upsection">
<FadeContent
  distance={150}
  direction="horizontal"
  reverse={false}
  config={{ tension: 80, friction: 20 }}
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
>
  <div>
  <div className="first-review" >
    <div className="fdinfo">
  <div className="rttt">
  <Star1 />
  </div>

<p className="name">wissem feedback</p>
<p className="date" >18 juin 2025</p>
<p className="commentaire">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus autem facere repudiand.</p>
<div className="sociallink">
  <div className="insta">
  <img src={instagram} alt="" />
  <p style={{fontSize:13}} >kwissem ben alaya</p>
  </div>
  
<div className="careerhive">
<img src={careerhive} alt="" />
  <p style={{fontSize:13}} >CareerHive.com</p>
</div>
</div>
    </div>
    <div className="imgs">
    <img id="one" style={{width:80}} src="https://i.pinimg.com/736x/1d/b9/18/1db918fe2b5dff69f35186ad20cc1752.jpg"></img>
    <img id="two"  style={{width:70}} src="https://i.pinimg.com/736x/05/7a/1a/057a1ab503981cbc18bea3da8fa4f9a3.jpg" alt="" />
    </div>
  </div>
  </div>
</FadeContent>
 
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
<div className="secand-review">
   <div className="img2">
    <img src="https://i.pinimg.com/736x/1b/fd/df/1bfddf03e6f7a373dc782557328b512b.jpg" alt="" />
    
   </div>
   <div className="cmt">

  <div className="ratingstart">
  <Star1 />
  </div>

<p className="names">Mouhib feedback</p>
<p className="dates" >18 juin 2025</p>
<p className="commentaires">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus autem facere repudiand.</p>
<div className="links2">
  <div className="insta2">
    <img  alt="" src={instagram}></img>
    <p>Hamzaoui Mouhib</p>
  </div>
  <div className="web">
    <img  alt="" src={careerhive}></img>
    <p>CareerHive.com</p>
  </div>
</div>
    </div>
   </div>
</FadeContent>


   <div className="third-review">
    <div className="coverPhoto">
      <img src="https://i.pinimg.com/736x/b5/4c/16/b54c16d83ca66cd5c78098d62c985350.jpg" alt="" />
    </div>
    <div className="cmt2">
      <div className="header">
       <div className="namess">
<div className="rating3">
   <Star1 />
   </div>
       
       <p>Adem feedback</p>
       <span>13 juin 2018</span>
      <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h6>
     
      <div className="link3">
        <div className="insta3">
        <img src={instagram}></img>
        <p>Hamzaoui Adem</p>
        </div>
        <div className="insta3">
          <img src={careerhive} alt="" />
          <p>CareerHive.com</p>
        </div>
         
        </div>
       </div>
       
        <div className="revieww" >
<p>Review</p>

        </div>
       
      </div>
     
    </div>
  </div>
  </div>
  <div className="down-section">

    <div className="forth">
      <div className="profileimg">
        <img src="https://i.pinimg.com/736x/f0/6c/36/f06c36b05487f19dd6641c2b4a3f7d74.jpg" alt="" />
      </div>
      <div className="review4">
        <div className="rt3" >
        <Star1 />
        </div>
      
        <div className="name3">
          <div className="zzz">
          <p>Ahmed Feedback</p>
          <span>Review</span>
          </div>
        
        <span>
          12 mai 2020
        </span>
        <h6>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas sapiente mollitia atque optio dolor. 
        </h6>
        <div className="links4">
      <div className="insta4">
        <img src={instagram} alt="" />
        <p>
          Hamzaoui Ahmed
        </p>
      </div>
      <div className="web4">
        <img src={careerhive} alt="" />
        <p>CareerHive.com</p>
      </div>
     </div>
      </div>
      </div>
  
    </div>
    <div className="fifth">
      <div className="img5">
        <img src="https://i.pinimg.com/736x/fe/c1/9b/fec19b03d8e989172a938ac327035316.jpg" alt="" />
      </div>
      <div className="links5">
        <div className="infos5">
          <div className="insta5">
          <img src={insta2} alt="" />
          <p>Salman Feedback</p>
          </div>
        <div className="web5" >
        <img src={careerhive} alt="" />
        <p>CareerHive.com</p>
        </div>
       
        </div>
       
        <div className=" text5">
          <div className="feedback5">
            <div className="start5">
              <Star1 />
            </div>
            <p>Ayoub feeback</p>
            <span>22 may 2024</span>
          </div>
<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nostrum ducimus placeat cum </p>
        </div>
      </div>
    </div>
    <div className="Six">
      <div className="text6">
        <div className="rt6">
          <Star1 />
        </div>
        <p>Mazouzi Feedback</p>
        <span>
          11 avril 2018
        </span>
        <h6>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit quae aspernatur 
        </h6>
        <div className="social6">
          <SocialLink />
        </div>
      </div>
      <div className="img6">
        <img src="https://i.pinimg.com/736x/36/17/74/361774ac3876e1fa8356e37853226cc0.jpg" alt="" />
      </div>
    </div>
  </div>
</ClickSpark>
    
 

     
    </Box>
  );
};

export default FAQ;
