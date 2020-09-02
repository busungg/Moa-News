import React from 'react';
import styles from './style.module.css';

const Gnb = ({ list }) => {
  return (
    <ul className={styles.gnb}>
      {list.map((value) => {
        return (
          <li
            key={value.category}
            className={styles['gnb-item']}
            data-category={value.category}
          >
            <a href="#">{value.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Gnb);
