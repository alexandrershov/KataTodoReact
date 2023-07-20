import React, { useEffect } from 'react';

import './TaskTimer.css';

export default function TaskTimer({ seconds, minutes, item, setIntervalId, tick }) {
    const timerPause = () => {
        clearInterval(item.timer.intervalId);
        setIntervalId(item.id, null);
    };

    useEffect(() => {
        if (minutes <= 0 && seconds <= 0) timerPause();
    }, [minutes, seconds]);

    const timerPlay = () => {
        const { intervalId } = item.timer;

        if (!intervalId && !(minutes <= 0 && seconds <= 0)) {
            const id = setInterval(() => tick(item.id), 1000);
            setIntervalId(item.id, id);
        }
    };

    return (
        <div className="timer">
            <span style={{ fontSize: '18px' }}>
                min {minutes} sec {seconds}
            </span>

            <button className="icon icon-play" type="button" aria-label="timer play" onClick={timerPlay} />
            <button className="icon icon-pause" type="button" aria-label="timer pause" onClick={timerPause} />
        </div>
    );
}

TaskTimer.defaultProps = {
    id: 999999,
    minutes: 0,
    seconds: 5,
};
