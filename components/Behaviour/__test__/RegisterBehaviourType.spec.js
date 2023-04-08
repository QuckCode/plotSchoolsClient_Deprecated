import React from "react";
import {
   render,
   fireEvent,
   waitFor,
   screen,
   cleanup,
} from "@testing-library/react";
import RegisterBehaviourType from "../RegisterBehaviourType";
import { Form } from "antd";
import { school } from "../../../redux/varables";
// Mock functions
const errorMessage = "Error message";
const errorTitle = "Error title";

const createBehaviour = jest.fn(() => Promise.resolve({ data: {} }));
const createBehaviourFail = jest.fn(() =>
   Promise.reject({ title: errorTitle, message: errorMessage })
);
const loading = false;

// Wrapped component to pass the form prop

const WrappedRegisterBehaviourType = Form.create()(RegisterBehaviourType);

let globalRerender = null;

describe("RegisterBehaviourType component", () => {
   beforeEach(() => {
      let { rerender } = render(
         <WrappedRegisterBehaviourType
            createBehaviour={createBehaviour}
            loading={loading}
         />
      );
      globalRerender = rerender;
   });

   afterEach(cleanup);
   afterEach(() => {
      jest.clearAllMocks();
   });

   test("renders form, label, and submit button", () => {
      expect(screen.getByTitle("Behaviour")).toBeInTheDocument();
      expect(
         screen.getByRole("button", { name: /Submit/i })
      ).toBeInTheDocument();
   });

   test("form submission with valid data", async () => {
      fireEvent.change(screen.getByLabelText("Behaviour"), {
         target: { value: "Good Behaviour" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

      expect(createBehaviour).toHaveBeenCalledWith({
         name: "Good Behaviour",
         school: school,
      });
      expect(
         await screen.findByText("Create new successfully")
      ).toBeInTheDocument();
   });

   test("form submission with invalid data", async () => {
      fireEvent.change(screen.getByLabelText("Behaviour"), {
         target: { value: "" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

      expect(createBehaviour).not.toHaveBeenCalled();
      expect(
         await screen.findByText(/Please Input Behaviour/i)
      ).toBeInTheDocument();
   });

   test("loading state", () => {
      globalRerender(
         <WrappedRegisterBehaviourType
            createBehaviour={createBehaviour}
            loading={true}
         />
      );
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      expect(submitButton).toBeDisabled();
   });

   test("error handling", async () => {
      globalRerender(
         <WrappedRegisterBehaviourType createBehaviour={createBehaviourFail} />
      );
      fireEvent.change(screen.getByLabelText("Behaviour"), {
         target: { value: "Good Behaviour" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

      expect(await screen.findByText(errorTitle)).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
   });
});
