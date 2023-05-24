import React from "react";
import {
   render,
   fireEvent,
   waitFor,
   screen,
   cleanup,
} from "@testing-library/react";
import RegisterClass from "../RegisterClass";
import { Form } from "antd";

const mockCreateClass = jest.fn(() => Promise.resolve({ data: {} }));
const mockSections = [{ _id: "1", section: "Section 1" }];
const mockClassesObject = { loading: false };

const WrapperRegisterClass = Form.create()(RegisterClass);

let globalRerender = null;

describe("RegistrationClass", () => {
   beforeEach(() => {
      let { rerender } = render(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );
      globalRerender = rerender;
   });

   afterEach(cleanup);
   afterEach(() => {
      jest.clearAllMocks();
   });

   it("renders without crashing", () => {
      render(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );
   });

   it("has the correct initial state", () => {
      globalRerender(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );
      fireEvent.click(screen.getByText("Select Section"));
      expect(screen.getByLabelText("Class Name")).toHaveValue("");
   });

   it("submits with valid data", async () => {
      globalRerender(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );
      fireEvent.click(screen.getByText("Select Section"));
      fireEvent.click(screen.getByText("Section 1"));
      fireEvent.change(screen.getByLabelText("Class Name"), {
         target: { value: "Class A" },
      });
      fireEvent.submit(screen.getByRole("submit"));

      screen.debug();
      expect(mockCreateClass).toHaveBeenCalledWith({
         section: "1",
         className: "Class A",
      });
   });

   it("does not submit with invalid data", async () => {
      const { getByText } = render(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );

      fireEvent.click(getByText("Submit"));

      await waitFor(() => {
         expect(mockCreateClass).not.toHaveBeenCalled();
      });
   });

   it("disables the submit button while submitting", async () => {
      const { getByLabelText, getByText, getByRole } = render(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );

      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section 1"));
      fireEvent.change(getByLabelText("Class Name"), {
         target: { value: "Class A" },
      });
      fireEvent.click(getByRole("submit"));

      expect(getByRole("submit")).toBeDisabled();

      await waitFor(() => {});

      expect(getByRole("submit")).not.toBeDisabled();
   });

   it("displays loading icon while submitting", async () => {
      const mockCreateClass = jest.fn(() => new Promise(() => {}));
      const mockSections = [{ _id: "1", section: "Section 1" }];

      const { getByLabelText, getByText, getByRole } = render(
         <WrapperRegisterClass
            classes={mockClassesObject}
            createClass={mockCreateClass}
            sections={mockSections}
         />
      );

      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section 1"));
      fireEvent.change(getByLabelText("Class Name"), {
         target: { value: "Class A" },
      });

      fireEvent.click(getByText("Submit"));

      const submitButton = getByRole("button", { name: /Submit/i });

      expect(submitButton).toBeDisabled();
   });

   it("handles errors correctly when form submission fails", async () => {
      const mockCreateClass = jest.fn(() =>
         Promise.reject(new Error("Submission failed"))
      );
      const { getByLabelText, getByText, queryByText } = render(
         <RegistrationClass
            form={{ validateFields: jest.fn() }}
            classes={{ createClass: mockCreateClass, loading: false }}
            sections={[{ _id: 1, section: "Section 1" }]}
         />
      );

      // Fill out the form and submit it
      fireEvent.change(getByLabelText("Class Name"), {
         target: { value: "Class 1" },
      });
      fireEvent.click(getByText("Submit"));
      await waitForElement(() => getByText("Submit"));

      // Check that the error message is displayed
      expect(getByText("Error creating class")).toBeInTheDocument();

      // Check that the form can be submitted again after an error
      createClassMock.mockImplementation(() => Promise.resolve());
      fireEvent.click(getByText("Submit"));
      await waitForElement(() => getByText("Submit"));
      expect(queryByText("Error creating class")).toBeNull();
   });

   it("handles successful form submissions correctly", async () => {
      // Define a mock function for the createClass prop
      const mockCreateClass = jest.fn(() => Promise.resolve());

      // Render the component
      const { getByLabelText, getByText } = render(
         <RegistrationClass
            sections={[{ _id: 1, section: "A" }]}
            createClass={mockCreateClass}
         />
      );

      // Fill in the form inputs
      fireEvent.change(getByLabelText("Section"), {
         target: { value: "1" },
      });
      fireEvent.change(getByLabelText("Class Name"), {
         target: { value: "Maths" },
      });

      // Submit the form
      fireEvent.click(getByText("Submit"));

      // Wait for the createClass mock function to be called and resolved
      await waitFor(() => expect(mockCreateClass).toHaveBeenCalledTimes(1));

      // Assert that the mock function was called with the correct data
      expect(mockCreateClass).toHaveBeenCalledWith({
         section: "1",
         className: "Maths",
         school: "My School", // Assuming this is a default value for the school prop
      });
   });
});
