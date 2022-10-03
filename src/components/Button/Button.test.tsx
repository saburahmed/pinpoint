import Button, { IButtonProps } from "./index";
import { fireEvent, render } from "@testing-library/react";

const makeSut = (props: Partial<IButtonProps>) => {
  return render(<Button title="title" onPress={jest.fn()} {...props} />);
};

describe("<Button />", () => {
  test("Should render title correctly", () => {
    const { getByText } = makeSut({ title: "Test Button" });

    expect(getByText(/Test Button/)).toBeInTheDocument();
  });

  test("Should call onPress successfully", () => {
    const spy = jest.fn();

    const { getByText } = makeSut({ onPress: spy });

    fireEvent.click(getByText(/title/));

    expect(spy).toHaveBeenCalled();
  });
});
