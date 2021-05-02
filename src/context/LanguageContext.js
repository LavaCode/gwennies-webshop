// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const LanguageContext = React.createContext({});

function LanguageContextProvider({ children }) {
    const [language, toggleLanguage] = useState('nl');

    function changeLanguage() {
        if(language === 'nl'){
            toggleLanguage('en');
        } else {
            toggleLanguage('nl');
        }
    }

    const data = {
        language: language,
        changeLanguage: changeLanguage
    }

    return (
        <LanguageContext.Provider value={data}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;
