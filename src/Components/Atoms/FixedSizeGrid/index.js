import React, { useCallback, useMemo } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

const FixedSizeGrid = ({ columnWidth, rowHeight, columnCount, list }) => {
  const render = useCallback(
    ({ key, columnIndex, rowIndex, style }) => {
      return (
        <div key={key} style={style}>
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

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Grid
          cellRenderer={render}
          width={width}
          height={height}
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
        />
      )}
    </AutoSizer>
  );
};

export default FixedSizeGrid;
