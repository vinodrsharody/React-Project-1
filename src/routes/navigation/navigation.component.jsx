import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext  } from "../../contexts/cart.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";


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
      <div className="navbar">
        <Link className="logo-link" to="/"><CrwnLogo className="logo"></CrwnLogo></Link>
        <div className="navmenu">
          <Link className="nav-link" to="/shop">SHOP</Link>
          <Link className="nav-link" to="/contact">CONTACT</Link>
          {
            currentUser? (<span className="nav-link" onClick={SignOutUser}>SIGN OUT</span>):(
              <Link className="nav-link" to="/auth">SIGN IN</Link>
            )
          }
          <CartIcon/>
        </div>
         { isCartOpen && <CartDropdown/> }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
