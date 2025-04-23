import Meetings from '@/pages/Dashboard/components/Meetings'
import WorkSummary from '@/pages/Dashboard/components/WorkSummary'
import Reminders from '@/pages/Dashboard/components/Reminders'
import TodayTask from '@/pages/Dashboard/components/TodayTask'
import WeekProgress from '@/pages/Dashboard/components/WeekProgress'
import Welcome from '@/pages/Dashboard/components/Welcome'
import Project from '@/pages/Dashboard/components/Projects'
import Report from '@/pages/Dashboard/components/Report'
import Notes from '@/pages/Dashboard/components/Notes'

const Dashboard = () => {
    return (
        <div className="flex flex-col 2xl:flex-row justify-between max-w-full">
            <div className="py-7 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                    <Welcome />
                    <TodayTask />
                    <Meetings />
                    <div className="lg:hidden">
                        <Notes />
                    </div>
                </div>
                <div className="lg:hidden mb-5">
                    <Report />
                </div>
                <div className="lg:grid grid-cols-[2fr_1fr] gap-5">
                    <div className="w-full">
                        <Project />
                    </div>
                    <div className="space-y-5 hidden lg:block">
                        <Report />
                        <Notes />
                    </div>
                </div>
            </div>
            <div className="grid 2xl:block grid-cols-1 md:grid-cols-[1fr_2fr] 2xl:grid-cols-1 gap-x-7 2xl:w-75 2xl:border-l border-dark-muted/15 2xl:ml-5 mb-5 2xl:mb-0">
                <div className="order-2 md:order-1 space-y-5 2xl:space-y-0 mt-5 md:mt-0">
                    <WeekProgress />
                    <WorkSummary />
                </div>
                <div className="order-1 md:order-1">
                    <Reminders />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
