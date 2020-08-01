import React, { useCallback } from 'react';
import { AutoSizer, List } from 'react-virtualized';

const FixedSizeList = ({ rowHeight, list }) => {
  const render = useCallback(
    ({
      index, // Index of row
      key, // Unique key within array of rendered rows
      style, // Style object to be applied to row (to position it);
    }) => {
      return (
        <div key={key} style={style}>
          {list[index]}
        </div>
      );
    },
    [list]
  );

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <List
            width={width}
            height={height}
            rowCount={list.length}
            rowHeight={rowHeight}
            rowRenderer={render}
          />
        );
      }}
    </AutoSizer>
  );
};

export default FixedSizeList;
