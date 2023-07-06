/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-no-bind */
import { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

import './todoApp.css';

export default class App extends Component {
    maxId = 0;

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            buttonName: 'All',
        };
    }

    changeTaskField = (id, field, value) => {
        this.setState(({ arr }) => ({
            arr: arr.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [field]: value,
                    };
                }
                return { ...item };
            }),
        }));
    };

    changeTaskText = (id, text) => {
        this.changeTaskField(id, 'description', text);
    };

    toggleTaskEditMode = (id, value) => {
        this.changeTaskField(id, 'editMode', value);
    };

    setChecked(isChecked, id) {
        this.changeTaskField(id, 'checked', isChecked);
    }

    deleteTask = (id) => {
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const newArray = [...arr.slice(0, idx), ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    };

    addTask = (text) => {
        const newItem = this.addTaskArray(text);

        this.setState(({ arr }) => {
            const newArray = [...arr, newItem];

            return {
                arr: newArray,
            };
        });
    };

    toggleTaskCompleted = (id, value) => {
        this.changeTaskField(id, 'completed', value);
    };

    onFilter = (buttonNamee) => {
        if (buttonNamee === 'Active') {
            this.setState({
                buttonName: 'Active',
            });
        } else if (buttonNamee === 'Completed') {
            this.setState({
                buttonName: 'Completed',
            });
        } else if (buttonNamee === 'All') {
            this.setState({ buttonName: 'All' });
        }
    };

    deleteCompleted = () => {
        this.setState(({ arr }) => {
            const newArr = arr.filter((el) => !el.completed);
            return {
                arr: newArr,
                completedArr: [],
            };
        });
    };

    setIntervalId = (idTask, intervalId) => {
        this.setState(({ arr }) => ({
            arr: arr.map((task) => {
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
            }),
        }));
    };

    tick = (id) => {
        this.setState(({ arr }) => ({
            arr: arr.map((task) => {
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
            }),
        }));
    };

    editTask(id, text) {
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const el = arr[idx];
            el.description = text;
            const newArray = [...arr.slice(0, idx), el, ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    }

    addTaskArray(dataTask) {
        const date = new Date();
        const obj = {
            description: dataTask.description,
            creatingTime: date,
            id: this.maxId,
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
        this.maxId += 1;

        return obj;
    }

    render() {
        const { arr, buttonName } = this.state;
        const needToDone = arr.filter((el) => !el.completed).length;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onAddTask={this.addTask} />
                </header>
                <section className="main">
                    <TaskList
                        tasksFromServer={arr}
                        onDeleted={this.deleteTask}
                        editTask={this.editTask.bind(this)}
                        buttonName={buttonName}
                        setIntervalId={this.setIntervalId.bind(this)}
                        tick={this.tick.bind(this)}
                        changeTaskText={this.changeTaskText}
                        toggleTaskEditMode={this.toggleTaskEditMode}
                        toggleTaskCompleted={this.toggleTaskCompleted}
                        setChecked={this.setChecked.bind(this)}
                    />
                    <Footer onFilter={this.onFilter} deleteCompleted={this.deleteCompleted} count={needToDone} />
                </section>
            </section>
        );
    }
}
