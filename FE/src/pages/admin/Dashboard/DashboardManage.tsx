import {
  BuyerProfileChart,
  DashboardStatsGrid,
  TransactionChart,
  RecentRooms,
  Roomsheavilybooked,
} from "../../../components";

const DashboardManage = () => {
  return (
    <div className="flex flex-col gap-3">
      <DashboardStatsGrid />
      <div className="flex gap-10">
        <TransactionChart />
        <BuyerProfileChart />
      </div>

      <div className="flex gap-10">
        <RecentRooms />
        <Roomsheavilybooked />
      </div>
    </div>
  );
};

export default DashboardManage;
