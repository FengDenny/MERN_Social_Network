export const hideAlert = () => {
  // select .alert class and remove it
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};
// if type is success or error
export const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  //   include the markup in body element (top of page)
  // inside of the body but right after the beginning
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

  //   hide the alert after 5sec
  window.setTimeout(hideAlert, 5000);
};

// login alert
export const showLoginAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert-login alert alert--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
