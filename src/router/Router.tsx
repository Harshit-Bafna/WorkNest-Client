import UnauthRouter from '@/router/Routes/UnauthRouter'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const Router = createBrowserRouter(createRoutesFromElements(UnauthRouter))

export default Router
