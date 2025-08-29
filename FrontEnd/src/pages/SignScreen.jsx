import React, {  useState, useEffect } from "react";
import ButtonComponent from "../components/buttons/Button";
import Momentum from "../../src/assets/Momentum.png";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import SignIn from "../components/Screens/SignIn";
import SignUp from "../components/Screens/SignUp";
import { motion, AnimatePresence } from 'framer-motion';
import { emailAndPasswordLogin, emailAndPasswordSignUp, facebookSignIn, googleSignIn } from "../utils/AuthLogic";
import { useNavigate } from "react-router-dom";
import { useTaskUI } from "../context/UIContext";




const SignScreen = () => {
  const nav = useNavigate()
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [newUser, setNewUser] = useState(false)
  const { toggleTraitVisibility } = useTaskUI()
  const SwitchAuthMethod = () => {
    setNewUser(prev => !prev)
  }


 const authWithEmailAndPassword = async () => {
  try {
    let result;

    if (newUser) {
      result = await emailAndPasswordSignUp(userName, userEmail, userPassword);

      if (result.success) {
        // Trigger the first-time CharacterCreation2 modal
        toggleTraitVisibility();
        nav("/home"); // optional if you want to stay on home
      } else {
        setError(result.error);
      }
    } else {
      result = await emailAndPasswordLogin(userEmail, userPassword);
      if (result.success) {
        nav("/home"); // normal login
      } else {
        setError(result.error);
      }
    }
  } catch (err) {
    setError("Something went wrong. Try again.", err);
  }
};



useEffect(()=>{
  document.title = "Momentum - Start your Journey";
},[])
  // useEffect(() => {
  //   console.log(agreedToTerms)
  // }, [agreedToTerms])
  return (
    <div id="MainContainer" className="transition-all duration-500 ease-in-out flex flex-col justify-between h-full max-h-3/4">
      <img id="Logo" src={Momentum} alt="Momentum Logo" className="object-contain" />
      <p>{error}</p>
      <div className="flex flex-col gap-5">
        <AnimatePresence mode="wait">
          {newUser ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SignUp
                userName={userName}
                setUserName={setUserName}
                email={userEmail}
                setEmail={setUserEmail}
                password={userPassword}
                setPassword={setUserPassword}
                error={error}
                setError={setError}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={setAgreedToTerms}
              />
            </motion.div>
          ) : (
            <motion.div
              key="signin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SignIn
                email={userEmail}
                setEmail={setUserEmail}
                password={userPassword}
                setPassword={setUserPassword}
                error={error}
                setError={setError}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <div id='ButtonContainer' className="flex flex-col gap-4 justify-end h-1/3">
        <AnimatePresence mode="wait">
          <ButtonComponent
            disabled={newUser ? !agreedToTerms : false}
            variant='gradient'
            gradient={{
              from: '#A5A5A5',
              to: "#B5B5B5",
              deg: 180
            }}
            styles={{
              label: {
                color: 'black'
              }
            }}
            autoContrast
            text={!newUser ? ('Sign In') : ('Sign Up')}
            onClick={authWithEmailAndPassword}
          />
        </AnimatePresence>
        <ButtonComponent
          variant='outline'
          color='white'
          text={newUser ? ('Sign In') : ('Sign Up')}
          onClick={SwitchAuthMethod}
        />

        <div className="w-full flex gap-2">
          <ButtonComponent
            size='xl'
            variant='outline'
            color='white'
            loaderProps={{ type: 'dots' }}
            loading={false}
            text={<FaFacebookF
              className="text-2xl"
            />}
            onClick={facebookSignIn}
          />
          <ButtonComponent
            size='xl'
            variant='outline'
            color='white'
            hover='red'
            loaderProps={{ type: 'dots' }}

            loading={false}
            text={<FaGoogle
              className="text-2xl"
            />}
            onClick={googleSignIn}
          />
        </div>
      </div>

    </div>
  )
};

export default SignScreen;
