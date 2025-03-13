import "dotenv/config";

const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  throw new Error("SMTP_HOST, SMTP_USER, SMTP_PASS are required");
}

export { SMTP_HOST, SMTP_USER, SMTP_PASS };
