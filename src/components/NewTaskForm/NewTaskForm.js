import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            seconds: '',
            minutes: '',
        };
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        const { ...props } = this.state;
        const newLocal = this;
        newLocal.props.onAddTask(props);
        this.setState({
            description: '',
            seconds: '',
            minutes: '',
        });
    };

    onDescriptionChange = (evt) => {
        if (evt.target.name === 'description') {
            this.setState({
                description: evt.target.value,
            });
        }

        if (evt.target.name === 'minutes') {
            this.setState({
                minutes: evt.target.value,
            });
        }

        if (evt.target.name === 'seconds') {
            this.setState({
                seconds: evt.target.value,
            });
        }
    };

    render() {
        const { description, minutes, seconds } = this.state;
        return (
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    onChange={this.onDescriptionChange}
                    value={description}
                    placeholder="What needs to be done?"
                    name="description"
                    required
                />
                <input
                    onChange={this.onDescriptionChange}
                    name="minutes"
                    value={minutes}
                    className="new-todo-form__timer"
                    placeholder="Min"
                    type="number"
                    min={0}
                    max={59}
                />
                <input
                    onChange={this.onDescriptionChange}
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
}

NewTaskForm.defaultProps = {
    placeholder: 'What needs to be done?',
    title: 'Todos',
};
