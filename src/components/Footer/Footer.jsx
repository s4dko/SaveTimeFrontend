import { useState } from 'react';
import Modal from 'components/ModalFooter';
import styles from './Footer.module.scss';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <footer className={styles.Footer}>
      <span className={styles.Footer_text}>
          &#169; 2021 | All Rights Reserved | Developed by <b>Oleg Sadovyi</b> & <b>Artur Nesterenko</b>, MKiP-201
      </span>
    </footer>
  );
};

export default Footer;
