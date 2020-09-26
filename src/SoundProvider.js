import React, { createContext, useContext, useReducer } from "react";

export const SoundContext = createContext();

export const SoundProvider = ({ reducer, initialState, children }) => (
    <SoundContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SoundContext.Provider>
);

export const useSoundValue = () => useContext(SoundContext);