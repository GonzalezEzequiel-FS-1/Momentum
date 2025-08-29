import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Group, Button } from '@mantine/core';
import SliderForUserCreation from '../components/interactiveComponents/SliderForUserCreation';
import questions from "../utils/personalityTest.json";
import { RiFocus2Line } from "react-icons/ri";
import { GiSpikyExplosion, GiShardSword } from "react-icons/gi";
import { LuRepeat, LuTimer, LuLightbulb, LuLaugh, LuEye, LuWeight, LuFocus } from "react-icons/lu";
import { FaSortAmountUpAlt, FaPaintBrush } from "react-icons/fa";
import { ImHappy } from "react-icons/im";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import { useTaskUI } from '../context/UIContext';
import { appTutorialSwitch } from '../utils/dbConnection';
import { DBURL } from '../utils/environment';
import axios from 'axios';

const questionsPerPage = 2;
const tutorialSteps = 2;

const CharacterCreation2 = () => {
  // ✅ Hooks first
  const { user, uid } = useAuth();
  const { traitsVisible, toggleTraitVisibility } = useTaskUI();
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState({});
  const form = useForm({ mode: "uncontrolled" });

  // ✅ Early return after hooks
  if (!user) return null;

  const statIconMap = {
    strength: LuWeight,
    dexterity: MdOutlineSportsMartialArts,
    focus_endurance: RiFocus2Line,
    stress_management: GiSpikyExplosion,
    adaptability: LuLightbulb,
    charisma: LuLaugh,
    organization: FaSortAmountUpAlt,
    resilience: GiShardSword,
    consistency: LuRepeat,
    time_management: LuTimer,
    motivation: ImHappy,
    focus: LuFocus,
    wisdom: LuEye,
    creativity: FaPaintBrush,
  };

  const startIndex = (currentPage - tutorialSteps) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const visibleQuestions = currentPage >= tutorialSteps
    ? questions.slice(startIndex, endIndex)
    : [];

  const totalPages = tutorialSteps + Math.ceil(questions.length / questionsPerPage);
  const onLastPage = currentPage === totalPages - 1;

  const nextQuestion = () => setCurrentPage(p => Math.min(p + 1, totalPages - 1));
  const prevQuestion = () => setCurrentPage(p => Math.max(0, p - 1));

  const handleSubmit = async () => {
    if (!uid) {
      console.log('No UID Loaded');
      return { success: false, error: "UID not present" };
    }
    appTutorialSwitch(uid);

    try {
      console.log('Inside Try')
      const userData = await axios.post(`${DBURL}/traits`, { traits: { ...values, uid } });
      toggleTraitVisibility();
      console.log(userData.data)
      return { userData };
    } catch (error) {
      console.error(error.message);
      toggleTraitVisibility();
    }
  };

  return (
    <>
      {traitsVisible && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-20 backdrop-blur-lg transition-opacity duration-500 ease-in-out opacity-100 pointer-events-auto">
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="transition-all duration-500 ease-in-out rounded-xl lg:w-2/4 w-5/6 h-fit shadow-2xl shadow-black border-2 border-stone-600 bg-slate-900 px-5 flex flex-col items-center py-5 justify-between gap-5 absolute"
          >
            {/* Intro steps */}
            {currentPage < tutorialSteps && (
              <div className="w-full text-center px-4">
                {currentPage === 0 && (
                  <>
                    <h2 className="text-3xl font-bold mb-3">Welcome to Momentum!</h2>
                    <p className="text-lg">
                      Momentum is your personal adventure in productivity. Each task you create is a quest
                      for your future self. Completing them will grow your focus, energy, and skills.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Before we start, I will guide you through a quick setup to better understand yourself.
                    </p>
                  </>
                )}
                {currentPage === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-3">Your Traits Shape Your Journey</h2>
                    <p className="text-lg">
                      Everyone has unique strengths and areas to improve. By rating yourself across these traits,
                      Momentum can tailor your tasks, energy management, and challenges to suit you best.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Think of this as preparing your character before embarking on an epic quest.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Sliders */}
            {currentPage >= tutorialSteps && (
              <Group>
                {visibleQuestions.map((question) => (
                  <SliderForUserCreation
                    key={question.id}
                    question={question.text}
                    marks={question.marks}
                    value={values[question.id]}
                    onChange={val => setValues(prev => ({ ...prev, [question.id]: val }))}
                    thumbChildren={statIconMap[question.stat]}
                    thumbSize={35}
                  />
                ))}
              </Group>
            )}

            {/* Navigation */}
            <Group position="apart" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {currentPage > 0 && <Button onClick={prevQuestion}>Previous</Button>}
              {!onLastPage && <Button type="button" onClick={nextQuestion}>Next</Button>}
              {onLastPage && <Button type="submit">Submit</Button>}
            </Group>

            <div className="text-sm text-gray-400">
              Page {currentPage + 1} / {totalPages}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CharacterCreation2;
