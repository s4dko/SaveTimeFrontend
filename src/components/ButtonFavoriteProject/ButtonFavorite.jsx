import PropTypes from 'prop-types';

import styles from './ButtonFavorite.module.scss';

const ButtonDelete = ({ handleClick }) => {
    return (
        <button
            type="button"
            onClick={() => handleClick()}
            className={styles.btnDelete}
        ></button>
    );
};

ButtonDelete.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default ButtonDelete;
