import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ViewAllUserCard from "../ViewAllUserCard";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("ViewAllUserCard Component", () => {
  const defaultProps = {
    userId: "1234",
    userImage: { uri: "https://test.com/user-image.jpg" },
    name: "Test Name",
    userName: "@testuser",
  };

  it("renders user details correctly", () => {
    const { getByText } = render(<ViewAllUserCard {...defaultProps} />);

    expect(getByText("Test Name")).toBeTruthy();
    expect(getByText("@testuser")).toBeTruthy();
  });

  it('navigates to OthersProfile screen with correct userId on "View" button press', () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    const { getByText } = render(<ViewAllUserCard {...defaultProps} />);

    fireEvent.press(getByText("View"));
    expect(mockNavigate).toHaveBeenCalledWith("OthersProfile", {
      userId: "1234",
    });
  });
});
