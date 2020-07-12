import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';

const VariableSizeList = ({ width, height, rowHeight, list }) => {
  console.log(list);

  const render = useCallback(
    ({ index, style }) => {
      console.log(index);

      return list[index];
    },
    [list]
  );

  return (
    <List
      widt={width}
      height={height}
      itemCount={list.length}
      itemSize={rowHeight}
    >
      {render}
    </List>
  );
};

export default VariableSizeList;
