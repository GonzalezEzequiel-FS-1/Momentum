const Traits = require('../models/NewTraits');
const Task = require('../models/Task');
const UserProgression = require('../models/UserProgression');
const { calculateLevel, calculateQuestXP } = require('../utils/calculateLevel');
const { createUserProgress, getUserProgress } = require('./progressionController');


const storeTraits = async (req, res) => {
  const method = req.method;
  const traits = req.body.traits;
  const userId = traits?.uid;

  if (!traits || !userId) {
    return res.status(400).json({
      success: false,
      message: 'No Traits Submitted'
    });
  }

  try {
    if (method === "POST") {
      
      const existingTraits = await Traits.findOne({ uid: userId });
      if (existingTraits) {
        return res.status(200).json({
          success: true,
          message: 'Traits already exist',
          data: existingTraits
        });
      }

      const traitsOnDB = new Traits(traits);
      const savedTraits = await traitsOnDB.save();
      const savedTraitsID = savedTraits._id
      await createUserProgress(userId, savedTraitsID )
      return res.status(201).json({
        success: true,
        data: savedTraits
      });

    } else if (method === "PATCH") {
      const savedTraits = await Traits.findOneAndUpdate(
        { uid: userId },
        { $set: traits },
        { new: true, upsert: false }
      );
      return res.status(200).json({
        success: true,
        data: savedTraits
      });

    } else {
      return res.status(405).json({
        success: false,
        message: 'Method Not Allowed',
        method
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const patchTraits = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Patch Works"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}

const getTraits = async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    return res.status(400).json({
      success: false,
      error: 'No UID provided',
    });
  }

  const method = req.method
  try {
    const traits = await Traits.findOne({ uid }).lean();

    if (!traits) {
      return res.status(404).json({
        success: false,
        error: 'Traits not found for this user',
      });
    }
    const { _id, __v, ...traitsData } = traits;

    return res.status(200).json({
      success: true,
      traits: traitsData,
      method
    });
  } catch (error) {
    console.error('Error fetching traits:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
}

const updateTraits = async (req, res) => {
  const { uid, updates } = req.body;

  if (!uid || !updates || typeof updates !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Missing UID or invalid updates',
    });
  }

  try {
    // Search by the correct field
    const traitsDoc = await Traits.findOne({ uid });

    if (!traitsDoc) {
      return res.status(404).json({
        success: false,
        error: 'Traits not found for this user',
      });
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value !== 'number') {
        console.warn(`Skipping invalid value for trait ${key}:`, value);
        return;
      }
      if (traitsDoc[key] === undefined) traitsDoc[key] = 0;
      traitsDoc[key] += value;
    });

    const updatedTraits = await traitsDoc.save();

    res.status(200).json({
      success: true,
      traits: updatedTraits,
    });
  } catch (err) {
    console.error('Error updating traits:', err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const completeTaskWithXP = async (req, res) => {
  const { taskId, uid } = req.body;

  if (!taskId || !uid) return res.status(400).json({ success: false, message: 'taskId and uid required' });

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.complete) return res.status(400).json({ success: false, message: 'Task already completed' });

    const userProgress = await UserProgression.findOne({ uid });
    if (!userProgress) return res.status(404).json({ success: false, message: 'User progress not found' });

    const userTraits = await Traits.findOne({ uid });
    if (!userTraits) return res.status(404).json({ success: false, message: 'User traits not found' });

    // calculate total XP
    const totalXP = calculateQuestXP(task);

    // split XP among traits
    const perTraitXP = Math.floor(totalXP / task.traits.length);
    task.traits.forEach(trait => {
      if (userTraits[trait] !== undefined) userTraits[trait] += perTraitXP;
    });
    await userTraits.save();

    // update level & XP
    const newTotalXP = userProgress.xp + totalXP;
    const { level, xpTowardsNextLevel, xpNeededForNextLevel } = calculateLevel(newTotalXP);
    userProgress.level = level;
    userProgress.xp = xpTowardsNextLevel;
    await userProgress.save();

    // mark task complete
    task.complete = true;
    await task.save();

    return res.status(200).json({
      success: true,
      message: 'Task completed and XP applied',
      updatedTraits: userTraits,
      userProgress: {
        level,
        xp: xpTowardsNextLevel,
        xpNeededForNextLevel
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};



module.exports = {
  completeTaskWithXP,
  updateTraits,
  storeTraits,
  getTraits,
  patchTraits
};
