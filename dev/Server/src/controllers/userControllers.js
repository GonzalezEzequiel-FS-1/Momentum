const User = require('../models/user')
const Traits = require('../models/traits')

const checkTutorial = async (req, res) => {
  const { uid, tutorialState } = req.body; // send uid + tutorial state in body

  if (tutorialState === undefined) {
    return res.status(400).json({
      success: false,
      message: "No tutorial state provided"
    });
  }

  try {
    // Update user's taskTutorial field
    const user = await User.findOneAndUpdate(
      { uid },
      { taskTutorial: tutorialState },
      { new: true } // return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tutorial status updated",
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


const createUser = async (req, res) => {
    try {
        const { user, email } = req.body

        if (!user || !email) {
            return res.status(400).json({
                success: false,
                message: "No User Data on Request"
            })
        }
        const newUser = new User({
            user,
            email
        })
        const savedUser = await newUser.save()
        return res.status(200).json({
            success: true,
            message: "User created",
            data: savedUser
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }

}

/*
Each trait comes with a fixed amount of points at the beginning, lets say 1000, when the user completes the form we will add or decrease the amount of points based on the response given
Example:
in a scale from 1 to 10 responses with a value of 0 will receive a -25% to its value 1 will receive a 20% decrease 2 15% 3 10% 4 5% and 5 will have a 0% change on the other hand responses with a value of 1 will earn 5% and so on.
*/

const createTraits = async (req, res) => {
    const { userData } = req.body;

    if (!userData) {
        return res.status(400).json({
            success: false,
            error: "User Data not Found",
        });
    }

    const { traitValues, firebaseID } = userData;

    if (!traitValues || !firebaseID) {
        return res.status(400).json({
            success: false,
            error: "Missing traitValues or firebaseID",
        });
    }

    // Ensure all empty traitValues are set to 0
    const updatedTraitValues = Object.fromEntries(
        Object.entries(traitValues).map(([key, value]) => [key, value === "" ? 0 : value])
    );

    const newTraits = new Traits({
        ...updatedTraitValues,  // Spread the updated traitValues
        firebaseID, // Add firebaseID as uid
    });

    try {
        

        await newTraits.save()
        res.status(200).json({
            success: true,
            message: "Works",
            newTraits,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};
const updateTraits = async (req, res) => {
    const { userData } = req.body;

    if (!userData) {
        return res.status(400).json({
            success: false,
            error: "User Data not Found",
        });
    }

    const { traitValues, firebaseID } = userData;

    if (!traitValues || !firebaseID) {
        return res.status(400).json({
            success: false,
            error: "Missing traitValues or firebaseID",
        });
    }

    // Ensure all empty traitValues are set to 0
    const updatedTraitValues = Object.fromEntries(
        Object.entries(traitValues).map(([key, value]) => [key, value === "" ? 0 : value])
    );

    try {
        const updatedTraits = await Traits.findOneAndUpdate(
            { firebaseID }, // Filter by firebaseID
            { $set: updatedTraitValues }, // Use $set to update only specified fields
            { new: true, runValidators: true } // Return the updated document and apply schema validation
        );

        // if (!updatedTraits) {
        //     return res.status(404).json({
        //         success: false,
        //         error: "User traits not found",
        //     });
        // }

        res.status(200).json({
            success: true,
            message: "Traits updated successfully",
            updatedTraits,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};


const checkTraits = async (req, res) => {
    const { firebaseID } = req.query;
    if (!firebaseID) {
        return res.status(400).json({
            success: false,
            error: "No FireBase Id Provided"
        })
    }
    try {
        const userInDB = await Traits.findOne({
            firebaseID
        })
        if (userInDB === null) {
            return res.status(200).json({
                success: true,
                userExists: false
            })
        }
        return res.status(200).json({
            success: true,
            userExists: true,
            userInDB
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const deleteTraits = async (req, res) => {
    const { userData } = req.body;
    if (!userData) {
        return res.status(400).json({
            success: false,
            error: "No User Data Provided"
        });
    }

    try {
        const uuid = userData.firebaseID;
        const userToDelete = await Traits.findOneAndDelete({ firebaseID: uuid });

        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                error: `User with ID ${uuid} not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `User with ID ${uuid} and associated traits were successfully deleted`
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const calculateInitialXP = async (req,res) => {
    const { firebaseID } = req.query;
    if (!firebaseID) {
        return res.status(400).json({
            success: false,
            error: "No FireBase Id Provided"
        })
    }

    const traitData = await Traits.findOne({ firebaseID })
    if (traitData === null) {
        return res.status(200).json({
            success: true,
            message: "No data for user"
        })
    }
    let xpValues = {};

    const traits = traitData.toObject();

    delete traits._id;
    delete traits.firebaseID;

    Object.keys(traits).forEach(trait => {
        if (traits[trait] >= 0 && traits[trait] <= 10) {
            const traitValue = traits[trait];
            const xp = 1000 * (1 + (traitValue * 0.05 - 0.25));
            xpValues[trait] = xp;
        }
    });

    return res.status(200).json({
        success: true,
        xpValues
    });
}


const cleanTraits = async (req, res) => {
    const { firebaseID } = req.query;
    if (!firebaseID) {
        return res.status(400).json({
            success: false,
            error: "No FireBase Id Provided"
        })
    }
    const traitData = await Traits.findOne({ firebaseID })
    if(traitData === null){
        return res.status(200).json({
            success:true,
            message:"No data for user"
        })
    }
    const traits = traitData.toObject();

    delete traits._id;
    delete traits.firebaseID;
    return res.status(200).json({
        traits
    })
}
const deleteUser = async (req, res) => {
    const { user } = req.params;
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not provided"
        })
    }
    try {

        const traitToDelete = await Traits.findOneAndDelete({
            firebaseID: uuid
        })
        const deletedUser = await User.findOneAndDelete({ user })
        return res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const getUserData = async (req, res) => {
    const { userEmail } = req.query;

    if (!userEmail) {
        return res.status(400).json({
            success: false,
            message: "No email provided"
        });
    }

    try {
        const findUser = await User.findOne({ email: userEmail });

        if (!findUser) {
            return res.status(404).json({
                success: false,
                email: userEmail,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: findUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createUser,
    createTraits,
    deleteUser,
    updateTraits,
    getUserData,
    deleteTraits,
    checkTraits,
    cleanTraits,
    calculateInitialXP,
    checkTutorial
};



