import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { processAIRequest } from '../../services/api.service';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const question = input;
    setInput('');
    setMessages([]); // ✅ XÓA TOÀN BỘ HỘI THOẠI TRƯỚC ĐÓ
    setIsLoading(true);

    if (containsVietnamese(question)) {
      const answer = 'Xin lỗi, tôi chỉ nhận câu hỏi tiếng Anh.';
      setMessages([{ question, answer }]);
      setIsLoading(false);
      return;
    }

    try {
      const botReply = await processAIRequest(question);
      setMessages([{ question, answer: botReply.result }]);
    } catch (error: any) {
      let answer = 'Bot gặp lỗi, vui lòng thử lại sau.';
      if (error.response?.status === 429) {
        answer = 'Quá nhiều yêu cầu, vui lòng đợi vài giây rồi thử lại.';
      }
      setMessages([{ question, answer }]);
    } finally {
      setIsLoading(false);
    }
  };

  function containsVietnamese(text: string): boolean {
    const vietnameseRegex =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    return vietnameseRegex.test(text);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.resultSection}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageBlock}>
              <Text style={styles.label}>Bạn hỏi:</Text>
              <Text style={styles.content}>{msg.question}</Text>

              <Text style={styles.label}>Bot trả lời:</Text>
              <Text style={styles.content}>{msg.answer}</Text>
            </View>
          ))}

          {isLoading && (
            <View style={styles.loadingBlock}>
              <ActivityIndicator size="small" color="#4A90E2" />
              <Text style={{ marginLeft: 8 }}>Đang trả lời...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputSection}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Nhập câu cần dịch hoặc giải thích"
            style={styles.input}
            editable={!isLoading}
          />
          <Button title="Gửi" onPress={handleSend} disabled={isLoading} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
  resultSection: {
    paddingBottom: 16,
  },
  messageBlock: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  loadingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
