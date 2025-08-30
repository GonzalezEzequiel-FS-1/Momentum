import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Text, Group, Button, Loader, Modal, Tabs } from '@mantine/core';
//import { auth } from '../../firebaseConfig';
import TipTapRenderer from '../components/TipTapRenderer';
import { useTaskContext } from '../context/TaskContext';
import { motion, AnimatePresence } from "framer-motion";
// import { useLevel } from '../context/LevelContext';
import { markAsComplete } from '../utils/dbConnection';
import { useAuth } from '../context/AuthContext';

import { DBURL } from '../utils/environment';

//const DBURL = 'https://momentum-cyee.onrender.com/api'

// Label & color mappings for font color only
const energyMap = {
    L: { label: 'Low', color: 'red' },
    M: { label: 'Medium', color: 'yellow' },
    H: { label: 'High', color: 'green' },
    EP: { label: 'Epic', color: 'purple' },
};

const difficultyMap = {
    E: { label: 'Easy', color: 'green' },
    M: { label: 'Moderate', color: 'yellow' },
    H: { label: 'Hard', color: 'orange' },
    EP: { label: 'Epic', color: 'red' },
};

const urgencyMap = {
    L: { label: 'Low', color: 'green' },
    M: { label: 'Medium', color: 'yellow' },
    H: { label: 'High', color: 'red' },
};

// Animation variants
const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, y: -20, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const TaskList = () => {
    const {uid} = useAuth();
    // const { updateLevel } = useLevel();
    const [refresh, setRefresh] = useState(false);
    const { triggerRefresh } = useTaskContext();
    
    const [tasks, setTasks] = useState([]);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [taskComplete, setTaskComplete] = useState(false)

    const handleGetAllTasks = async () => {
        setLoading(true);
        try {

            const { data } = await axios.get(`${DBURL}/alltasks?uid=${uid}`);
            if (data.success) {
                setTasks((data.tasks || []).filter(task => !task.complete));
                setCompleteTasks((data.tasks || []).filter(task => task.complete));
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateObj) => {
        if (!dateObj) return 'Invalid date';
        const date = dateObj.$date ? new Date(dateObj.$date) : new Date(dateObj);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const openTaskModal = (task) => {
        setSelectedTask(task);
        setTaskComplete(task.complete);
        setModalOpen(true);
    };


    const closeTaskModal = () => {
        setSelectedTask(null);
        setModalOpen(false);
    };

    const renderBadge = (map, value) => {
        const info = map[value] || { label: value, color: 'white' };
        return (
            <Text size="xs" className="px-2 py-1 rounded-md font-bold" style={{ color: info.color }}>
                {info.label}
            </Text>
        );
    };

    // JUST MARK COMPLETE
    const handleUpdateTask = async (taskId) => {
        setLoading(true);
        try {
            const result = await markAsComplete(taskId);
            if (result.success) {
                console.log("Task marked complete:", result.task);
                setTaskComplete(true);
                await handleGetAllTasks();
                closeTaskModal();
            } else {
                console.error("Failed to mark complete:", result.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //UPDATE AND MARK COMPLETE
    // const handleUpdateTask = async (taskId) => {
    //     setLoading(true);
    //     try {
    //         const { data } = await axios.patch('http://localhost:6969/api/completeTaskWithXP', {
    //             taskId,
    //             uid
    //         });

    //         if (data.success) {
    //             console.log("Task completed with XP:", data);
    //             setTaskComplete(true);
    //             // Update LevelContext with new XP and level
    //             updateLevel(data.userProgress.level, data.userProgress.xp, data.userProgress.xpNeededForNextLevel);
    //             await handleGetAllTasks();


    //             closeTaskModal();
    //         } else {
    //             console.error("Failed to complete task:", data.message);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        document.title = "Momentum - Your Tasks";
        handleGetAllTasks();
    }, [refresh, triggerRefresh]);

    return (
        <div className="w-screen h-full flex flex-col items-center justify-start py-10 gap-6">
            <Tabs color='teal' variant='pills' defaultValue={"first"}>
                <Tabs.List grow>
                    <Tabs.Tab value="first">Active Quests</Tabs.Tab>
                    <Tabs.Tab value="second">Completed Quests</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="first" pt="xs">
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key="active-tasks"
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full flex flex-col items-center"
                        >
                            <h1 className="text-4xl font-extrabold text-white mb-2">Your Active Quests</h1>
                            <p className="text-gray-400 text-lg">Track your tasks, manage energy, difficulty, and urgency.</p>
                            <button onClick={handleGetAllTasks}>Reload Tasks</button>

                            {tasks.length === 0 && !loading && (
                                <Text color="gray" size="lg" className="mt-4">
                                    No tasks found. Create some tasks to see them here.
                                </Text>
                            )}

                            {loading && (
                                <div className="flex justify-center items-center w-full h-screen mt-6 absolute top-0">
                                    <Loader color="blue" size="xl" />
                                </div>
                            )}

                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full px-4 overflow-y-scroll">
                                <AnimatePresence>
                                    {tasks.map((task) => (
                                        <motion.div
                                            key={task._id}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            <Card
                                                shadow="md"
                                                padding="lg"
                                                radius="md"
                                                className="bg-gray-800 text-white flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
                                                onClick={() => openTaskModal(task)}
                                            >
                                                <Group position="apart" className="mb-2">
                                                    <Text weight={500} size="lg">{task.Title}</Text>
                                                    <Text size="sm" color="gray.5">
                                                        {formatDate(task.startDate)} - {formatDate(task.endDate)}
                                                    </Text>
                                                </Group>

                                                <div className="mb-3 text-sm text-gray-400 max-h-20 overflow-y-auto">
                                                    <TipTapRenderer content={task.Description} />
                                                </div>

                                                <Group spacing="sm" className="mt-2 flex-wrap">
                                                    {renderBadge(energyMap, task.energyLevel)}
                                                    {renderBadge(difficultyMap, task.difficulty)}
                                                    {renderBadge(urgencyMap, task.urgency)}
                                                </Group>

                                                {task.traits?.length > 0 && (
                                                    <Group spacing="xs" className="mt-2 flex-wrap">
                                                        {task.traits.map((trait, idx) => (
                                                            <Text
                                                                key={idx}
                                                                size="xs"
                                                                color="blue.4"
                                                                className="px-2 py-1 bg-gray-700 rounded-md"
                                                            >
                                                                {trait}
                                                            </Text>
                                                        ))}
                                                    </Group>
                                                )}
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </Tabs.Panel>

                <Tabs.Panel value="second" pt="xs">
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key="completed-tasks"
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full flex flex-col items-center"
                        >
                            <h1 className="text-4xl font-extrabold text-white mb-2">Completed Quests</h1>
                            <p className="text-gray-400 text-lg">Track your tasks, manage energy, difficulty, and urgency.</p>
                            <button onClick={handleGetAllTasks}>Reload Tasks</button>

                            {completeTasks.length === 0 && !loading && (
                                <Text color="gray" size="lg" className="mt-4">
                                    No tasks found. Create some tasks to see them here.
                                </Text>
                            )}

                            {loading && (
                                <div className="flex justify-center items-center w-full h-screen mt-6 absolute">
                                    <Loader color="blue" size="lg" />
                                </div>
                            )}

                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full px-4 overflow-y-scroll">
                                <AnimatePresence>
                                    {completeTasks.map((task) => (
                                        <motion.div
                                            key={task._id}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            <Card
                                                shadow="md"
                                                padding="lg"
                                                radius="md"
                                                className="bg-gray-800 text-white flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
                                                onClick={() => openTaskModal(task)}
                                            >
                                                <Group position="apart" className="mb-2">
                                                    <Text weight={500} size="lg">{task.Title}</Text>
                                                    <Text size="sm" color="gray.5">
                                                        {formatDate(task.startDate)} - {formatDate(task.endDate)}
                                                    </Text>
                                                </Group>

                                                <div className="mb-3 text-sm text-gray-400 max-h-20 overflow-y-auto">
                                                    <TipTapRenderer content={task.Description} />
                                                </div>

                                                <Group spacing="sm" className="mt-2 flex-wrap">
                                                    {renderBadge(energyMap, task.energyLevel)}
                                                    {renderBadge(difficultyMap, task.difficulty)}
                                                    {renderBadge(urgencyMap, task.urgency)}
                                                </Group>

                                                {task.traits?.length > 0 && (
                                                    <Group spacing="xs" className="mt-2 flex-wrap">
                                                        {task.traits.map((trait, idx) => (
                                                            <Text
                                                                key={idx}
                                                                size="xs"
                                                                color="blue.4"
                                                                className="px-2 py-1 bg-gray-700 rounded-md"
                                                            >
                                                                {trait}
                                                            </Text>
                                                        ))}
                                                    </Group>
                                                )}
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </Tabs.Panel>
            </Tabs>

            <AnimatePresence>
                {modalOpen && selectedTask && (
                    <motion.div
                        key="task-modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Modal
                            opened={modalOpen}
                            onClose={closeTaskModal}
                            title={selectedTask?.Title}
                            size="lg"
                            centered
                            overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
                        >
                            <Text size="sm" color="gray.5" className="mb-2">
                                {formatDate(selectedTask.startDate)} - {formatDate(selectedTask.endDate)}
                            </Text>
                            <div className="mb-4">
                                <TipTapRenderer content={selectedTask.Description} />
                            </div>
                            <Group spacing="sm" className="flex-wrap mb-4">
                                {renderBadge(energyMap, selectedTask.energyLevel)}
                                {renderBadge(difficultyMap, selectedTask.difficulty)}
                                {renderBadge(urgencyMap, selectedTask.urgency)}
                            </Group>
                            {selectedTask.traits?.length > 0 && (
                                <Group spacing="xs" className="flex-wrap mb-4">
                                    {selectedTask.traits.map((trait, idx) => (
                                        <Text
                                            key={idx}
                                            size="xs"
                                            color="blue.4"
                                            className="px-2 py-1 bg-gray-700 rounded-md"
                                        >
                                            {trait}
                                        </Text>
                                    ))}
                                </Group>
                            )}

                            <Button
                                color='green'
                                fullWidth
                                onClick={() => handleUpdateTask(selectedTask._id)}
                                
                            >
                                {taskComplete ? "Task Completed" : "Mark as Complete"}
                            </Button>

                        </Modal>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;
