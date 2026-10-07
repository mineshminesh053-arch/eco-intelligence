// Voice Recognition Service using Web Speech API
export function createVoiceRecognition(onResult, onListening, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported in this browser');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  let finalTranscript = '';

  recognition.onstart = () => {
    finalTranscript = '';
    onListening(true);
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    // Send interim results for live preview
    onResult(finalTranscript || interimTranscript, !finalTranscript);
  };

  recognition.onend = () => {
    onListening(false);
    if (finalTranscript) {
      onResult(finalTranscript, false);
    }
  };

  recognition.onerror = (event) => {
    onListening(false);
    if (event.error !== 'no-speech') {
      onError(event.error);
    }
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (e) {
        console.warn('Recognition already started');
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        console.warn('Recognition already stopped');
      }
    },
    isSupported: true
  };
}

// Speech Synthesis (Text-to-Speech) service
export function speakText(text, onEnd, onError) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported in this browser');
    return false;
  }

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  // Strip markdown formatting symbols for natural voice reading
  const cleanText = text
    .replace(/[*_~#`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (err) => {
    if (onError) onError(err);
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}


