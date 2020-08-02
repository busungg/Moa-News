import React from 'react';
import styles from './style.module.css';

const Gnb = ({ list }) => {
  console.log('Gnb rendering');

  return (
    <ul className={styles.gnb}>
      {list.map((value) => {
        return (
          <li className={styles['gnb-item']}>
            <a href="#">{value}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Gnb);
