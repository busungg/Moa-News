import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../modules/newsCategory';
import Gnb from '../../components/atoms/Gnb';

const NewsGnbContainer = ({ list }) => {
  const selected = useSelector((state) => state.newsCategory);
  const dispatch = useDispatch();

  const onSelect = useCallback(
    (title, category) => {
      dispatch(setCategory({ title, category }));
    },
    [dispatch]
  );

  return (
    <>
      <Gnb list={list} selected={selected} onSelect={onSelect} />
    </>
  );
};

export default NewsGnbContainer;
