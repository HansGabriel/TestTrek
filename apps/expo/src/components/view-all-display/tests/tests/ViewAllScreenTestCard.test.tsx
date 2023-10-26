import React from "react";
import { render } from "@testing-library/react-native";
import ViewAllScreenTestCard from "../ViewAllScreenTestCard";

describe("ViewAllScreenTestCard Component", () => {
  const defaultProps = {
    imageSource: { uri: "https://test.com/image.jpg" },
    title: "Test Title",
    questions: 5,
    date: new Date(),
    plays: 100,
    userImageSource: { uri: "https://test.com/user.jpg" },
    userName: "Test User",
  };

  it("renders image, title, and user details correctly", () => {
    const { getByTestId, getByText } = render(
      <ViewAllScreenTestCard {...defaultProps} />,
    );

    const image = getByTestId("mainImage");
    expect(image.props.source.uri).toBe("https://test.com/image.jpg");

    expect(getByText("Test Title")).toBeTruthy();

    const userImage = getByTestId("userimage");
    expect(userImage.props.source.uri).toBe("https://test.com/user.jpg");
    expect(getByText("Test User")).toBeTruthy();
  });

  it("renders correct number of questions", () => {
    const { getByText } = render(<ViewAllScreenTestCard {...defaultProps} />);
    expect(getByText("5 Qs")).toBeTruthy();
  });
});
