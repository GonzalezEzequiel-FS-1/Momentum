const UserProgress = require('../models/UserProgression');
const { calculateLevel } = require('../utils/calculateLevel');


const getUserProgress = async (uid) => {
  return await UserProgress.findOne({ uid }).populate('traits');
};

const createUserProgress = async (uid, traitsId) => {
  const newProgress = new UserProgress({ uid, traits: traitsId });
  return await newProgress.save();
};

const addXP = async (uid, amount) => {
  const user = await UserProgress.findOne({ uid });
  if (!user) throw new Error('User not found');

  const totalXP = user.xp + amount;
  const { level: newLevel, xpTowardsNextLevel } = calculateLevel(totalXP);

  user.level = newLevel;
  user.xp = xpTowardsNextLevel;

  await user.save();
  return user;
};




module.exports = {getUserProgress, createUserProgress, addXP}