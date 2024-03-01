export default function getColumnTypes(table) {
  if (!table[0]) {
    return [];
  }
  const numCols = table[0].length;

  const columnsTypes = [];

  for (let colIndex = 0; colIndex < numCols; colIndex++) {
    let columnTypes = [];
    const columnValues = table.map((row) => row[colIndex]);

    let isNumeric = true;
    let isCategorical = true;
    let isDateTime = true;
    let isText = true;
    let isBinary = true;
    let max = null;
    let min = null;

    for (const val of columnValues) {
      if (val === undefined || val === null || val === '') {
        continue;
      }

      if (isNaN(val)) {
        isNumeric = false;
      } else {
        if (max == null || max < val) {
          max = val;
        }
        if (min == null || min > val) {
          min = val;
        }
      }

      // if (!(typeof val === 'string' || typeof val === 'boolean')) {
      //   if (typeof val !== 'number' || val % 1 != 0) {
      //     isCategorical = false;
      //   }
      // }

      if (!(val instanceof Date)) {
        isDateTime = false;
      }

      if (typeof val !== 'string') {
        isText = false;
      }

      if (
        !(
          typeof val === 'boolean' ||
          (typeof val === 'number' && (val === 0 || val === 1)) ||
          (typeof val === 'string' && (val === '0' || val === '1'))
        )
      ) {
        isBinary = false;
      }
    }
    const uniqueValues = Array.from(new Set(columnValues));

    if (isBinary || uniqueValues.length == 2) {
      columnTypes.push({
        type: 'binary',
        numeric: isNumeric,
        values: uniqueValues,
      });
    }

    if (isNumeric) {
      columnTypes.push({ type: 'numeric', min: min, max: max });
    }

    if (isCategorical) {
      columnTypes.push({
        type: 'categorical',
        numeric: isNumeric,
        values: uniqueValues,
      });
    }

    // if (isDateTime) {
    //   columnTypes.push({ type: 'date' });
    // }

    // if (isText) {
    //   columnTypes.push({ type: 'text' });
    // }

    // if (!isNumeric && !isCategorical && !isDateTime && !isText && !isBinary) {
    //   columnTypes.push({ type: 'mixed' });
    // }
    columnsTypes.push(columnTypes);
  }
  return columnsTypes;
}
