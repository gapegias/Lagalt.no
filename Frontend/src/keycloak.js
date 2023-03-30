import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
// import { Navigate } from "react-router";

// function useKeyCloak() {
//   const [keycloak, setKeycloak] = useState(null);

//   useEffect(() => {
//     var initSetting = {
//       checkLoginIframe: false,
//       onLoad: "check-sso",
//       silentCheckSsoRedirectUri:
//         window.location.origin + "/silent-check-sso.html",
//     };
//     var keycloak = Keycloak("/keycloak.json");

//     console.log("before init - authenticated: ", keycloak.authenticated);

//     keycloak.init(initSetting).then((authenticated) => {
//       console.log("init - authenticated");
//       setKeycloak(keycloak);
//     });
//     console.log("afer init - authenticated: ", keycloak.authenticated);
//   }, []);

//   return keycloak;
// }

// export default useKeyCloak;

const keycloak = new Keycloak("/keycloak.json");
/**
 * @description
 * @returns { Promise<void> }
 */

export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
//   const navigate = Navigate();
//   keycloak.onAuthSuccess = function () {
//     Navigate("/");
//   };
  return keycloak.init(config);
};
/** @type { Keycloak } keycloak */
export default keycloak;
