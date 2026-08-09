import './RotatingText.css';

const RotatingText = () => {
  return (
    <div className="main-cnt">
      <div className="loader">
        <div className="pp">
          <img
            style={{ width: 30 }}
            src="https://cdn-icons-png.flaticon.com/512/9552/9552379.png"
            alt="Icon"
          />
          <button style={{ fontSize: 20, backgroundColor: 'white' }}>
            Caereerhive
          </button>
        </div>
        <div className="words">
          <div className="words-inner">
            <span className="word">Networking</span>
            <span className="word">Adaptability</span>
            <span className="word">Persistence</span>
            <span className="word">Innovation</span>
            <span className="word">Networking</span> {/* Loop back for smooth repeat */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingText;