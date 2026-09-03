interface AppointmentEmailData {
  patientName: string;
  doctorName: string;
  specialization: string;
  appointmentDate: string;
  appointmentTime: string;
  hospitalName: string;
  hospitalAddress?: string;
  appointmentId: string;
}

export const appointmentConfirmationEmailTemplate = (
  data: AppointmentEmailData,
) => {
  const {
    patientName,
    doctorName,
    specialization,
    appointmentDate,
    appointmentTime,
    hospitalName,
    hospitalAddress,
    appointmentId,
  } = data;

  return {
    subject: `Appointment Confirmed — ${hospitalName}`,

    text: `
Hello ${patientName},

Your appointment has been successfully confirmed.

Doctor: Dr. ${doctorName}
Specialization: ${specialization}
Date: ${appointmentDate}
Time: ${appointmentTime}
Hospital: ${hospitalName}
${hospitalAddress ? `Address: ${hospitalAddress}` : ""}

Appointment ID: ${appointmentId}

Please arrive 10–15 minutes before your scheduled appointment.

If you need to reschedule or cancel your appointment, please contact the hospital.

Thank you,
${hospitalName}
    `.trim(),

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Appointment Confirmed</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f7fb; padding: 40px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #0f766e;
                padding: 28px 32px;
                text-align: center;
              "
            >
              <div
                style="
                  display: inline-block;
                  width: 48px;
                  height: 48px;
                  line-height: 48px;
                  border-radius: 50%;
                  background-color: #ffffff;
                  color: #0f766e;
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 12px;
                "
              >
                +
              </div>

              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 24px;
                  line-height: 32px;
                "
              >
                Appointment Confirmed
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #d1fae5;
                  font-size: 14px;
                "
              >
                Your appointment has been successfully booked.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">

              <p
                style="
                  margin: 0 0 8px;
                  font-size: 16px;
                  color: #374151;
                "
              >
                Hello <strong>${patientName}</strong>,
              </p>

              <p
                style="
                  margin: 0 0 28px;
                  font-size: 14px;
                  line-height: 22px;
                  color: #6b7280;
                "
              >
                Your appointment has been confirmed. Here are the details
                of your upcoming visit.
              </p>

              <!-- Appointment Card -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f0fdfa;
                  border: 1px solid #ccfbf1;
                  border-radius: 12px;
                "
              >
                <tr>
                  <td style="padding: 22px;">

                    <p
                      style="
                        margin: 0 0 18px;
                        font-size: 12px;
                        font-weight: bold;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                        color: #0f766e;
                      "
                    >
                      Appointment Details
                    </p>

                    <!-- Doctor -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-bottom: 16px;"
                    >
                      <tr>
                        <td width="42%" style="color: #6b7280; font-size: 13px;">
                          Doctor
                        </td>

                        <td
                          width="58%"
                          style="
                            color: #111827;
                            font-size: 14px;
                            font-weight: 600;
                          "
                        >
                          Dr. ${doctorName}
                        </td>
                      </tr>
                    </table>

                    <!-- Specialization -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-bottom: 16px;"
                    >
                      <tr>
                        <td width="42%" style="color: #6b7280; font-size: 13px;">
                          Specialization
                        </td>

                        <td
                          width="58%"
                          style="
                            color: #111827;
                            font-size: 14px;
                            font-weight: 600;
                          "
                        >
                          ${specialization}
                        </td>
                      </tr>
                    </table>

                    <!-- Date -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-bottom: 16px;"
                    >
                      <tr>
                        <td width="42%" style="color: #6b7280; font-size: 13px;">
                          Date
                        </td>

                        <td
                          width="58%"
                          style="
                            color: #111827;
                            font-size: 14px;
                            font-weight: 600;
                          "
                        >
                          ${appointmentDate}
                        </td>
                      </tr>
                    </table>

                    <!-- Time -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-bottom: 16px;"
                    >
                      <tr>
                        <td width="42%" style="color: #6b7280; font-size: 13px;">
                          Time
                        </td>

                        <td
                          width="58%"
                          style="
                            color: #111827;
                            font-size: 14px;
                            font-weight: 600;
                          "
                        >
                          ${appointmentTime}
                        </td>
                      </tr>
                    </table>

                    <!-- Hospital -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td width="42%" style="color: #6b7280; font-size: 13px;">
                          Hospital
                        </td>

                        <td
                          width="58%"
                          style="
                            color: #111827;
                            font-size: 14px;
                            font-weight: 600;
                          "
                        >
                          ${hospitalName}
                        </td>
                      </tr>
                    </table>

                    ${
                      hospitalAddress
                        ? `
                    <div
                      style="
                        margin-top: 12px;
                        padding-top: 12px;
                        border-top: 1px solid #ccfbf1;
                        color: #6b7280;
                        font-size: 13px;
                        line-height: 20px;
                      "
                    >
                      ${hospitalAddress}
                    </div>
                    `
                        : ""
                    }

                  </td>
                </tr>
              </table>

              <!-- Appointment ID -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 20px;"
              >
                <tr>
                  <td
                    style="
                      padding: 16px 18px;
                      background-color: #f9fafb;
                      border-radius: 10px;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 5px;
                        font-size: 11px;
                        color: #9ca3af;
                        text-transform: uppercase;
                        letter-spacing: 0.7px;
                      "
                    >
                      Appointment ID
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 14px;
                        font-weight: bold;
                        color: #374151;
                      "
                    >
                      ${appointmentId}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reminder -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 24px;"
              >
                <tr>
                  <td
                    style="
                      padding: 16px 18px;
                      border-left: 4px solid #0f766e;
                      background-color: #f9fafb;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 13px;
                        line-height: 20px;
                        color: #4b5563;
                      "
                    >
                      <strong>Please note:</strong>
                      We recommend arriving 10–15 minutes before your
                      scheduled appointment.
                    </p>
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin: 28px 0 0;
                  font-size: 13px;
                  line-height: 20px;
                  color: #6b7280;
                "
              >
                If you need to reschedule or cancel your appointment,
                please contact the hospital.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 24px 32px;
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
                text-align: center;
              "
            >
              <p
                style="
                  margin: 0 0 6px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #374151;
                "
              >
                ${hospitalName}
              </p>

              <p
                style="
                  margin: 0;
                  font-size: 12px;
                  line-height: 18px;
                  color: #9ca3af;
                "
              >
                This is an automated message. Please do not reply directly
                to this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
};

// const email = appointmentConfirmationTemplate({
//   patientName: "Rahul Sharma",
//   doctorName: "Amit Verma",
//   specialization: "Cardiology",
//   appointmentDate: "September 10, 2026",
//   appointmentTime: "10:30 AM",
//   hospitalName: "City Care Hospital",
//   hospitalAddress: "Meerut, Uttar Pradesh",
//   appointmentId: "APT-8F29K1",
// });

// await sendMail({
//   from: ENV.EMAIL_USER,
//   to: "patient@example.com",
//   subject: email.subject,
//   text: email.text,
//   html: email.html,
// });
