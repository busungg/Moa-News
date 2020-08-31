import React, { useCallback } from 'react';
import { AutoSizer, List } from 'react-virtualized';

const FixedSizeList = ({
  rowHeight,
  list,
  scrollDispatch,
  scrollToIndex = -1,
}) => {
  const render = useCallback(
    ({
      index, // Index of row
      key, // Unique key within array of rendered rows
      style, // Style object to be applied to row (to position it);
    }) => {
      return (
        <div
          key={key}
          style={{
            ...style,
            width: '98%',
            height: style.height + 10,
            margin: 5,
          }}
        >
          {list[index]}
        </div>
      );
    },
    [list]
  );

  const onScroll = useCallback(
    ({ clientHeight, scrollHeight, scrollTop }) => {
      if (list.length > 0 && clientHeight + scrollTop === scrollHeight) {
        if (scrollDispatch) {
          scrollDispatch();
        }
      }
    },
    [list, scrollDispatch]
  );

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <List
            width={width}
            height={height}
            rowCount={list.length}
            rowHeight={rowHeight + 10}
            rowRenderer={render}
            onScroll={onScroll}
            scrollToIndex={scrollToIndex}
          />
        );
      }}
    </AutoSizer>
  );
};

export default FixedSizeList;
