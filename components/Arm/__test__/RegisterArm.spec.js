import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Form } from "antd";
import RegistrationArm from "../RegisterArm";
import userEvent from "@testing-library/user-event";
import { school } from "../../../redux/varables";

const WrappedRegistrationArm = Form.create()(RegistrationArm);

const formMock = {
   getFieldDecorator: jest.fn((name, options) => (Component) => Component),
   validateFields: jest.fn((callback) => {
      callback(null, { classes: "1", arm: "A" });
   }),
};

const classes = [
   { _id: "1", name: "Class 1" },
   { _id: "2", name: "Class 2" },
];

describe("RegistrationArm component", () => {
   test("Component renders correctly", () => {
      render(
         <WrappedRegistrationArm
            classes={{ classes: [] }}
            arm={{ loading: false }}
         />
      );

      expect(screen.getByText("Class")).toBeInTheDocument();
      expect(screen.getByText("Arm")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
   });

   test("Dropdown populates with class options", () => {
      render(
         <WrappedRegistrationArm
            classes={{ classes }}
            arm={{ loading: false }}
         />
      );
      fireEvent.click(screen.getByText("Select Your Class"));
      classes.forEach((classItem) => {
         expect(screen.getByText(classItem.name)).toBeInTheDocument();
      });
   });

   test("Form submission with valid data", async () => {
      const createArm = jest.fn();
      render(
         <RegistrationArm
            form={formMock}
            classes={{ classes }}
            arm={{ loading: false }}
            createArm={createArm}
         />
      );

      userEvent.click(screen.getByText("Submit"));

      await waitFor(() => expect(createArm).toHaveBeenCalledTimes(1));

      expect(createArm).toHaveBeenCalledWith({
         classes: "1",
         arm: "A",
         school: school,
      });
   });

   test("Form submission with invalid data", async () => {
      render(
         <WrappedRegistrationArm
            classes={{ classes: [] }}
            arm={{ loading: false }}
         />
      );

      userEvent.click(screen.getByText("Submit"));

      expect(
         await screen.findByText("Please select your class")
      ).toBeInTheDocument();
      expect(await screen.findByText("Please input Arm")).toBeInTheDocument();
   });

   test("Form submission with loading state", () => {
      render(
         <WrappedRegistrationArm
            classes={{ classes: [] }}
            arm={{ loading: true }}
         />
      );

      expect(screen.getByRole("submit")).toBeDisabled();
      expect(screen.getByRole("submit")).toHaveTextContent("Submit");
   });
});
