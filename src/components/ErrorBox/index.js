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
    setTimeout(() => {
      if (error) {
        setError(null);
      }
    }, 5000);
    // eslint-disable-next-line
  }, []);
  return <>{error}</>;
};

export default ErrorBox;
