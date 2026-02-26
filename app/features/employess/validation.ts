
import { z  } from "zod";
    const today = new Date();

    const isAdult = (dateString: string) => {
      const dob = new Date(dateString);
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        return age - 1;
      }
      return age;
    };
    
   export const employeeSchema = z.object({

      firstName: z.string().min(1, "First name is required"),
      middleName: z.string().min(1, "Middle name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().regex(/^[7-9]\d{9}$/, "Phone number must be 10 digits & start with 7, 8, or 9"),
      dob: z.string().refine(dateStr => {
        const dob = new Date(dateStr);
        return dob <= today && isAdult(dateStr) >= 20;
      }, "DOB must be at least 20 years ago "),
      joiningDate: z.string().refine(dateStr => {
        const jd = new Date(dateStr);
        return jd <= today;
      }, "Joining date is required"),
      gender: z.string(),
      designation: z.string().min(3, "Please select a designation"),
      description: z.string(),
    }).refine(data => data.joiningDate !== data.dob, {
      message: "Joining date cannot be the same as DOB",
      path: ["joiningDate"],
    });

    export const signInSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password is too long" }),
});
      
export type employeeSchemaTypes = z.infer<typeof employeeSchema>;
    
    


   
