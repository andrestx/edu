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

export default function StudentDashboard({ navigation }) {
  const [sessionCode, setSessionCode] = useState('');
  const [studentName, setStudentName] = useState('');

  const joinSession = () => {
    if (!sessionCode || !studentName) {
      Alert.alert('Eroare', 'Completează toate câmpurile!');
      return;
    }

    if (sessionCode.length !== 6) {
      Alert.alert('Eroare', 'Codul sesiunii trebuie să aibă 6 caractere!');
      return;
    }

    // Simulare verificare cod
    Alert.alert(
      'Alege Echipa',
      'În ce echipă vrei să joci?',
      [
        { text: 'Echipa Roșie 🟥', onPress: () => navigateToGame('red') },
        { text: 'Echipa Albastră 🟦', onPress: () => navigateToGame('blue') },
      ]
    );
  };

  const navigateToGame = (team) => {
    navigation.navigate('GameScreen', {
      sessionCode,
      studentName,
      team,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="group" size={80} color="#4a6fa5" />
        <Text style={styles.title}>Join Session</Text>
        <Text style={styles.subtitle}>Introdu codul de la profesor</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="code" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Cod sesiune (6 caractere)"
          value={sessionCode}
          onChangeText={setSessionCode}
          maxLength={6}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Numele tău complet"
          value={studentName}
          onChangeText={setStudentName}
        />
      </View>

      <TouchableOpacity style={styles.joinButton} onPress={joinSession}>
        <Text style={styles.joinButtonText}>Intră în sesiune</Text>
        <Icon name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Icon name="info" size={24} color="#FF9800" />
        <Text style={styles.infoText}>
          Cere codul sesiunii de la profesorul tău și introdu-l mai sus
        </Text>
      </View>

      <TouchableOpacity style={styles.demoButton}>
        <Text style={styles.demoText}>Vezi demo fără cod</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a6fa5',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: '#4a6fa5',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  demoButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  demoText: {
    color: '#4a6fa5',
    fontSize: 16,
    fontWeight: '600',
  },
});
