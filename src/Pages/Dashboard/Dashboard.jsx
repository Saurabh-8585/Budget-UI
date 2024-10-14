import { useClerk } from '@clerk/clerk-react';
import MonthlyPieChart from './Graphs/MonthlyPieChart';
import LastWeekBarChart from './Graphs/LastWeekBarChart';
import Transactions from './Transactions';
import ExpenseAdd from './ExpenseAdd';
import { useRefreshContext } from '../../Context/RefreshContext';
import { useFetchData } from '../../Hooks';
import { ApiUrls } from '../../Constants/ApiUrl';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { user } = useClerk();
    const [modalOpen, setModalOpen] = useState(false)
    const { refresh, triggerRefresh } = useRefreshContext();
    const options = {
        headers: {
            Authorization: user.id
        }
    }
    console.log(user.id)
    const { data } = useFetchData(ApiUrls.GENERATE_MOCK_DATA, options)
    useEffect(() => {
        if (data?.mockDataGenerated === true) {
            triggerRefresh()
        }
    }, [data])
    return (
        <>
            {/* <div className='relative'> */}
            <div className='flex flex-col-reverse md:flex-row justify-between  h-screen w-full gap-2 p-2'>
                <div className='flex flex-col h-[100%] w-full  md:w-[50%] gap-2'>
                    <div className='h-[40%]'>
                        <MonthlyPieChart userId={user.id} refresh={refresh} />
                    </div>
                    <div className='h-[60%]'>
                        <LastWeekBarChart userId={user.id} refresh={refresh} />
                    </div>
                </div>
                <div className='h-auto w-full  md:w-[50%] relative'>
                    <Transactions userId={user.id} />
                    <div className='absolute flex justify-center items-center bottom-4 right-5  w-32 h-16'>
                        <ExpenseAdd userId={user.id} />
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>

    );
};

export default Dashboard;