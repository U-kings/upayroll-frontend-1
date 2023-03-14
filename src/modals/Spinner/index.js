import React from "react";
import { ClapSpinner } from "react-spinners-kit";
import { COLORS } from "../../values/colors";
import { Modal, ModalContainer } from "../../styles/SpinnerElements";

const Spinner = () => {
  return (
    <>
      <Modal>
        <ModalContainer>
          <ClapSpinner
            size={40}
            // color="#686769"
            // color={COLORS.blue2}
            frontColor={COLORS.white4}
            // leftColor={COLORS.blue3}
            // secondColor={COLORS.blue3}
            // topColor={COLORS.red}
            // backColor={COLORS.black}
            // loading={loading}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Spinner;
