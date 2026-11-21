import Announcment from "@/components/Announcment";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalender from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full md:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Student"/>
          <UserCard type="Teacher"/>
          <UserCard type="Parent"/>
          <UserCard type="Staff"/>
        </div>
        {/* MIDDLE CHART */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-112.5">
            <CountChart />
          </div>
          {/* ATTENDACE CHART */}
          <div className="w-full lg:w-2/3 h-112.5">
            <AttendanceChart/>
          </div>

        </div>
        {/* BOTTOM CHART */}
        <div className="w-full lg:w-full h-112.5">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full md:w-1/3 flex flex-col gap-8">
        <EventCalender/>
        <Announcment />
      </div>
    </div>
  );
};

export default AdminPage;