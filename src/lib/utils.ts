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
