import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import openModal from "../../actions/openModal";

function Modal() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.siteModal.openClose);
  const modalContent = useSelector((state) => state.siteModal.content);

  const closeModal = (e) => {
    if (e.target.id === "modal" || e.target.id === "closeModal")
      dispatch(openModal("closed", ""));
    // document.querySelector("body").classList.add("out");
  };

  return (
    <Fragment>
      {modalOpen === "open" && (
        <div id='modal' onClick={closeModal} className='site-modal'>
          <div id='modal-content' className='modal-content'>
            <div>
              <span id='closeModal' onClick={closeModal} className='close'>
                &times;
              </span>
            </div>
            <div>{modalContent}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Modal;
