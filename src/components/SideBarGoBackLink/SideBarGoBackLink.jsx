import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as Arrow } from './arrow.svg';
import s from './SideBarGoBackLink.module.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const SideBarGoBackLink = ({ match }) => {
  const {
    path,
    params: { projectId },
  } = match;

  return (
    <>
      {path === '/projects/:projectId' ? (
        <Link
          className={s.showProjectsLink}
          to={{
            pathname: `/projects`,
          }}
        >
          <ArrowBackIosIcon className={s.Arrow} />
          <span>Show projects</span>
        </Link>
      ) : (
        <Link
          className={s.showProjectsLink}
          to={{
            pathname: `/projects/${projectId}`,
          }}
        >
          <ArrowBackIosIcon className={s.Arrow} />
          <span>Show sprints</span>
        </Link>
      )}
    </>
  );
};

export default withRouter(SideBarGoBackLink);
