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

    for (const val of columnValues) {
      if (val === undefined || val === null) {
        continue;
      }

      if (typeof val !== 'number') {
        if(!(typeof val === 'string' && /^\d+$/.test(val))){
          isNumeric = false;
        }
      }

      if (!(typeof val === 'string' || typeof val === 'boolean')) {
        isCategorical = false;
      }

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

    if (isBinary) {
      columnTypes.push({ type: 'binary' });
    }
    if (isNumeric) {
      columnTypes.push({ type: 'numeric' });
    }
    if (isCategorical) {
      const uniqueValues = Array.from(new Set(columnValues));
      columnTypes.push({ type: 'categorical', values: uniqueValues });
    }
    if (isDateTime) {
      columnTypes.push({ type: 'date' });
    }
    if (isText) {
      columnTypes.push({ type: 'text' });
    }
    if (!isNumeric && !isCategorical && !isDateTime && !isText && !isBinary) {
      columnTypes.push({ type: 'mixed' });
    }
    columnsTypes.push(columnTypes);
  }

  return columnsTypes;
}
