import axios from 'axios';
import { auth } from '../../firebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { DBURL } from './environment';


//const DBURL = 'https://momentum-cyee.onrender.com/api'
// const DBURL = import.meta.env.VITE_DBURL;
//const DBURL = 'http://localhost:6969/api';


const storeTask = async (values) => {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No user signed in' };
  // console.log(user)
  const userId = user.uid;
  if (!userId) return { success: false, error: 'No UID provided' };

  if (!values) return { success: false, error: 'No Task submitted' };

  // Clean traits: remove emoji and leading spaces
  const cleanTraits = values.traits.map(trait => trait.replace(/^[^\w]+/, '').trim());

  const payload = {
    ...values,
    traits: cleanTraits,
    uid: userId
  };

  try {
    const requiredFields = ['uid', 'Title', 'startDate', 'endDate', 'energyLevel', 'difficulty', 'traits', 'urgency'];
    for (let field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null) {
        console.error(`Missing required field: ${field}`);
        return { success: false, error: `Missing required field: ${field}` };
      }
    }

    const response = await axios.post(`${DBURL}/task`, payload);
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
const deleteTask = async (taskTitle) => {
  if (!taskTitle || taskTitle === null) {
    return { success: false, error: "No Task Provided for Deletion" }
  }
  try {
    const response = await axios.delete(`${DBURL}/task`, {
      data: {
        "Title": taskTitle
      }

    })
    if (response.status !== 200) {
      return { success: false, errorCode: response.status, error: response.error || "Unknown Error Occured" }
    }
    return {
      success: true,
      data: response.data
    }

  } catch (err) {
    return { success: false, error: err.message }
  }
}

const getMainTask = async () => {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No user signed in' };
  const uid = auth.currentUser.uid;
  if (!uid) { return { success: false, error: 'no UID provided' } }
  try {
    const response = await axios.get(`${DBURL}/maintask?uid=${uid}`);
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getTraits = async () => {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No user signed in' };

  const uid = user.uid;
  if (!uid) return { success: false, error: 'No UID provided' };

  try {
    const response = await axios.get(`${DBURL}/traits?uid=${uid}`);
    // console.log(response.data);
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const checkTutorial = async () => {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No user signed in' };
  const uid = auth.currentUser.uid;
  if (!uid) { return { success: false, error: 'no UID provided' } }
  try {
    const response = await axios.get(`${DBURL}/user/${uid}/tutorial`);
    const tutorialStates = {
      appTutorial: response.data.appTutorial,
      taskTutorial: response.data.taskTutorial
    }
    return { success: true, ...tutorialStates };
  } catch (err) {
    return { success: false, error: err.message }
  }
}
const markAsComplete = async (taskId) => {
  try {
    const res = await axios.patch(`${DBURL}/task/${taskId}`);
    return res.data;
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
};

const deleteUser = async (password) => {

  const user = auth.currentUser;

  // console.log(user)
  if (!user) return { success: false, error: "No user signed in" };

  const uid = user.uid;
  if (!uid) { return { success: false, error: 'no UID provided' } }
  try {
    // Attempt to delete from the database
    await axios.delete(`${DBURL}/user/${uid}`)
      .catch(err => {
        console.warn(`DB deletion failed or user not found: ${err.message}`);
      });

    // Firebase requires recent login
    if (password) {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
    }

    // Attempt to delete the Firebase user
    await user.delete();

    return { success: true, message: `User ${user.displayName} deleted` };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
const toggleTraitVis = async (toggleTraitVisibility) => {
  const uid = auth.currentUser.uid;
  if (!uid) { return { success: false, error: 'no UID provided' } }
  try {
    const response = await axios.get(`${DBURL}/user/${uid}/tutorial`);
    const appTutorialState = response.data.appTutorial;
    // console.log(`TUTORIAL STATES====>>${appTutorialState}`);

    if (appTutorialState === true) {
      toggleTraitVisibility();
    }
    return { success: true, tutorial: appTutorialState };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const appTutorialSwitch = async (uid) => {
  if (!uid) { return { success: false, error: 'no UID provided' } }
  try {
    const response = await axios.patch(`${DBURL}/tutorial/update/app`, {
      uid: uid
    })
    // console.log(response.data)
    return { success: true, data: response.data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
const taskTutorialSwitch = async (uid) => {
  if (!uid) { return { success: false, error: 'no UID provided' } }
  try {
    const response = await axios.patch(`${DBURL}/tutorial/update/task`, {
      uid: uid
    })
    return { success: true, data: response.data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const getUserData = async (uid) => {

  if (!uid) {
    
    return { success: false, message: "No User ID Provided" }
  
  }
  try {
  
    const response = await axios.get(`${DBURL}/user`, {
  
      params: { uid }
  
    })

    const user = response.data.user;

    
    return { success: true, user, uid}
  
  } catch (err) {
    
    return { success: false, error: err }
  
  }

}




export {
  toggleTraitVis,
  deleteUser,
  markAsComplete,
  storeTask,
  deleteTask,
  getMainTask,
  getTraits,
  checkTutorial,
  appTutorialSwitch,
  taskTutorialSwitch,
  getUserData
};
