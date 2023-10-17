import CounterButton from "./CounterButton";
import { render, fireEvent } from "@testing-library/react-native";

test("CounterButton increments the count when pressed", () => {
  const { getByText } = render(<CounterButton />);
  const countText = getByText(/Count: 0/);
  const incrementButton = getByText(/Increment/);

  fireEvent.press(incrementButton);

  const updatedCountText = getByText(/Count: 1/);
  expect(updatedCountText).toBeTruthy();
});
