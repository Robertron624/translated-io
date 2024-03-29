import toast from "react-hot-toast";

import LangSelector from "./shared/LangSelector";
import ActionButtons from "./shared/ActionButtons";
import { TranslateBoxType } from "../lib/types";


interface Props {
  translatedText: string;
  toBeTranslatedText: string;
  translatedToLang: string;
  setTranslatedText: (text: string) => void;
  setTranslatedToLang: (lang: string) => void;
}

const TextToBox = ({
  translatedText,
  toBeTranslatedText,
  setTranslatedToLang,
  setTranslatedText,
  translatedToLang,
}: Props): React.ReactElement => {

  const handleTranslatedTextCopy = () => {

    if(!translatedText) return;

    navigator.clipboard.writeText(translatedText);

    toast.success('Translated text copied to clipboard', {
      duration: 3000,
      position: 'top-right',
  });
  }

  const handleTranslatedTextSpeech = () => {

    if(!translatedText) return;

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(translatedText);
    synth.speak(utterThis);
  }

  return (
    <div className='text-to-box box'>
      <LangSelector
        setLangFunction={setTranslatedToLang}
        currentLang={translatedToLang}
        translateBoxType={TranslateBoxType.TO}
      />
      <div className="textarea-wrapper">
        <textarea
          name="to-text"
          id="to-text"
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
