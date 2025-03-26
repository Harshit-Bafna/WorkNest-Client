import Dashboard from '@/pages/Dashboard/Dashboard'
import path from '@/router/path'
import RootLayout from '@/router/Layouts/RootLayout'
import { Route } from 'react-router-dom'

const UnauthRouter = (
    <Route element={<RootLayout />}>
        <Route
            path={path.dashboard}
            element={<Dashboard />}
        />
    </Route>
)

export default UnauthRouter
