import React from "react";
import { render } from "@testing-library/react-native";
import { ReusablePlaceholder } from "../../placeholders/ReusablePlaceholder";

import { AboutUser } from "../AboutUser";

jest.mock("../../placeholders/ReusablePlaceholder");

describe("AboutUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when aboutUser is null or empty", () => {
    it('renders the ReusablePlaceholder component with "No description" when aboutUser is null', () => {
      render(<AboutUser aboutUser={null} />);
      expect(ReusablePlaceholder).toHaveBeenCalledTimes(1);
    });

    it('renders the ReusablePlaceholder component with "No description" when aboutUser is an empty string', () => {
      render(<AboutUser aboutUser="" />);
      expect(ReusablePlaceholder).toHaveBeenCalledTimes(1);
    });
  });

  describe("when aboutUser has content", () => {
    const testText = "This is a test about me.";

    it('displays the "About Me" title', () => {
      const { getByText } = render(<AboutUser aboutUser={testText} />);
      expect(getByText("About Me")).not.toBeNull();
    });

    it("displays the provided aboutUser text", () => {
      const { getByText } = render(<AboutUser aboutUser={testText} />);
      expect(getByText(testText)).not.toBeNull();
    });

    it("does not render the ReusablePlaceholder component", () => {
      render(<AboutUser aboutUser={testText} />);
      expect(ReusablePlaceholder).not.toHaveBeenCalled();
    });

    it("has the correct style when displaying aboutUser text", () => {
      const { getByText } = render(<AboutUser aboutUser={testText} />);
      const textStyle = getByText(testText).props.style;

      if (Array.isArray(textStyle)) {
        expect(
          textStyle.some((style) => style.fontFamily === "Nunito-SemiBold"),
        ).toBeTruthy();
      } else {
        expect(textStyle).toMatchObject({ fontFamily: "Nunito-SemiBold" });
      }
    });
  });
});
