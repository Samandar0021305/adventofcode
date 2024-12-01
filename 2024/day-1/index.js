const fs = require("fs").promises;

let arr = { left: [], right: [] };

const getData = async () => {
  const data = await fs.readFile("input.txt", { encoding: "utf-8" });
  arr = data.split("\n").reduce(
    (acc, c) => {
      const [l, r] = c.split("   ");
      acc.left.push(Number(l));
      acc.right.push(Number(r));
      return acc;
    },
    { left: [], right: [] }
  );
};

(async () => {
  await getData();
  //   partOne();
  partTwo();
})();

function partOne() {
  const sortedLeft = [...arr.left].sort((a, b) => a - b);
  const sortedRight = [...arr.right].sort((a, b) => a - b);
  const n = sortedLeft.length;
  let sum = 0;
  let i = 0;
  while (i < n) {
    console.log(arr.left[i], arr.right[i]);
    sum += Math.abs(sortedLeft[i] - sortedRight[i]);
    i++;
  }
  console.log(sum);
}

function partTwo() {
  let sum = 0;
  let i = 0;

  while (i < arr.left.length) {
    let x = 0;
    let occurs = 0;

    const leftVal = arr.left[i];
    while (x < arr.right.length) {
      if (arr.right[x] === leftVal) occurs += 1;
      x += 1;
    }
    sum += leftVal * occurs;
    i += 1;
  }
  console.log(sum);
}
