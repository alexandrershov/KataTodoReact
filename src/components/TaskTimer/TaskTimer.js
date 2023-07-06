/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import './TaskTimer.css';

export default class TaskTimer extends React.Component {
    componentDidUpdate(prevProps) {
        const { item } = this.props;
        const { minutes, seconds } = item.timer;
        const { item: prevTask } = prevProps;
        const { minutes: prevMin, seconds: prevSec } = prevTask.timer;

        if (minutes !== prevMin || seconds !== prevSec) {
            if (minutes <= 0 && seconds <= 0) this.timerPause();
        }
    }

    timerPlay = () => {
        const { tick, item, setIntervalId } = this.props;
        const { minutes, seconds, intervalId } = item.timer;

        if (!intervalId && !(minutes <= 0 && seconds <= 0)) {
            const id = setInterval(() => tick(item.id), 1000);
            setIntervalId(item.id, id);
        }
    };

    timerPause = () => {
        const { item, setIntervalId } = this.props;
        clearInterval(item.timer.intervalId);
        setIntervalId(item.id, null);
    };

    render() {
        const { minutes, seconds } = this.props;
        return (
            <div className="timer">
                <span>
                    {minutes}:{seconds}
                </span>

                <button className="icon icon-play" type="button" aria-label="timer play" onClick={this.timerPlay} />
                <button className="icon icon-pause" type="button" aria-label="timer pause" onClick={this.timerPause} />
            </div>
        );
    }
}

TaskTimer.defaultProps = {
    id: 999999,
    minutes: 0,
    seconds: 5,
};
