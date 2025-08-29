const User = require('../models/newUser')
const Traits = require('../models/NewTraits')
const Task = require('../models/Task')
const UserProgression = require('../models/UserProgression')


const createUser = async (req, res) => {


    // Grab the incoming data from the body
    const user = req.body
    // console.log('In user creation')
    //If no data throw an error
    if (!user) {
        // console.log(`Please Provide User Data`)
        return res.status(400).json({
            success: false,
            error: `Please Provide User Data`
        })
    }

    // If the above error does not trip continue with the script
    try {
        // Check if the user exists

        const existingUser = await User.findOne({ uid: user.uid });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create a new user Instance
        const newUser = new User({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            ToS: true
        })

        // TODO CHECK IF THE USER HAS AN ENTRY IN THE DB //

        // Save the user to the DB 
        await newUser.save()

        // If saving the user fails send an error.
        if (!newUser) {
            return res.status(400).json({
                success: false,
                error: "Unable to save User to Database"
            })
        }

        // After a successful save return the  saved data and a true status
        return res.status(200).json({
            success: true,
            data: newUser
        })
    } catch (error) {
        // Logging the error to the console
        console.error(`Error Message${error.message}`)
        // Return status 500 and the error with a success false status
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
const getUser = async (req,res)=>{
    const userData = req.query
    const uid = userData.uid
    
    if(!uid){
        return res.status(400).json({
            success:false,
            error:"No UID Provided"
        })
    }

    const user = await User.findOne({uid});
   
    try {
        return res.status(200).json({
            success:true,
            user
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:err.message
        })
        
    }
}
const AgetUser = async (req, res) =>{
    const uid = req.params;
    if(!uid){
        return res.status(400).json({
            success:false,
            message:`No User ID provided`
        })
    }
    try {
        const response = await User.findOne({
            uid:uid
        })
        const userData = response.data;
        return res.status(200).json({
            success:true,
            userData:userData
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

const deleteUser = async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        return res.status(400).json({
            success: false,
            error: "No User ID provided",
        });
    }

    try {
        // Delete all tasks for the user
        const deletedTasks = await Task.deleteMany({ uid });

        // Delete traits for the user
        const deletedTraits = await Traits.findOneAndDelete({ uid });

        // Delete UserProgression 
        const deletedProgression = await UserProgression.findOneAndDelete({uid})

        // Delete the user itself
        const deletedUser = await User.findOneAndDelete({ uid });



        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found in database",
                deletedTasksCount: deletedTasks.deletedCount || 0,
                deletedTraits: deletedTraits ? true : false,
                deletedProgression: deletedProgression ? true : false,
            });
        }

        // console.log(`User ${uid} deleted along with related traits and tasks.`);

        return res.status(200).json({
            success: true,
            message: `User ${uid} and related data deleted successfully.`,
            deletedUser,
            deletedTraits: deletedTraits || null,
            deletedTasksCount: deletedTasks.deletedCount || 0,
            deletedProgression: deletedProgression ? true : false
        });
    } catch (err) {
        console.error(`Error deleting user ${uid}:`, err);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const updateTaskTutorial = async (req, res) => {
    const { uid } = req.body
    // console.log("Searching for UID:", uid);
    const found = await Task.findOne({ uid });
    // console.log("Found doc:", found);
    let newStatus

    if (!uid) {
        res.status(400).json({
            success: false,
            error: `No UID provided`
        })
    }
    try {
        const taskTutorialStatus = await User.findOne(
            { uid: uid }
        )
        if (taskTutorialStatus.taskTutorial === false) {
            newStatus = true
        } else { 
            newStatus = false 
        }

        const response = await User.findOneAndUpdate(
            { uid },
            { $set: { taskTutorial: newStatus } },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            "Task Tutorial Status":response
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
};

const updateAppTutorial = async (req, res) => {
    const { uid } = req.body
    // console.log("Searching for UID:", uid);
    const found = await Task.findOne({ uid });
    // console.log("Found doc:", found);
    let newStatus

    if (!uid) {
        res.status(400).json({
            success: false,
            error: `No UID provided`
        })
    }
    try {
        const appTutorialStatus = await User.findOne(
            { uid: uid }
        )
        if (appTutorialStatus.appTutorial === false) {
            newStatus = true
        } else { 
            newStatus = false 
        }

        const response = await User.findOneAndUpdate(
            { uid },
            { $set: { appTutorial: newStatus } },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            "Task Tutorial Status":response
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
};

const switchTutorialState = async (req, res) => {
    const { uid, appTutorialState, taskTutorialState, taskID } = req.body;

    if (!uid) {
        return res.status(400).json({
            success: false,
            error: "No User ID Provided"
        });
    }

    try {
        let updatedDoc = null;
        let valueUpdated = null;

        // Case 1: Update the user’s overall app tutorial state
        if (appTutorialState !== undefined && taskTutorialState === undefined) {
            updatedDoc = await User.findOneAndUpdate(
                { uid },
                { $set: { appTutorial: appTutorialState } },
                { new: true }
            );
            valueUpdated = "appTutorial";
        }

        // Case 2: Update a specific task’s tutorial state
        if (taskTutorialState !== undefined && taskID) {
            updatedDoc = await Task.findOneAndUpdate(
                { _id: taskID, uid },
                { $set: { taskTutorial: taskTutorialState } },
                { new: true }
            );
            valueUpdated = "taskTutorial";
        }

        if (!updatedDoc) {
            return res.status(404).json({
                success: false,
                error: "No matching document found"
            });
        }

        return res.status(200).json({
            success: true,
            updatedDoc,
            valueUpdated
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


const checkTutorial = async (req, res) => {
    const { uid } = req.params;  // get uid from the URL

    if (!uid) {
        return res.status(400).json({
            success: false,
            message: "No User ID provided"
        });
    }

    try {
        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            taskTutorial: user.taskTutorial ?? false,
            appTutorial: user.appTutorial ?? false
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateTaskTutorial,
    updateAppTutorial,
    checkTutorial,
    switchTutorialState
}