import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TeacherDashboard({ navigation, route }) {
  const [sessions, setSessions] = useState([
    { id: '1', code: 'ABC123', date: '2024-01-15', active: true, players: 12 },
    { id: '2', code: 'DEF456', date: '2024-01-14', active: false, players: 8 },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionCode, setSessionCode] = useState('');

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const createNewSession = () => {
    const newCode = generateCode();
    const newSession = {
      id: (sessions.length + 1).toString(),
      code: newCode,
      date: new Date().toISOString().split('T')[0],
      active: true,
      players: 0,
    };
    
    setSessions([newSession, ...sessions]);
    setSessionCode(newCode);
    setModalVisible(true);
    
    // Navigate to create questions
    setTimeout(() => {
      navigation.navigate('CreateSession', { sessionCode: newCode });
    }, 2000);
  };

  const renderSession = ({ item }) => (
    <TouchableOpacity style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionCode}>{item.code}</Text>
        <View style={[styles.statusDot, { backgroundColor: item.active ? '#4CAF50' : '#FF5252' }]} />
      </View>
      <Text style={styles.sessionDate}>Data: {item.date}</Text>
      <Text style={styles.sessionPlayers}>Jucători: {item.players}</Text>
      <TouchableOpacity style={styles.manageButton}>
        <Text style={styles.manageButtonText}>Gestionează Sesiunea</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Profesor</Text>
        <Text style={styles.welcomeText}>Bun venit, {route.params?.email || 'Profesor'}!</Text>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={createNewSession}>
        <Icon name="add-circle" size={24} color="#fff" />
        <Text style={styles.createButtonText}>Crează Sesiune Nouă</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Sesiunile tale:</Text>
      
      <FlatList
        data={sessions}
        renderItem={renderSession}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={60} color="#4CAF50" />
            <Text style={styles.modalTitle}>Sesiune creată cu succes!</Text>
            <Text style={styles.sessionCodeDisplay}>{sessionCode}</Text>
            <Text style={styles.modalText}>
              Acesta este codul sesiunii. Distribuie-l elevilor tăi!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a6fa5',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#FF9800',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a6fa5',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sessionDate: {
    color: '#666',
    marginTop: 5,
  },
  sessionPlayers: {
    color: '#666',
    marginTop: 2,
  },
  manageButton: {
    backgroundColor: '#4a6fa5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  sessionCodeDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a6fa5',
    marginVertical: 10,
    letterSpacing: 3,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4a6fa5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
