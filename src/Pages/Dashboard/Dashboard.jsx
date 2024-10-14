// import { useClerk } from '@clerk/clerk-react';
import MonthlyPieChart from './Graphs/MonthlyPieChart';
import LastWeekBarChart from './Graphs/LastWeekBarChart';
import Transactions from './Transactions';
import ExpenseAdd from './ExpenseAdd';
import { useRefreshContext } from '../../Context/RefreshContext';

const Dashboard = () => {
    // const { user } = useClerk();
    const { refresh } = useRefreshContext();
    const user = {
        id: 1
    }
    return (
        <>
            {/* <div className='relative'> */}
            <div className='flex flex-col-reverse md:flex-row justify-between  h-screen w-full gap-2 p-2'>
                <div className='flex flex-col h-[100%] w-full  md:w-[60%] gap-2'>
                    <div className='h-[40%]'>
                        <MonthlyPieChart userId={user.id} refresh={refresh} />
                    </div>
                    <div className='h-[60%]'>
                        <LastWeekBarChart userId={user.id} refresh={refresh} />
                    </div>
                </div>
                <div className='h-auto bg-red-400 w-full  md:w-[40%]'>
                    <Transactions userId={user.id} />
                </div>
            </div>
            {/* </div> */}
        </>

    );
};

export default Dashboard;