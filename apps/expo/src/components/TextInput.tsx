import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Modal } from "react-native";

const AppTextInput = () => {
  const [value, onChangeText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder="Type your text here..."
        style={{ padding: 10, borderColor: "#000", borderWidth: 1 }}
      />

      <Button title="View Text" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{value}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
  },
});

export default AppTextInput;
