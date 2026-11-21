import "@/app/globals.css";
import Image from "next/image";
interface IProps {
  type: string;
}

const UserCard = ({ type }: IProps) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow flex-1 min-w-32.5 p-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2025/03</span>
        <Image alt="" src={"/more.png"} width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,222</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
