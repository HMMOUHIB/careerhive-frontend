import { useState, useEffect } from 'react';
import './profilecard4.css';

const ProfileCard4 = ({ onHide }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const handleVerify4 = () => {
    setAlertMessage({ type: 'success', text: 'This account has been verified successfully.' });
    setShowCard(false);
    setTimeout(() => {
      onHide();
    }, 3000);
  };

  const handleDelete4 = () => {
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
        <div className={`alert4 ${alertMessage.type}`}>
          {alertMessage.text}
        </div>
      )}

      {showCard && (
        <div className="container4">
          <div className="card-verif4">
            <div className="icons4">
              {/* ✅ VERIFY BUTTON */}
              <button className="accept-verif4" title="Accept" onClick={handleVerify4}>
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
              <button className="accept-verif4" title="Reject" onClick={handleDelete4}>
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

            <div className="profile-pic-verif4">
              <img
                src="https://i.pinimg.com/736x/58/c5/5a/58c55a5d36d89c6b198112bf95db24c4.jpg"
                alt=""
              />
            </div>

            <div className="bottom-verif4">
              <div className="content-verif4">
                <span className="name-verif4">Hamzaoui Mouhib</span>
                <span className="about-me-verif4">
                  Creative developer building responsive, user-friendly web applications.
                </span>
              </div>
              <div className="bottom-bottom-verif4">
                <div className="social-links-container-verif4">
                  <p>Human Resources</p>
                </div>
                <button className="buttonverif4">Verifier</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard4;
