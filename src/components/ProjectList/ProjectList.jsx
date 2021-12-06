import { useSelector } from 'react-redux';

import { getProjects } from 'redux/projects/projects-selectors';
import ProjectItem from '../ProjectItem';
import styles from './ProjectList.module.scss';

const ProjectList = () => {
  const projects = useSelector(getProjects);

  return projects.length === 0 ? (
    <div style={{textAlign: 'center'}}>
        <img src="/projectNotFound.png" width={150} style={{display:'inline', marginTop: 100}}/>
        <div style={{color: 'gray', marginTop: 20}}>Project folder empty</div>
    </div>
  ) : (
    <ul className={styles.listWrapper}>
      {projects.map(project => (
        <li key={project.id} className={styles.listItem}>
          <ProjectItem project={project} />
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
