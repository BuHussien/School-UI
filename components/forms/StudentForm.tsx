"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be at most 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstname: z.string().min(3, { message: "First name must be at least 3 characters" }),
  lastname: z.string().min(3, { message: "Last name must be at least 3 characters" }),
  bloodType: z.string().min(1, { message: "Blood type is required" }),
  phone: z.string().min(9, { message: "Phone must be at least 9 characters" }),
  address: z.string().min(3, { message: "Address must be at least 3 characters" }),
  birthdate: z.string().min(1, { message: "Birth date is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  img: z.any().refine((files) => files?.length === 1, { message: "Image is required" }),
});

type StudentFormValues = z.infer<typeof schema>;

interface IProps {
  type: "create" | "update";
  data?: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    bloodType?: string;
    birthday?: string;
    sex?: "male" | "female";
  };
  onSubmit?: (values: StudentFormValues) => void;
}

const StudentForm = ({ type, data, onSubmit }: IProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormValues>({resolver: zodResolver(schema),
    defaultValues: {
      username: data?.username ?? "",
      email: data?.email ?? "",
      password: "",
      firstname: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
      phone: data?.phone ?? "",
      address: data?.address ?? "",
      bloodType: data?.bloodType ?? "",
      birthdate: data?.birthday ?? "",
      sex: data?.sex ?? "male",
    },
  });

  const submit = handleSubmit((values) => {
    console.log(values);
    onSubmit?.(values);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create new Student" : "Update Student"}
      </h1>

      <span className="text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Username" name="username" register={register} error={errors.username} />
        <InputField label="Email" name="email" register={register} error={errors.email} />
        <InputField label="Password" name="password" type="password" register={register} error={errors.password} />
      </div>

      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="First Name" name="firstname" register={register} error={errors.firstname} />
        <InputField label="Last Name" name="lastname" register={register} error={errors.lastname} />
        <InputField label="Phone" name="phone" register={register} error={errors.phone} />
        <InputField label="Address" name="address" register={register} error={errors.address} />
        <InputField label="Blood Type" name="bloodType" register={register} error={errors.bloodType} />
        <InputField label="Birth Date" name="birthdate" type="date" register={register} error={errors.birthdate} />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select {...register("sex")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (<p className="text-xs text-red-400">{errors.sex.message}</p>)}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" accept="image/*" {...register("img")} className="hidden" />
          {typeof errors.img?.message === "string" && (<p className="text-xs text-red-400">{errors.img.message}</p>)}
        </div>
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;