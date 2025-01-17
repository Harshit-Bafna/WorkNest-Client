// import './App.css'
// import ErrorMessage from './components/ErrorMessage'
// import RegisterIndividual from './pages/Auth/SignUp/RegisterIndividual'

// function App() {
//     return (
//         <>
//             <ErrorMessage errorMessage='err'/>
//             <RegisterIndividual />
//         </>
//     )
// }

// export default App

import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { clearError } from './store/slices/errorSlice'
import ErrorMessage from './components/ErrorMessage'
import RegisterIndividual from './pages/Auth/SignUp/RegisterIndividual'
import { useEffect } from 'react'

function App() {
    const { errorMessage, isError } = useSelector((state: RootState) => state.error)
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
            <RegisterIndividual />
        </>
    )
}

export default App
