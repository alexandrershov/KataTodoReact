import React, { useState } from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types';

export default function TasksFilter(props) {
    const [buttonFilter, setFilter] = useState('All');

    const whichButton = (evt) => {
        const { onFilter } = props;
        onFilter(evt.target.innerHTML);
        setFilter({ buttonFilter: evt.target.innerHTML });
    };

    let classAll = 'selected';
    let classActive = '';
    let classCompleted = '';

    if (buttonFilter === 'All') {
        classAll = 'selected';
        classActive = '';
        classCompleted = '';
    } else if (buttonFilter === 'Active') {
        classAll = '';
        classActive = 'selected';
        classCompleted = '';
    } else if (buttonFilter === 'Completed') {
        classAll = '';
        classActive = '';
        classCompleted = 'selected';
    }

    return (
        <ul className="filters">
            <li>
                <button className={classAll} type="button" onClick={whichButton}>
                    All
                </button>
            </li>
            <li>
                <button className={classActive} type="button" onClick={whichButton}>
                    Active
                </button>
            </li>
            <li>
                <button className={classCompleted} type="button" onClick={whichButton}>
                    Completed
                </button>
            </li>
        </ul>
    );
}

TasksFilter.propTypes = {
    onFilter: PropTypes.func.isRequired,
};
