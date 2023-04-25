import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext  } from "../../contexts/cart.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from "./navigation.styles";


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  
  // const signOutHandler = async () => {
  //   await SignOutUser();
  //   setCurrentUser(null);
  // }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/"><CrwnLogo className="logo"></CrwnLogo></LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          {
            currentUser? (<NavLink as="span" onClick={SignOutUser}>SIGN OUT</NavLink>):(
              <NavLink to="/auth">SIGN IN</NavLink>
            )
          }
          <CartIcon/>
        </NavLinks>
         { isCartOpen && <CartDropdown/> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
