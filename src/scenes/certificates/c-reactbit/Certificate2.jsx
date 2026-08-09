import './certifications2.css';


const Certificate2 = ({ certName2 }) => {
  return (
    <div className=''>
      <div className="container2 noselect2">
        <div className="canvas2">
           {/* Tracker Grid Elements */}
           <div className="tracker2 tr-12" />
          <div className="tracker2 tr-22" />
          <div className="tracker2 tr-32" />
          <div className="tracker2 tr-42" />
          <div className="tracker2 tr-52" />
          <div className="tracker2 tr-62" />
          <div className="tracker2 tr-72" />
          <div className="tracker2 tr-82" />
          <div className="tracker2 tr-92" />
          <div className="tracker2 tr-102" />
          <div className="tracker2 tr-112" />
          <div className="tracker2 tr-122" />
          <div className="tracker2 tr-132" />
          <div className="tracker2 tr-142" />
          <div className="tracker2 tr-152" />
          <div className="tracker2 tr-162" />
          <div className="tracker2 tr-172" />
          <div className="tracker2 tr-182" />
          <div className="tracker2 tr-192" />
          <div className="tracker2 tr-202" />
          <div className="tracker2 tr-212" />
          <div className="tracker2 tr-222" />
          <div className="tracker2 tr-232" />
          <div className="tracker2 tr-242" />
          <div className="tracker2 tr-252" />

          <div id="card2">
            <div className="card-content2">
              <div className="card-glare2" />
              <div className="cyber-lines2">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p id="prompt2">
                <img style={{ width: 100 }} src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" alt="" />
            
              </p>
            
              <div className="title2">
                <img style={{ width: 70, marginBottom: 5 }} src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" alt="" />
                <br />
                {certName2}
                <br />
                <button style={{ background: 'none', color: 'black', cursor: 'pointer', width: 100, fontSize: 20, borderRadius: 50 }}>
                  join
                </button>
              </div>
              <div className="glowing-elements2">
                <div className="glow-12" />
                <div className="glow-22" />
                <div className="glow-32" />
              </div>
              <div className="subtitle2">
                <span style={{ color: 'white', fontWeight: 'bolder' }}>{certName2}</span>
                <span className="highlight2">Gain 1 start  </span>
              </div>
              <div className="card-particles2">
                <span />
                <span />
                <span /> <span />
                <span />
                <span />
              </div>
              <div className="corner-elements2">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="scan-line2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certificate2;