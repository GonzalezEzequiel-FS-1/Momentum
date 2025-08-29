import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Loader } from "@mantine/core";
import { SlEnergy } from "react-icons/sl";
import MantineInput from "../components/fields/MantineInput";
import DateTimePickerComponent from "../components/Calendar/DateTimePickerComponent";
import SliderInput from "../components/interactiveComponents/SliderInput";
import TextEditor from "../components/fields/TextEditor";
import { useTaskUI } from "../context/UIContext";
import PillsInputComponent from "../components/interactiveComponents/PillsInputComponent";
import traitList from "../utils/traitList.json";
import SegmentedControlNew from "../components/interactiveComponents/SegmentedControlNew";
import { storeTask, checkTutorial, taskTutorialSwitch } from "../utils/dbConnection";
import { auth } from "../../firebaseConfig";
import TutorialToggle from "../utils/ToggleTutorial";
import { useTaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";


const NewTaskRefactor = () => {
  const { uid } = useAuth()
  const { triggerRefresh } = useTaskContext();
  const { isVisible, closeVisibility } = useTaskUI();
  const [error, setError] = useState('')
  const [tutorialState, setTutorialState] = useState(true)


  const turnOffTutorial = async () => {
    const response = await taskTutorialSwitch(uid)
    const disabled = response.success
    setTutorialState(!disabled)
    return response.success

  }
  const [userID, setUserID] = useState();

  const [loading, setLoading] = useState(true);
  const editorContentRef = useRef(null);
  const modalRef = useRef(null);

  // Tutorial state
  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [step, setStep] = useState(0);

  const form = useForm({
    initialValues: {
      Title: "",
      startDate: null,
      endDate: null,
      Description: "",
      energyLevel: "M",
      urgency: "M",
      difficulty: "M",
      traits: [],
    },
    validate: {
      Title: (value) => (value.trim() === "" ? "Quest Name is required" : null),
    }
  });

  // Fetch tutorial state only when modal opens
  useEffect(() => {

    setUserID(uid)

    if (!isVisible) return;

    const fetchTutorial = async () => {
      try {
        setLoading(true);
        const tutorialData = await checkTutorial();

        if (tutorialData.success) {
          const isActive = tutorialData.taskTutorial === true;

          setTutorialActive(isActive);
          setTutorialCompleted(!isActive);
          setStep(isActive ? 0 : 2);
        } else {
          console.error("Failed to fetch tutorial state:", tutorialData.error);
        }
      } catch (err) {
        console.error("Unexpected error fetching tutorial:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [isVisible]);

  const handleSkipTutorial = () => {
    setTutorialActive(false);
    setTutorialCompleted(true);
    setStep(2);
  };

  const nextStep = () => {
    if (tutorialActive && step < 2) {
      setStep(prev => prev + 1);
    } else {
      setStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    if (tutorialActive && step < 2) {
      setStep(prev => Math.max(prev - 1, 0));
    } else {
      setStep(prev => Math.max(prev - 1, 2));
    }
  };

  const handleSubmit = async (values) => {
    if (!uid) {
      console.error("No user signed in");
      setError("You must be signed in to submit a task");
      return;
    }

    if (editorContentRef.current) {
      form.setFieldValue("Description", editorContentRef.current);
    }
    const payload = { uid, ...values, Description: editorContentRef.current };

    try {
      await storeTask(payload);
      closeVisibility();
      form.reset();
      setStep(2);
      triggerRefresh();
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  // Navigation buttons
  const buttons = [];
  if (step > (tutorialActive && step < 2 ? 0 : 2)) {
    buttons.push(<Button fullWidth="true" key="prev" variant="outline" onClick={prevStep}>Previous</Button>);
  }
  if (step < 5) {
    buttons.push(<Button fullWidth="true" key="next" onClick={nextStep}>{tutorialActive && step === 1 ? "Start!" : "Next"}</Button>);
  }
  if (step === 5) {
    buttons.push(<Button key="submit" type="submit" fullWidth="true">Submit Task</Button>);
  }
  const justifyClass = buttons.length === 1 ? "justify-center" : "justify-between";

  return (
    <>{isVisible && (

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        className="fixed top-0 left-0 min-w-[420px]  flex items-center justify-center w-screen h-screen z-20 backdrop-blur-lg"
      >
        <div
          ref={modalRef}
          className="transition-all duration-500 ease-in-out max-w-[1024px] rounded-xl shadow-2xl shadow-black border-2 border-stone-600 md:w-2/4 w-5/6 h-fit bg-slate-900 px-10 py-5 flex flex-col gap-5 min-h-[16rem]"
        >
          {loading ? (
            <div className="flex items-center justify-center w-full h-64">
              <Loader color="blue" size="lg" />
            </div>
          ) : (
            <>
              {/* Tutorial Steps */}
              {tutorialActive && step === 0 && (
                <div>
                  <h2 className="text-center font-black tracking-wider text-2xl mb-3">
                    Time to create your first Task!
                  </h2>
                  <p className="text-justify">
                    Welcome to Momentum! Tasks here are more than just reminders they’re your personal quests.
                    Each task you create will help you track progress, manage your energy, and stay motivated.
                    Think of this as building your own adventure: every quest you complete moves you forward on your journey.
                    Let’s start small and create your very first task together.
                  </p>
                </div>
              )}

              {tutorialActive && step === 1 && (
                <div className="text-center">
                  <h1 className="font-extrabold text-2xl">How to Create Your First Task</h1>
                  <p className="text-justify mt-2">
                    Every task has a few key details that make it easier to manage:
                  </p>
                  <ul className="list-disc pl-6 text-left mt-2 space-y-1">
                    <li><strong>Quest Name</strong> – A short title that clearly describes what you want to accomplish.</li>
                    <li><strong>Start & End Time</strong> – When you want to begin and when you aim to finish.</li>
                    <li><strong>Energy & Difficulty</strong> – How much effort this task will take and how challenging it feels.</li>
                    <li><strong>Traits & Urgency</strong> – What kind of strengths this task requires and how soon it needs to be done.</li>
                    <li><strong>Description</strong> – A detailed explanation, notes, or reminders for yourself.</li>
                  </ul>
                  <p className="mt-3">
                    Don’t worry if this sounds like a lot, we’ll go step by step, and you can always edit your task later.
                    By the end, you’ll have a clear, structured plan for your quest.
                  </p>
                  <div className="flex justify-center mt-4">
                   <Checkbox
  checked={tutorialState}
  onChange={turnOffTutorial}
  label={tutorialState ? "Tutorial is enabled (uncheck to disable)" : "Tutorial is disabled"}
/>
                    {/* <TutorialToggle onSkip={handleSkipTutorial} /> */}
                  </div>
                </div>
              )}

              {/* Task Form Steps */}
              {step >= 2 && (
                <>
                  {step === 2 && (
                    <MantineInput
                      withAsterisk
                      label="Quest Name:"
                      placeholder="Enter your Quest Title"
                      {...form.getInputProps("Title")}
                    />
                  )}
                  {step === 3 && (
                    <>
                      <DateTimePickerComponent
                        withAsterisk
                        label="Quest Begins at:"
                        value={form.values.startDate}
                        onChange={(val) => form.setFieldValue("startDate", val)}
                      />
                      <DateTimePickerComponent
                        withAsterisk
                        label="Expected Completion:"
                        value={form.values.endDate}
                        onChange={(val) => form.setFieldValue("endDate", val)}
                      />
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <SliderInput
                        withAsterisk
                        label="Energy Required:"
                        icon={<SlEnergy size={16} />}
                        value={form.values.energyLevel}
                        onChange={(val) => form.setFieldValue("energyLevel", val)}
                      />
                      <SegmentedControlNew

                        withAsterisk
                        label="Difficulty"
                        value={form.values.difficulty}
                        onChange={(val) => form.setFieldValue("difficulty", val)}
                        data={[
                          { label: "Easy", value: "E" },
                          { label: "Moderate", value: "M" },
                          { label: "Hard", value: "H" },
                          { label: "Epic", value: "EP" },
                        ]}
                      />
                      <PillsInputComponent
                        value={form.values.traits}
                        onChange={(val) => form.setFieldValue("traits", val)}
                        options={traitList}
                      />
                      <SegmentedControlNew
                        withAsterisk
                        label="Urgency Level"
                        value={form.values.urgency}
                        onChange={(val) => form.setFieldValue("urgency", val)}
                        data={[
                          { label: "Low", value: "L" },
                          { label: "Medium", value: "M" },
                          { label: "High", value: "H" },
                        ]}
                      />
                    </>
                  )}
                  {step === 5 && (
                    <TextEditor
                      withAsterisk
                      label="Task Description"
                      value={form.values.Description}
                      onContentChange={(val) => {
                        editorContentRef.current = val;
                        form.setFieldValue("Description", val);
                      }}
                    />
                  )}
                </>
              )}

              <div className={`flex ${justifyClass} gap-4 mt-5 w-full`}>{buttons}</div>
              <Button size="compact-md" variant="outline" onClick={closeVisibility}>
                Quit Task Creation
              </Button>
            </>
          )}
        </div>
      </form >
    )}
    </>
  );
};

export default NewTaskRefactor;
