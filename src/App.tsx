import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { clearError } from './store/slices/errorSlice'
import Message from './components/Message'
import { useEffect } from 'react'
import Loader from './components/Loader/Loader'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router/Router'
import { clearSuccess } from './store/slices/successSlice'

function App() {
    const { errorMessage, isError } = useSelector((state: RootState) => state.error)
    const { successMessage, isSuccess } = useSelector((state: RootState) => state.success)
    const { isLoading } = useSelector((state: RootState) => state.loader)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                dispatch(clearError())
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [isError, dispatch])

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                dispatch(clearSuccess())
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [isSuccess, dispatch])

    return (
        <>
            {isError && errorMessage && (
                <Message
                    message={errorMessage}
                    success={false}
                />
            )}
            {isSuccess && successMessage && (
                <Message
                    message={successMessage}
                    success={true}
                />
            )}
            {isLoading && <Loader />}

            <RouterProvider router={Router} />
        </>
    )
}

export default App
