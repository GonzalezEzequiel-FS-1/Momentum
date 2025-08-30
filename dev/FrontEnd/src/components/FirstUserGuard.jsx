import React, { useEffect, useState } from "react";
import CharacterCreation2 from "../pages/CharacterCreation2";
import { checkTutorial } from "../utils/dbConnection";
import { useAuth } from "../context/AuthContext";

export const FirstLoginGuard = ({ children }) => {
  const { user } = useAuth();
  const [firstLogin, setFirstLogin] = useState(null);

  useEffect(() => {
    if (!user) return;

    const checkTutorialStatus = async () => {
      const tutorialData = await checkTutorial(); // fetch appTutorial from DB
      setFirstLogin(tutorialData.taskTutorial); // true if tutorial not done yet
    };

    checkTutorialStatus();
  }, [user]);

  if (firstLogin === null) return null; // still loading
  return firstLogin ? <CharacterCreation2 /> : children; // show creation if first login, else dashboard
};
