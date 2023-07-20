import { useState } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

import './todoApp.css';

let maxId = 1;

export default function App() {
    const [appState, setAppState] = useState({
        arr: [],
        buttonName: 'All',
    });

    const addTaskArray = (dataTask, newId) => {
        const date = new Date();
        const newItem = {
            description: dataTask.description,
            creatingTime: date,
            id: newId,
            completed: false,
            minutes: dataTask.minutes,
            seconds: dataTask.seconds,
            timer: {
                minutes: dataTask.minutes,
                seconds: dataTask.seconds,
                intervalId: null,
            },
            editMode: false,
            checked: false,
        };
        maxId += 1;

        return newItem;
    };

    const changeTaskField = (id, field, value) => {
        setAppState((appState) => {
            const { arr } = appState;
            const newArr = arr.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [field]: value,
                    };
                }
                return { ...item };
            });

            return {
                ...appState,
                arr: newArr,
            };
        });
    };

    const changeTaskText = (id, text) => {
        changeTaskField(id, 'description', text);
    };

    const toggleTaskEditMode = (id, value) => {
        changeTaskField(id, 'editMode', value);
    };

    const setChecked = (isChecked, id) => {
        changeTaskField(id, 'checked', isChecked);
    };

    const deleteTask = (id) => {
        setAppState((appState) => {
            const { arr } = appState;
            const idx = arr.findIndex((el) => el.id === id);
            const newArray = [...arr.slice(0, idx), ...arr.slice(idx + 1)];

            return {
                ...appState,
                arr: newArray,
            };
        });
    };

    const addTask = (text) => {
        const newItem = addTaskArray(text, maxId);

        setAppState((appState) => {
            const { arr } = appState;
            const newArray = [...arr, newItem];

            return {
                ...appState,
                arr: newArray,
            };
        });
    };

    const toggleTaskCompleted = (id, value) => {
        changeTaskField(id, 'completed', value);
    };

    const onFilter = (buttonNamee) => {
        if (buttonNamee === 'Active') {
            setAppState((appState) => ({
                ...appState,
                buttonName: 'Active',
            }));
        } else if (buttonNamee === 'Completed') {
            setAppState((appState) => ({
                ...appState,
                buttonName: 'Completed',
            }));
        } else if (buttonNamee === 'All') {
            setAppState((appState) => ({
                ...appState,
                buttonName: 'All',
            }));
        }
    };

    const deleteCompleted = () => {
        setAppState((appState) => {
            const { arr } = appState;
            const newArr = arr.filter((el) => !el.completed);
            return {
                ...appState,
                arr: newArr,
                completedArr: [],
            };
        });
    };

    const setIntervalId = (idTask, intervalId) => {
        setAppState((appState) => {
            const { arr } = appState;
            const newArr = arr.map((task) => {
                if (task.id === idTask) {
                    return {
                        ...task,
                        timer: {
                            ...task.timer,
                            intervalId,
                        },
                    };
                }
                return { ...task };
            });

            return {
                ...appState,
                arr: newArr,
            };
        });
    };

    const tick = (id) => {
        setAppState((appState) => {
            const { arr } = appState;
            const newArr = arr.map((task) => {
                if (task.id === id) {
                    const { minutes, seconds, intervalId } = task.timer;

                    if (minutes === 0 && seconds === 0) {
                        clearInterval(intervalId);
                        return { ...task, timer: { ...task.timer, intervalId: null } };
                    }

                    return {
                        ...task,
                        timer: {
                            ...task.timer,
                            minutes: seconds ? minutes : minutes - 1,
                            seconds: seconds ? seconds - 1 : 59,
                        },
                    };
                }

                return { ...task };
            });

            return {
                ...appState,
                arr: newArr,
            };
        });
    };

    const editTask = (id, text) => {
        setAppState((appState) => {
            const { arr } = appState;
            const idx = arr.findIndex((el) => el.id === id);
            const el = arr[idx];
            el.description = text;
            const newArray = [...arr.slice(0, idx), el, ...arr.slice(idx + 1)];

            return {
                ...appState,
                arr: newArray,
            };
        });
    };

    const { arr, buttonName } = appState;
    const needToDone = arr.filter((el) => !el.completed).length;

    return (
        <section className="todoapp">
            <header className="header">
                <NewTaskForm onAddTask={addTask} />
            </header>
            <section className="main">
                <TaskList
                    tasksFromServer={arr}
                    onDeleted={deleteTask}
                    editTask={editTask.bind(this)}
                    buttonName={buttonName}
                    setIntervalId={setIntervalId.bind(this)}
                    tick={tick.bind(this)}
                    changeTaskText={changeTaskText}
                    toggleTaskEditMode={toggleTaskEditMode}
                    toggleTaskCompleted={toggleTaskCompleted}
                    setChecked={setChecked.bind(this)}
                />
                <Footer onFilter={onFilter} deleteCompleted={deleteCompleted} count={needToDone} />
            </section>
        </section>
    );
}
