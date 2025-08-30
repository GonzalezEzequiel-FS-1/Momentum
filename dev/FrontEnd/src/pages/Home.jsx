import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DatePickers from "../components/cards/DatePickers";
import MainTasks from "../components/cards/MainTasks";
import NewTask from "../components/cards/NewTask";
// import CharacterCreation2 from "./CharacterCreation2";
import { useTaskUI } from "../context/UIContext";
import { checkTutorial, getTraits, getUserData } from "../utils/dbConnection";
import { auth } from "../../firebaseConfig";

// import TaskList from "./TaskList";




const currentDate = new Date();

const Home = () => {
  const { user, displayName, providerId, email, isLogged, loading, logout } = useAuth();
  const firebaseUser = auth.currentUser.displayName

  // const handleTestTasks = async () => {
  //   try {
  //     const response = await axios.get(`${DBURL}/maintask`, {
  //       uid: { uid }  // 👈 sends ?uid=123
  //     });
  //     console.log(response.data)
  //   } catch (err) {
  //     return { success: false, error: err.message }
  //   }

  // }
  const { openTraitVisibility } = useTaskUI();
  const handleCheckTutorial = async () => {
    const tutorialState = await checkTutorial();
    const appTutorialState = tutorialState.appTutorial
    appTutorialState ? openTraitVisibility() : null
    // console.log(appTutorialState);
  }

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const userName = displayName || firebaseUser || "Guest";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[currentDate.getMonth()];

  const handleGetUser = async () => {
    const userData = await getUserData(user.uid);
    console.log(userData)
    return{success:true, userData}
  }

  const handleGetTraits = async () =>{
    const response = await getTraits()
    const responseData = response.data.traits
    console.log(responseData)
  }
  // const printAllData = async () =>{
  //   console.log( user, displayName, providerId, email, isLogged, loading, logout)
  // }
  useEffect(() => {
    document.title = "Momentum - Home";
    if (!user) return;

    setMonth(monthName);
    setYear(currentDate.getFullYear());
    handleCheckTutorial();

  }, [user]);

  return (
    <div className="w-full mb-5 h-full flex flex-col justify-start gap-1 md:gap-5 transition-all duration-500 ease-in-out">


      <div className="">
        <h1 className="text-lg px-3 text-slate-200 font-medium tracking-wide md:text-4xl">
          Hi
        </h1>
        <button
          className="hover-pointer text-2xl md:text-4xl px-3 text-slate-200 font-bold tracking-wide capitalize hover:text-slate-400 active:text-slate-300 transition-all duration-500 ease-in-out "
        >
          {userName}
        </button>
        <div className="flex items-start align-bottom gap-2">
          <h1 className="text-lg md:text-2xl font-bold text-slate-200 tracking-wide">
            {month || "Unable to get Month"},
          </h1>
          <h1 className="text-lg md:text-2xl font-bold text-slate-400 tracking-wide">
            {year || "Unable to get Year"}
          </h1>
        </div>
      </div>
      <button onClick={handleGetTraits}>Hello World</button>

      <div className="w-full flex items-center justify-center">
        <DatePickers />
      </div>
      <MainTasks />
      <div className="max-h-[240px] flex flex-col gap-5">
        <NewTask />
      </div>
    </div>
  );
};

export default Home;
