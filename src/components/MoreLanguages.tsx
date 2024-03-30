import React, { useState, useRef, useEffect } from "react";

import { SupportedLanguage } from "../lib/types";
import ExpandDown from "../assets/images/Expand_down.svg";

import "./MoreLanguages.scss";

interface Props {
  languages: SupportedLanguage[];
  handleLangSelect?: (lang: string) => void;
  currentLang?: string;
}

const MoreLanguages = ({
  languages,
  handleLangSelect,
  currentLang,
}: Props): React.ReactElement => {

    const [isListHidden, setIsListHidden] = useState(true);
    const listRef = useRef<HTMLDivElement>(null);

    const handleExpandClick = () => {
        setIsListHidden(!isListHidden);
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(e.target as Node)) {
                setIsListHidden(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);


  return <div className='more-languages'>
    <button 
        className='expand-down'
        onClick={handleExpandClick}    
    >
      <img src={ExpandDown} alt='Expand down' />
    </button>
    <div 
    ref={listRef}
    className={
        `languages-list ${isListHidden ? "hidden" : ""}`
    }>
      {languages.map((lang) => {
        const langCode = lang.code;
        const isThisBtnCurrentLang = langCode === currentLang;

        return (
          <button
            key={lang.code}
            onClick={() => handleLangSelect && handleLangSelect(lang.code)}
            className={isThisBtnCurrentLang ? "selected" : ""}
          >
            {lang.name}
          </button>
        );
      })}
    </div>
  </div>;
};

export default MoreLanguages;
