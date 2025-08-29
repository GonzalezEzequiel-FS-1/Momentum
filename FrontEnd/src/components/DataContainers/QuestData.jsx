import React, { useState, useEffect } from "react";
import Divider from "../Divider";
import axios from "axios";
import { Loader } from "@mantine/core";
import { useTaskContext } from "../../context/TaskContext"; 
import { useAuth } from "../../context/AuthContext";
import { DBURL } from "../../utils/environment";


//const DBURL = 'https://momentum-cyee.onrender.com/api'
// const DBURL = import.meta.env.VITE_DBURL;
// const DBURL = "http://localhost:6969/api";

const QuestData = () => {
  const {uid, user} =useAuth()
  const [incomplete, setIncomplete] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);

  const { refreshFlag } = useTaskContext(); 

  const getTaskCount = async (uid) => {
    try {
      const response = await axios.get(`${DBURL}/alltasks?uid=${uid}`);
      const tasks = response.data.tasks;

      if (!Array.isArray(tasks)) {
        console.error('Expected an array of tasks but got:', tasks);
        return;
      }

      const completedTasks = tasks.filter(task => task.complete);
      const incompleteTasks = tasks.filter(task => !task.complete);

      setCompleted(completedTasks.length);
      setIncomplete(incompleteTasks.length);
    } catch (err) {
      console.error('Error getting task count:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (user) {
      getTaskCount(uid);
    } else {
      setLoading(false);
    }
  }, [refreshFlag]); // <-- re-run whenever refreshFlag changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader size="xl" variant="dots" />
      </div>
    );
  }

  return (
    <div className="w-full tracking-wide flex items-center justify-evenly text-sm font-thin text-stone-500 lg:px-32 transition-all duration-500 ease-in-out">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold tracking-wide text-stone-100">{incomplete}</h1>
        <p className="text-sm font-semibold tracking-wide text-stone-100">Ongoing</p>
        <p className="text-sm font-semibold tracking-wide text-stone-100">Quests</p>
      </div>

      <Divider width="w-[1px]" height="h-10" />

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-stone-500">{completed}</h1>
        <p>Completed</p>
        <p>Quests</p>
      </div>
    </div>
  );
};

export default QuestData;
