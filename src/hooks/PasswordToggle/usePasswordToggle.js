import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);

    const Icon = (
        <FontAwesomeIcon
            icon={visible ? ["fas", "eye-slash"] : ["fas", "eye"]}
            onClick={() => setVisibility(visiblity => !visiblity)}
        />
    );

    const InputType = visible ? "text" : "password";

    return [InputType, Icon];
}

export default usePasswordToggle;