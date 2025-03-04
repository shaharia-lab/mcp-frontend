import { useAuth0 } from '@auth0/auth0-react';

export function AuthStatus() {
    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
        user,
        isLoading
    } = useAuth0();

    if (isLoading) {
        return <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-2 p-2">
                <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{user?.name}</span>
                <button
                    onClick={() => logout({
                        logoutParams: { returnTo: window.location.origin }
                    })}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
            Log In
        </button>
    );
}