import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { clearError } from './store/slices/errorSlice'
import ErrorMessage from './components/ErrorMessage'
import { useEffect } from 'react'
import Loader from './components/Loader/Loader'
import Index from './pages/Auth/SignIn/Index'

function App() {
    const { errorMessage, isError } = useSelector((state: RootState) => state.error)
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

    return (
        <>
            {isError && errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            {isLoading && <Loader />}
            <Index />
        </>
    )
}

export default App
