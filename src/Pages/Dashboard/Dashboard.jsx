import { useClerk } from '@clerk/clerk-react';
import MonthlyPieChart from './Graphs/MonthlyPieChart';
import LastWeekBarChart from './Graphs/LastWeekBarChart';
import Transactions from './Transactions';
import ExpenseAdd from './ExpenseAdd';
import { useRefreshContext } from '../../Context/RefreshContext';

const Dashboard = () => {
    const { user } = useClerk();
    const { refresh } = useRefreshContext();
    return (
        <div className='relative'>
            <div className="grid grid-cols-6 grid-rows-5 gap-4 h-screen p-5 ">
                <div className="col-span-3 row-span-2 w-full"><MonthlyPieChart userId={user.id} refresh={refresh} /></div>
                <div className="col-span-3 row-span-3 col-start-1 row-start-3 w-full"><LastWeekBarChart userId={user.id} refresh={refresh} /></div>
                <div className="col-span-3 row-span-5 col-start-4 row-start-1 w-full"><Transactions userId={user.id} /></div>
            </div>
            <div className='absolute flex justify-center items-center bottom-4 right-5  w-32 h-16'>
                <ExpenseAdd userId={user.id} />
            </div>
        </div>

    );
};

export default Dashboard;