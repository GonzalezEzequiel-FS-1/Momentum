import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTraits } from '../utils/dbConnection'; // adjust path as needed
import { markAsComplete } from '../utils/dbConnection';
import { useAuth } from './AuthContext';


const LevelContext = createContext({
  xp: 0,
  level: 0,
  setXP: () => {},
  setLevel: () => {},
  traits: null,
  addTraitXP: () => {},
  addXP: () => {},
});

export const LevelProvider = ({ children }) => {
  const {user, loading} = useAuth()
  const [traits, setTraits] = useState(null);
  const [level, setLevel] = useState(0);
  const [xp, setXP] = useState(0);

  useEffect(() => {
    if(loading) return;
    if(!user)return;
    const fetchTraits = async () => {
      const result = await getTraits();
      if (result.success && result.data) {
        setTraits(result.data);
      } else {
        return null
        // console.error('Failed to load traits:', result.error);
      }
    };
    fetchTraits();
  }, [user, loading]);

  const maxTraitForLevel = (level) => 10 + level * 2; // or exponential
  const addTraitXP = (trait, amount) => {
    if (!traits) return;
    const max = maxTraitForLevel(level);
    setTraits(prev => ({ ...prev, [trait]: Math.min(prev[trait] + amount, max) }));
  };

  const calculateLevel = (totalXP) => {
    let lvl = 0;
    let xpForNext = 100;
    let remainingXP = totalXP;

    while (remainingXP >= xpForNext) {
      remainingXP -= xpForNext;
      lvl++;
      xpForNext = Math.floor(100 * Math.pow(1.15, lvl));
    }

    return {
      level: lvl,
      xpTowardsNextLevel: remainingXP,
      xpNeededForNextLevel: xpForNext,
    };
  };

const addXP = async (taskID) => {
  const result = await markAsComplete(taskID); // hits backend
  if (result.success) {
    setLevel(result.progress.level);
    setXP(result.progress.xp);
    setTraits(result.progress.traits); // if returned
  }
};


  return (
    <LevelContext.Provider value={{ 
      //xp, level, setXP, setLevel, addXP, traits, addTraitXP 
      }}>
      {children}
    </LevelContext.Provider>
  );
};

LevelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLevel = () => useContext(LevelContext);
