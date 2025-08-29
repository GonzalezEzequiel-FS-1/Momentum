import React, { useState, useEffect } from "react";
// import CircularContainer from "../percentage/CircularContainer";
import axios from "axios";
import { useTaskContext } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import { DBURL } from "../../utils/environment";


//const DBURL = 'https://momentum-cyee.onrender.com/api'
// const DBURL = import.meta.env.VITE_DBURL;
// const DBURL = "http://localhost:6969/api";

const NewTask = () => {
  const {uid} = useAuth();
  const { refreshFlag } = useTaskContext();
  const [nextTask, setNextTask] = useState({
    title: "",
    dueDate: "",
    description: ""
  });

  const extractTextFromDescription = (desc) => {
    if (!desc || !desc.content) return "";
    return desc.content
      .map(block => {
        if (!block.content) return "";
        return block.content.map(node => node.text || "").join("");
      })
      .join("\n");
  };

  const fetchNextTask = async () => {
    try {
      const response = await axios.get(`${DBURL}/maintask?uid=${uid}`);
      // console.log("Fetched Next Task Response:", response.data);

      if (response?.data?.success && response.data.tasks?.length > 1) {
        const task = response.data.tasks[1];  // grab second task here
        setNextTask({
          title: task.Title,
          dueDate: new Date(task.endDate).toLocaleDateString(),
          description: extractTextFromDescription(task.Description) || "No description"
        });
      } else {
        setNextTask({
          title: "No More Tasks found",
          dueDate: "N/A",
          description: "Add another task by pressing the plus icon below."
        });
      }
    } catch (err) {
      console.error("Error fetching next task:", err.message);
      setNextTask({
        title: "Fetch Error",
        dueDate: "N/A",
        description: "Could not load task."
      });
    }
  };

  useEffect(() => {
    fetchNextTask();
  }, [refreshFlag]);

  return (
    <div className="w-full mt-2 h-28 relative overflow-hidden rounded-xl">
      <div className="py-3 px-10 flex justify-between w-full h-full bg-slate-100 absolute left-6 z-10 rounded-xl overflow-hidden">
        <div className="h-full flex flex-col items-start justify-center overflow-hidden">
          <p className="font-bold text-2xl tracking-wide truncate">{nextTask.title}</p>
          <p className="font-semibold tracking-wide pl-2 text-stone-600 truncate w-3/4">{nextTask.description}</p>
        </div>
        <div>
          {/* <CircularContainer /> */}
        </div>
      </div>
      <div className="w-full h-full bg-violet-700 absolute left-0"></div>
    </div>
  );
};

export default NewTask;
