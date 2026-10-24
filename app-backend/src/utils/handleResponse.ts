import { type Response } from "express";
export const handleFieldError = (
  { field, message }: { field: string; message: string },
  res: Response,
) => {
  return res.status(401).json({
    // success: false,
    errors: {
      field,
      [field]: message,
    },
  });
};

export const handleSuccessResponse = (
  { field, message, code }: { field?: string; message: string; code: number },
  res: Response,
) => {
  return res.status(code || 200).json({ message });
};
