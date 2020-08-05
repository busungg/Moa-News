import React, { useCallback, useMemo } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

const FixedSizeGrid = ({ rowHeight, columnCount, list, dispatch }) => {
  const render = useCallback(
    ({ key, columnIndex, rowIndex, style }) => {
      return (
        <div
          key={key}
          style={{
            ...style,
            width: style.width - 10,
            height: style.height + 10,
            margin: 5,
          }}
        >
          {list[columnCount * rowIndex + columnIndex]}
        </div>
      );
    },
    [list, columnCount]
  );

  const rowCount = useMemo(() => parseInt(list.length / columnCount), [
    list,
    columnCount,
  ]);

  const onScroll = useCallback(({ clientHeight, scrollHeight, scrollTop }) => {
    console.log(clientHeight);
    console.log(scrollHeight);
    console.log(scrollTop);

    if (clientHeight + scrollTop === scrollHeight) {
      console.log('OnScoll End');
      dispatch({ type: 'getData' });
    }
  }, []);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Grid
          cellRenderer={render}
          width={width}
          height={height}
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={width / columnCount - 10}
          rowHeight={rowHeight + 10}
          onScroll={onScroll}
        />
      )}
    </AutoSizer>
  );
};

export default FixedSizeGrid;
