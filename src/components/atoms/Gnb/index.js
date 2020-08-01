import React from 'react';
import styles from './style.module.css';

const Gnb = ({ list }) => {
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

export default Gnb;
