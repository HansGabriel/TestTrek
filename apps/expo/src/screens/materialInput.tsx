import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppTextInput from "../components/TextInput";

export const MaterialInput = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Text Input</Text>
      </View>
      <AppTextInput />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#4a90e2",
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
});
