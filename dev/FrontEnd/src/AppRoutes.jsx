import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAnalytics } from '../useAnalytics';

import NewTaskRefactor from './pages/NewTaskRefactor';
import CharacterCreation2 from './pages/CharacterCreation2';
import SignScreen from './pages/SignScreen';
import ToS from './pages/ToS';
import Home from './pages/Home';
import Profile from './pages/Profile';
import StatPage from './pages/StatPage';
import TaskList from './pages/TaskList';
import PrivateRoutes from './outlet/PrivateRoutes';

export default function AppRoutes() {
  useAnalytics(); // now safe inside Router

  return (
    <div className="flex flex-col justify-end items-center min-w-[320px] w-full min-h-full py-5 px-4 sm:px-10 md:px-16 lg:px-20 xl:px-48 2xl:px-96 transition-all duration-500 ease-in-out h-screen gap-2 [background-image:linear-gradient(to_top,#140152_20%,#140152_50%,#33215A_100%)]">
      <NewTaskRefactor />
      <CharacterCreation2 />
      <Routes>
        <Route path="/" element={<SignScreen />} />
        <Route path="/tos" element={<ToS />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/alltasks" element={<TaskList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/statpage" element={<StatPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
