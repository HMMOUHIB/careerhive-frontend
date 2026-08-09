import './Welcomeback.css';
import Lottie from 'react-lottie';
import manager from '../../Lottie/manager.json';
const Welcomeback = () => {
     // Define Lottie options
  const lottieOptions = {
    loop: true, // Make the animation loop
    autoplay: true, // Make it autoplay
    animationData: manager, // Your animation JSON data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Keeps the animation centered and scalable
    },
  };
  return (
    <div className=''>
        
        <div className="m2">
    <div className="logo">
    <div className='text'>
       <p>Welcome back Mr Wissem </p> 
       
    </div>
    <div className='anim'>
           {/* Lottie animation here */}
           <Lottie options={lottieOptions} height={120} width={120} />
    </div>
  
  
    </div>
  </div>
</div>


  )
}

export default Welcomeback