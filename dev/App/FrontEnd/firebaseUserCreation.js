import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const registerUser = (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user
        //console.log(`Registration Successful, ${user.uid}, ${user.email}`)
        return user
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`An Error Has Occurred ${errorCode}, ${errorMessage}`);
        throw error
      });
}

export default registerUser;