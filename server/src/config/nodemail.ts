import nodemailer from 'nodemailer';

export const sendEMail = async ({ to, subject, text }) => {
  try {
    const mailInfo = {
      from: {
        name: 'Job-Listings 👻',
        address: process.env.NODEMAIL_EMAIL,
      },
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
