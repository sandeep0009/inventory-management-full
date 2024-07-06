
import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    dob: z.date().nullable().refine(date => date !== null, "Date of Birth is required")
});

export const zodVerification = (data) => {
    return userSchema.parse(data);
};
