import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Text, TextInput, Button as MantineButton } from "@mantine/core";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from "firebase/auth";

import Button from "../components/buttons/Button";
import UserBG01 from "../assets/UserBG01.jpg";
import UserIcon from "../components/UserIcon";
import userAvatar from "../assets/userAvatar.jpg";
import QuestData from "../components/DataContainers/QuestData";
import ProfileData from "../components/DataContainers/ProfileData";
import { useAuth } from "../context/AuthContext";
import { deleteUser as deleteUserFromDB } from "../utils/dbConnection";




const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const nav = useNavigate();
  const { user, logout, providerId, email, displayName} = useAuth();

  const handleLogout = () => {
    try {
      logout();
      nav("/");
    } catch (err) {
      return {error:err}
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError("");

    try {
      //const providerId = user.providerData[0]?.providerId;

      if (providerId === "password") {
        // Email/Password user: reauthenticate with password
        //const credential = EmailAuthProvider.credential(user.email, password);
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
      } else if (providerId === "google.com") {
        // Google user: reauthenticate with popup
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      } else {
        throw new Error("Unsupported provider for account deletion.");
      }

      // Delete from backend
      const result = await deleteUserFromDB();
      if (!result.success) {
        setError(result.error || result.message);
        setLoading(false);
        return;
      }

      // Delete from Firebase
      await user.delete();
      logout();
      nav("/");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password, please try again.");
      } else {
        setError(err.message || "An error occurred while deleting your account.");
      }
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
  document.title = `Momentum - ${displayName}'s Profile`;
},[])
  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Account Deletion"
      >
        <Text mb={10}>
          {(() => {
            // const providerId = user.providerData[0]?.providerId;
            
            if (providerId === "password") {
              return "Please enter your password to confirm account deletion. This action cannot be undone.";
            } else if (providerId === "google.com") {
              return "You will be asked to confirm your Google account to delete your account. This action cannot be undone.";
            } else {
              return `You will be asked to reauthenticate with your ${providerId} account to delete your account. This action cannot be undone.`;
            }
          })()}
        </Text>

        {user.providerData[0]?.providerId === "password" && (
          <TextInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb={10}
          />
        )}

        {error && <Text color="red" mb={10}>{error}</Text>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <MantineButton variant="default" onClick={() => setModalOpen(false)}>
            Cancel
          </MantineButton>
          <MantineButton color="red" loading={loading} onClick={handleDeleteAccount}>
            Delete
          </MantineButton>
        </div>
      </Modal>

      <div className="transition-all duration-500 ease-in-out h-full w-screen flex items-center justify-center">
        <div className="-translate-y-5 transition-all duration-500 ease-in-out w-full h-full md:rounded-xl overflow-hidden flex flex-col items-center justify-between">
          
          <div
            className="w-full h-[32%] mt-0 relative bg-cover bg-center transition-all duration-500 ease-in-out"
            style={{ backgroundImage: `url(${UserBG01})` }}
          >
            <UserIcon
              src={user.photoURL || userAvatar}
              className="w-60 h-60 bg-black rounded-full absolute top-[15%] left-1/2 -translate-x-1/2 shadow-black shadow-lg overflow-visible border-slate-500 border-4 transition-all duration-500 ease-in-out md:h-50 md:w-50"
            />
          </div>

          <div className="h-full w-full sm:px-10 flex flex-col items-center justify-between text-center">
            <div className="pt-20 md:pt-32 transition-all duration-500 ease-in-out">
              <h1 className="font-mono text-4xl font-bold tracking-wide text-stone-100">
                {/*user.displayName*/}
                {displayName}
              </h1>
              <h1 className="font-mono font-bold tracking-widest text-stone-300 m-0">
                Orlando, FL
              </h1>
            </div>

            <div className="flex flex-col items-center justify-around mb-5 h-full w-full px-5">
              <QuestData />
              <ProfileData />
              <div className="flex w-full gap-4 p-4">
                <Button text="Logout" onClick={handleLogout} />
                <Button text="Delete Account" onClick={() => setModalOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
