/* eslint-disable testing-library/prefer-screen-queries */

// Important Events
// 1. Should be able to render children
// 2. onClose should work.

import Modal, { IModal } from "./index";
import { fireEvent, render, cleanup } from "@testing-library/react";

const makeSut = (props: Partial<IModal>) => {
  return render(
    <Modal
      children={<div>test</div>}
      show={true}
      onClose={jest.fn()}
      {...props}
    />
  );
};

describe("<Input />", () => {
  afterEach(cleanup);

  test("onClose should work and children should also get displayed", () => {
    const spy = jest.fn();

    const { getByText } = makeSut({ onClose: spy });

    expect(getByText("test")).toBeTruthy();

    fireEvent.click(getByText(/close/i));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
