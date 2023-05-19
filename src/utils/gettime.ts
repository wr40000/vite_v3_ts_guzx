export const getTime = () => {
  let message = "";
  let time_Now = new Date().getHours();
  // console.log(typeof time_Now);
  if (time_Now <= 9) {
    message = "早上好";
  } else if (time_Now <= 11) {
    message = "上午天气不错";
  } else if (time_Now <= 19) {
    message = "下午好困";
  } else if (time_Now <= 23) {
    message = "晚上几点下班？";
  } else {
    message = "夜深了，该睡觉了";
  }
  return message;
};
