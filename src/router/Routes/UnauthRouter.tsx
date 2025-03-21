import Home from '@/pages/Home/Home'
import path from '@/router/path'
import { Route } from 'react-router-dom'

const UnauthRouter = (
    <Route
        path={path.home}
        element={<Home />}
    />
)

export default UnauthRouter
