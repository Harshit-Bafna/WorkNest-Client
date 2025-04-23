import { TrendingDown, TrendingUp } from 'lucide-react'
import { BarChart, Bar, ResponsiveContainer } from 'recharts'

const WeekProgress = () => {
    const data = [
        {
            name: 'Monday',
            progress: 70,
        },
        {
            name: 'Tuesday',
            progress: 46,
        },
        {
            name: 'Wednesday',
            progress: 80,
        },
        {
            name: 'Thursday',
            progress: 36,
        },
        {
            name: 'Friday',
            progress: 91,
        },
    ]

    const analytics = {
        todayProgressPercentage: 50,
        progress: {
            isPositive: true,
            value: 12,
        },
    }

    return (
        <div className="h-74 p-5 border 2xl:border-b 2xl:border-r-0 2xl:border-l-0 2xl:border-t-0 rounded-3xl 2xl:rounded-none border-dark-muted/15">
            <div className="flex items-center gap-4">
                <p className="text-lg font-montserrat font-medium">Activity</p>
                <div
                    className={`flex text-xs items-center gap-1 text-neutral py-0.5 px-2 rounded-lg ${analytics.progress.isPositive ? 'bg-success' : 'bg-warning'}`}>
                    {analytics.progress.isPositive ? '+' : '-'}
                    {analytics.progress.value}
                    {analytics.progress.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
            </div>
            <div className="text-secondary font-montserrat text-sm my-1">Today&apos;s Progress: {analytics.todayProgressPercentage}%</div>
            <ResponsiveContainer height={150}>
                <BarChart data={data}>
                    <Bar
                        dataKey="progress"
                        background={{ fill: '#edf6f9', radius: 10 }}
                        fill="#001e80"
                        className="bg-red-600"
                        radius={[10, 10, 10, 10]}
                    />
                </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-2 px-3">
                {data.map((day, index) => (
                    <div
                        key={index}
                        className="text-center">
                        <p className="text-sm font-montserrat text-secondary">{day.name.slice(0, 3)}</p>
                        <p className="text-sm font-montserrat font-medium text-secondary">{day.progress}%</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeekProgress
