"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be at most 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstname: z.string().min(3, { message: "First name must be at least 3 characters" }),
  lastname: z.string().min(3, { message: "Last name must be at least 3 characters" }),
  phone: z.string().min(9, { message: "Phone must be at least 9 characters" }),
  address: z.string().min(3, { message: "Address must be at least 3 characters" }),
});

type ParentFormValues = z.infer<typeof schema>;

interface IProps {
  type: "create" | "update";
  data?: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  };
  onSubmit?: (values: ParentFormValues) => void;
}

const ParentForm = ({ type, data, onSubmit }: IProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ParentFormValues>({resolver: zodResolver(schema),
    defaultValues: {
      username: data?.username ?? "",
      email: data?.email ?? "",
      password: "",
      firstname: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
      phone: data?.phone ?? "",
      address: data?.address ?? "",
    },
  });

  const submit = handleSubmit((values) => {
    console.log(values);
    onSubmit?.(values);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create new Parent" : "Update Parent"}
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
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ParentForm;