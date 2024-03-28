import { useEffect } from 'react';
import axios from 'axios';

import { baseApiUrl } from '../lib/constants';

import { Action } from '../App';



const useTranslation = (text: string, fromLang: string, toLang: string, dispatch: React.Dispatch<Action>) => {
    useEffect(() => {
      const translateText = async () => {
        try {
          const response = await axios.get(`${baseApiUrl}`, {
            params: {
              q: text,
              langpair: `${fromLang}|${toLang}`
            }
          });
          if (response.data.responseStatus === 200) {
            dispatch({ type: 'CHANGE_TRANSLATED_TEXT', payload: response.data.responseData.translatedText });
          } else {
            console.error('Error translating text:', response.data.responseStatus);
            // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
          }
        } catch (error) {
          console.error('Error translating text:', error);
          // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
      };
  
      translateText();
    }, [text, fromLang, toLang, dispatch]);
  };
  
  export default useTranslation;