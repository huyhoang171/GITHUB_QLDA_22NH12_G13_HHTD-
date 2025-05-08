import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'; // Vẫn dùng axios để gọi backend

// !! QUAN TRỌNG: Thay thế bằng địa chỉ IP và cổng của máy đang chạy backend Flask !!
// Ví dụ: 'http://192.168.1.100:5000' hoặc 'http://10.0.2.2:5000' (cho Android Emulator)
const BACKEND_TRANSCRIPTION_URL = 'http://172.20.10.7:5000/transcribe'; // <<< KIỂM TRA LẠI IP NÀY!

interface Dialogue {
  english: string;
  phonetic: string;
  vietnamese: string;
  audio: string; // Assuming this is the key/filename for audioFiles
}

// --- Static Data ---
const topicFiles: Record<string, any> = {
  greetings: require('../../assets/json/pronunciation/greetings.json'),
  introductions: require('../../assets/json/pronunciation/introductions.json'),
  'daily-conversations': require('../../assets/json/pronunciation/daily-conversations.json'),
  travel: require('../../assets/json/pronunciation/travel.json'),
  work: require('../../assets/json/pronunciation/work.json'),
};

const audioFiles: Record<string, any> = {
  // Greetings
  'hello_how_are_you.mp3': require('../../assets/audio/greetings/hello_how_are_you.mp3'),
  'good_morning.mp3': require('../../assets/audio/greetings/good_morning.mp3'),
  'good_afternoon.mp3': require('../../assets/audio/greetings/good_afternoon.mp3'),
  'good_evening.mp3': require('../../assets/audio/greetings/good_evening.mp3'),
  'nice_to_meet_you.mp3': require('../../assets/audio/greetings/nice_to_meet_you.mp3'),
  'long_time_no_see.mp3': require('../../assets/audio/greetings/long_time_no_see.mp3'),
  'how_is_it_going.mp3': require('../../assets/audio/greetings/how_is_it_going.mp3'),
  'whats_up.mp3': require('../../assets/audio/greetings/whats_up.mp3'),
  'how_have_you_been.mp3': require('../../assets/audio/greetings/how_have_you_been.mp3'),
  'hey_good_to_see_you.mp3': require('../../assets/audio/greetings/hey_good_to_see_you.mp3'),

  // Daily Conversations
  'how_was_your_day.mp3': require('../../assets/audio/daily-conversations/how_was_your_day.mp3'),
  'i_am_going_to_the_market.mp3': require('../../assets/audio/daily-conversations/i_am_going_to_the_market.mp3'),
  'can_you_help_me.mp3': require('../../assets/audio/daily-conversations/can_you_help_me.mp3'),
  'what_time_is_it.mp3': require('../../assets/audio/daily-conversations/what_time_is_it.mp3'),
  'i_am_hungry.mp3': require('../../assets/audio/daily-conversations/i_am_hungry.mp3'),
  'lets_go_for_a_walk.mp3': require('../../assets/audio/daily-conversations/lets_go_for_a_walk.mp3'),
  'i_am_watching_tv.mp3': require('../../assets/audio/daily-conversations/i_am_watching_tv.mp3'),
  'please_wait_a_moment.mp3': require('../../assets/audio/daily-conversations/please_wait_a_moment.mp3'),
  'i_am_tired_today.mp3': require('../../assets/audio/daily-conversations/i_am_tired_today.mp3'),
  'lets_have_lunch.mp3': require('../../assets/audio/daily-conversations/lets_have_lunch.mp3'),

  // Introductions
  'my_name_is_anna.mp3': require('../../assets/audio/introductions/my_name_is_anna.mp3'),
  'i_am_from_vietnam.mp3': require('../../assets/audio/introductions/i_am_from_vietnam.mp3'),
  'this_is_my_friend_john.mp3': require('../../assets/audio/introductions/this_is_my_friend_john.mp3'),
  'nice_to_meet_you1.mp3': require('../../assets/audio/introductions/nice_to_meet_you1.mp3'),
  'whats_your_name.mp3': require('../../assets/audio/introductions/whats_your_name.mp3'),
  'i_am_a_student.mp3': require('../../assets/audio/introductions/i_am_a_student.mp3'),
  'how_old_are_you.mp3': require('../../assets/audio/introductions/how_old_are_you.mp3'),
  'where_do_you_live.mp3': require('../../assets/audio/introductions/where_do_you_live.mp3'),
  'i_work_as_a_teacher.mp3': require('../../assets/audio/introductions/i_work_as_a_teacher.mp3'),
  'let_me_introduce_myself.mp3': require('../../assets/audio/introductions/let_me_introduce_myself.mp3'),

  // Travel
  'where_is_the_bus_stop.mp3': require('../../assets/audio/travel/where_is_the_bus_stop.mp3'),
  'id_like_to_book_a_room.mp3': require('../../assets/audio/travel/id_like_to_book_a_room.mp3'),
  'how_much_is_the_ticket.mp3': require('../../assets/audio/travel/how_much_is_the_ticket.mp3'),
  'i_am_lost_can_you_help_me.mp3': require('../../assets/audio/travel/i_am_lost_can_you_help_me.mp3'),
  'where_can_i_eat.mp3': require('../../assets/audio/travel/where_can_i_eat.mp3'),
  'is_there_wifi_here.mp3': require('../../assets/audio/travel/is_there_wifi_here.mp3'),
  'can_i_have_the_menu.mp3': require('../../assets/audio/travel/can_i_have_the_menu.mp3'),
  'what_time_does_it_open.mp3': require('../../assets/audio/travel/what_time_does_it_open.mp3'),
  'i_need_a_taxi.mp3': require('../../assets/audio/travel/i_need_a_taxi.mp3'),
  'how_far_is_the_airport.mp3': require('../../assets/audio/travel/how_far_is_the_airport.mp3'),

  // Work
  'i_have_a_meeting_at_10_am.mp3': require('../../assets/audio/work/i_have_a_meeting_at_10_am.mp3'),
  'please_send_me_the_report.mp3': require('../../assets/audio/work/please_send_me_the_report.mp3'),
  'i_am_working_on_a_project.mp3': require('../../assets/audio/work/i_am_working_on_a_project.mp3'),
  'i_need_more_time.mp3': require('../../assets/audio/work/i_need_more_time.mp3'),
  'lets_take_a_break.mp3': require('../../assets/audio/work/lets_take_a_break.mp3'),
  'can_we_talk_later.mp3': require('../../assets/audio/work/can_we_talk_later.mp3'),
  'whats_the_deadline.mp3': require('../../assets/audio/work/whats_the_deadline.mp3'),
  'the_client_is_waiting.mp3': require('../../assets/audio/work/the_client_is_waiting.mp3'),
  'ill_finish_it_by_tomorrow.mp3': require('../../assets/audio/work/ill_finish_it_by_tomorrow.mp3'),
  'lets_schedule_a_call.mp3': require('../../assets/audio/work/lets_schedule_a_call.mp3'),
};

// --- Component ---
export default function SpeakingDetail() {
  const { topicId } = useLocalSearchParams();
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playbackUri, setPlaybackUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false); // State for transcription loading
  const [transcriptionResult, setTranscriptionResult] = useState<{ text: string; accuracy: number | null } | null>(null);

  // --- Effects ---
  useEffect(() => {
    if (!topicId || typeof topicId !== 'string') {
      console.error('Invalid or missing topicId param');
      setIsLoading(false);
      return;
    }

    console.log('Loading dialogues for topicId:', topicId);
    try {
      const dialoguesData = topicFiles[topicId];
      if (dialoguesData && Array.isArray(dialoguesData)) {
        setDialogues(dialoguesData);
      } else {
        console.error('No valid dialogues array found for topicId:', topicId);
        setDialogues([]);
      }
    } catch (error) {
      console.error('Error loading dialogues JSON for topic:', topicId, error);
      setDialogues([]);
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  // --- Audio & Recording Functions ---
  const startRecording = async () => {
    setPlaybackUri(null);
    setTranscriptionResult(null);
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Từ chối quyền', 'Quyền truy cập micro bị từ chối!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true, playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: true, interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
      });
      console.log('Starting recording...');
      const recordingOptions = Audio.RecordingOptionsPresets.HIGH_QUALITY; // Giữ nguyên định dạng m4a/caf
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Lỗi ghi âm', 'Không thể bắt đầu ghi âm.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    console.log('Stopping recording...');
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped, URI:', uri);
      if (uri) {
        setPlaybackUri(uri);
      } else {
        console.error("Recording URI is null after stopping.");
        Alert.alert("Lỗi", "Không lấy được file ghi âm sau khi dừng.");
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    } finally {
      setRecording(null);
    }
  };

  const playRecording = async () => {
    if (!playbackUri) return;
    console.log('Playing recording from:', playbackUri);
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: playbackUri },
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log('Playback finished');
          await sound.unloadAsync();
          console.log('Sound unloaded');
        } else if (!status.isLoaded && status.error) {
          console.error(`Playback Error: ${status.error}`);
          await sound.unloadAsync();
        }
      });
    } catch (err) {
      console.error('Failed to play recording', err);
      Alert.alert('Lỗi phát lại', 'Không thể phát lại bản ghi âm.');
    }
  };

  const playAudio = async (audioFileName: string | undefined) => {
    if (!audioFileName) {
      console.warn('Attempted to play audio with undefined filename');
      return;
    }
    console.log('Playing reference audio:', audioFileName);
    try {
      const audioResource = audioFiles[audioFileName];
      if (!audioResource) {
        console.error(`Audio file not found in audioFiles map: ${audioFileName}`);
        Alert.alert('Lỗi file', `Không tìm thấy file âm thanh: ${audioFileName}`);
        return;
      }
      const { sound } = await Audio.Sound.createAsync(
        audioResource,
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        } else if (!status.isLoaded && status.error) {
          console.error(`Reference Audio Playback Error: ${status.error}`);
          await sound.unloadAsync();
        }
      });
    } catch (err) {
      console.error('Failed to play reference audio', err);
      Alert.alert('Lỗi phát âm thanh', 'Không thể phát file âm thanh mẫu.');
    }
  };

  // --- Transcription Functions ---

  /**
   * Sends the recorded audio file to the Flask backend for transcription.
   * @param recordingUri The file URI of the recorded audio (.m4a or .caf).
   * @returns The transcribed text from the backend.
   */
  const transcribeWithBackend = async (recordingUri: string): Promise<string> => {
    console.log(`Sending audio to backend: ${recordingUri}`);

    const fileExtension = recordingUri.split('.').pop()?.toLowerCase();
    if (!fileExtension) {
      throw new Error("Không thể xác định định dạng file từ URI.");
    }
    const fileName = `recording.${fileExtension}`; // e.g., recording.m4a
    let mimeType: string;

    // Xác định MIME type dựa trên phần mở rộng file
    if (Platform.OS === 'ios') {
      // iOS thường ghi âm thành .caf hoặc .m4a tùy cấu hình
      if (fileExtension === 'caf') mimeType = 'audio/x-caf';
      else mimeType = 'audio/m4a'; // Mặc định là m4a cho iOS nếu không phải caf
    } else if (Platform.OS === 'android') {
      // Android thường ghi âm thành .m4a hoặc .aac, .3gp tùy thiết bị và cấu hình
      // Expo AV thường cố gắng chuẩn hóa thành m4a trên Android với HIGH_QUALITY
      mimeType = 'audio/m4a'; // Giả định là m4a trên Android
    } else {
      mimeType = 'application/octet-stream'; // Fallback chung
    }

    console.log(`Uploading to backend: name=${fileName}, type=${mimeType}`);

    const formData = new FormData();
    // Đảm bảo tên field là 'audio' như trong backend Flask
    // Cast sang 'any' để tránh lỗi type checking với cấu trúc của React Native FormData
    formData.append('audio', {
      uri: recordingUri,
      name: fileName,
      type: mimeType,
    } as any);

    try {
      // *** THAY ĐỔI QUAN TRỌNG Ở ĐÂY ***
      const response = await axios.post(BACKEND_TRANSCRIPTION_URL, formData, {
        headers: {
          // Ép kiểu Content-Type thành multipart/form-data
          // Mặc dù Axios thường tự làm điều này với FormData,
          // việc chỉ định rõ ràng giúp đảm bảo và gỡ lỗi dễ hơn.
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // Tăng timeout nếu cần cho việc upload và xử lý backend
      });
      // *** KẾT THÚC THAY ĐỔI ***

      if (response.status === 200 && response.data && response.data.transcription) {
        console.log('Backend transcription success:', response.data.transcription);
        return response.data.transcription;
      } else {
        // Xử lý lỗi trả về từ backend (nếu có cấu trúc error)
        const errorMessage = response.data?.error || `Lỗi không xác định từ backend (status ${response.status})`;
        console.error('Backend returned error:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Error calling backend API:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Lỗi có response từ server (4xx, 5xx)
          console.error("Backend error details:", error.response.status, error.response.data);
          throw new Error(`Lỗi từ backend (${error.response.status}): ${error.response.data?.error || error.message}`);
        } else if (error.request) {
          // Request được gửi đi nhưng không nhận được response (lỗi mạng, timeout, không kết nối được backend)
          console.error("No response received:", error.request);
          // Thông báo lỗi rõ ràng hơn cho người dùng
          throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng, địa chỉ IP của backend và đảm bảo server đang chạy.');
        } else {
          // Lỗi xảy ra khi thiết lập request
          console.error('Axios setup error:', error.message);
          throw new Error(`Lỗi khi gửi yêu cầu: ${error.message}`);
        }
      } else {
        // Lỗi không phải của Axios
        console.error('Non-Axios error:', error);
        throw new Error(`Lỗi không xác định: ${error.message}`);
      }
    }
  };

  // Simple accuracy calculation (word-by-word match)
  const calculateAccuracy = (original: string, transcript: string): number | null => {
    if (!original || !transcript) return 0;

    // Hàm làm sạch dấu câu và chuẩn hóa từ
    const cleanText = (text: string): string[] => {
      return text
        .toLowerCase()
        .replace(/[\.,!?;:"'()\-\[\]{}]/g, '') // loại bỏ dấu câu phổ biến và cả dấu ngoặc
        .trim()
        .split(/\s+/); // tách từ
    };

    const originalWords = cleanText(original);
    const transcriptWords = cleanText(transcript);

    if (originalWords.length === 0) return 0;

    let matchCount = 0;
    const minLength = Math.min(originalWords.length, transcriptWords.length);

    for (let i = 0; i < minLength; i++) {
      if (originalWords[i] === transcriptWords[i]) {
        matchCount++;
      }
    }

    const accuracy = (matchCount / originalWords.length) * 100;
    return parseFloat(accuracy.toFixed(2));
  };

  // Handler to trigger transcription using the backend
  const handleTranscription = async () => {
    if (!playbackUri) {
      Alert.alert('Thiếu file', 'Chưa có bản ghi âm nào để xử lý.');
      return;
    }
    if (!currentDialogue) {
      Alert.alert("Lỗi dữ liệu", "Không tìm thấy đoạn hội thoại hiện tại.");
      return;
    }

    setIsTranscribing(true);
    setTranscriptionResult(null); // Clear previous result

    try {
      // Gọi hàm transcribeWithBackend đã được cập nhật
      const transcript = await transcribeWithBackend(playbackUri);
      const accuracy = calculateAccuracy(currentDialogue.english, transcript);
      setTranscriptionResult({ text: transcript, accuracy });
    } catch (error: any) {
      console.error('Error during backend transcription process:', error);
      // Hiển thị lỗi cho người dùng một cách thân thiện hơn
      Alert.alert('Lỗi xử lý', error.message || 'Quá trình chuyển đổi giọng nói thất bại. Vui lòng thử lại.');
      setTranscriptionResult({ text: "Lỗi xử lý", accuracy: null }); // Hiển thị lỗi trên UI
    } finally {
      setIsTranscribing(false);
    }
  };

  // --- Navigation ---
  const handleNext = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
      setPlaybackUri(null);
      setTranscriptionResult(null);
    }
  };

  const handlePrevious = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(currentDialogueIndex - 1);
      setPlaybackUri(null);
      setTranscriptionResult(null);
    }
  };

  const currentDialogue = dialogues[currentDialogueIndex];

  // --- Render ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      {currentDialogue ? (
        <View style={styles.dialogueCard}>
          <Text style={styles.label}>English:</Text>
          <Text style={styles.english}>{currentDialogue.english}</Text>
          <Text style={styles.label}>Phonetic:</Text>
          <Text style={styles.phonetic}>{currentDialogue.phonetic}</Text>
          <Text style={styles.label}>Vietnamese:</Text>
          <Text style={styles.vietnamese}>{currentDialogue.vietnamese}</Text>
          <TouchableOpacity onPress={() => playAudio(currentDialogue.audio)} style={styles.audioButton}>
            <Text style={styles.audioButtonText}>Nghe mẫu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.errorText}>Không có dữ liệu hội thoại cho chủ đề này.</Text>
      )}

      {/* Navigation */}
      <View style={styles.navigationButtons}>
        <Button title="Trước" onPress={handlePrevious} disabled={currentDialogueIndex === 0 || isTranscribing || !!recording} />
        <Text style={styles.progressText}>{currentDialogueIndex + 1} / {dialogues.length}</Text>
        <Button title="Sau" onPress={handleNext} disabled={currentDialogueIndex === dialogues.length - 1 || isTranscribing || !!recording} />
      </View>

      {/* Recording Controls */}
      <View style={styles.recordingSection}>
        <Text style={styles.sectionTitle}>Ghi Âm</Text>
        <View style={styles.recordingButtons}>
          <Button
            title={recording ? "Dừng Ghi Âm" : "Bắt Đầu Ghi Âm"}
            onPress={recording ? stopRecording : startRecording}
            disabled={isTranscribing}
            color={recording ? "#DC3545" : "#007AFF"}
          />
          <Button
            title="Phát Lại"
            onPress={playRecording}
            disabled={!playbackUri || !!recording || isTranscribing}
          />
        </View>
      </View>

      {/* Transcription Controls & Results */}
      {playbackUri && (
        <View style={styles.transcriptionSection}>
          <Text style={styles.sectionTitle}>Kiểm Tra Phát Âm</Text>
          <Button
            title={isTranscribing ? "Đang xử lý..." : "Kiểm tra giọng nói"}
            onPress={handleTranscription} // Sử dụng hàm đã cập nhật
            disabled={!playbackUri || isTranscribing || !!recording}
          />
          {isTranscribing && <ActivityIndicator style={{ marginTop: 10 }} color="#007AFF" />}
          {transcriptionResult && !isTranscribing && (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Giọng nói của bạn:</Text>
              {/* Hiển thị kết quả hoặc thông báo lỗi */}
              <Text style={[styles.resultText, transcriptionResult.text === "Lỗi xử lý" && { color: 'red' }]}>
                {transcriptionResult.text || "(Không nhận dạng được)"}
              </Text>
              {transcriptionResult.accuracy !== null && ( // Chỉ hiển thị độ chính xác nếu có
                <>
                  <Text style={styles.resultLabel}>Độ chính xác (ước tính):</Text>
                  <Text style={[styles.resultAccuracy, { color: (transcriptionResult.accuracy ?? 0) >= 70 ? 'green' : 'orange' }]}>
                    {`${transcriptionResult.accuracy}%`}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
      )}

    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f0f0f0' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dialogueCard: { backgroundColor: '#ffffff', padding: 15, borderRadius: 8, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2 },
  label: { fontSize: 14, color: '#666', marginBottom: 2 },
  english: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#000' },
  phonetic: { fontSize: 15, fontStyle: 'italic', color: '#555', marginBottom: 5 },
  vietnamese: { fontSize: 16, color: '#333', marginBottom: 10 },
  audioButton: { marginTop: 10, backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, alignSelf: 'flex-start' },
  audioButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  navigationButtons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 10 },
  progressText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  recordingSection: { backgroundColor: '#ffffff', padding: 15, borderRadius: 8, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  recordingButtons: { flexDirection: 'row', justifyContent: 'space-around', gap: 15 },
  transcriptionSection: { backgroundColor: '#ffffff', padding: 15, borderRadius: 8, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2 },
  resultCard: { marginTop: 15, padding: 10, backgroundColor: '#f8f9fa', borderRadius: 5, borderWidth: 1, borderColor: '#e0e0e0' },
  resultLabel: { fontSize: 14, color: '#666', marginBottom: 3 },
  resultText: { fontSize: 16, color: '#000', marginBottom: 8 },
  resultAccuracy: { fontSize: 18, fontWeight: 'bold' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 20 },
});