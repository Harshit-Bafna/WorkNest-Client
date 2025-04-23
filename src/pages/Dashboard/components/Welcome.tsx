// import { useState } from 'react'
// import { containerVariants } from '@/lib/utils/animations'
// import { motion } from 'framer-motion'
// import { CheckCircle, Calendar } from 'lucide-react'

// const Welcome = () => {
//     const [isAttendanceMarked, setIsAttendanceMarked] = useState(false)

//     const markAttendance = () => {
//         setIsAttendanceMarked(true)
//         setTimeout(() => setIsAttendanceMarked(false), 3000)
//     }

//     return (
//         <motion.div
//             className="relative overflow-hidden border border-dark-muted/15 rounded-3xl bg-neutral"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible">

//             <div className="relative z-10 p-6">
//                 <div className="flex flex-col items-center">
//                     <motion.div
//                         className="relative"
//                         whileHover={{ scale: 1.03 }}
//                         transition={{ type: 'spring', stiffness: 300, damping: 10 }}>
//                         <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light to-primary/20 blur-sm" />
//                         <img
//                             className="relative h-20 w-20 rounded-full border-2 border-neutral object-cover"
//                             src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
//                             alt="Harshit Bafna"
//                         />
//                         <motion.div
//                             className="absolute bottom-0 right-0 bg-success text-neutral rounded-full h-6 w-6 flex items-center justify-center border-2 border-neutral"
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ delay: 0.5, type: 'spring' }}>
//                             <span className="text-xs">✓</span>
//                         </motion.div>
//                     </motion.div>

//                     <h3 className="font-montserrat font-semibold text-lg mt-3 text-secondary">Harshit Bafna</h3>

//                     <div className="flex gap-3 mt-3">
//                         <motion.div
//                             whileHover={{ y: -2 }}
//                             className="flex flex-col items-center bg-muted rounded-lg px-3 py-1">
//                             <span className="text-xs text-dark-muted/70 font-montserrat">Days</span>
//                             <span className="font-montserrat font-bold text-primary">24</span>
//                         </motion.div>
//                         <motion.div
//                             whileHover={{ y: -2 }}
//                             className="flex flex-col items-center bg-muted rounded-lg px-3 py-1">
//                             <span className="text-xs text-dark-muted/70 font-montserrat">Hours</span>
//                             <span className="font-montserrat font-bold text-primary">186</span>
//                         </motion.div>
//                         <motion.div
//                             whileHover={{ y: -2 }}
//                             className="flex flex-col items-center bg-muted rounded-lg px-3 py-1">
//                             <span className="text-xs text-dark-muted/70 font-montserrat">Tasks</span>
//                             <span className="font-montserrat font-bold text-primary">12</span>
//                         </motion.div>
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <motion.button
//                         className={`w-full py-2 cursor-pointer rounded-xl font-montserrat font-medium text-sm flex items-center justify-center transition-colors ${
//                             isAttendanceMarked ? 'bg-success text-neutral' : 'bg-primary text-neutral'
//                         }`}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={markAttendance}>
//                         {isAttendanceMarked ? (
//                             <>
//                                 <CheckCircle size={16} className="mr-2" />
//                                 Attendance Marked
//                             </>
//                         ) : (
//                             <>
//                                 <Calendar size={16} className="mr-2" />
//                                 Mark Attendance
//                             </>
//                         )}
//                     </motion.button>
//                 </div>
//             </div>
//         </motion.div>
//     )
// }

// export default Welcome

'use client'

import { useState } from 'react'
import { containerVariants } from '@/lib/utils/animations'
import { motion } from 'motion/react'
import { CheckCircle, Calendar, LogOut } from 'lucide-react'

const Welcome = () => {
    const [isAttendanceMarked, setIsAttendanceMarked] = useState(false)
    const [showLeaveMessage, setShowLeaveMessage] = useState(false)

    const markAttendance = () => {
        setIsAttendanceMarked(true)
    }

    const handleLeave = () => {
        setShowLeaveMessage(true)
    }

    return (
        <motion.div
            className="relative overflow-hidden border border-dark-muted/15 rounded-3xl bg-neutral"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <div className="relative z-10 p-6">
                <div className="flex flex-col items-center">
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light to-primary/20 blur-sm" />
                        <img
                            className="relative h-20 w-20 rounded-full border-2 border-neutral object-cover"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Harshit Bafna"
                        />
                        <motion.div
                            className="absolute bottom-0 right-0 bg-success text-neutral rounded-full h-6 w-6 flex items-center justify-center border-2 border-neutral"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}>
                            <span className="text-xs">✓</span>
                        </motion.div>
                    </motion.div>

                    <h3 className="font-montserrat font-semibold text-lg mt-3 text-secondary">Harshit Bafna</h3>

                    <div className="flex gap-3 mt-3">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="flex flex-col items-center bg-muted rounded-lg px-3 py-1">
                            <span className="text-xs text-dark-muted/70 font-montserrat">Days</span>
                            <span className="font-montserrat font-bold text-primary">24</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="flex flex-col items-center bg-muted rounded-lg px-3 py-1">
                            <span className="text-xs text-dark-muted/70 font-montserrat">Hours</span>
                            <span className="font-montserrat font-bold text-primary">186</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="flex flex-col items-center bg-muted rounded-lg px-3 py-1">
                            <span className="text-xs text-dark-muted/70 font-montserrat">Tasks</span>
                            <span className="font-montserrat font-bold text-primary">12</span>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-6">
                    {!isAttendanceMarked ? (
                        <motion.button
                            className="w-full py-2 cursor-pointer rounded-xl font-montserrat font-medium text-sm flex items-center justify-center transition-colors bg-primary text-neutral"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={markAttendance}>
                            <Calendar
                                size={16}
                                className="mr-2"
                            />
                            Mark Attendance
                        </motion.button>
                    ) : showLeaveMessage ? (
                        <motion.div
                            className="w-full py-2 rounded-xl font-montserrat font-medium text-sm flex items-center justify-center bg-success text-neutral"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}>
                            <CheckCircle
                                size={16}
                                className="mr-2"
                            />
                            Have a great evening!
                        </motion.div>
                    ) : (
                        <motion.button
                            className="w-full py-2 cursor-pointer rounded-xl font-montserrat font-medium text-sm flex items-center justify-center transition-colors bg-alert text-neutral"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLeave}>
                            <LogOut
                                size={16}
                                className="mr-2"
                            />
                            End Day & Leave
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Welcome
