import React, { useEffect, useState } from 'react';
import TextField from '../components/fields/TextField';
import { useForm } from '@mantine/form';
import { Progress, Stepper, Button, Group, Pagination } from '@mantine/core';
import { checkTutorial } from '../utils/dbConnection';
//const { toggleVisibility, toggleTraitVisibility, isVisible, traitsVisible } = useTaskUI();

const CharacterCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState([1, 1, 1]); // Current page per step
  const totalPagesPerStep = [4, 4, 4]; // Pages per step

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      lifeStyle: '',
      energy: '',
      strength: '',
      challenge: '',
      goodAt: '',
      struggles: '',
      timeManagement: '',
      procrastinate: '',
    },
  });

  const handleStepChange = (step) => {
    if (step < 0 || step > totalPagesPerStep.length - 1) return;
    setActiveStep(step);
    setHighestStepVisited((prev) => Math.max(prev, step));
    incrementProgress(step, pages[step]);
  };

  const setPageForCurrentStep = (page) => {
    setPages((prev) => {
      const newPages = [...prev];
      newPages[activeStep] = page;
      incrementProgress(activeStep, page);
      return newPages;
    });
  };

  const isFinalStep = activeStep === totalPagesPerStep.length - 1;
  const isLastPage = pages[activeStep] === totalPagesPerStep[activeStep];

  const handleNext = () => {
    if (isLastPage) {
      handleStepChange(activeStep + 1);
    } else {
      setPageForCurrentStep(pages[activeStep] + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form.getValues(), null, 2));
  };

  const incrementProgress = (step = activeStep, page = pages[activeStep]) => {
    const total = totalPagesPerStep.reduce((a, b) => a + b, 0);
    const completedPages = totalPagesPerStep
      .slice(0, step)
      .reduce((a, b) => a + b, 0) + page;
    setProgress((completedPages / total) * 100);
    // console.log(highestStepVisited)
  };
  useEffect(()=>{
    checkTutorial()
  },[])

  return (
    <form
      onSubmit={handleSubmit}
      className="transition-all duration-500 ease-in-out   rounded-xl shadow-2xl shadow-black border-2 border-stone-600 bg-slate-900 px-5 flex flex-col items-center py-5 justify-between gap-5"
    >
      
      <Group>
        <Stepper
          active={activeStep}
          onStepClick={handleStepChange}
          allowNextStepsSelect={false}
          color="teal"
          size="xs"
          pb="lg"
          gap="md"
        >
          {/* Step 1 */}
          <Stepper.Step label="Identity & Archetype" description="Your heroic alter ego.">
            {pages[activeStep] === 1 && (
              <TextField
                label="What's your character's name?"
                description="Pick a name that represents the best version of you, who you're becoming as you level up in real life."
                {...form.getInputProps('name')}
              />
            )}
            {pages[activeStep] === 2 && (
              <TextField
                label="How would you describe yourself in one sentence?"
                description="In a single line, how would a bard introduce you?"
                {...form.getInputProps('description')}
              />
            )}
            {pages[activeStep] === 3 && (
              <TextField
                label="Choose your archetype"
                description="Which role do you naturally lean into? This helps shape your starting traits and growth path."
                {...form.getInputProps('lifeStyle')}
              />
            )}
            {pages[activeStep] === 4 && (
              <TextField
                label="What do you value most in your journey?"
                description="Pick the guiding force behind your personal growth."
                {...form.getInputProps('energy')}
              />
            )}
            <Pagination
              total={totalPagesPerStep[activeStep]}
              value={pages[activeStep]}
              onChange={setPageForCurrentStep}
              styles={{ root: { display: 'flex', justifyContent: 'center', marginTop: 60, position: 'absolute', visibility: 'hidden' } }}
            />
          </Stepper.Step>

          {/* Step 2 */}
          <Stepper.Step label="Character Class" description="Are you a warrior, mage, or something else?">
            {pages[activeStep] === 1 && (
              <TextField
                label="What are some things you’re naturally good at?"
                description="These are areas where you feel confident, even on tough days."
                {...form.getInputProps('goodAt')}
              />
            )}
            {pages[activeStep] === 2 && (
              <TextField
                label="What do you struggle with the most when working on goals?"
                description="Being honest here helps us help you."
                {...form.getInputProps('struggles')}
              />
            )}
            {pages[activeStep] === 3 && (
              <TextField
                label="How would you rate your time management skills?"
                description="Think about how well you plan and stick to schedules."
                {...form.getInputProps('timeManagement')}
              />
            )}
            {pages[activeStep] === 4 && (
              <TextField
                label="How often do you procrastinate?"
                description="It’s okay, everyone does. This helps fine-tune your focus stat."
                {...form.getInputProps('procrastinate')}
              />
            )}
            <Pagination
              total={totalPagesPerStep[activeStep]}
              value={pages[activeStep]}
              onChange={setPageForCurrentStep}
              styles={{ root: { display: 'flex', justifyContent: 'center', marginTop: 60, position: 'absolute', visibility: 'hidden' } }}
            />
          </Stepper.Step>

          {/* Step 3 */}
          <Stepper.Step label="Place of Origin" description="Where does your story begin?">
            <TextField
              label="Placeholder question"
              description="This is a placeholder for step 3, page 1."
              {...form.getInputProps('strength')}
            />
            <Pagination
              total={totalPagesPerStep[activeStep]}
              value={pages[activeStep]}
              onChange={setPageForCurrentStep}
              styles={{ root: { display: 'flex', justifyContent: 'center', marginTop: 60, visibility: 'hidden', position: 'absolute' } }}
            />
          </Stepper.Step>

          {/* Completed Step */}
          <Stepper.Completed>
            All steps completed — review your character and submit!
          </Stepper.Completed>
        </Stepper>
      </Group>

      <Group justify="center" className="w-full max-w-[600px]">
        <Progress.Root styles={{ root: { width: '100%' } }}>
          <Progress.Section value={progress} />
        </Progress.Root>

        <Button
          variant="default"
          onClick={() => {
            if (pages[activeStep] > 1) {
              setPageForCurrentStep(pages[activeStep] - 1);
            } else {
              handleStepChange(activeStep - 1);
            }
          }}
          disabled={activeStep === 0 && pages[0] === 1}
        >
          Back
        </Button>
        

        {isFinalStep && isLastPage ? (
          <Button type="submit">Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </Group>
    </form>
  );
};

export default CharacterCreation;
