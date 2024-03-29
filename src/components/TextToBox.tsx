import toast from "react-hot-toast";

import LangSelector from "./shared/LangSelector";
import ActionButtons from "./shared/ActionButtons";

import { TranslateBoxType } from "../lib/types";
import { speakText } from "../lib/utils";

interface Props {
  translatedText: string;
  toBeTranslatedText: string;
  translatedFromLang: string;
  translatedToLang: string;
  setTranslatedText: (text: string) => void;
  setToBeTranslatedText: (text: string) => void;
  setTranslatedToLang: (lang: string) => void;
  setTranslatedFromLang: (lang: string) => void;
}

const TextToBox = ({
  translatedText,
  toBeTranslatedText,
  translatedFromLang,
  setTranslatedToLang,
  setTranslatedFromLang,
  setTranslatedText,
  setToBeTranslatedText,
  translatedToLang,
}: Props): React.ReactElement => {
  const handleTranslatedTextCopy = () => {
    if (!translatedText) return;

    navigator.clipboard.writeText(translatedText);

    toast.success("Translated text copied to clipboard", {
      duration: 3000,
      position: "top-right",
    });
  };

  const handleTranslatedTextSpeech = () => {
    if (!translatedText) return;

    speakText(translatedText, translatedToLang);
  };

  const handleSwitchLangs = () => {
    const tempTranslatedFromLang = translatedFromLang;
    const tempTranslatedToLang = translatedToLang;
    const tempToBeTranslatedText = toBeTranslatedText;
    const tempTranslatedText = translatedText;

    setTranslatedFromLang(tempTranslatedToLang);
    setTranslatedToLang(tempTranslatedFromLang);

    setToBeTranslatedText(tempTranslatedText);
    setTranslatedText(tempToBeTranslatedText);
  }

  return (
    <div className='text-to-box box'>
      <LangSelector
        setLangFunction={setTranslatedToLang}
        currentLang={translatedToLang}
        translateBoxType={TranslateBoxType.TO}
        handleSwitchLangs={handleSwitchLangs}
      />
      <div className='textarea-wrapper'>
        <textarea
          name='to-text'
          id='to-text'
          cols={30}
          rows={6}
          value={translatedText}
          readOnly
        ></textarea>
      </div>
      <ActionButtons
        withTranslate={false}
        handleCopyClick={handleTranslatedTextCopy}
        handleTextSpeech={handleTranslatedTextSpeech}
      />
    </div>
  );
};

export default TextToBox;
