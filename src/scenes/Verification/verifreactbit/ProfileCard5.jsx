import { useState, useEffect } from 'react';
import './profilecard5.css';

const ProfileCard5 = ({ onHide }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const handleVerify5 = () => {
    setAlertMessage({ type: 'success', text: 'This account has been verified successfully.' });
    setShowCard(false);
    setTimeout(() => {
      onHide();
    }, 3000);
  };

  const handleDelete5 = () => {
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
        <div className={`alert5 ${alertMessage.type}5`}>
          {alertMessage.text}
        </div>
      )}

      {showCard && (
        <div className="card-wrapper5">
          <div className="card-verif5">
            <div className="icons5">
              {/* ✅ VERIFY BUTTON */}
              <button className="accept-verif5" title="Accept" onClick={handleVerify5}>
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

              {/* ❌ DELETE BUTTON */}
              <button className="accept-verif5" title="Reject" onClick={handleDelete5}>
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

            <div className="profile-pic-verif5">
              <img
                src="https://i.pinimg.com/736x/dc/d4/46/dcd4465a7fe461c16ff93bcfa8829a25.jpg"
                alt=""
              />
            </div>

            <div className="bottom-verif5">
              <div className="content-verif5">
                <span className="name-verif5">Hamzaoui Ahmed</span>
                <span className="about-me-verif5">
                  Creative developer building responsive, user-friendly web applications.
                </span>
              </div>
              <div className="bottom-bottom-verif5">
                <div className="social-links-container-verif5">
                  <p>Human Resources</p>
                </div>
                <button className="buttonverif5">Verifier</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard5;
