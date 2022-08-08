import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function TableHeader({
  coins,
  setCoins,
  dataKey,
  header,
  sortedData,
  setSortedData,
}) {
  const [ascendingSort, setAscendingSort] = useState(true);

  // Make sure to reset position of THIS sort arrow if another header is clicked
  // This will run everytime sortedData changes.
  useEffect(() => {
    sortedData === dataKey ? setAscendingSort(false) : setAscendingSort(true);
  }, [sortedData]);

  // Not very pretty but best solution I could find
  const compareBy = (key) => {
    if (!ascendingSort && key !== "name")
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    if (ascendingSort && key !== "name") {
      setSortedData(key);
      return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      };
    }
    // Have case-insensitive sorting when sorting by name
    if (!ascendingSort && key === "name")
      return function (a, b) {
        if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
        if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
        return 0;
      };
    if (ascendingSort && key === "name") {
      setSortedData(key);
      return function (a, b) {
        if (a[key].toLowerCase() < b[key].toLowerCase()) return 1;
        if (a[key].toLowerCase() > b[key].toLowerCase()) return -1;
        return 0;
      };
    }
  };

  const sortBy = (key) => {
    const arrayCopy = [...coins];
    arrayCopy.sort(compareBy(key));
    setCoins(arrayCopy);
    setAscendingSort(!ascendingSort);
  };

  return (
    <div className="table-header">
      <p onClick={() => sortBy(dataKey)}>
        {header}
        {ascendingSort ? (
          <ArrowDropUpIcon></ArrowDropUpIcon>
        ) : (
          <ArrowDropDownIcon></ArrowDropDownIcon>
        )}
      </p>
    </div>
  );
}

export default TableHeader;
