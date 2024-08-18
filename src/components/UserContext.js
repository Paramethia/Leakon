import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ username: '', email: '' });

    return (
        <UserProvider value={{ user, setUser }}>
            {children}
        </UserProvider>
    );
};
