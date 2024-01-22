import nodemailer from 'nodemailer';

export const sendEMail = async ({ from, to, subject, text }) => {
  try {
    const mailInfo = {
      from,
      to,
      subject,
      text
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASSWORD,
      },
    });

    await transporter.sendMail(mailInfo);
  } catch (error) {
    console.error(error);
  }
};
