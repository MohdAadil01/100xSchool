import { AppointmentSlot } from "../models/AppointmentSlot.model";

interface SlotGeneratorInput {
  doctor: string;
  hospital: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
  slotDuration: number;
  daysAhead: number;
}
type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const DAYS = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export const generateSlots = async (input: SlotGeneratorInput) => {
  const {
    doctor,
    hospital,
    workingDays,
    startTime,
    endTime,
    slotDuration,
    daysAhead,
  } = input;

  const startTimeInMin = timeIntoMinutes(startTime);
  const endTimeInMin = timeIntoMinutes(endTime);
  const slots = [];

  for (let day = 1; day <= daysAhead; day++) {
    const date = new Date();
    date.setDate(date.getDate() + day);
    const dayNumber = date.getDay() as DayNumber;
    const weekDay = DAYS[dayNumber];
    if (workingDays.includes(weekDay)) {
      for (let i = startTimeInMin; i < endTimeInMin; i += slotDuration) {
        slots.push({
          doctor,
          hospital,
          date,
          startTime: minuteIntoTime(i),
          endTime: minuteIntoTime(i + slotDuration),
          status: "available",
        });
      }
    }
  }
  const existingSlot = await AppointmentSlot.findOne({
    doctor,
    date: { $gte: new Date() },
  });
  if (existingSlot) {
    console.log("Slot already generated.");
    return;
  }
  await AppointmentSlot.insertMany(slots);
  console.log(`✅ Generated ${slots.length} slots`);
  return slots.length;
};

const timeIntoMinutes = (time: string) => {
  const [hrs, mins] = time.split(":");
  return Number(hrs) * 60 + Number(mins);
};
const minuteIntoTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};
