export interface mailData {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  height: number;
  gender: string;
  comment: string;
  hairColor: string;
}
export type transformedMailData = Pick<
  mailData,
  "email" | "height" | "gender" | "comment" | "hairColor"
> & {
  name: {
    first: string;
    last: string;
  };
  dob: {
    dob: string;
    age: number;
  };
};
