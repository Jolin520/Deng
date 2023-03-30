import React, { memo, useContext, useEffect } from 'react';
import { Context } from '../../App';

const LogoutScreen = () => {
    const { logout } = useContext(Context);

    useEffect(() => {
        logout();
    }, []);

    return <></>;
};

export default memo(LogoutScreen);
