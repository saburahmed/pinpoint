// Important Events
// 1. Should render the input placeholder correctly.
// 2. Value must be empty at first.
// 2. Should change value onChange.

import Input, { IInputProps } from "./index";
import { fireEvent, render } from "@testing-library/react";

const value = "This is input testing";

//Used the SUT — System Under Test below to centralise my actor, it's cleaner and easier to make changes on tests, also it allows me to focus on the behavior I'm working on.
const makeSut = (props: Partial<IInputProps>) => {
  return render(
    <Input
      placeholder="placeholder"
      value="value"
      onChange={jest.fn()}
      {...props}
    />
  );
};

describe("<Button />", () => {
  test("Should render placeholder correctly", () => {
    const { getByRole } = makeSut({ placeholder: "Test placeholder here" });

    expect(getByRole("input")).toBeInTheDocument();
  });

  test("Should call onChange successfully", () => {
    const spy = jest.fn();

    const { getByText } = makeSut({ value: spy });

    fireEvent.change(getByText(value));
    // fireEvent.change(<Input />, { target: { value: "matti" } });

    expect(spy).toHaveBeenCalled();
  });
});
