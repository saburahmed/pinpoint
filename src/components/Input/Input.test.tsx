/* eslint-disable testing-library/prefer-screen-queries */
// Important Events
// 1. Should render the input placeholder correctly.
// 2. Should change value onChange.

import Input, { IInputProps } from "./index";
import { fireEvent, render, cleanup, getByText } from "@testing-library/react";

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

  it("should be able to type name input field", () => {
    const { getByTestId } = makeSut({
      value: "Sabur Ahmed",
    });

    fireEvent.change(getByTestId("input"));

    expect(getByTestId("input").value).toBe("Sabur Ahmed");
  });
});
