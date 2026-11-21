"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Meeting with the IT Manager",
    time: "12:00 - 14:00",
    description: "Discuss project progress and upcoming tasks.",
  },
  {
    id: 2,
    title: "Team Standup Meeting",
    time: "09:00 - 09:30",
    description: "Daily team updates and progress discussion.",
  },
  {
    id: 3,
    title: "Project Review",
    time: "15:00 - 16:00",
    description: "Review the latest project updates and feedback.",
  },
];
const EventCalender = () => {
  const [value, onChange] = useState<Value>(null);

  useEffect(() => {
    onChange(new Date());
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl">
      <Calendar onChange={onChange} value={value} locale="en-US" />
      <div className="flex items-center justify-between">
        <h1 className="text-xl my-4 font-semibold">Events</h1>
        <Image alt="evt" src={"/moreDark.png"} width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border-t-4 p-5 rounded-md odd:border-t-lamaSky even:border-t-lamaPurple"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
