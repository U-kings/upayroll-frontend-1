import { Button } from "@mui/material";
import React from "react";
// import LoadingSpinner from "../../LoadingSpinner";

const ButtonComp = ({
  childern,
  color,
  disabled,
  size,
  sx,
  variant,
  ButtonStartIcon,
  buttonIcon,
  type,
  onSubmit,
  onClick,
}) => {
  return (
    <Button
      disableElevation
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      type={type}
      // style={{boxShadow: "none",}}
      sx={sx}
      startIcon={ButtonStartIcon}
      endIcon={buttonIcon}
      onSubmit={onSubmit}
      onClick={onClick}
      children={childern}
    />
  );
};

export default ButtonComp;
