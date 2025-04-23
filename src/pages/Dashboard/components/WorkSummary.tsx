import { Circle } from 'lucide-react'
import { Cell, Pie, PieChart } from 'recharts'

const WorkSummary = () => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE']

    const data = [
        { project: 'Apollo', tasksCompleted: 420, color: '#0088FE' },
        { project: 'Orion', tasksCompleted: 275, color: '#00C49F' },
        { project: 'Nova', tasksCompleted: 350, color: '#FFBB28' },
        { project: 'Zenith', tasksCompleted: 300, color: '#FF8042' },
        { project: 'Others', tasksCompleted: 200, color: '#A28BFE' },
    ]

    const totalToskDone = data.reduce((total, entry) => total + entry.tasksCompleted, 0)

    const projectCount = 15

    return (
        <div className="p-5 border 2xl:border-b 2xl:border-r-0 2xl:border-l-0 2xl:border-t-0 rounded-3xl 2xl:rounded-none border-dark-muted/15">
            <div className="flex items-center gap-4">
                <p className="text-lg font-montserrat font-medium">Work Summary</p>
            </div>
            <div className="flex items-center">
                <div className="relative">
                    <PieChart
                        width={130}
                        height={130}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={50}
                            innerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            cornerRadius={100}
                            dataKey="tasksCompleted">
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                    <div className="font-poppins font-medium absolute top-10.25 left-9.25 flex flex-col items-center">
                        <p className="text-lg">{projectCount}</p>
                        <p className="text-sm text-dark-muted/70">Projects</p>
                    </div>
                </div>
                <div>
                    {data.map(({ project, tasksCompleted, color }, index) => (
                        <div
                            key={index}
                            className="font-poppins text-sm flex gap-2 items-center">
                            <Circle
                                color={color}
                                size={13}
                            />
                            <p className="text-dark-muted/70 w-16 truncate">{project}</p>
                            <p>{Math.floor((tasksCompleted * 100) / totalToskDone)}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkSummary
