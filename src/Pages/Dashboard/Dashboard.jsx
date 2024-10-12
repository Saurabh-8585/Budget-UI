import { useClerk } from '@clerk/clerk-react';
import MonthlyPieChart from './Graphs/MonthlyPieChart';
import LastWeekBarChart from './Graphs/LastWeekBarChart';
import Transactions from './Transactions';

const Dashboard = () => {
    const { user } = useClerk();

    return (

        <>
            <div className="grid grid-cols-6 grid-rows-5 gap-4 h-screen p-5">
                <div className="col-span-3 row-span-2"><MonthlyPieChart /></div>
                <div className="col-span-3 row-span-3 col-start-1 row-start-3"><LastWeekBarChart /></div>
                <div className="col-span-3 row-span-5 col-start-4 row-start-1"><Transactions /></div>
            </div>

        </>

    );
};

export default Dashboard;