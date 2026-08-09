import { useState, useEffect } from 'react';
import './profilecard6.css';

const ProfileCard6 = ({ onHide }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const handleVerify6 = () => {
    setAlertMessage({ type: 'success', text: 'This account has been verified successfully.' });
    setShowCard(false);
    setTimeout(() => {
      onHide();
    }, 3000);
  };

  const handleDelete6 = () => {
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
        <div className={`alert ${alertMessage.type}`}>
          {alertMessage.text}
        </div>
      )}

      {showCard && (
        <div className="">
          <div className="card-verif6">
            <div className="icons6">
              <button className="accept-verif6" title="Accept" onClick={handleVerify6}>
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
                  className="lucide lucide-check"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button className="accept-verif6" title="Reject" onClick={handleDelete6}>
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
                  className="lucide lucide-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="profile-pic-verif6">
              <img
                src="https://i.pinimg.com/736x/71/3d/21/713d219a6315857df7d3f4148a8d5088.jpg"
                alt=""
              />
            </div>

            <div className="bottom-verif6">
              <div className="content-verif6">
                <span className="name-verif6">Hamzaoui Mouhib</span>
                <span className="about-me-verif6">
                  Creative developer building responsive, user-friendly web applications.
                </span>
              </div>
              <div className="bottom-bottom-verif6">
                <div className="social-links-container-verif6">
                  <p>Human Resources</p>
                </div>
                <button className="buttonverif6">Verifier</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard6;
