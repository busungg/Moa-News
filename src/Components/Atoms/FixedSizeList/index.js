import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';

const FixedSizeList = ({ width, height, rowHeight, list }) => {
  const render = useCallback(
    ({ index, style }) => {
      return <div style={style}>{list[index]}</div>;
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

export default FixedSizeList;
