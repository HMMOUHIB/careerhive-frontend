import { useState, useEffect } from 'react';
import './profilecard2.css';

const ProfileCard2 = ({ onHide }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const handleVerify2 = () => {
    setAlertMessage({ type: 'success', text: 'This account has been verified successfully.' });
    setShowCard(false);
    setTimeout(() => {
      onHide(); // Notify parent to hide the card
    }, 3000);
  };

  const handleDelete2 = () => {
    setAlertMessage({ type: 'error', text: 'This account has been deleted.' });
    setShowCard(false);
    setTimeout(() => {
      onHide(); // Notify parent to hide the card
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
        <div className={`alert2 ${alertMessage.type}`}>
          {alertMessage.text}
        </div>
      )}

      {showCard && (
        <div className="container2">
          <div className="card-verif2">
            <div className="icons2">
              <button className="accept-verif2" title="Accept" onClick={handleVerify2}>
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
                  className="lucide lucide-check2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button className="accept-verif2" title="Reject" onClick={handleDelete2}>
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
                  className="lucide lucide-x2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="profile-pic-verif2">
              <img
                src="https://i.pinimg.com/736x/37/9c/53/379c53a103b0b98eaeac85177f2c6596.jpg"
                alt=""
              />
            </div>

            <div className="bottom-verif2">
              <div className="content-verif2">
                <span className="name-verif2">Hamzaoui Adem</span>
                <span className="about-me-verif2">
                  Creative developer building responsive, user-friendly web applications.
                </span>
              </div>
              <div className="bottom-bottom-verif2">
                <div className="social-links-container-verif2">
                  <p>Employee</p>
                </div>
                <button className="buttonverif2">Verifier</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard2;
