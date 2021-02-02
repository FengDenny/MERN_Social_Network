const cookieStorage = {
  getItem: (key) => {
    // map each cookie strring into an object
    const cookie = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});

    return cookie[key];
  },
  setItem: (key, value) => {
    document.cookie = `${key}=${value}`;
  },
};
const storageType = cookieStorage;
const consetProprtyName = "jc";
const shouldShowPopup = () => !storageType.getItem(consetProprtyName);
const saveToStorage = () => storageType.setItem(consetProprtyName, true);

export const loadCookiePopup = () => {
  window.onload = () => {
    const acceptFn = (event) => {
      saveToStorage(storageType);
      consentPopup.classList.add("hidden");
    };
    const consentPopup = document.getElementById("consent-popup");
    const acceptBtn = document.getElementById("accept");
    acceptBtn.addEventListener("click", acceptFn);

    if (shouldShowPopup(storageType)) {
      setTimeout(() => {
        consentPopup.classList.remove("hidden");
      }, 2000);
    }
  };
};
