import React from "react";
// Final 2 - Route, Redirect ismini silip navigate yaptık 
// import { Route, Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
//end of final 2 
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
import { useUserContext } from "../context/user_context";

//159 -private içine ulaşmak için children yazıyor(yani checkout bu children olan şey aslında) ve rest of the operators rest operator spread ile karıştırma aşağıdaki rest ise aslında spread operatoru başta collecting them sonra spreading them , render ise prop, sonra featured products a git 

//final 3 
// const PrivateRoute = ({ children, ...rest }) => {
//   const { myUser } = useUserContext();
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return myUser ? children : <Redirect to="/"></Redirect>;
//       }}
//     ></Route>
//   ); //böylece url'i local host search bar da elle değiştirsen bile redirect to home otomatik
// };

//end of 159 

const PrivateRoute= ({children })=>{
  const {user}= useAuth0
  if (!user) {
    return < Navigate to="/" />
  }
  return children
}
//end of final 3  ardından  single product page a git 





export default PrivateRoute;
