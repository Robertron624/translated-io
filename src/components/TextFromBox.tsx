import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import LangSelector from "./shared/LangSelector";
import ActionButtons from "./shared/ActionButtons";

import { TranslateBoxType } from "../lib/types";
import { baseApiUrl } from "../lib/constants";
import { speakText } from "../lib/utils";

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

    // since the API free tier has a limit per day, the real time translation is not used in the project,
    // instead the user has to click the translate button to translate the text
    // For the real time translation search for the function in the utils.ts file
    const handleTranslateClick = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseApiUrl}`, {
                params: {
                    q: toBeTranslatedText,
                    langpair: `${translatedFromLang}|${translatedToLang}`
                }
            });
    
            if (response.data.responseStatus === 200) {
                setTranslatedText(response.data.responseData.translatedText);
            } else {
                console.error('Error translating text:', response.data);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error translating text:', error);

                if (error.response?.status === 429) {
                    toast.error('API limit reached, please try again later', {
                        duration: 3000,
                        position: 'top-right',
                    });
                }
            }
            else {
                console.error('Error translating text:', error);
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleCopyToBeTranslatedText = () => {

        if(!toBeTranslatedText) return;

        navigator.clipboard.writeText(toBeTranslatedText);

        toast.success('Text copied to clipboard', {
            duration: 3000,
            position: 'top-right',
        });
    }

    const handleToBeTranslatedTextSpeech = () => {

        if(!toBeTranslatedText) return;

        speakText(toBeTranslatedText, translatedFromLang);
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
            <ActionButtons 
                withTranslate
                loading={loading}
                handleTranslateClick={handleTranslateClick}
                handleCopyClick={handleCopyToBeTranslatedText}
                handleTextSpeech={handleToBeTranslatedTextSpeech}
            />
        </div>
    )
}

export default TextFromBox