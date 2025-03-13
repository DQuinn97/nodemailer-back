import { Response } from "express";
import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_USER, SMTP_PASS } from "../utils/envs";
import { mailData, transformedMailData } from "../types/mailTypes";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmails = async (
  data: transformedMailData,
  email: string,
  res: Response
) => {
  // Confirmation to form user
  processEmail(
    data,
    "Submitted Data Confirmation",
    "You have submitted the following data:",
    email,
    res
  );
  // Data report to form owner
  processEmail(
    data,
    "Submitted Data Report",
    `Data submitted from <${email}>:`,
    SMTP_USER as string
  );
};

const processEmail = async (
  data: transformedMailData,
  subject: string,
  context: string,
  email: string,
  res: Response | undefined = undefined
) => {
  ejs.renderFile(
    "src/views/mailLayout.ejs",
    { data, subject, context, email },
    (error, html) => {
      if (error) {
        console.log(error);
      } else {
        sendEmail(subject, email, html);
        res?.status(200).json(data);
      }
    }
  );
};

const sendEmail = async (subject: string, email: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: email,
      subject: subject + " " + Date.now(),
      html,
    });
  } catch (error) {
    console.log(error);
  }
};
