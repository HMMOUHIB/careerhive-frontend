import { useState, useEffect } from 'react';
import './profilecard3.css';

const ProfileCard3 = ({ onHide }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const handleVerify3 = () => {
    setAlertMessage({ type: 'success', text: 'This account has been verified successfully.' });
    setShowCard(false);
    setTimeout(() => {
      onHide();
    }, 3000);
  };

  const handleDelete3 = () => {
    setAlertMessage({ type: 'error', text: 'This account has been deleted.' });
    setShowCard(false);
    setTimeout(() => {
      onHide();
    }, 3000);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <>
      {alertMessage && (
        <div className={`alert3 ${alertMessage.type}`}>
          {alertMessage.text}
        </div>
      )}

      {showCard && (
        <div className="container3">
          <div className="card-verif3">
            <div className="icons3">
              <button className="accept-verif3" title="Accept" onClick={handleVerify3}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34c759"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button className="accept-verif3" title="Reject" onClick={handleDelete3}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff3b30"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x3"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="profile-pic-verif3">
              <img
                src="https://i.pinimg.com/736x/58/b1/29/58b12914d35526f0b0c88b9ccfe5c34d.jpg"
                alt=""
              />
            </div>

            <div className="bottom-verif3">
              <div className="content-verif3">
                <span className="name-verif3">Hamzaoui Adem</span>
                <span className="about-me-verif3">
                  Creative developer building responsive, user-friendly web applications.
                </span>
              </div>
              <div className="bottom-bottom-verif3">
                <div className="social-links-container-verif3">
                  <p>Employee</p>
                </div>
                <button className="buttonverif3">Verifier</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard3;
