import './certifications3.css';
import react from '../react.png'

const Certificate3 = ({ certName3 }) => {
  return (
    <div className=''>
      <div className="container3 noselect3">
        <div className="canvas3">
          {/* Tracker Grid Elements */}
          <div className="tracker3 tr-13" />
          <div className="tracker3 tr-23" />
          <div className="tracker3 tr-33" />
          <div className="tracker3 tr-43" />
          <div className="tracker3 tr-53" />
          <div className="tracker3 tr-63" />
          <div className="tracker3 tr-73" />
          <div className="tracker3 tr-83" />
          <div className="tracker3 tr-93" />
          <div className="tracker3 tr-103" />
          <div className="tracker3 tr-113" />
          <div className="tracker3 tr-123" />
          <div className="tracker3 tr-133" />
          <div className="tracker3 tr-143" />
          <div className="tracker3 tr-153" />
          <div className="tracker3 tr-163" />
          <div className="tracker3 tr-173" />
          <div className="tracker3 tr-183" />
          <div className="tracker3 tr-193" />
          <div className="tracker3 tr-203" />
          <div className="tracker3 tr-213" />
          <div className="tracker3 tr-223" />
          <div className="tracker3 tr-233" />
          <div className="tracker3 tr-243" />
          <div className="tracker3 tr-253" />

          {/* Card Element */}
          <div id="card3">
            <div className="card-content3">
              <div className="card-glare3" />
              <div className="cyber-lines3">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p id="prompt3">
                <img style={{ width: 100 }} src={react} alt="" />
              </p>
              <div className="title3">
                <img style={{ width: 60, marginBottom: 5 }} src={react} alt="" />
                <br />
                {certName3}
                <br />
                <button style={{ background: 'none', color: 'black', cursor: 'pointer', width: 100, fontSize: 20, borderRadius: 50 }}>
                  join
                </button>
              </div>
              <div className="glowing-elements3">
                <div className="glow-13" />
                <div className="glow-23" />
                <div className="glow-33" />
              </div>
              <div className="subtitle3">
                <span style={{ color: 'white', fontWeight: 'bolder' }}>{certName3}</span>
                <span className="highlight3">Gain 1 start</span>
              </div>
              <div className="card-particles3">
                <span />
                <span />
                <span /> <span />
                <span />
                <span />
              </div>
              <div className="corner-elements3">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="scan-line3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certificate3;