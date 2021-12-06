import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Button, useMediaQuery} from '@material-ui/core';
import { refs } from './refs';

import { ReactComponent as AddGroupIcon } from './svg/add_group_icon.svg';
import { ReactComponent as CreateBtn } from './svg/create_button_icon.svg';

import Aside from 'components/Aside';
import SideBar from 'components/SideBar';
import SideBarScrollWrap from 'components/SideBarScrollWrap';
import SideBarGoBackLink from 'components/SideBarGoBackLink';
import SideBarProjects from 'components/SideBarProjects';
import Modal from 'components/Modal';
import CreateSprint from 'components/CreateSprint';
import SprintList from 'components/SprintList';
import AddPeopleForm from 'components/AddPeopleForm';
import CreateProject from 'components/CreateProject';
import { getUserEmail } from 'redux/auth/auth-selectors';
import {
  getProjects,
  getCurrentProject,
} from 'redux/projects/projects-selectors';

import sprintsOperations from 'redux/sprints/sprints-operations';
import projectsOperations from 'redux/projects/projects-operations';

import s from './SprintsPage.module.scss';
import { useHistory } from 'react-router-dom';
import AddIcon from "@material-ui/icons/Add";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


const SprintsPage = props => {
  const [showModal, setShowModal] = useState(false);
  const [el, setEl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');

  const { projectId } = props.match.params;
  const dispatch = useDispatch();

  const currentProject = useSelector(getCurrentProject);
  const userEmail = useSelector(getUserEmail);
  const projects = useSelector(getProjects);

  const history = useHistory();

  useEffect(() => {
    (async function fetchData() {
      dispatch(projectsOperations.getAllProjects());

      const project = await dispatch(
        projectsOperations.getProjectById(projectId),
      );

      !project && history.push(`/projects`);

      dispatch(sprintsOperations.getAllSprints(projectId));
    })();
  }, [dispatch, projectId]);

  // ----------- Modal -----------
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const toggleModal = el => {
    setEl(el);
    setShowModal(!showModal);
  }; // -------- End Modal --------

  // ------- useMediaQuery -------
  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  const tabletMax = useMediaQuery(handleMaxWidth(refs.tabletMax));
  const desktop = useMediaQuery(handleMinWidth(refs.desktop));
  // ----- End useMediaQuery -----

  const handleNameChange = event => setName(event.target.value);
  const editNameHandle = () => {
    setName(currentProject?.name);
    setShowInput(true);
  };

  const closeInputHandler = e => {
    e.preventDefault();
    if (currentProject.name !== name || name !== '') {
      dispatch(projectsOperations.updateProject(projectId, { name }));
    }
    setShowInput(false);
  };

  return (
    <>
      <main className={s.main}>
        <Aside>
          <SideBar>
            <SideBarGoBackLink />
            <SideBarScrollWrap>
              <SideBarProjects projects={projects} />
            </SideBarScrollWrap>
          </SideBar>
        </Aside>

        <article>
          <div className={s.headerWrap}>
            <div className={s.contentWrap}>
              <div className={s.titleWrap}>
                <form
                  onSubmit={closeInputHandler}
                  className={
                    showInput ? s.changeTitleFormActive : s.changeTitleForm
                  }
                >
                  <input
                    className={s.inputChangeTitle}
                    value={name}
                    name="name"
                    type="text"
                    onChange={handleNameChange}
                  />
                  <button className={s.buttonSave} type="submit"></button>
                </form>
                {!showInput && (
                  <>
                    <h2>{currentProject?.name}</h2>
                    {userEmail === currentProject?.owner.email && (
                      <button
                        title="Edit the name"
                        type="button"
                        className={s.buttonChange}
                        onClick={editNameHandle}
                      ></button>
                    )}
                  </>
                )}
              </div>

              <p>{currentProject?.description}</p>
            </div>

            <div className={s.createSprintWrap}>
              <Button className={s.sprintsBtn} startIcon={<AddIcon />} color="primary" variant="outlined" onClick={() => toggleModal('createSprint')}>
                New sprint
              </Button>
              <Button  startIcon={<PeopleAltIcon />} color="primary" variant="outlined" onClick={() => toggleModal('addPeople')}>
                Participants list
              </Button>
            </div>



          </div>

          <SprintList currentProject={currentProject} />
        </article>
      </main>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          {el === 'createSprint' ? (
            <CreateSprint onClickCancel={toggleModal} projectId={projectId} />
          ) : el === 'addPeople' ? (
            <AddPeopleForm onClickCancel={toggleModal} projectId={projectId} />
          ) : (
            <CreateProject onClickCancel={toggleModal} />
          )}
        </Modal>
      )}
    </>
  );
};

export default SprintsPage;
