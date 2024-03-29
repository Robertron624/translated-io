export const speakText = (text: string, lang: string) => {
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