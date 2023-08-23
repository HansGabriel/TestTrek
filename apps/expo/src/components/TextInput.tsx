import React, { useState, useMemo } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import type { FC } from "react";

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[
      styles.checkboxBase,
      value ? styles.checkboxChecked : styles.checkboxUnchecked,
    ]}
    onPress={() => onValueChange(!value)}
  />
);

const ControlButton = ({ label, onChange, value }) => (
  <View style={styles.control}>
    <CustomCheckBox value={value} onValueChange={onChange} />
    <Text>{label}</Text>
  </View>
);

const FontSizeButton = ({ label, onChange }) => (
  <Button title={label} onPress={onChange} />
);

const AppTextInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isBulleted, setIsBulleted] = useState(false);
  const [textSize, setTextSize] = useState(14);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const handleShowText = () => {
    setDisplayedText(inputValue);
    setShowText(!showText);
  };

  /* const increaseFontSize = () => setTextSize((prev) => prev + 2);
  const decreaseFontSize = () => setTextSize((prev) => prev - 2); */

  const inputStyles = useMemo(() => {
    const computedStyles = [styles.input, { fontSize: textSize }];
    if (isBold) computedStyles.push(styles.bold);
    if (isItalic) computedStyles.push(styles.italic);
    if (isUnderlined) computedStyles.push(styles.underline);
    if (isBulleted) computedStyles.push(styles.bullet);
    return computedStyles;
  }, [isBold, isItalic, isUnderlined, isBulleted, textSize]);

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <ControlButton label="Bold" onChange={setIsBold} value={isBold} />
        <ControlButton label="Italic" onChange={setIsItalic} value={isItalic} />
        <ControlButton
          label="Underline"
          onChange={setIsUnderlined}
          value={isUnderlined}
        />
        <ControlButton
          label="Bullet"
          onChange={setIsBulleted}
          value={isBulleted}
        />
        {/* <FontSizeButton
          label="Increase Font Size"
          onChange={increaseFontSize}
        />
        <FontSizeButton
          label="Decrease Font Size"
          onChange={decreaseFontSize}
        /> */}
      </View>
      <TextInput
        style={inputStyles}
        multiline
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Show Text" onPress={handleShowText} />
      {showText && <Text style={styles.displayedText}>{displayedText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  underline: {
    textDecorationLine: "underline",
  },
  bullet: {
    paddingLeft: 10,
    textIndent: -10,
  },
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",
    marginRight: 5,
  },
  checkboxChecked: {
    backgroundColor: "blue",
  },
  checkboxUnchecked: {
    backgroundColor: "transparent",
  },
  displayedText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AppTextInput;
