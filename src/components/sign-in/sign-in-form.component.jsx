// import { useState, useContext } from "react";
import { useState } from "react";
import {
  signInWithGooglePopup,
  SignInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import FormInput from "../form-input/form-input.component";
// import { UserContext } from "../../contexts/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //const { setCurrentUser } = useContext(UserContext);
  //console.log(formFields);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       SignInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch(error.code)  {
        case 'auth/wrong-password':
          alert('Incorrect password for email')
        break;
        case 'auth/user-not-found':
          alert('No user associated with this email')
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    //const response = await signInWithGooglePopup();
    //Destructured
   await signInWithGooglePopup();
}


  return (
    <div className="sign-up-container">
    <h2>I already have an account</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={ BUTTON_TYPE_CLASSES.google } onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
