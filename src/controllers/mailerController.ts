import { Request, Response } from "express";
import { sendEmails } from "../utils/mail";
import { transformedMailData } from "../types/mailTypes";

export const getHelloWorld = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};

export const processEmail = (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      height,
      gender,
      comment,
      hairColor,
    } = req.body;

    let locale_dob = new Date(dob).toLocaleDateString();
    let age = new Date(Date.now() - Date.parse(dob)).getUTCFullYear() - 1970;

    const data = {
      name: { first: firstName, last: lastName },
      dob: { dob: locale_dob, age },
      height,
      hairColor,
      gender,
      comment,
    } as transformedMailData;

    sendEmails(data, email, res);
  } catch (error) {
    console.error(error);
  }
};
