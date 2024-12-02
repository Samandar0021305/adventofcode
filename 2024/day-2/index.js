const fs = require("fs").promises;

let list = [];
const getData = async () => {
  const data = await fs.readFile("input.txt", { encoding: "utf-8" });
  list = data
    .split("\n")
    .map((value) => value.split("\n"))
    .map((value) => {
      return value
        .join(" ")
        .split(" ")
        .map((_value) => +_value);
    })
    .filter((_value) => _value.length > 1);
};
const isSafe = (row) => {
  const n = row.length;
  let last = row[0];
  let bool = false;

  if (last > row[1]) {
    for (let i = 1; i < n; i++) {
      if (last > row[i] && Math.abs(last - row[i]) <= 3) {
        last = row[i];
        continue;
      }
      bool = true;
      break;
    }
  } else {
    for (let i = 1; i < n; i++) {
      if (last < row[i] && Math.abs(last - row[i]) <= 3) {
        last = row[i];
        continue;
      }
      bool = true;
      break;
    }
  }

  return !bool;
};

(async () => {
  await getData();
  //   partOne();
  partTwo();
})();

const partOne = () => {
  let count = 0;
  list.forEach((row) => {
    if (isSafe(row)) {
      count++;
    }
  });
};

const partTwo = () => {
  let count = 0;

  list.forEach((row) => {
    if (isSafe(row)) {
      count++;
      return;
    }

    const n = row.length;
    for (let i = 0; i < n; i++) {
      const newRow = row.slice(0, i).concat(row.slice(i + 1));
      if (isSafe(newRow)) {
        count++;
        return;
      }
    }
  });

  console.log(count);
};
