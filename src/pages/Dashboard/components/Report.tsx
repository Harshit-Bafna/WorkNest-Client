import React, { useState } from 'react'
import { containerVariants, itemVariants } from '@/lib/utils/animations'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

interface DateRange {
    startDate: Date | null
    endDate: Date | null
}

interface HoverTextButtonProps {
    defaultText: string
    onClick: () => void
}

const DownloadButton = ({ defaultText, onClick }: HoverTextButtonProps) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Button
            variant={'ghost'}
            className="w-full bg-muted hover:bg-primary hover:text-neutral tracking-normal"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {isHovered ? <Download className="h-4 w-4" /> : defaultText}
        </Button>
    )
}

const Report = () => {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
        endDate: new Date(),
    })

    const formatDate = (date: Date | null) => {
        if (!date) return ''
        return date.toISOString().split('T')[0]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDownload = (_range: DateRange) => {}

    const handleDateChange = (type: 'start' | 'end', event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value ? new Date(event.target.value) : null
        setDateRange({
            ...dateRange,
            [type === 'start' ? 'startDate' : 'endDate']: newDate,
        })
    }

    return (
        <motion.div
            className="border border-dark-muted/15 rounded-3xl p-5 bg-neutral"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-montserrat font-bold text-secondary">Reports</h2>
                </div>
            </div>

            <div className="space-y-4">
                <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.div
                        className="flex flex-wrap gap-3 items-end"
                        variants={itemVariants}>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <input
                                id="start-date"
                                type="date"
                                value={dateRange.startDate ? formatDate(dateRange.startDate) : ''}
                                onChange={(e) => handleDateChange('start', e)}
                                className="border border-dark-muted/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <input
                                id="end-date"
                                type="date"
                                value={dateRange.endDate ? formatDate(dateRange.endDate) : ''}
                                onChange={(e) => handleDateChange('end', e)}
                                className="border border-dark-muted/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <DownloadButton
                            defaultText="Download Report"
                            onClick={() => handleDownload(dateRange)}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Report
