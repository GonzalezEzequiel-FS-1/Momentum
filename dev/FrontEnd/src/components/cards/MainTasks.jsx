import { Group } from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTaskContext } from "../../context/TaskContext";
import {useAuth} from '../../context/AuthContext'
import { DBURL } from "../../utils/environment";

// const DBURL = 'https://momentum-cyee.onrender.com/api'
// const DBURL = import.meta.env.VITE_DBURL;
//const DBURL = "http://localhost:6969/api";



const MainTasks = () => {
  const {uid} =useAuth()
  const [mainTask, setMainTask] = useState({
    title: "",
    dueDate: "",
    description: ""
  });
  const { refreshFlag } = useTaskContext();
  const extractTextFromDescription = (desc) => {
    if (!desc || !desc.content) return "";
    return desc.content
      .map(block => {
        if (!block.content) return "";
        return block.content.map(node => node.text || "").join("");
      })
      .join("\n");
  };

  const fetchTask = async () => {
    try {
      
      if (!uid) return
      const response = await axios.get(`${DBURL}/maintask?uid=${uid}`);
      // console.log("Fetched Task Response:", response.data);

      if (response?.data?.success) {
        if (response.data.tasks?.length > 0) {
          const task = response.data.tasks[0];
          setMainTask({
            title: task.Title,
            dueDate: new Date(task.endDate).toLocaleDateString(),
            description: extractTextFromDescription(task.Description) || "No description"
          });
        } else {
          // backend says success but no tasks
          setMainTask({
            title: "No Task Found",
            dueDate: "N/A",
            description: response.data.message || "No tasks available for this user."
          });
        }
      } else {
        // backend explicitly sent success:false
        setMainTask({
          title: "Error loading tasks",
          dueDate: "N/A",
          description: response.data.error || "Unknown error"
        });
      }
    } catch (err) {
      console.error("Error fetching main task:", err.message);
      setMainTask({
        title: "No task saved",
        dueDate: "N/A",
        description: "Click the plus icon to create a new task."
      });
    }
  };
  useEffect(() => {
    
    fetchTask();
  }, [refreshFlag]);

  return (
    <Group className="rounded-xl shadow-2xl shadow-black border-2 border-stone-600 w-full h-fit bg-slate-200 px-10 py-5 flex flex-col justify-start gap-5">
      <div className="w-full flex items-center justify-between">
        {/* <button onClick={fetchTask}>Reload Task</button> */}
        <Group className="w-2/4">
          <h2 className="font-bold text-stone-900 text-2xl truncate overflow-hidden whitespace-nowrap w-full">
            {mainTask.title}
          </h2>
        </Group>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <h2 className="text-2xl text-stone-900 font-semibold">Due</h2>
          <p className="text-xl font-semibold text-stone-900">
            {mainTask.dueDate}
          </p>
        </div>
      </div>
      <div className="w-full h-1 bg-black opacity-40 rounded-full"></div>
      <div>
        <h2 className="font-extrabold text-stone-900 text-xl">Description:</h2>
        <p className="text-stone-900 tracking-wide overflow-hidden line-clamp-3">
          {mainTask.description}
        </p>
      </div>
    </Group>
  );
};

export default MainTasks;
