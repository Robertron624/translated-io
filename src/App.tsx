import { useReducer } from 'react'
import './App.scss'
import Logo from './assets/images/logo.svg'
import TextToBox from './components/TextToBox'
import TextFromBox from './components/UserInputBox'



interface State {
  text: string
  translatedText: string
  translatedFromLang: string
  translatedToLang: string
}

type Action =
  | { type: 'CHANGE_TEXT'; payload: string }
  | { type: 'CHANGE_TRANSLATED_TEXT'; payload: string }
  | { type: 'CHANGE_TRANSLATED_FROM_LANG'; payload: string }
  | { type: 'CHANGE_TRANSLATED_TO_LANG'; payload: string }

const initialState: State = {
  text: 'Hello, how are you?',
  translatedText: '',
  translatedFromLang: 'en',
  translatedToLang: 'fr',
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return { ...state, text: action.payload }
    case 'CHANGE_TRANSLATED_TEXT':
      return { ...state, translatedText: action.payload }
    case 'CHANGE_TRANSLATED_FROM_LANG':
      return { ...state, translatedFromLang: action.payload }
    case 'CHANGE_TRANSLATED_TO_LANG':
      return { ...state, translatedToLang: action.payload }
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <main>
      <div className="logo">
        <img src={Logo} alt="Translated.io Logo" />
      </div>
      <div className="boxes">
        <TextFromBox
          translatedFromLang={state.translatedFromLang}
          setText={(text) => dispatch({ type: 'CHANGE_TEXT', payload: text })}
          setTranslatedFromLang={(lang) => dispatch({ type: 'CHANGE_TRANSLATED_FROM_LANG', payload: lang })}
        />
        <TextToBox
          translatedFromText={state.text}
          setTranslatedText={(text) => dispatch({ type: 'CHANGE_TRANSLATED_TEXT', payload: text })}
          setTranslatedToLang={(lang) => dispatch({ type: 'CHANGE_TRANSLATED_TO_LANG', payload: lang })}
        />
      </div>
    </main>
  )
}

export default App
