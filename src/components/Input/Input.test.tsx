/* eslint-disable testing-library/prefer-screen-queries */
// Important Events
// 1. Should render the input placeholder correctly.
// 2. Should change value onChange.

import Input, { IInputProps } from "./index";
import { fireEvent, render, cleanup } from "@testing-library/react";

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

describe("<Input />", () => {
  afterEach(cleanup);

  test("Should render placeholder correctly", () => {
    const { getByPlaceholderText } = makeSut({
      placeholder: "Test placeholder here",
    });

    expect(getByPlaceholderText(/Test placeholder here/)).toBeInTheDocument();
  });

  test("should be able to type into input field", () => {
    const { getByTestId } = makeSut({
      value: "2.8",
    });

    const element = getByTestId("input") as HTMLInputElement;

    fireEvent.change(element);

    expect(element.value).toBe("2.8");
  });
});
