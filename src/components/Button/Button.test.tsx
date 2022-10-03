// Important Events
// 1. Should render the button title correctly.
// 2. Should call the onPress successfully.

import Button, { IButtonProps } from "./index";
import { fireEvent, render, cleanup } from "@testing-library/react";

//Used the SUT — System Under Test below to centralise my actor,
// it's cleaner and easier to make changes on tests,
// also it allows me to focus on the behavior I'm working on.
const makeSut = (props: Partial<IButtonProps>) => {
  return render(<Button title="title" onPress={jest.fn()} {...props} />);
};

describe("<Button />", () => {
  afterEach(cleanup);

  test("Should render title correctly", () => {
    const { getByText } = makeSut({ title: "Test Button" });

    expect(getByText(/Test Button/)).toBeInTheDocument();
  });

  test("Should call onPress successfully", () => {
    const spy = jest.fn();

    const { getByRole } = makeSut({ onPress: spy });

    fireEvent.click(getByRole("button"));

    expect(spy).toHaveBeenCalled();
  });
});
