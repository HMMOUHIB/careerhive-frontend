import { useState, useEffect } from 'react';
import './profilecard.css';

const ProfileCard = ({ onHide }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCard, setShowCard] = useState(true); // 👈 New local state

  const handleVerify = () => {
    setAlertMessage({ type: 'success', text: 'This account has been verified successfully.' });
    setShowCard(false); // 👈 Hide card immediately
    setTimeout(() => {
      onHide(); // 👈 Call parent hide after alert disappears
    }, 3000);
  };

  const handleDelete = () => {
    setAlertMessage({ type: 'error', text: 'This account has been deleted.' });
    setShowCard(false); // 👈 Hide card immediately
    setTimeout(() => {
      onHide(); // 👈 Call parent hide after alert disappears
    }, 3000);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null); // Hide alert after 3 seconds
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
          <div className="card-verif">
            <div className="icons">
              {/* ✅ VERIFY BUTTON (Green) */}
              <button className="accept-verif" title="Accept" onClick={handleVerify}>
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

              {/* ❌ DELETE BUTTON (Red) */}
              <button className="accept-verif" title="Reject" onClick={handleDelete}>
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

            <div className="profile-pic-verif">
              <img
                src="https://i.pinimg.com/736x/71/3d/21/713d219a6315857df7d3f4148a8d5088.jpg"
                alt=""
              />
            </div>

            <div className="bottom-verif">
              <div className="content-verif">
                <span className="name-verif">Hamzaoui Mouhib</span>
                <span className="about-me-verif">
                  Creative developer building responsive, user-friendly web applications.
                </span>
              </div>
              <div className="bottom-bottom-verif">
                <div className="social-links-container-verif">
                  <p>Employee</p>
                </div>
                <button className="buttonverif">Verifier</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
