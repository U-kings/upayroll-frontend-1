import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../values/colors";

const ErrorBox = ({ errorMessage, fixed }) => {
  const Errorbox = fixed ? (
    <div className="error__msg2">
      <p>
        <FontAwesomeIcon
          style={{
            fontSize: "1.5rem",
            color: `${COLORS.red}`,
            marginRight: ".5rem",
            marginTop: ".5rem",
          }}
          icon={["fas", "info-circle"]}
        />
        {errorMessage}
      </p>
    </div>
  ) : (
    <div className="error__msg">
      <p>
        <FontAwesomeIcon
          style={{
            fontSize: "1.5rem",
            color: `${COLORS.red}`,
            marginRight: ".5rem",
            marginTop: ".5rem",
          }}
          icon={["fas", "info-circle"]}
        />
        {errorMessage}
      </p>
    </div>
  );
  const [error, setError] = useState(Errorbox);

  useEffect(() => {
    let timeoutId;

    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
      }, 6000);
    }

    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line

  }, [error]);
  
  return (
    <div
      style={{
        display: errorMessage ? "block" : "none",
      }}
    >
      {error}
    </div>
  );
};

export default ErrorBox;
