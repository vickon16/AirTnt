import React from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import RentModal from "./RentModal";
import SearchModal from "./SearchModal";

const ModalWrapper = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SearchModal />
    </>
  );
};

export default ModalWrapper;
