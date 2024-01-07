import {
  BuyerProfileChart,
  DashboardStatsGrid,
  TransactionChart,
} from "../../../components";

const DashboardManage = () => {
  return (
    <div className="flex flex-col gap-3">
      <DashboardStatsGrid />
      <div className="flex gap-10">
        <TransactionChart />
        <BuyerProfileChart />
      </div>
    </div>
  );
};

export default DashboardManage;
