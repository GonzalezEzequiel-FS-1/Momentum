const { checkReq } = require("../middlewares/checkReq");
const Task = require("../models/Task");
const UserProgression = require("../models/UserProgression");
const { calculateQuestXP, calculateLevel } = require("../utils/calculateLevel");
const { getUserProgress } = require("./progressionController");



const createTask = async (req, res) => {
  const taskData = req.body;
  if (!taskData) {
    return res.status(400).json({
      success: false,
      error: "Incomplete data"
    })
  }
  //console.log(taskData)
  try {

    const submittedTask = new Task({

      ...taskData
    })
    await submittedTask.save()

    return res.status(200).json({
      success: true,
      submittedTask
    })
  } catch (err) {
    console.error('Error saving task:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
const deleteTask = async (req, res) => {
  const taskTitle = req.body.Title;
  if (!taskTitle || taskTitle.trim() === "") {
    return res.status(400).json({
      success: false,
      error: 'No Task Provided for Deletion'
    })
  }
  try {
    const deletedTask = await Task.findOneAndDelete({ Title: taskTitle })

    return res.status(200).json({
      success: true,
      message: `Task Title: ${taskTitle}`
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}
const getTask = async (req, res) => {

  const uid = req.query.uid

  const taskTitle = req.query.title
  if (!taskTitle && taskTitle === "") {
    res.status(400).json({
      success: false,
      error: 'No Task Data Provided'
    })
  }

  try {
    const taskFromDB = await Task.findOne({ Title: taskTitle })
    if (taskFromDB === null) {
      return res.status(400).json({
        success: false,
        error: `Task titled ${taskTitle} does not exist.`
      })
    }

    return res.status(200).json({
      success: true,
      task: taskFromDB,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
}
const getMainTask = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({
      success: false,
      error: 'Missing UID in query'
    });
  }

  try {
    const tasks = await Task.find({ uid });
    // console.log(uid)
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No tasks found for this user.',
        tasks: []
      });
    }

    return res.status(200).json({
      success: true,
      tasks
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
const getallTasks = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({
      success: false,
      error: 'Missing UID in query',
    });
  }

  try {
    const tasks = await Task.find({ uid }); // Fetch all tasks for this user

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No tasks found for this user.',
        tasks: [],
      });
    }

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.error('Error fetching all tasks:', err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
const markCompleteTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskID, { complete: true, ongoing: false }, { new: true });

    const xpGained = calculateQuestXP(updatedTask)
    const progress = await UserProgression.findOne({ uid: updatedTask.uid })
    if (!progress) throw new Error("User progress not found");

    const newTotalXP = progress.xp + xpGained;
    const { level, xpTowardsNextLevel } = calculateLevel(newTotalXP);

    progress.xp = xpTowardsNextLevel;
    progress.level = level;
    await progress.save();
    res.status(200).json({
      success: true,
      task: updatedTask,
      progress
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}



module.exports = {
  markCompleteTask,
  createTask,
  deleteTask,
  getTask,
  getMainTask,
  getallTasks,
}