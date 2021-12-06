import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {confirmAlert} from 'react-confirm-alert';

import '../ButtonDeleteProject/react-confirm-alert.scss';

import projectsOperations from 'redux/projects/projects-operations';
import {getUserEmail} from 'redux/auth/auth-selectors';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import styles from './ProjectItem.module.scss';
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StarIcon from '@material-ui/icons/Star';
import Grid from "@material-ui/core/Grid";

const ProjectItem = ({project, hideInfo = false}) => {
    const dispatch = useDispatch();
    const userEmail = useSelector(getUserEmail);
    const history = useHistory();

    const handleClickDelete = () =>
        dispatch(projectsOperations.deleteProject(project.id));

    const handleClickFavorite = () =>
        dispatch(projectsOperations.favoriteProject(project.id));

    const onClick = () => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className={styles.custom_ui}>
                        <h1>Are you sure?</h1>

                        <p>You want to delete {project.name} ?</p>

                        <button
                            className={styles.cancelBtn}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.rdyBtn}
                            type="button"
                            onClick={() => {
                                handleClickDelete();
                                onClose();
                            }}
                        >
                            Ok
                        </button>
                    </div>
                );
            },
        });
    };

    const openProject = () => {
        history.push({ pathname: `/projects/${project.id}`});
    }

    return (
        <>
            <div className={styles.itemWrapper}>
                <h3 className={styles.itemTitle} onClick={openProject}>{project.name}</h3>
                <p className={styles.itemDescription}> {project.description}</p>

                {userEmail === project.owner?.email && hideInfo !== true && (
                    <div className={styles.buttonWrapper}>
                        <Grid container style={{width: '100%'}}>
                            <Grid item xs={6}>
                                <AvatarGroup max={4} spacing={'medium'} classes={{avatar: styles.avatar}}>
                                    {
                                        project.participants.map( user =>
                                            <Avatar alt={user.email} src={'data:image/png;base64,' + user.avatar} className={styles.avatar} />
                                        )
                                    }
                                </AvatarGroup>
                            </Grid>
                            <Grid xs={6} item style={{textAlign:'right'}}>
                                <IconButton className={styles.iconButton} onClick={handleClickFavorite}>
                                    {project.favorite === true ? <StarIcon className={styles.favorite}/> : <StarBorderIcon/>}
                                </IconButton>

                                <IconButton className={styles.iconButton} onClick={onClick}>
                                    <DeleteOutlineIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>

                    </div>
                )}
                </div>
        </>
    );
};

export default ProjectItem;

ProjectItem.propTypes = {
    project: PropTypes.object.isRequired,
};
