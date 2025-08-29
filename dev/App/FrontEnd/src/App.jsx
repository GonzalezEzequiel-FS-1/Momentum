
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NewTaskRefactor from "./pages/NewTaskRefactor";
import NavigationBar from "./components/NavigationBar";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import mantineTheme from "../themes/mantineTheme";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import '@mantine/nprogress/styles.css';
import "react-big-calendar/lib/css/react-big-calendar.css";

import { UIProvider } from "./context/UIContext";
import CharacterCreation2 from "./pages/CharacterCreation2";
import { TaskProvider } from "./context/TaskContext";

import { LevelProvider } from "./context/LevelContext";

import UseAnalytics from "./UseAnalytics";
import RouteProvider from "./outlet/RouteProvider";

const appStyles = `flex flex-col justify-end items-center w-full min-h-full py-5 px-4 sm:px-10 md:px-16 lg:px-20 xl:px-48 2xl:px-96 transition-all duration-500 ease-in-out  h-screen gap-2 [background-image:linear-gradient(to_top,#140152_20%,#140152_50%,#33215A_100%)]`

const App = () => {

  return (
        <div className={`${appStyles}`}>
          <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
            <Router>
              <AuthProvider>
                <UseAnalytics />
                <LevelProvider>
                  <UIProvider>
                    <TaskProvider>
                      <NewTaskRefactor />
                      <CharacterCreation2 />      
                      <RouteProvider/>
                     </TaskProvider>
                    <NavigationBar />
                  </UIProvider>
                </LevelProvider>
              </AuthProvider>
            </Router>
          </MantineProvider>
        </div>
  );
};

export default App;
