const Task = require('../models/Task');

const calculateXP = async (req, res) => {
  const taskTitle = req.query.title;

  if (!taskTitle || taskTitle.trim() === "") {
    return res.status(400).json({
      success: false,
      error: 'No Task Title Provided'
    });
  }

  try {
    const taskFromDB = await Task.findOne({ Title: taskTitle });

    if (!taskFromDB) {
      return res.status(404).json({
        success: false,
        error: `Task titled "${taskTitle}" does not exist.`
      });
    }

    const { energyLevel, urgency, difficulty, traits } = taskFromDB;

    // Map energy level
    const calculateEnergyWeight = (level) => {
      if (level >= 75) return 1.2; // High energy
      if (level >= 40) return 1.0; // Medium energy
      return 0.8; // Low energy
    };

    const urgencyMap = { L: 0.8, M: 1.0, H: 1.2 };
    const difficultyMap = { E: 0.8, M: 1.0, H: 1.2, EP: 1.5 };

    const energyWeight = calculateEnergyWeight(energyLevel);
    const urgencyWeight = urgencyMap[urgency] || 1.0;
    const difficultyWeight = difficultyMap[difficulty] || 1.0;

    // Base XP per trait (can adjust later)
    const baseXP = 10;

    // XP for each trait
    const xpPerTrait = traits.reduce((acc, trait) => {
      acc[trait] = Math.round(baseXP * energyWeight * urgencyWeight * difficultyWeight);
      return acc;
    }, {});

    const globalXP = Object.values(xpPerTrait).reduce((sum, xp) => sum + xp, 0);

    const getLevelFromXP = (xp, baseXP = 100, growthFactor = 1.5) => {
  let level = 0;
  while (xp >= baseXP * Math.pow(level + 1, growthFactor)) {
    xp -= baseXP * Math.pow(level + 1, growthFactor);
    level++;
  }
  return level;
};

const getProgressToNextLevel = (xp, level, baseXP = 100, growthFactor = 1.5) => {
  const xpForNext = baseXP * Math.pow(level + 1, growthFactor);
  const xpForCurrent = baseXP * Math.pow(level, growthFactor);
  return (xp - xpForCurrent) / (xpForNext - xpForCurrent);
};


return res.status(200).json({
  success: true,
  taskTitle,
  traits,
  energyLevel,
  energyWeight,
  urgencyWeight,
  difficultyWeight,
  xpPerTrait,
  globalXP,
  getLevelFromXP,
  getProgressToNextLevel
});


  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = { calculateXP };
