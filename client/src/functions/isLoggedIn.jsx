import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = Cookies.get('token');
            setIsLoggedIn(!!token);
        };
        checkLoginStatus();
    }, []);

    return isLoggedIn;
}

export default useIsLoggedIn;
