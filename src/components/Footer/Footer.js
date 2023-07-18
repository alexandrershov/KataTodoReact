import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

function Footer(props) {
    const { onFilter, deleteCompleted, count } = props;

    return (
        <footer className="footer">
            <span className="todo-count">{count} item unfinished</span>
            <TasksFilter onFilter={onFilter} />
            <button className="clear-completed" type="button" onClick={() => deleteCompleted()}>
                Clear completed
            </button>
        </footer>
    );
}

Footer.defaultProps = {
    count: 0,
};

Footer.propTypes = {
    count: PropTypes.number,
    deleteCompleted: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
};

export default Footer;
