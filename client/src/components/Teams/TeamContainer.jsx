import React, { useEffect } from "react";
import { Teams } from "../Teams/Teams";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Flex,
  Center
}from "@chakra-ui/react"

export function TeamsContainer() {
  const { user, isLoading } = useAuth0();
  

  
  return (
    <Flex>
      <VerticalNavbar />
      {isLoading ? null : (
        <div>
          <Teams email={user.email} />
        </div>
      )}
    </Flex>
  );
}
