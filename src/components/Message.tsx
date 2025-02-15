import { CircleAlert, CircleCheckBig } from 'lucide-react'
import { FC } from 'react'

interface MessageProps {
    message: string
    success: boolean
}

const Message: FC<MessageProps> = ({ message, success }) => {
    return success ? (
        <div className="flex justify-start gap-2 items-center bg-off-white fixed top-3 right-3 shadow-input-shadow px-5 py-5 w-64 z-50 border-l-4 border-bright-blue rounded-tr-xl rounded-br-xl select-none">
            <CircleCheckBig
                className="text-green-600"
                size={18}
            />
            <p className="text-green-600 text-sm font-inter font-medium">{message}</p>
        </div>
    ) : (
        <div className="flex justify-start gap-2 items-center bg-off-white fixed top-3 right-3 shadow-input-shadow px-5 py-5 w-64 z-50 border-l-4 border-bright-blue rounded-tr-xl rounded-br-xl select-none">
            <CircleAlert
                className="text-red-600"
                size={18}
            />
            <p className="text-red-600 text-sm font-inter font-medium">{message}</p>
        </div>
    )
}

export default Message
