import { reminderEmailQueue } from "../jobs/queue";
import { AppointmentInputType } from "../validators/appointment.validator";

const create = async (input: AppointmentInputType) => {
  const {
    slot,
    patient,
    doctor,
    hospital,
    reason,
    symptoms,
    notes,
    createdBy,
  } = input;

  //   check availablility and based on that book slot

  let appointmentDate = "";
  const appointmentTime = new Date(appointmentDate);
  const reminderTime = appointmentTime.getTime() - 60 * 60 * 1000;
  const delay = reminderTime - Date.now();

  await reminderEmailQueue.add(
    "reminder",
    {
      patientName,
      doctorName,
      specialization,
      appointmentDate,
      appointmentTime,
      hospitalName,
      hospitalAddress,
      appointmentId,
      hospitalEmail,
      patientEmail,
    },
    { delay },
  );
};
