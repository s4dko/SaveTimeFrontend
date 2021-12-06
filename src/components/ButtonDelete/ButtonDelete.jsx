import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './ButtonDelete.module.scss';

const ButtonDelete = ({ handleClick }) => {
  return (
      <DeleteIcon className={styles.btnDelete} onClick={() => handleClick()} />
  );
};

ButtonDelete.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ButtonDelete;
