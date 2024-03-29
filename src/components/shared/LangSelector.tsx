import React from "react";

import { supportedLanguages } from "../../lib/constants";
import { TranslateBoxType } from "../../lib/types";
import switchIcon from "../../assets/images/Horizontal_top_left_main.svg";

import "./LangSelector.scss";

interface Props {
  setLangFunction: (lang: string) => void;
  currentLang: string;
  translateBoxType: TranslateBoxType;
}

const LangSelector = ({
  setLangFunction,
  currentLang,
  translateBoxType,
}: Props): React.ReactElement => {
  
  const firstThreeLanguages = supportedLanguages.slice(0, 3);

  const handleDetectLang = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("detect lang!");
  };

  return (
    <div className={`lang-selector selector-${translateBoxType.toLowerCase()}`}>

      <div className="left">
      {translateBoxType === TranslateBoxType.FROM && (
        <button 
            onClick={handleDetectLang}
          >
          Detect language
        </button>
      )}
        {firstThreeLanguages.map((lang) => {
          const langCode = lang.code;
          const isThisBtnCurrentLang = langCode === currentLang;

          return (
            <button
              key={lang.code}
              onClick={() => setLangFunction(lang.code)}
              className={isThisBtnCurrentLang ? "selected" : ""}
            >
              {lang.name}
            </button>
          );
        })}
      </div>
      {translateBoxType === TranslateBoxType.TO && (
        <button className="switch" title="Switch">
          <img src={switchIcon} alt="Switch texts" />
        </button>
      )}
    </div>
  );
};

export default LangSelector;
