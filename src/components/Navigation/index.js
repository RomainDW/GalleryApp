import React from "react";
import { LinksAuth, LinksNonAuth } from "./Links";

import { AuthUserContext } from "../Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => <LinksAuth />;

const NavigationNonAuth = () => <LinksNonAuth />;

export default Navigation;
