import LangSelector from "./shared/LangSelector"

interface Props {
    translatedFromText: string
    setTranslatedText: (text: string) => void
    setTranslatedToLang: (lang: string) => void
}


const TextToBox = ( { setTranslatedToLang, setTranslatedText }: Props ): React.ReactElement => {
    return (
        <div className="text-to-box box">
            <LangSelector
                setLangFunction={setTranslatedToLang}
                currentLang={''}
            />
            
        </div>
    )
}

export default TextToBox