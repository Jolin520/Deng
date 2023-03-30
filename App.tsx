import React, { useState, useEffect } from 'react';
import EventEmitter from 'events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './src/Main';

/**
 * Context provided to children components. Since this is the top
 * level component, all child elements will have access to this context
 */
export const Context = React.createContext({
    token: '',
    login: async (token: string) => {},
    loadingContext: true,
    logout: () => {},
    navigating: false,
    setNavigating: (value: boolean) => {},
    creatingEvent: false,
    setCreatingEvent: (value: boolean) => {},
    rerender: () => {}
});

const emitter: EventEmitter = new EventEmitter();

/**
 * Application component
 */
const App = () => {
    const [token, setToken] = useState<string>('');
    const [loadingContext, setLoadingContext] = useState<boolean>(true);
    const [navigating, setNavigating] = useState<boolean>(false);
    const [creatingEvent, setCreatingEvent] = useState<boolean>(false);

    useEffect(() => {
        const storageListener = async () => {
            setLoadingContext(true);
            const token = (await AsyncStorage.getItem('token')) || '';
            setToken(token);
            setLoadingContext(false);
        };
        storageListener();

        // TODO: look into deprecation of removeEventListener. See message in browser console
        emitter.on('storage', storageListener);
        return () => {
            emitter.off('storage', storageListener);
        };
    }, []);

    const handleLogin = async (token: string) => {
        setLoadingContext(true);
        await AsyncStorage.setItem('token', token);
        setToken(token);
        setLoadingContext(false);
    };

    const handleLogout = async () => {
        setLoadingContext(true);
        // TODO: send request to logout backend to add token to blacklist
        await AsyncStorage.removeItem('token');
        setToken('');
        setLoadingContext(false);
    };

    const handleSetNavigating = (value: boolean) => {
        setNavigating(value);
    };

    const handleSetCreatingEvent = (value: boolean) => {
        setCreatingEvent(value);
    };

    return (
        <Context.Provider
            value={{
                token,
                login: handleLogin,
                logout: handleLogout,
                loadingContext,
                navigating,
                setNavigating: handleSetNavigating,
                creatingEvent,
                setCreatingEvent: handleSetCreatingEvent,
                rerender: () => {}
            }}
        >
            <Main />
        </Context.Provider>
    );
};

export default App;
