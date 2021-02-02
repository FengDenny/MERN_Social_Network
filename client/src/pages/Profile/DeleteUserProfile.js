import React from "react";
import Confirm from "./Confirm";
function DeleteUserProfile() {
  const handleSubmit = () => alert("Submitted");
  return (
    <div>
      <Confirm
        title='PROFILE DELETION'
        description='Are you sure you want to delete your profile?'
      >
        {(confirm) => (
          <div className='inline-block margin-top'>
            <button
              onClick={confirm(handleSubmit)}
              className='danger-background white-color btn-primary width-md md '
            >
              Delete Profile
            </button>
          </div>
        )}
      </Confirm>
    </div>
  );
}

export default DeleteUserProfile;
