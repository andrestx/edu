import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // 'teacher' sau 'student'

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Eroare', 'Completează toate câmpurile!');
      return;
    }

    // Simulare autentificare
    if (userType === 'teacher') {
      navigation.navigate('TeacherDashboard', { email });
    } else {
      navigation.navigate('StudentDashboard', { email });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduChallenge</Text>
      <Text style={styles.subtitle}>Aplicație Educațională Interactivă</Text>

      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'student' && styles.selectedButton,
          ]}
          onPress={() => setUserType('student')}>
          <Icon name="person" size={24} color={userType === 'student' ? '#fff' : '#666'} />
          <Text style={[styles.buttonText, userType === 'student' && styles.selectedText]}>
            Elev
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'teacher' && styles.selectedButton,
          ]}
          onPress={() => setUserType('teacher')}>
          <Icon name="school" size={24} color={userType === 'teacher' ? '#fff' : '#666'} />
          <Text style={[styles.buttonText, userType === 'teacher' && styles.selectedText]}>
            Profesor
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Parolă"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Intră în cont</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.demoButton}>
        <Text style={styles.demoText}>Intră ca vizitator (demo)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4a6fa5',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  userTypeButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '45%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedButton: {
    backgroundColor: '#4a6fa5',
    borderColor: '#4a6fa5',
  },
  buttonText: {
    marginTop: 5,
    color: '#666',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4a6fa5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  demoText: {
    color: '#4a6fa5',
    fontSize: 16,
  },
});
