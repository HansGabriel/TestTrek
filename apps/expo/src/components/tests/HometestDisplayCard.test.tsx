import React from "react";
import { render } from "@testing-library/react-native";

import HomeTestDisplayCard from "../HomeTestDisplayCard";

describe("HomeTestDisplayCard Component", () => {
  const testProps = {
    imageSource: { uri: "https://testimage.com/image.jpg" },
    title: "Test Title",
    questions: 5,
    date: new Date(),
    plays: 10,
    userImageSource: { uri: "https://testimage.com/user.jpg" },
    userName: "Test User",
  };

  it("displays the main image", () => {
    const { getByTestId } = render(<HomeTestDisplayCard {...testProps} />);
    const image = getByTestId("main-image");
    expect(image.props.source).toEqual(testProps.imageSource);
  });

  it("displays the questions count", () => {
    const { getByText } = render(<HomeTestDisplayCard {...testProps} />);
    expect(getByText(`${testProps.questions} Qs`)).not.toBeNull();
  });

  it("displays the title", () => {
    const { getByText } = render(<HomeTestDisplayCard {...testProps} />);
    expect(getByText(testProps.title)).not.toBeNull();
  });

  it("displays the user's image", () => {
    const { getByTestId } = render(<HomeTestDisplayCard {...testProps} />);
    const userImage = getByTestId("user-image");
    expect(userImage.props.source).toEqual(testProps.userImageSource);
  });

  it("displays the user's name", () => {
    const { getByText } = render(<HomeTestDisplayCard {...testProps} />);
    expect(getByText(testProps.userName)).not.toBeNull();
  });
});
