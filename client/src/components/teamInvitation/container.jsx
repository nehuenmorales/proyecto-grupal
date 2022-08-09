import React from "react";
import TeamInvitation from './teamInvitation'
import { useAuth0 } from "@auth0/auth0-react";


export default function InvitationAcept({ match }) {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <>
            {isLoading
                ? null
                :
                <TeamInvitation match={match} email={user.email} />
            }
        </>
    )
}