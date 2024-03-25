import { supportedLanguages } from "../../lib/constants";
import React from "react";

import './LangSelector.scss';

interface Props {
    setLangFunction: (lang: string) => void
    currentLang: string
}

const LangSelector = (
    {setLangFunction, currentLang}: Props
): React.ReactElement => {

  console.log("currentLang", currentLang)

  const firstThreeLanguages = supportedLanguages.slice(0, 3);

  return <div className="lang-selector">
    <button>
      Detect language
    </button>
    {firstThreeLanguages.map((lang) => {

      const langCode = lang.code;
      const isThisBtnCurrentLang = langCode === currentLang;

      return (
        <button
        key={lang.code}
        onClick={() => setLangFunction(lang.code)}
        className={isThisBtnCurrentLang ? 'selected' : ''}
      >
        {lang.name}
      </button>
      )
    })}
  </div>;
};

export default LangSelector;
