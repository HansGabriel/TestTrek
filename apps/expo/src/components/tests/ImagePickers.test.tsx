import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

import TestImagePicker from "../ImagePicker";

describe("TestImagePicker Component", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  it("renders the passed image when provided", () => {
    const testImage = "http://test-image.com";
    const { getByTestId } = render(<TestImagePicker image={testImage} />);
    const renderedImage = getByTestId("test-image-picker-image");
    expect(renderedImage.props.source.uri).toBe(testImage);
  });

  it("renders the placeholder when no image is provided", () => {
    const { getByText, getByTestId } = render(<TestImagePicker />);
    expect(getByText("Add Cover Image")).toBeTruthy();
  });

  it("navigates to the correct screen when pressed", () => {
    const { getByTestId } = render(<TestImagePicker />);
    const touchable = getByTestId("test-image-picker-touchable");
    fireEvent.press(touchable);
    expect(mockNavigate).toHaveBeenCalledWith("AddCoverImage", {
      query: "Sample Images",
      type: "test",
    });
  });
});
