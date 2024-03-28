import React from "react";

import LangSelector from "./shared/LangSelector";
import CopyIcon from '../assets/images/Copy.svg'
import SoundMaxFill from '../assets/images/sound_max_fill.svg'
import SortAlfa from '../assets/images/Sort_alfa.svg'
import { TranslateBoxType } from "../lib/types";

import './Box.scss';

interface Props {
    toBeTranslatedText: string
    translatedFromLang: string
    setTobeTranslatedText: (text: string) => void
    setTranslatedFromLang: (lang: string) => void
}

const TextFromBox = (
    { toBeTranslatedText,translatedFromLang, setTobeTranslatedText, setTranslatedFromLang }: Props
): React.ReactElement => {

    const maxTextLength = 500;
    const [textCount , setTextCount] = React.useState(0);
    
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTobeTranslatedText(text);
        setTextCount(text.length);
    }

    return(
        <div className="text-from-box box">
            <LangSelector
                setLangFunction={setTranslatedFromLang}
                currentLang={translatedFromLang}
                translateBoxType={TranslateBoxType.FROM}
            />
            <div className="textarea-wrapper">
                <p 
                    className={`textarea-counter ${textCount >= maxTextLength ? 'error' : ''}`}
                >
                    {textCount}/{maxTextLength}
                </p>
                <textarea 
                    name="from-text" 
                    id="from-text" 
                    cols={30} 
                    rows={6} 
                    maxLength={500}
                    onChange={handleTextChange}
                    className={textCount >= maxTextLength ? 'error' : ''}
                    value={toBeTranslatedText}
                    ></textarea>
            </div>
            <div className="action-buttons">
                <div className="left">
                    <button className="audio">
                        <img src={SoundMaxFill} alt="Audio" />
                    </button>
                    <button className="copy">
                        <img src={CopyIcon} alt="Copy" />
                    </button>
                </div>
                <div className="right">
                    <button>
                        <img src={SortAlfa} alt="Sort" />
                        Translate
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TextFromBox