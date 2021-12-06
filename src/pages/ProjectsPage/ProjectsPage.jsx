import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/Modal';
import CreateProject from 'components/CreateProject';
import ProjectList from 'components/ProjectList';
import projectsOperations from 'redux/projects/projects-operations';

import {
  getLoadingProjects,
  getError,
} from 'redux/projects/projects-selectors';

import styles from './ProjectsPage.module.scss';
import Spinner from 'components/Loader/Loader';
import swal from 'sweetalert';
import {Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const ProjectsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const loading = useSelector(getLoadingProjects);
  const Error = useSelector(getError);

  const dispatch = useDispatch();
  useEffect(() => dispatch(projectsOperations.getAllProjects()), [dispatch]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (Error === 'Request failed with status code 404') {
      swal({
        text: `You are not a user of this project or it has been deleted`,
        icon: 'error',
        button: { text: 'OK', className: `${styles.swalButton}` },
      });
    }
  }, [Error]);

  return (
    <>
      <div className={styles.ProjectsHeaderBar}>
        <h1 className={styles.ProjectsTitle}>Projects</h1>

        {loading && <Spinner />}


        <Button startIcon={<AddIcon />} color="primary" variant="outlined" onClick={toggleModal}>
          New project
        </Button>

        {showModal && (
          <Modal onCloseModal={toggleModal}>
            <CreateProject onClickCancel={toggleModal} />
          </Modal>
        )}
      </div>

      <ProjectList />
    </>
  );
};

export default ProjectsPage;
