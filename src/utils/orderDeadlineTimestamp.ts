const convertNum = (num: number) => {
  return num < 10 ? `0${num.toString()}` : num.toString();
}
const getDDay = (dDayIndex: number, todayIndex: number) => {
  const weekNum = 7;
  return (dDayIndex - todayIndex + weekNum) % weekNum;
}

export const orderDeadlineTimestamp = (dayString) => {
  // [0, 1, 2, 3, 4, 5, 6]
  const dayStringArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dDayIndex = dayStringArr.indexOf(dayString);

  const today = new Date(),
        todayIndex = today.getDay(),
        year = today.getFullYear(),
        month = today.getMonth(),
        date = today.getDate(),
        dateDiff = getDDay(dDayIndex, todayIndex),
        nextDate = date + dateDiff + 1;

  const deadline = new Date(year, month, nextDate, 23, 59, 59 );
  const deadlineNum = Math.floor((deadline.getTime() - today.getTime()) / 100);

  if (deadlineNum < 0) return;

  const tenths = deadlineNum % 10,
        seconds = deadlineNum / 10,
        hour = Math.floor((seconds % 86400) / 3600),
        min = Math.floor((seconds % 3600) / 60),
        sec = Math.floor(seconds % 60);

  return `${dateDiff}일 ${convertNum(hour)}:${convertNum(min)}:${convertNum(sec)}.${tenths.toString()}`;
}