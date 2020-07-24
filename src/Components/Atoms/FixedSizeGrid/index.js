import React, { useCallback, useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

const FixedSizeGrid = ({
  width,
  height,
  columnWidth,
  rowHeight,
  columnCount,
  list,
}) => {
  const render = useCallback(
    ({ columnIndex, rowIndex, style }) => {
      return (
        <div style={style}>{list[columnCount * rowIndex + columnIndex]}</div>
      );
    },
    [list, columnCount]
  );

  const rowCount = useMemo(() => parseInt(list.length / columnCount), [
    list,
    columnCount,
  ]);

  return (
    <Grid
      width={width}
      height={height}
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
    >
      {render}
    </Grid>
  );
};

export default FixedSizeGrid;
