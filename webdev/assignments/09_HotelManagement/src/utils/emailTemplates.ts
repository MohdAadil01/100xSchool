export const reservationConfirmationEmail = (data: {
  guestName: string;
  confirmationNo: string;
  hotelName: string;
  hotelAddress: string;
  hotelPhone: string;
  hotelEmail: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  roomTypeName: string;
  ratePlanName: string;
  pricePerNight: number;
  totalAmount: number;
  specialRequests?: string;
}) => {
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a3c5e;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:2px;">
                ${data.hotelName}
              </h1>
              <p style="margin:8px 0 0;color:#a8c4e0;font-size:13px;">
                ${data.hotelAddress}
              </p>
            </td>
          </tr>

          <!-- CONFIRMATION BADGE -->
          <tr>
            <td style="background:#f0f7ff;padding:24px 40px;text-align:center;border-bottom:1px solid #e0e0e0;">
              <p style="margin:0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">
                Booking Confirmed
              </p>
              <h2 style="margin:8px 0 0;color:#1a3c5e;font-size:28px;letter-spacing:3px;">
                ${data.confirmationNo}
              </h2>
              <p style="margin:8px 0 0;color:#888;font-size:12px;">
                Please keep this number for your records
              </p>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0;color:#333;font-size:16px;">
                Dear <strong>${data.guestName}</strong>,
              </p>
              <p style="margin:12px 0 0;color:#555;font-size:14px;line-height:1.6;">
                Thank you for choosing <strong>${data.hotelName}</strong>. 
                Your reservation has been confirmed. We look forward to welcoming you.
              </p>
            </td>
          </tr>

          <!-- STAY DETAILS -->
          <tr>
            <td style="padding:24px 40px;">
              <h3 style="margin:0 0 16px;color:#1a3c5e;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1a3c5e;padding-bottom:8px;">
                Stay Details
              </h3>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;">Check-in</p>
                    <p style="margin:4px 0 0;color:#333;font-size:14px;font-weight:bold;">
                      ${formatDate(data.checkIn)}
                    </p>
                    <p style="margin:2px 0 0;color:#888;font-size:12px;">From 2:00 PM</p>
                  </td>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;">Check-out</p>
                    <p style="margin:4px 0 0;color:#333;font-size:14px;font-weight:bold;">
                      ${formatDate(data.checkOut)}
                    </p>
                    <p style="margin:2px 0 0;color:#888;font-size:12px;">Until 12:00 PM</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:4px 0;">
                    <div style="height:1px;background:#f0f0f0;margin:8px 0;"></div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;">Duration</p>
                    <p style="margin:4px 0 0;color:#333;font-size:14px;font-weight:bold;">
                      ${data.nights} Night${data.nights > 1 ? "s" : ""}
                    </p>
                  </td>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;">Room Type</p>
                    <p style="margin:4px 0 0;color:#333;font-size:14px;font-weight:bold;">
                      ${data.roomTypeName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;">Rate Plan</p>
                    <p style="margin:4px 0 0;color:#333;font-size:14px;font-weight:bold;">
                      ${data.ratePlanName}
                    </p>
                  </td>
                  <td width="50%" style="padding:8px 0;vertical-align:top;">
                    <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;">Rate Per Night</p>
                    <p style="margin:4px 0 0;color:#333;font-size:14px;font-weight:bold;">
                      ₹${data.pricePerNight.toLocaleString()}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TOTAL AMOUNT -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a3c5e;border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;color:#a8c4e0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">
                      Total Amount
                    </p>
                    <p style="margin:4px 0 0;color:#ffffff;font-size:24px;font-weight:bold;">
                      ₹${data.totalAmount.toLocaleString()}
                    </p>
                    <p style="margin:4px 0 0;color:#a8c4e0;font-size:12px;">
                      ${data.nights} night${data.nights > 1 ? "s" : ""} × ₹${data.pricePerNight.toLocaleString()}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SPECIAL REQUESTS -->
          ${
            data.specialRequests
              ? `
          <tr>
            <td style="padding:0 40px 24px;">
              <h3 style="margin:0 0 8px;color:#1a3c5e;font-size:14px;text-transform:uppercase;letter-spacing:1px;">
                Special Requests
              </h3>
              <p style="margin:0;color:#555;font-size:14px;line-height:1.6;background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #1a3c5e;">
                ${data.specialRequests}
              </p>
            </td>
          </tr>`
              : ""
          }

          <!-- HOTEL CONTACT -->
          <tr>
            <td style="padding:0 40px 24px;">
              <h3 style="margin:0 0 12px;color:#1a3c5e;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1a3c5e;padding-bottom:8px;">
                Hotel Contact
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:4px 0;">
                    <p style="margin:0;color:#888;font-size:12px;">📍 Address</p>
                    <p style="margin:2px 0 0;color:#333;font-size:13px;">${data.hotelAddress}</p>
                  </td>
                  <td width="50%" style="padding:4px 0;">
                    <p style="margin:0;color:#888;font-size:12px;">📞 Phone</p>
                    <p style="margin:2px 0 0;color:#333;font-size:13px;">${data.hotelPhone}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:8px 0 0;">
                    <p style="margin:0;color:#888;font-size:12px;">✉️ Email</p>
                    <p style="margin:2px 0 0;color:#333;font-size:13px;">${data.hotelEmail}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#888;font-size:12px;line-height:1.6;">
                This is an automated confirmation. Please do not reply to this email.<br>
                For assistance, contact us at <strong>${data.hotelEmail}</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export const checkoutSummaryEmail = (data: {
  guestName: string;
  confirmationNo: string;
  hotelName: string;
  hotelEmail: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  roomNumber: string;
  roomTypeName: string;
  pricePerNight: number;
  totalAmount: number;
}) => {
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a3c5e;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:2px;">
                ${data.hotelName}
              </h1>
              <p style="margin:8px 0 0;color:#a8c4e0;font-size:13px;">
                Checkout Summary
              </p>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0;color:#333;font-size:16px;">
                Dear <strong>${data.guestName}</strong>,
              </p>
              <p style="margin:12px 0 0;color:#555;font-size:14px;line-height:1.6;">
                Thank you for staying with us. We hope you had a wonderful experience 
                and look forward to welcoming you again soon.
              </p>
            </td>
          </tr>

          <!-- STAY SUMMARY -->
          <tr>
            <td style="padding:24px 40px;">
              <h3 style="margin:0 0 16px;color:#1a3c5e;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1a3c5e;padding-bottom:8px;">
                Stay Summary
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#888;font-size:13px;">Confirmation No.</td>
                  <td style="padding:6px 0;color:#333;font-size:13px;font-weight:bold;text-align:right;">${data.confirmationNo}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#888;font-size:13px;">Room</td>
                  <td style="padding:6px 0;color:#333;font-size:13px;text-align:right;">${data.roomNumber} — ${data.roomTypeName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#888;font-size:13px;">Check-in</td>
                  <td style="padding:6px 0;color:#333;font-size:13px;text-align:right;">${formatDate(data.checkIn)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#888;font-size:13px;">Check-out</td>
                  <td style="padding:6px 0;color:#333;font-size:13px;text-align:right;">${formatDate(data.checkOut)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#888;font-size:13px;">Duration</td>
                  <td style="padding:6px 0;color:#333;font-size:13px;text-align:right;">${data.nights} night${data.nights > 1 ? "s" : ""}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#888;font-size:13px;">Rate Per Night</td>
                  <td style="padding:6px 0;color:#333;font-size:13px;text-align:right;">₹${data.pricePerNight.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div style="height:1px;background:#e0e0e0;margin:8px 0;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#1a3c5e;font-size:15px;font-weight:bold;">Total Charged</td>
                  <td style="padding:6px 0;color:#1a3c5e;font-size:15px;font-weight:bold;text-align:right;">₹${data.totalAmount.toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="margin:0;color:#888;font-size:12px;line-height:1.6;">
                We hope to see you again soon!<br>
                For feedback or queries, contact us at <strong>${data.hotelEmail}</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};
