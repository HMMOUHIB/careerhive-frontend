import './InfiniteMenu.css';

const InfiniteMenu = () => {
  return (
    <div>
     <div className="cardcc">
  <div className="contentcc">
   
  <div className="wordcc">
  <div style={{ position: 'relative',  }}>
    <img
      className="coverphoto"
      src="https://i.pinimg.com/736x/9f/ac/56/9fac56431cf71706662ad9946d60bd01.jpg"
      style={{ width: '100%', height: '20%',marginTop:-40 }}
      alt=""
    />
    <img
      className="profileimg"
      style={{
        width: 60,
        borderRadius: 80,
        boxShadow: '0px 0px 10px black',
        position: 'absolute',
        left: '50%',

        transform: 'translateX(-50%) translateY(80%)',
        zIndex: 10,
      }}
      alt=""
      src="https://ih1.redbubble.net/image.2176193181.8185/raf,360x360,075,t,fafafa:ca443f4786.u2.jpg"
    />
  </div>
  <div className='infos' style={{}}>
  <p style={{fontSize:20 }} >Travis Scott</p>
  <span>Employee</span>
  <div className='socials'>
    <img src='https://cdn-icons-png.flaticon.com/128/1384/1384014.png'></img>
    <img src='https://cdn-icons-png.flaticon.com/128/4494/4494468.png'></img>
    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png'></img>
  </div>
  </div>

</div>

    <div className="wordcc">
    <div style={{ position: 'relative',  }}>
    <img
      className="coverphoto"
      src="https://i.pinimg.com/736x/65/f2/22/65f2220d635e0e88967c7404cbe6dbfd.jpg"
      style={{ width: '100%', height: '20%',marginTop:-58}}
      alt=""
    />
    <img
      className="profileimg"
      style={{
        width: 60,
        borderRadius: 80,
        boxShadow: '0px 0px 10px black',
        position: 'absolute',
        left: '50%',

        transform: 'translateX(-50%) translateY(90%)',
        zIndex: 10,
      }}
      alt=""
      src="https://i.redd.it/moigifebc3341.jpg"
    />
  </div>
  <div className='infos' style={{marginTop:20}}>
  <p style={{fontSize:20 }} >Rick Sanshez</p>
  <span>RH</span>
  <div className='socials'>
    <img src='https://cdn-icons-png.flaticon.com/128/1384/1384014.png'></img>
    <img src='https://cdn-icons-png.flaticon.com/128/4494/4494468.png'></img>
    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png'></img>
  </div>
  </div>
    </div>
    <div className="wordcc">
    <div style={{ position: 'relative',  }}>
    <img
      className="coverphoto"
      src="https://i.pinimg.com/736x/62/2b/a7/622ba7faea659d5be934f520d3b32ec3.jpg"
      style={{ width: '100%', height: '20%',marginTop:-46 }}
      alt=""
    />
    <img
      className="profileimg"
      style={{
        width: 60,
        borderRadius: 80,
        boxShadow: '0px 0px 10px black',
        position: 'absolute',
        left: '50%',
      marginBottom:0,
        transform: 'translateX(-50%) translateY(80%)',
        zIndex: 10,
      }}
      alt=""
      src="https://i.pinimg.com/736x/55/f1/06/55f106805a6fce366f50988cedf3928c.jpg"
    />
  </div>
  <div className='infos' style={{}}>
  <p style={{fontSize:20 }} >Baby Keem</p>
  <span>Manager</span>
  <div className='socials'>
    <img src='https://cdn-icons-png.flaticon.com/128/1384/1384014.png'></img>
    <img src='https://cdn-icons-png.flaticon.com/128/4494/4494468.png'></img>
    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png'></img>
  </div>
  </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default InfiniteMenu;
