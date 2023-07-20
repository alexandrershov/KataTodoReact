import React, { useRef, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import TaskTimer from '../TaskTimer/TaskTimer';
import './Task.css';

export default function Task(props) {
    const { item } = props;

    const editFieldRef = useRef(null);

    const [taskState, setTask] = useState({
        isDeleted: false,
        editiValue: item.description,
    });

    const onChangeEditiValue = (e) => {
        setTask((task) => ({ ...task, editiValue: e.target.value }));
    };

    const breakEditTask = () => {
        const { toggleTaskEditMode } = props;

        toggleTaskEditMode(item.id, false);

        setTask((task) => ({ ...task, editiValue: item.description }));
    };

    const onKey = (e) => {
        if (e.keyCode === 13) {
            const { changeTaskText, toggleTaskEditMode } = props;
            const { editiValue } = taskState;

            changeTaskText(item.id, editiValue);
            toggleTaskEditMode(item.id, false);
        }

        if (e.keyCode === 27) {
            breakEditTask();
        }
    };

    const onClickEdit = async () => {
        const { toggleTaskEditMode } = props;

        await toggleTaskEditMode(item.id, true);
        editFieldRef.current.focus();
    };

    const DeleteTask = () => {
        const { onDeleted, id } = props;
        onDeleted(id);

        setTask((task) => ({ ...task, isDeleted: !task.isDeleted }));
    };

    const keyDownHandler = (evt) => {
        const { toggleTaskCompleted } = props;
        if (evt.shiftKey && !item.editMode) {
            toggleTaskCompleted(item.id, !item.completed);
        }
    };

    const { description, creatingTime, completed, id, setIntervalId, tick, toggleTaskCompleted, setChecked } = props;
    const { editiValue, isDeleted } = taskState;

    // eslint-disable-next-line react/destructuring-assignment
    const { minutes, seconds } = props.timer;

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
                        onKeyDown={(evt) => keyDownHandler(evt)}
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
                    <button label="edit" type="button" id={id + 300} className="icon icon-edit" onClick={onClickEdit} />
                    <button label="delete" type="button" className="icon icon-destroy" onClick={() => DeleteTask()} />
                </label>
            </div>
            <input
                type="text"
                className="edit"
                ref={editFieldRef}
                value={editiValue}
                onChange={onChangeEditiValue}
                onBlur={breakEditTask}
                onKeyDown={onKey}
            />
        </li>
    );
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
