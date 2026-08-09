import './Links.css';
import { Link } from 'react-router-dom';

 

const MainAdmin = () => {
  return (
    <div>
      <div className="card12">
        <div className="stones-container12">

          <div className="stone-wrapper12">
            <Link to="/Team">
              <img
                className="stone12"
                src="https://cdn-icons-png.flaticon.com/256/12313/12313505.png"
                alt="Team Managed"
              />
              <div style={{ color: "#4488ff" }} className="stone-name12">
                Team Managed
              </div>
            </Link>
          </div>

          <div className="stone-wrapper12">
            <Link to="/FAQ">
              <img
                className="stone12"
                src="https://cdn-icons-png.flaticon.com/512/2065/2065224.png"
                alt="Team Progress"
              />
              <div style={{ color: "#ffdd44" }} className="stone-name12">
                Team Review
              </div>
            </Link>
          </div>

          <div className="stone-wrapper12">
            <Link to="/Certificates">
              <img
                className="stone12"
                src="https://cdn-icons-png.flaticon.com/512/6140/6140478.png"
                alt="Certifications"
              />
              <div style={{ color: "#ff4444" }} className="stone-name12">
                Certifications
              </div>
            </Link>
          </div>

          <div className="stone-wrapper12">
            <Link to="/Contacts">
              <img
                className="stone12"
                src="https://cdn-icons-png.flaticon.com/512/2808/2808383.png"
                alt="Complete Projects"
              />
              <div style={{ color: "#aa44ff" }} className="stone-name12">
                Acounts Verifications
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
