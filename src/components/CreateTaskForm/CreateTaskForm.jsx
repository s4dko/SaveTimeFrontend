import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import projectsOperations from 'redux/projects/projects-operations';
import tasksOperations from 'redux/tasks/tasks-operations';
import sprintsOperations from 'redux/sprints/sprints-operations';
import s from './CreateTaskForm.module.scss';
import {CircularProgress, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import trelloService from 'services/trelloService'
import {getUserTrelloBoardId, getUserTrelloKey, getUserTrelloToken} from "../../redux/auth/auth-selectors";
const CreateTaskForm = ({ projectId, sprintId, onClickCancel }) => {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const trelloToken = useSelector(getUserTrelloToken);
  const trelloKey = useSelector(getUserTrelloKey);
  const trelloBoardId = useSelector(getUserTrelloBoardId);



  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const {data} = await dispatch(trelloService.getCardsOnBoard(trelloKey, trelloToken, trelloBoardId));

      console.log('text',data);
      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);








  const handleChangeTask = e => {
      console.log('xxx', e.target.value);
    setTask(e.target.value);
  };

  const handleChangeHours = e => {
    setHours(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // если пустой инпут, подсвечиваем красным
    if (!task || !hours) {
      setEmptyInput(true);
      return;
    }

    const currentProject = await dispatch(
      projectsOperations.getProjectById(projectId),
    );

    if (!currentProject) {
      history.push(`/projects`);
      return;
    }

    await dispatch(
      tasksOperations.createTask(projectId, sprintId, {
        name: task,
        scheduledTime: hours,
      }),
    );
    await dispatch(sprintsOperations.getSprintById(projectId, sprintId));

    onClickCancel();

    setTask('');
    setHours('');
    setEmptyInput(false);
  };

  return (
    <div className={s.form}>
      <h2 className={s.title}>Creating a task</h2>
      <form id="add" onSubmit={handleSubmit}>
          <label htmlFor={task}>
              <input
                  id={task}
                  value={task}
                  type="text"
                  name="task"
                  placeholder={emptyInput ? 'Enter task name' : 'Task name'}
                  className={emptyInput ? s.empty_input : s.input}
                  onChange={handleChangeTask}
              />
          </label>
        {/*<Autocomplete*/}
        {/*    style={{ width: 300 }}*/}
        {/*    open={open}*/}
        {/*    onOpen={() => {*/}
        {/*      setOpen(true);*/}
        {/*    }}*/}
        {/*    onClose={() => {*/}
        {/*      setOpen(false);*/}
        {/*    }}*/}
        {/*    getOptionSelected={(option, value) => option.name === value.name}*/}
        {/*    getOptionLabel={(option) => option.name}*/}
        {/*    options={options}*/}
        {/*    loading={loading}*/}
        {/*    renderInput={(params) => (*/}
        {/*        <TextField*/}
        {/*            {...params}*/}
        {/*            id={task}*/}
        {/*            label="Task name"*/}
        {/*            variant="outlined"*/}
        {/*            onChange={handleChangeTask}*/}
        {/*            InputProps={{*/}
        {/*              ...params.InputProps,*/}
        {/*              endAdornment: (*/}
        {/*                  <>*/}
        {/*                    {loading ? <CircularProgress color="inherit" size={20} /> : null}*/}
        {/*                    {params.InputProps.endAdornment}*/}
        {/*                  </>*/}
        {/*              ),*/}
        {/*            }}*/}
        {/*        />*/}
        {/*    )}*/}
        {/*/>*/}
        <label htmlFor={hours}>
          <input
            id={hours}
            value={hours}
            type="text"
            pattern="[0-9]{1,2}$"
            name="hours"
            placeholder={
              emptyInput ? 'Enter scheduled hours' : 'Scheduled hours'
            }
            className={
              emptyInput
                ? [s['empty_input'], s['schedule']].join(' ')
                : [s['input'], s['schedule']].join(' ')
            }
            onChange={handleChangeHours}
          />
        </label>
      </form>

      <button form="add" type="submit" className={s.ready_btn}>
        Ready
      </button>

      <button
        onClick={onClickCancel}
        form="add"
        type="button"
        className={s.cancel_btn}
      >
        Cancel
      </button>
    </div>
  );
};

CreateTaskForm.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
};

export default CreateTaskForm;
