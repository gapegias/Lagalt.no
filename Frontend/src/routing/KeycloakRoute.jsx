import { Navigate } from "react-router-dom";
import { ROLES } from "../const/roles";
import keycloak from "../keycloak";

function KeycloakRoute ({ children, redirectTo }) {

    if (!keycloak.authenticated){
        return <Navigate replace to={redirectTo} />
    }

    if (keycloak.hasRealmRole(ROLES.User)){
        return <> {children} </>
    }

}

export default KeycloakRoute;
