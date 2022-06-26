import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  //145
  const { isAuthenticated, loginWithRedirect, logout, isLoading,user } = useAuth0();
//reducer kullanmıyor bir değer var burada diye ve invoke edecek setMyuseri   useeffect içinde
 const [myUser,setMyUser]= useState(null)

  useEffect(() => {
    //150  - sonra tekrar cart buttonsa git to set up conditions 
    if(isAuthenticated){
      setMyUser (user)
    }  else {
      setMyUser(false)
    }
    
    // console.log(`isAuthenticated:${isAuthenticated}`);
    // console.log(`isLoading:${isLoading}`);
  }, [isAuthenticated]);

  //end of 145 - then  //146  pas down the functions to value below instead of  user context  words value='user context' - ardından  login logout buttonları auth0,(cart buttonsa git )
  return (
    <UserContext.Provider value={{ loginWithRedirect, logout,myUser }}>
      {children}
    </UserContext.Provider>
  );
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
