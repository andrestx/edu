import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function GameScreen({ route, navigation }) {
  const { sessionCode, studentName, team } = route.params;
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Care este capitala Franței?', answered: false },
    { id: 2, text: 'Câte continente există?', answered: false },
    { id: 3, text: 'Care este cel mai lung fluviu din Europa?', answered: false },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [ropePosition] = useState(new Animated.Value(width / 2 - 50));

  const teamColor = team === 'red' ? '#FF5252' : '#2196F3';

  const answerQuestion = (teamAnswered) => {
    if (questions[currentQuestion].answered) return;

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answered = true;
    setQuestions(updatedQuestions);

    if (teamAnswered === 'red') {
      setTeamAScore(teamAScore + 1);
      moveRope('right');
    } else {
      setTeamBScore(teamBScore + 1);
      moveRope('left');
    }

    // Next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Game over
        alert(`Game Over! ${teamAScore > teamBScore ? 'Echipa Roșie' : 'Echipa Albastră'} a câștigat!`);
      }
    }, 1500);
  };

  const moveRope = (direction) => {
    Animated.timing(ropePosition, {
      toValue: direction === 'right' ? width - 100 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sessionCode}>Sesiunea: {sessionCode}</Text>
        <Text style={[styles.playerName, { color: teamColor }]}>
          {studentName} - {team === 'red' ? 'Echipa Roșie' : 'Echipa Albastră'}
        </Text>
      </View>

      {/* Tug of War Visualization */}
      <View style={styles.gameArea}>
        <View style={styles.teamAContainer}>
          <Text style={[styles.teamText, { color: '#FF5252' }]}>Echipa Roșie</Text>
          <Text style={styles.scoreText}>{teamAScore}</Text>
          <View style={[styles.teamFlag, { backgroundColor: '#FF5252' }]} />
        </View>

        <View style={styles.ropeContainer}>
          <Animated.View
            style={[
              styles.ropeHandle,
              { transform: [{ translateX: ropePosition }], backgroundColor: teamColor },
            ]}
          />
          <View style={styles.rope} />
        </View>

        <View style={styles.teamBContainer}>
          <Text style={[styles.teamText, { color: '#2196F3' }]}>Echipa Albastră</Text>
          <Text style={styles.scoreText}>{teamBScore}</Text>
          <View style={[styles.teamFlag, { backgroundColor: '#2196F3' }]} />
        </View>
      </View>

      {/* Current Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Întrebarea {currentQuestion + 1}/{questions.length}</Text>
        <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>
        
        <View style={styles.answerButtons}>
          <TouchableOpacity
            style={[styles.answerButton, { backgroundColor: '#FF5252' }]}
            onPress={() => answerQuestion('red')}
            disabled={questions[currentQuestion].answered}>
            <Text style={styles.answerButtonText}>Echipa Roșie Răspunde</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerButton, { backgroundColor: '#2196F3' }]}
            onPress={() => answerQuestion('blue')}
            disabled={questions[currentQuestion].answered}>
            <Text style={styles.answerButtonText}>Echipa Albastră Răspunde</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Player List */}
      <View style={styles.playersContainer}>
        <Text style={styles.playersTitle}>Jucători online:</Text>
        <View style={styles.playersList}>
          <View style={styles.teamColumn}>
            <Text style={[styles.teamColumnTitle, { color: '#FF5252' }]}>Echipa Roșie</Text>
            <Text style={styles.playerItem}>• Maria (profesor)</Text>
            <Text style={styles.playerItem}>• Ion</Text>
            <Text style={styles.playerItem}>• Ana</Text>
          </View>
          <View style={styles.teamColumn}>
            <Text style={[styles.teamColumnTitle, { color: '#2196F3' }]}>Echipa Albastră</Text>
            <Text style={styles.playerItem}>• {studentName} (TU)</Text>
            <Text style={styles.playerItem}>• Alex</Text>
            <Text style={styles.playerItem}>• Mihai</Text>
          </View>
        </View>
      </View>
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
    padding: 15,
    paddingTop: 40,
    alignItems: 'center',
  },
  sessionCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  gameArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: 200,
  },
  teamAContainer: {
    alignItems: 'center',
    width: 100,
  },
  teamBContainer: {
    alignItems: 'center',
    width: 100,
  },
  teamText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  teamFlag: {
    width: 60,
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  ropeContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#8B4513',
    borderRadius: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  rope: {
    height: 10,
    backgroundColor: '#8B4513',
    width: '100%',
    borderRadius: 5,
  },
  ropeHandle: {
    position: 'absolute',
    width: 100,
    height: 40,
    borderRadius: 20,
    top: -15,
  },
  questionContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  answerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playersContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  playersList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamColumn: {
    flex: 1,
  },
  teamColumnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
