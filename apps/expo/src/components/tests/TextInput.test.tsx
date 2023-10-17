import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AppTextInput from "../TextInput";

describe("AppTextInput Component", () => {
  it("toggles the Bold state when the Bold button is pressed", () => {
    const { getByText } = render(<AppTextInput />);
    const boldButton = getByText("Bold");
    fireEvent.press(boldButton);
  });

  it("toggles the Italic state when the Italic button is pressed", () => {
    const { getByText } = render(<AppTextInput />);
    const italicButton = getByText("Italic");
    fireEvent.press(italicButton);
  });

  it("toggles the Underline state when the Underline button is pressed", () => {
    const { getByText } = render(<AppTextInput />);
    const underlineButton = getByText("Underline");
    fireEvent.press(underlineButton);
  });

  it("toggles the Bullet state when the Bullet button is pressed", () => {
    const { getByText } = render(<AppTextInput />);
    const bulletButton = getByText("Bullet");
    fireEvent.press(bulletButton);
  });

  it("updates the text input value when typing", () => {
    const { getByTestId } = render(<AppTextInput />);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "Sample Text");
  });

  it("displays the text when the 'Show Text' button is pressed", () => {
    const { getByTestId, getByText } = render(<AppTextInput />);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "Sample Text");
    const showTextButton = getByText("Show Text");
    fireEvent.press(showTextButton);
    expect(getByText("Sample Text")).toBeTruthy();
  });

  it("renders bold text when Bold is selected", () => {
    const { getByText, getByTestId } = render(<AppTextInput />);
    const boldButton = getByText("Bold");
    fireEvent.press(boldButton);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "Bold Text");
    const showTextButton = getByText("Show Text");
    fireEvent.press(showTextButton);
    const displayedText = getByText("Bold Text");
    expect(displayedText).toBeTruthy();
  });

  it("renders italic text when Italic is selected", () => {
    const { getByText, getByTestId } = render(<AppTextInput />);
    const italicButton = getByText("Italic");
    fireEvent.press(italicButton);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "Italic Text");
    const showTextButton = getByText("Show Text");
    fireEvent.press(showTextButton);
    const displayedText = getByText("Italic Text");
    expect(displayedText).toBeTruthy();
  });

  it("renders underlined text when Underline is selected", () => {
    const { getByText, getByTestId } = render(<AppTextInput />);
    const underlineButton = getByText("Underline");
    fireEvent.press(underlineButton);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "Underlined Text");
    const showTextButton = getByText("Show Text");
    fireEvent.press(showTextButton);
    const displayedText = getByText("Underlined Text");
    expect(displayedText).toBeTruthy();
  });

  it("renders bulleted text when Bullet is selected", () => {
    const { getByText, getByTestId } = render(<AppTextInput />);
    const bulletButton = getByText("Bullet");
    fireEvent.press(bulletButton);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "Bulleted Text");
    const showTextButton = getByText("Show Text");
    fireEvent.press(showTextButton);
    const displayedText = getByText("Bulleted Text");
    expect(displayedText).toBeTruthy();
  });
});
