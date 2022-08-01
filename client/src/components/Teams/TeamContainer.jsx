import React, { useEffect } from "react";
import { Teams } from "../Teams/Teams";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";
import { useAuth0 } from "@auth0/auth0-react";

export function TeamsContainer() {
  const { user, isLoading } = useAuth0();
  

  
  return (
    <>
      {isLoading ? null : (
        <div>
          <VerticalNavbar />
          <Teams email={user.email} />
        </div>
      )}
    </>
  );
}
