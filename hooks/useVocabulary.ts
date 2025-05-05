import { Audio } from 'expo-av';

export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 90%)`;
};

export const playSound = async (url: string, setSound: (sound: Audio.Sound | null) => void, sound: Audio.Sound | null) => {
  try {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    await newSound.playAsync();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const translateSenses = async (
  word: string,
  definition: string,
  setIsTranslating: (isTranslating: boolean) => void,
  setTranslationError: (error: string | null) => void,
  setTranslatedWord: (word: string | null) => void,
  setTranslatedSenses: (senses: string | null) => void
) => {
  try {
    setIsTranslating(true);
    setTranslationError(null);

    // Translate word
    const wordUrl = new URL('https://api.mymemory.translated.net/get');
    wordUrl.searchParams.append('q', word);
    wordUrl.searchParams.append('langpair', 'en|vi');

    const wordResponse = await fetch(wordUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!wordResponse.ok) {
      throw new Error(`HTTP error! status: ${wordResponse.status}`);
    }

    const wordData = await wordResponse.json();

    // Translate definition
    const defUrl = new URL('https://api.mymemory.translated.net/get');
    defUrl.searchParams.append('q', definition);
    defUrl.searchParams.append('langpair', 'en|vi');

    const defResponse = await fetch(defUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!defResponse.ok) {
      throw new Error(`HTTP error! status: ${defResponse.status}`);
    }

    const defData = await defResponse.json();

    if (wordData.responseStatus === 200 && defData.responseStatus === 200) {
      setTranslatedWord(wordData.responseData.translatedText);
      setTranslatedSenses(defData.responseData.translatedText);
    } else {
      throw new Error(
        wordData.responseStatus === 429 || defData.responseStatus === 429
          ? 'Quá nhiều yêu cầu dịch. Vui lòng thử lại sau.'
          : 'Không thể dịch. Vui lòng thử lại.'
      );
    }
  } catch (error) {
    console.error('Error translating text:', error);
    setTranslationError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi dịch');
  } finally {
    setIsTranslating(false);
  }
};