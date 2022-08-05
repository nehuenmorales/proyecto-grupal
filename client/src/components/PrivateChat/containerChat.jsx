import react from 'react';
import PrivateChat from "./PrivateChat"
import { useAuth0} from "@auth0/auth0-react";



export default function ContainerChat(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        isLoading? null
        :
        <PrivateChat user={user} />
    )
}