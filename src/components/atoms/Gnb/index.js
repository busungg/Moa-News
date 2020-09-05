import React, { useCallback } from 'react';
import styles from './style.module.css';

const Gnb = ({ list, selected, onSelect }) => {
  const onClick = useCallback(
    (evt) => {
      const { currentTarget } = evt;
      const { title, category } = currentTarget.dataset;

      if (selected.category !== category) {
        onSelect(title, category);
      }
      evt.stopPropagation();
    },
    [selected, onSelect]
  );

  return (
    <ul className={styles.gnb}>
      {list.map((value) => {
        let isSlected = false;
        if (selected.category === value.category) {
          isSlected = true;
        }

        return (
          <li
            key={value.category}
            className={`${styles['gnb-item']} ${
              isSlected ? styles['gnb-item--selected'] : ''
            }`}
            data-title={value.title}
            data-category={value.category}
            onClick={onClick}
          >
            <a href="#">{value.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Gnb);
