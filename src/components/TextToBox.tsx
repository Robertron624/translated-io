import LangSelector from "./shared/LangSelector";
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
    </div>
  );
};

export default TextToBox;
