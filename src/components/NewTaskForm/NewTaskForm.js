import React, { useState } from 'react';
import './NewTaskForm.css';

export default function NewTaskForm(props) {
    const [form, setForm] = useState({
        description: '',
        seconds: '',
        minutes: '',
    });

    const onSubmit = (evt) => {
        evt.preventDefault();
        const { ...task } = form;
        const { onAddTask } = props;
        onAddTask(task);

        setForm({
            description: '',
            seconds: '',
            minutes: '',
        });
    };

    const onDescriptionChange = (evt) => {
        if (evt.target.name === 'description') {
            setForm((partForm) => ({ ...partForm, description: evt.target.value }));
        }

        if (evt.target.name === 'minutes') {
            setForm((partForm) => ({ ...partForm, minutes: evt.target.value }));
        }

        if (evt.target.name === 'seconds') {
            setForm((partForm) => ({ ...partForm, seconds: evt.target.value }));
        }
    };

    const { description, minutes, seconds } = form;
    return (
        <form className="new-todo-form" onSubmit={onSubmit}>
            <input
                className="new-todo"
                onChange={onDescriptionChange}
                value={description}
                placeholder="What needs to be done?"
                name="description"
                required
            />
            <input
                onChange={onDescriptionChange}
                name="minutes"
                value={minutes}
                className="new-todo-form__timer"
                placeholder="Min"
                type="number"
                min={0}
                max={59}
            />
            <input
                onChange={onDescriptionChange}
                value={seconds}
                className="new-todo-form__timer"
                name="seconds"
                placeholder="Sec"
                type="number"
                min={0}
                max={59}
            />
            <button className="add" type="submit" variant="contained">
                add task
            </button>
        </form>
    );
}

NewTaskForm.defaultProps = {
    placeholder: 'What needs to be done?',
    title: 'Todos',
};
