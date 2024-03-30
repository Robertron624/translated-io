export const speakTextNotAsync = (text: string, lang: string) => {
    if (!text) return;
  
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
  
    // Match the language to the voice
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const currentVoice = voices[i];
      const currentVoiceLang = currentVoice.lang.split("-")[0];
  
      if (currentVoiceLang === lang) {
        utterThis.voice = currentVoice;
        break;
      }
    }
  
    synth.speak(utterThis);
};

export const speakText = (text: string, lang: string) => {
  if (!text) return;

  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);

  // Function to set the voice based on the language
  const setVoice = () => {
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const currentVoice = voices[i];
      const currentVoiceLang = currentVoice.lang.split("-")[0];

      if (currentVoiceLang === lang) {
        utterThis.voice = currentVoice;
        synth.speak(utterThis);
        return;
      }
    }
    console.warn("Voice not found for language:", lang);
    // If no matching voice is found, use the default voice
    synth.speak(utterThis);
  };

  // Check if voices are already loaded
  if (synth.getVoices().length) {
    // Voices are already loaded, set the voice immediately
    setVoice();
  } else {
    // Listen for the voiceschanged event before setting the voice
    synth.onvoiceschanged = setVoice;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => resolve(func(...args)), delay);
    });
  };
};

//below is the code for real time translation, but it is not used in the project so far, because it consumes a lot of resources and the free tier of the translation API has a limit per day
// export  const handleRealTimeTranslate = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const text = e.target.value;
//   setTobeTranslatedText(text);
//   setTextCount(text.length);
  
//   const handleRealTimeTranslateDebounced = debounce(async () => {
//       setLoading(true);
//       try {
//           const response = await axios.get(`${baseApiUrl}`, {
//               params: {
//                   q: text,
//                   langpair: `${translatedFromLang}|${translatedToLang}`
//               }
//           });
  
//           if (response.data.responseStatus === 200) {
//               setTranslatedText(response.data.responseData.translatedText);

//           }
//       } catch (error) {
//           console.error('Error translating text:', error);
//       }
//       setLoading(false);
//   }

//   , 1000);

//   handleRealTimeTranslateDebounced();
// }