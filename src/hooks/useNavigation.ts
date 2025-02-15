import { useNavigate } from 'react-router-dom'

interface NavigationOptions {
    replace?: boolean
    state?: unknown
}

const useNavigation = () => {
    const navigate = useNavigate()

    const goTo = (path: string, options?: NavigationOptions) => {
        navigate(path, { replace: options?.replace, state: options?.state })
    }

    const goBack = () => {
        navigate(-1)
    }

    const goForward = () => {
        navigate(1)
    }

    return { goTo, goBack, goForward }
}

export default useNavigation
