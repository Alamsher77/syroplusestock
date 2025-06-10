import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';

const ladders = { 3: 22, 5: 8, 11: 26, 20: 29 };
const snakes = { 27: 1, 21: 9, 17: 4, 19: 7 };

const Team = () => {
  const [position, setPosition] = useState(1);
  const [dice, setDice] = useState(1);

  const rollDice = () => {
    const rolled = Math.ceil(Math.random() * 6);
    setDice(rolled);
   
    let next = position + rolled;
    console.log(ladders[next])
    if (next > 100) return; // stay in place

    // Snakes and ladders
    if (snakes[next]) {
      Alert.alert('Oops!', `Bitten by a snake! Go to ${snakes[next]}`);
      next = snakes[next];
    } else if (ladders[next]) {
      Alert.alert('Yay!', `Climb the ladder to ${ladders[next]}`);
      next = ladders[next];
    }

    setPosition(next);

    if (next === 100) {
      Alert.alert('🎉 You Won!', 'You reached 100!');
      setPosition(1);
    }
  };

  const renderCell = (num) => (
    <View key={num} style={[styles.cell, position === num && styles.player]}>
      <Text>{num}</Text>
    </View>
  );

  const renderBoard = () => {
    let cells = [];
    for (let i = 100; i >= 1; i -= 10) {
      const row = Array.from({ length: 10 }, (_, j) =>
        i % 20 === 0 ? i - j : i - (9 - j)
      );
      cells.push(...row);
    }
    return cells.map(renderCell);
  };
  
  const getPositionXY = (position, blockSize) => {
  const row = Math.floor((position - 1) / 10);
  const col = (position - 1) % 10;
  const isEvenRow = row % 2 === 0;

  return {
    x: isEvenRow ? col * blockSize : (9 - col) * blockSize,
    y: (9 - row) * blockSize  // 0 at top
  };
};

const blockSize = 30;

const snake = { start: 57, end: 14 };

const startPos = getPositionXY(snake.start, blockSize);
const endPos = getPositionXY(snake.end, blockSize);

// height = vertical distance
const height = Math.abs(endPos.y - startPos.y);
console.log(`Snake visual height = ${height} px`);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Snakes & Ladders</Text>
      <View style={styles.board}>{renderBoard()}
      
       <View
  style={{
    position: 'absolute',
    left: startPos.x,
    top: startPos.y,
    height: height,
    width: 4,
    backgroundColor: 'green',
  }}
/>
      </View>
      <TouchableOpacity onPress={rollDice} style={styles.button}>
        <Text style={styles.buttonText}>Roll Dice 🎲: {dice}</Text>
      </TouchableOpacity>
      <Text style={styles.pos}>Your Position: {position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  board: { flexDirection: 'row', flexWrap: 'wrap', width: 300, alignSelf: 'center' },
  cell: {
    width: 30, height: 30, borderWidth: 1, borderColor: '#333',
    justifyContent: 'center', alignItems: 'center',
  },
  player: {
    backgroundColor: '#FFD700',
  },
  button: {
    marginTop: 20, backgroundColor: '#3498db',
    padding: 15, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18 },
  pos: { marginTop: 10, fontSize: 18, textAlign: 'center' },
});

export default Team;