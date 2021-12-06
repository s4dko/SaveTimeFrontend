import GoogleIcon from './Google_icon.png';
import styles from './GoogleLink.module.scss';

const handleClick = (e) => {
  e.preventDefault();
  window.location = process.env.REACT_APP_SERVER_URL + '/api/users/google';
}

const GoogleLink = () => {
  return (
    <a
      className={styles.googleAuth}
      onClick={handleClick}
    >
      <img src={GoogleIcon} alt="Google Icon" width="30" height="30" />
      Log in with GOOGLE
    </a>
  );
};

export default GoogleLink;
