import React from "react";
import { render } from "@testing-library/react-native";
import CollectionsCard from "../CollectionsCard";

describe("CollectionsCard Component", () => {
  it("renders the user image and title correctly", () => {
    const mockImage = { uri: "https://example.com/mock-image.jpg" }; // Mock image URI
    const mockTitle = "Test Title";

    const { getByText, getByTestId } = render(
      <CollectionsCard userImage={mockImage} title={mockTitle} />,
    );

    const titleElement = getByText(mockTitle);
    expect(titleElement).toBeTruthy();

    const imageElement = getByTestId("userImageBackground");
    expect(imageElement.props.source).toEqual(mockImage);
  });
});
