import React from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import RentModal from "./RentModal";

const ModalWrapper = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
    </>
  );
};

export default ModalWrapper;
