const calculateQuestXP = (quest) => {
  const baseXP = 10;
  const difficultyMap = { E: 1, M: 1.5, H: 2, Epic: 3 };
  const urgencyMap = { L: 0.8, M: 1, H: 1.5 };

  const difficultyMultiplier = difficultyMap[quest.difficulty] || 1;
  const urgencyMultiplier = urgencyMap[quest.urgency] || 1;
  const energyMultiplier = parseInt(quest.energyLevel, 10) / 100;

  const traitXP = quest.traits.length * baseXP;
  const totalXP = traitXP * difficultyMultiplier * urgencyMultiplier * energyMultiplier;

  return Math.floor(totalXP);
};

const calculateLevel = (xp) => {
  const base = 100; 
  const growth = 1.5; 
  let level = 0;
  let requiredXP = base;

  while (xp >= requiredXP) {
    level++;
    xp -= requiredXP;
    requiredXP = Math.floor(requiredXP * growth);
  }

  return { level, xpTowardsNextLevel: xp, xpNeededForNextLevel: requiredXP };
};


module.exports = {
  calculateQuestXP,
  calculateLevel
}