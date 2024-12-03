const fs = require("fs").promises;

let list = [];
const getData = async () => {
  const data = await fs.readFile("input.txt", { encoding: "utf-8" });
  list = data;
};

(async () => {
  await getData();
  //   partOne();
  partTwo();
})();

const partOne = () => {
  let sum = 0;
  for (let item of list) {
    const ans = item.split(")")[0].split("(")?.[1]?.split(",");
    if (ans && ans.length != 2) continue;
    if (+ans?.[0] == ans?.[0] && +ans?.[1] == ans?.[1]) {
      sum += ans[0] * ans[1];
    }
  }
  console.log(sum);
};

const partTwo = () => {
  const regex = /mul\((\d+),(\d+)\)/;
  let isEnabled = true;
  let sum = 0;

  const instructions = list.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
  for (const item of instructions) {
    if (item === "don't()") {
      isEnabled = false;
      continue;
    } else if (item === "do()") {
      isEnabled = true;
    } else if (isEnabled && item.includes("mul")) {
      const match = item.match(regex);
      sum += match[1] * match[2];
    }
  }

  console.log(sum);
  return sum;
};
