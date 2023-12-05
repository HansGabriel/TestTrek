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
});
