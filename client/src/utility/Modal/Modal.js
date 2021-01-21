import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";

class Modal extends Component {
  state = {};
  closeModal = () => {
    this.props.openModal("closed", "");
  };

  onOverlayClose(e) {
    if (e.target.id === "modal") this.closeModal();
  }

  render() {
    let modalInLineStyle;
    if (this.props.siteModal.openClose === "open") {
      modalInLineStyle = { display: "block" };
    } else {
      modalInLineStyle = { display: "none" };
    }

    return (
      <div
        id='modal'
        onClick={(e) => this.onOverlayClose(e)}
        className='site-modal'
        style={modalInLineStyle}
      >
        <div className='modal-content'>
          <div>
            <span onClick={this.closeModal} className='close'>
              &times;
            </span>
          </div>
          <div>{this.props.siteModal.content}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    siteModal: state.siteModal,
  };
}

function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
    },
    dispatcher
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
