import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { processAIRequest } from '../../services/api.service';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const question = input;
    setInput('');
    setMessages([]); // Clear all previous conversations
    setIsLoading(true);

    if (containsVietnamese(question)) {
      const answer = 'Sorry, I only accept questions in English.';
      setMessages([{ question, answer }]);
      setIsLoading(false);
      return;
    }

    try {
      const botReply = await processAIRequest(question);
      setMessages([{ question, answer: botReply.result }]);
    } catch (error: any) {
      let answer = 'The bot encountered an error, please try again later.';
      if (error.response?.status === 429) {
        answer = 'Too many requests, please wait a few seconds and try again.';
      }
      setMessages([{ question, answer }]);
    } finally {
      setIsLoading(false);
      // Scroll to bottom when new message is added
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  function containsVietnamese(text: string): boolean {
    const vietnameseRegex =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    return vietnameseRegex.test(text);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.innerContainer}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.resultSection}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 && !isLoading && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>💬</Text>
                <Text style={styles.emptyStateText}>
                  Ask a question in English
                </Text>
              </View>
            )}
            
            {messages.map((msg, index) => (
              <View key={index} style={styles.messagesContainer}>
                {/* User question */}
                <View style={styles.userMessageContainer}>
                  <View style={styles.userMessage}>
                    <Text style={styles.userMessageText}>{msg.question}</Text>
                  </View>
                </View>
                
                {/* Bot answer */}
                <View style={styles.botMessageContainer}>
                  <View style={styles.botAvatar}>
                    <Text style={styles.botAvatarText}>🤖</Text>
                  </View>
                  <View style={styles.botMessage}>
                    <Text style={styles.botMessageText}>{msg.answer}</Text>
                  </View>
                </View>
              </View>
            ))}

            {isLoading && (
              <View style={styles.botMessageContainer}>
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarText}>🤖</Text>
                </View>
                <View style={[styles.botMessage, styles.loadingMessage]}>
                  <ActivityIndicator size="small" color="#4A90E2" />
                  <Text style={styles.loadingText}>Responding...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputSection}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Enter your question in English..."
              style={styles.input}
              editable={!isLoading}
              multiline
              placeholderTextColor="#9EA0A4"
            />
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                (!input.trim() || isLoading) ? styles.sendButtonDisabled : null
              ]} 
              onPress={handleSend} 
              disabled={!input.trim() || isLoading}
            >
              <Text style={styles.sendButtonText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  resultSection: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyStateIcon: {
    fontSize: 50,
    color: '#DADADA',
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9EA0A4',
    textAlign: 'center',
  },
  messagesContainer: {
    marginBottom: 24,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  userMessage: {
    maxWidth: width * 0.75,
    backgroundColor: '#4A90E2',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  botMessageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botMessage: {
    maxWidth: width * 0.75,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  botMessageText: {
    color: '#333333',
    fontSize: 16,
  },
  loadingMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingText: {
    color: '#333333',
    marginLeft: 8,
    fontSize: 14,
  },
  inputSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});