
import { useState, useEffect } from "react";
import "./message.css";

const Message = ({ msg, bgColor, textColor }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }, []);

  const styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    zIndex: 100,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: showMessage ? 1 : 0,
    pointerEvents: showMessage ? "auto" : "none",
  };

  return (
    <div style={styles}>
      <p className="paragrapgh-message">{msg}</p>
    </div>
  );
};

export default Message;
