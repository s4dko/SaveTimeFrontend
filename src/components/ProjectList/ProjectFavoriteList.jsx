import { useSelector } from 'react-redux';

import { getProjects } from 'redux/projects/projects-selectors';
import ProjectItem from '../ProjectItem';
import styles from './ProjectList.module.scss';

const ProjectFavoriteList = () => {
    const projects = useSelector(getProjects);
    const dataProjects = projects.filter( (project) => project.favorite === true );

    return (
        <>
            { dataProjects.length > 0 ?
                <ul className={styles.listFavoriteWrapper}>
                    {dataProjects.map(project =>
                        <li key={project.id} className={styles.listItem}>
                            <ProjectItem project={project} hideInfo={true}/>
                        </li>
                    )}
                </ul>
                :
                <div className={styles.ProjectFavoriteEmptyWidget}>Your dont have any favorite projects</div>
            }
        </>

    );
};

export default ProjectFavoriteList;
