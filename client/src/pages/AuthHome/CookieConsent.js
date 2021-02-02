import { loadCookiePopup } from "../../js/cookieBanner";

export const showCookieConsent = () => {
  loadCookiePopup();
  const markup = `<div id="consent-popup" class="hidden">
                    <p class="consent-p secondary-heading">MSNwork. uses cookies to give users the best experience to interact with our website.
                    <button id="accept" class="consent-btn secondary-heading " >OK</button> </p>
                    </div>`;
  document.querySelector("body").insertAdjacentHTML("beforeend", markup);
};
