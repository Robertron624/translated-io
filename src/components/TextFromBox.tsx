import React, { useState } from "react";
import axios from "axios";

import LangSelector from "./shared/LangSelector";
import CopyIcon from '../assets/images/Copy.svg'
import SoundMaxFill from '../assets/images/sound_max_fill.svg'
import SortAlfa from '../assets/images/Sort_alfa.svg'
import { TranslateBoxType } from "../lib/types";
import { baseApiUrl } from "../lib/constants";


import './Box.scss';

interface Props {
    toBeTranslatedText: string
    translatedFromLang: string
    translatedToLang: string
    setTobeTranslatedText: (text: string) => void
    setTranslatedFromLang: (lang: string) => void
    setTranslatedText: (text: string) => void
}

const TextFromBox = (
    { toBeTranslatedText,translatedFromLang,translatedToLang, setTobeTranslatedText, setTranslatedFromLang, setTranslatedText }: Props
): React.ReactElement => {

    const maxTextLength = 500;
    const [textCount , setTextCount] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTobeTranslatedText(text);
        setTextCount(text.length);
    }


    const handleTranslateClick = () => {
        setLoading(true); // Establece el estado de carga a verdadero
        try {
            axios.get(`${baseApiUrl}`, {
                params: {
                    q: toBeTranslatedText,
                    langpair: `${translatedFromLang}|${translatedToLang}`
                }
            }).then((response) => {
                if (response.data.responseStatus === 200) {
                    setTranslatedText(response
                        .data
                        .responseData
                        .translatedText);
                }
            }
            ).catch((error) => {
                console.error('Error translating text:', error);
            }).finally(() => {
                setLoading(false); // Establece el estado de carga a falso
            });
        } catch (error) {
            console.error('Error translating text:', error);
        } finally {
            setLoading(false); // Establece el estado de carga a falso
        }
    };


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
                    <button
                        onClick={handleTranslateClick}
                    >
                        <img src={SortAlfa} alt="Sort" />
                        {loading ? 'Translating...' : 'Translate'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TextFromBox