import React, { useState, Fragment } from "react";

function Confirm({ children, title, description }) {
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState(null);

  const show = (callback) => (event) => {
    event.preventDefault();
    event = {
      ...event,
      target: { ...event.target, value: event.target.value },
    };

    setOpen(true);
    setCallback(() => () => callback(event));
  };

  const hide = () => {
    setCallback(null);
    setOpen(false);
  };

  const confirm = () => {
    callback();
    hide();
  };

  return (
    <Fragment>
      {children(show)}
      {open && (
        <div className='white-background confirmation border-radius '>
          <div className='position-relative-top padding-left '>
            <h1 className='danger-color'>{title}</h1>
            <p>{description}</p>
          </div>

          <div className='justify-end display-flex margin-top-30  postion-relative-right'>
            <button
              className='margin-right primary-background white-color btn-primary width-xsm md'
              onClick={hide}
            >
              Cancel
            </button>
            <button
              className='danger-background white-color btn-primary  width-xsm md'
              onClick={confirm}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Confirm;
