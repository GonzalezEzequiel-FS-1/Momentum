import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { DBURL } from "./environment";

//const DBURL = 'https://momentum-cyee.onrender.com/api'
//const DBURL = import.meta.env.VITE_DBURL;
// const DBURL = "http://localhost:6969/api";

export default function TutorialToggle() {
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [currentState, setCurrentState] = useState(false);
  const {user, uid} = useAuth()

  // Load current tutorial state on mount
  useEffect(() => {
    const fetchTutorialState = async () => {
       
      
      if (!user) return;
      try {
        const res = await axios.get(`${DBURL}/user/${uid}/tutorial`);
        setCurrentState(res.data.appTutorial ?? false);
        setStatus(res.data);
      } catch (err) {
        console.error(err);
        setStatus({ success: false, error: err.message });
      }
    };

    fetchTutorialState();
  }, []);

  const toggleTutorial = async () => {
    setLoading(true);
    
    if (!user) {
      setStatus({ success: false, error: "Not logged in" });
      setLoading(false);
      
      return;
    }

    try {
      // Flip the current state
      const newState = !currentState;

      const res = await axios.patch(`${DBURL}/user/tutorial`, {
        uid: uid,
        taskTutorialState: false,
      });

      if (res.data.success) {
        setCurrentState(newState);
      }

      setStatus(res.data);
      setShowButton(false)
      return{status}
    } catch (err) {
      console.error(err);
      setStatus({ success: false, error: err.message });
    }

    setLoading(false);
  };

  return (<>{showButton &&
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={toggleTutorial}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        
      >
        {loading
          ? "Updating..."
          : currentState
          ? "Keep tutorial"
          : "Disable Tutorial"}
      </button>
      {/* {status && (
        <pre className="text-sm bg-slate-800 p-2 rounded w-full overflow-auto">
          {JSON.stringify(status, null, 2)}
        </pre>
      )} */}
    </div>
    }</>
  );
}
