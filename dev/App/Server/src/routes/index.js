const express = require('express');
const { createUser, deleteUser, getUser, updateTutorial, checkTutorial, updateTaskTutorial, updateAppTutorial } = require('../controllers/newUserControllers');
const { storeTraits, getTraits, updateTraits, patchTraits, completeTaskWithXP } = require('../controllers/newTraitController');
const { createTask, deleteTask, getTask, getMainTask, getallTasks, markCompleteTask } = require('../controllers/taskController');
const { calculateXP } = require('../xpCalculation/calculateXP');

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: "Server Up" });
});

router.route('/user')
  .post(createUser);

// router.route('/user/tutorial')
//   .patch(updateTutorial)

router.patch('/tutorial/update/task' ,updateTaskTutorial)
router.patch('/tutorial/update/app' ,updateAppTutorial)

router.get('/user/:uid/tutorial', checkTutorial);

router.route('/user/:uid') 
  .delete(deleteUser)

router.get('/user', getUser)

router.route('/traits')
  .patch(storeTraits)
  .post(storeTraits)
  .get(getTraits);

router.route('/task')
  .post(createTask)
  .delete(deleteTask)
  .get(getTask);
router.route('/task/:id')
  .patch(markCompleteTask)

router.route('/completeTaskWithXP')
  .patch(completeTaskWithXP);

router.route('/alltasks')
  .get(getallTasks)
router.route('/maintask')
  .get(getMainTask);

router.get('/calculate', calculateXP)
module.exports = router;
