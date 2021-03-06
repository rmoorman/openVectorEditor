import { mapAnnotationsToRows } from "ve-sequence-utils";
import { annotationTypes } from "ve-sequence-utils";
export default function prepareRowData(sequenceData, bpsPerRow) {
  // ac.throw([ac.sequenceData, ac.posInt], arguments);
  let sequenceLength = sequenceData.sequence.length;
  let totalRows = Math.ceil(sequenceLength / bpsPerRow) || 1; //this check makes sure there is always at least 1 row!
  let rows = [];
  let rowMap = {};
  annotationTypes.forEach(function(type) {
    rowMap[type] = mapAnnotationsToRows(
      sequenceData[type],
      sequenceLength,
      bpsPerRow
    );
  });

  for (let rowNumber = 0; rowNumber < totalRows; rowNumber++) {
    const row = {};
    row.rowNumber = rowNumber;
    row.start = rowNumber * bpsPerRow;
    row.end =
      (rowNumber + 1) * bpsPerRow - 1 < sequenceLength
        ? (rowNumber + 1) * bpsPerRow - 1
        : sequenceLength - 1;
    if (row.end < 0) {
      row.end = 0;
    }
    annotationTypes.forEach(function(type) {
      row[type] = rowMap[type][rowNumber] || [];
    });
    row.sequence = sequenceData.sequence.slice(row.start, row.end + 1);

    rows[rowNumber] = row;
  }
  return rows;
}
