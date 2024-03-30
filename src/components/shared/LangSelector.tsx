import React from "react";

import { supportedLanguages } from "../../lib/constants";
import { TranslateBoxType } from "../../lib/types";
import switchIcon from "../../assets/images/Horizontal_top_left_main.svg";

import "./LangSelector.scss";
import MoreLanguages from "../MoreLanguages";

interface Props {
  setLangFunction: (lang: string) => void;
  currentLang: string;
  translateBoxType: TranslateBoxType;
  handleSwitchLangs?: () => void;
}

const LangSelector = ({
  setLangFunction,
  currentLang,
  translateBoxType,
  handleSwitchLangs,
}: Props): React.ReactElement => {
  const firstThreeLanguages = supportedLanguages.slice(0, 3);

  const restOfLanguages = supportedLanguages.slice(3);

  const handleDetectLang = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("detect lang!");
  };

  return (
    <div className={`lang-selector selector-${translateBoxType.toLowerCase()}`}>
      <div className='left'>
        {translateBoxType === TranslateBoxType.FROM && (
          <button onClick={handleDetectLang}>Detect language</button>
        )}
        {firstThreeLanguages.map((lang, index) => {
          const langCode = lang.code;
          const isThisBtnCurrentLang = langCode === currentLang;

          return (
            <div className="button-wrapper" key={lang.code}>
              <button
                onClick={() => setLangFunction(lang.code)}
                className={isThisBtnCurrentLang ? "selected" : ""}
              >
                {lang.name}
              </button>
              {index === 2 && (
                <MoreLanguages
                  languages={restOfLanguages}
                  currentLang={currentLang}
                  handleLangSelect={setLangFunction}
                />
              )}
            </div>
          );
        })}
      </div>
      {translateBoxType === TranslateBoxType.TO && (
        <button className='switch' title='Switch' onClick={handleSwitchLangs}>
          <img src={switchIcon} alt='Switch texts' />
        </button>
      )}
    </div>
  );
};

export default LangSelector;
