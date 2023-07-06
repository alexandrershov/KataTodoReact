/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import TaskTimer from '../TaskTimer/TaskTimer';
import './Task.css';

export default class Task extends Component {
    constructor(props) {
        super(props);

        const { item } = this.props;
        this.editFieldRef = React.createRef();

        this.state = {
            isDeleted: false,
            editiValue: item.description,
        };
    }

    onChangeEditiValue = (e) => {
        this.setState({
            editiValue: e.target.value,
        });
    };

    breakEditTask = () => {
        const { item, toggleTaskEditMode } = this.props;

        toggleTaskEditMode(item.id, false);
        this.setState({
            editiValue: item.description,
        });
    };

    onKey = (e) => {
        if (e.keyCode === 13) {
            const { item, changeTaskText, toggleTaskEditMode } = this.props;
            const { editiValue } = this.state;

            changeTaskText(item.id, editiValue);
            toggleTaskEditMode(item.id, false);
        }

        if (e.keyCode === 27) {
            this.breakEditTask();
        }
    };

    onClickEdit = async () => {
        const { item, toggleTaskEditMode } = this.props;

        await toggleTaskEditMode(item.id, true);
        this.editFieldRef.current.focus();
    };

    DeleteTask() {
        const { onDeleted, id } = this.props;
        onDeleted(id);
        this.setState(({ isDeleted }) => ({
            isDeleted: !isDeleted,
        }));
    }

    keyDownHandler(evt) {
        const { item, toggleTaskCompleted } = this.props;
        if (evt.shiftKey && !item.editMode) {
            toggleTaskCompleted(item.id, !item.completed);
        }
    }

    render() {
        const { description, creatingTime, completed, id, item, setIntervalId, tick, toggleTaskCompleted, setChecked } =
            this.props;
        const { editiValue, isDeleted } = this.state;
        // eslint-disable-next-line react/destructuring-assignment
        const { minutes, seconds } = this.props.timer;

        const timer = (
            <TaskTimer
                seconds={seconds !== '' ? seconds : 0}
                minutes={minutes !== '' ? minutes : 0}
                id={id}
                item={item}
                setIntervalId={setIntervalId}
                isDeleted={isDeleted}
                tick={tick}
                setChecked={setChecked}
            />
        );

        return (
            <li id={id} className={`${completed ? 'completed' : ''} ${item.editMode ? 'editing' : ''}`}>
                <div className="view">
                    <input
                        className="toggle "
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleTaskCompleted(item.id, !item.completed)}
                    />
                    <label htmlFor="task" id={id + 100} className="label">
                        <span
                            role="definition"
                            id={id + 200}
                            onKeyDown={(evt) => this.keyDownHandler(evt)}
                            className="description"
                            onClick={() => toggleTaskCompleted(item.id, !item.completed)}
                        >
                            {description}
                        </span>
                        <span className="created">
                            {`created ${formatDistanceToNow(creatingTime, {
                                includeSeconds: true,
                                locale: KG,
                                addSuffix: true,
                            })}`}
                        </span>
                        {timer}
                        <button
                        label="edit"
                        type="button"
                        id={id + 300}
                        className="icon icon-edit"
                        onClick={this.onClickEdit}
                        />
                    <button
                        label="delete"
                        type="button"
                        className="icon icon-destroy"
                        onClick={() => this.DeleteTask()}
                    />
                    </label>
                </div>
                <input
                    type="text"
                    className="edit"
                    ref={this.editFieldRef}
                    value={editiValue}
                    onChange={this.onChangeEditiValue}
                    onBlur={this.breakEditTask}
                    onKeyDown={this.onKey}
                />
            </li>
        );
    }
}

Task.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    completed: PropTypes.bool,
    creatingTime: PropTypes.instanceOf(Date),

    onDeleted: PropTypes.func.isRequired,
};

Task.defaultProps = {
    id: 999999,
    description: 'Купить джип в Москве или в другом культурном городе',
    completed: false,
    creatingTime: new Date(),
};
