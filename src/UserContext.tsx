import { createContext } from "react";
import { User } from "./types/users/User";


interface UserContextType {
      userContext: User;
      setUserContext: React.Dispatch<React.SetStateAction<User>>;
    }
    
    const UserContext = createContext<UserContextType>({
      userContext: {
            id: "",
            username: "",
            email: ""
      },
      setUserContext: () => {},
    });
    
    export default UserContext;