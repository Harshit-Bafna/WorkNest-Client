import Home from '@/pages/Home/Home'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path=""
            element={<Home />}
        />
    )
)

export default Router