const convertHourStringToMinutes = (hoursString: string) => {
  const [hours, minutes] = hoursString.split(":").map(Number);

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
};

const convertMinuteToHouresString = (minutesAmount: number) => {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}`;
};

export { convertHourStringToMinutes, convertMinuteToHouresString };
