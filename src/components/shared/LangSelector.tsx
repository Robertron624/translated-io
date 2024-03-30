import React, { useState } from "react";

import { supportedLanguages } from "../../lib/constants";
import { TranslateBoxType, SupportedLanguage } from "../../lib/types";
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

  const [visibleLanguages, setVisibleLanguages] =
    useState<SupportedLanguage[]>(firstThreeLanguages);
  const [hiddenMenuLanguages, setHiddenMenuLanguages] = useState<
    SupportedLanguage[]
  >(supportedLanguages.slice(3));

  const handleDetectLang = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("detect lang!");
  };

  const handleLangSelect = (langCode: string) => {
    setLangFunction(langCode);
    const selectedLangIndex = hiddenMenuLanguages.findIndex(
      (lang) => lang.code === langCode
    );
    if (selectedLangIndex !== -1) {
      const newVisibleLanguages = [...visibleLanguages];
      const newMenuLanguages = [...hiddenMenuLanguages];

      // Move the selected language to the last position of visible languages
      newVisibleLanguages[2] = hiddenMenuLanguages[selectedLangIndex];
      // Move the last language of visible languages to the menu languages
      newMenuLanguages.push(visibleLanguages[2]);

      setVisibleLanguages(newVisibleLanguages);
      setHiddenMenuLanguages(newMenuLanguages);
    }
  };

  return (
    <div className={`lang-selector selector-${translateBoxType.toLowerCase()}`}>
      <div className='left'>
        {translateBoxType === TranslateBoxType.FROM && (
          <button onClick={handleDetectLang}>Detect language</button>
        )}
        {visibleLanguages.map((lang, index) => {
          const langCode = lang.code;
          const isThisBtnCurrentLang = langCode === currentLang;

          return (
            <div className='button-wrapper' key={lang.code}>
              <button
                onClick={
                  isThisBtnCurrentLang
                    ? undefined
                    : () => {
                        handleLangSelect(langCode);
                      }
                }
                className={isThisBtnCurrentLang ? "selected" : ""}
              >
                {lang.name}
              </button>
              {index === 2 && (
                <MoreLanguages
                  languages={hiddenMenuLanguages}
                  currentLang={currentLang}
                  handleLangSelect={handleLangSelect}
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
