export const groupByN = (n, data) => {
  let result = [];
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  return result;
};
export const queuePad = (num) => {
  let str = "" + num;
  let pad = "000";
  return pad.substring(0, pad.length - str.length) + str;
};
