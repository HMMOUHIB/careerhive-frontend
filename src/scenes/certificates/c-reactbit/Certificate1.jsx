import './certificate1.css';

const Certificate1 = ({ certName }) => {
  return (
    <div className=''>
      <div className="container1 noselect1">
        <div className="canvas1">
             {/* Tracker Grid Elements */}
          <div className="tracker1 tr-11" />
          <div className="tracker1 tr-21" />
          <div className="tracker1 tr-31" />
          <div className="tracker1 tr-41" />
          <div className="tracker1 tr-51" />
          <div className="tracker1 tr-61" />
          <div className="tracker1 tr-71" />
          <div className="tracker1 tr-81" />
          <div className="tracker1 tr-91" />
          <div className="tracker1 tr-101" />
          <div className="tracker1 tr-111" />
          <div className="tracker1 tr-121" />
          <div className="tracker1 tr-131" />
          <div className="tracker1 tr-141" />
          <div className="tracker1 tr-151" />
          <div className="tracker1 tr-161" />
          <div className="tracker1 tr-171" />
          <div className="tracker1 tr-181" />
          <div className="tracker1 tr-191" />
          <div className="tracker1 tr-201" />
          <div className="tracker1 tr-211" />
          <div className="tracker1 tr-221" />
          <div className="tracker1 tr-231" />
          <div className="tracker1 tr-241" />
          <div className="tracker1 tr-251" />

          <div id="card1">
            <div className="card-content1">
              <div className="card-glare1" />
              <div className="cyber-lines1">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p id="prompt1">
                <img style={{ width: 120 }} src="https://symfony.com/logos/symfony_black_02.png" alt="" />
                
              </p>
              <div className="title1">
                <img style={{ width: 90, marginBottom: 10}} src="https://symfony.com/logos/symfony_black_02.png" alt="" />
                <br />
                {certName}
                Bosst Ur career And Gain 1 Start
                <br />
                <button className='ccbtn' style={{ background: 'none', color: 'black', cursor: 'pointer', width: 100, fontSize: 20, borderRadius: 50 }}>
                  join
                </button>
              </div>
              <div className="glowing-elements1">
                <div className="glow-11" />
                <div className="glow-21" />
                <div className="glow-31" />
              </div>
              <div className="subtitle1">
                <span style={{ color: 'white', fontWeight: 'bolde' }}>{certName}symfony certificate </span>
                <span className="highlight1">Gain 1 start</span>
              </div>
              <div className="card-particles1">
                <span />
                <span />
                <span /> <span />
                <span />
                <span />
              </div>
              <div className="corner-elements1">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="scan-line1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certificate1;
