import AuthRouter from '@/router/Routes/AuthRouter'
import UnauthRouter from '@/router/Routes/UnauthRouter'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const isAuthenticated = true  

const Router = createBrowserRouter(createRoutesFromElements(isAuthenticated ? AuthRouter : UnauthRouter))

export default Router
