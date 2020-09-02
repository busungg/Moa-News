import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../modules/newsCategory';
import Gnb from '../../components/atoms/Gnb';

const NewsCategoryContainer = ({ list }) => {
  const selected = useSelector((state) => state.newsCategory);
  const dispatch = useDispatch();

  const onSelect = useCallback(
    (title, cateogry) => {
      dispatch(setCategory({ title, cateogry }));
    },
    [dispatch]
  );

  return (
    <>
      <Gnb list={list} />
    </>
  );
};

export default NewsCategoryContainer;
