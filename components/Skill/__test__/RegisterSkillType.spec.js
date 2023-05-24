import React from "react";
import {
   render,
   fireEvent,
   waitFor,
   screen,
   cleanup,
} from "@testing-library/react";
import RegisterSkillType from "../RegisterSkillType";
import { Form } from "antd";
import { school } from "../../../redux/varables";

// Mock functions
const createSkill = jest.fn(() => Promise.resolve({}));
const createSkillFail = jest.fn(() =>
   Promise.reject({ title: "Error", message: "Error message" })
);
const loading = false;

// Wrapped component to pass the form prop
const WrappedRegistrationSkillType = Form.create()(RegisterSkillType);

let globalRerender = null;

describe("RegisterSkillType component", () => {
   beforeEach(() => {
      let { rerender } = render(
         <WrappedRegistrationSkillType
            createSkill={createSkill}
            loading={loading}
         />
      );
      globalRerender = rerender;
   });

   afterEach(cleanup);

   test("renders form, label, and submit button", () => {
      expect(screen.getByLabelText("Skill")).toBeInTheDocument();
      expect(
         screen.getByRole("button", { name: /Submit/i })
      ).toBeInTheDocument();
   });

   test("form submission with valid data", async () => {
      fireEvent.change(screen.getByLabelText("Skill"), {
         target: { value: "Coding" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

      expect(createSkill).toHaveBeenCalledWith({
         name: "Coding",
         school: school,
      });
      await waitFor(() => {
         expect(
            screen.getByText("Create new skill successfully")
         ).toBeInTheDocument();
      });
   });

   test("form submission with invalid data", async () => {
      globalRerender(
         <WrappedRegistrationSkillType
            createSkill={createSkill}
            loading={true}
         />
      );

      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

      expect(createSkill).not.toHaveBeenCalled();

      await waitFor(() => {
         expect(screen.getByText(/Please Input  Skill/i)).toBeInTheDocument();
      });
   });

   test("loading state", () => {
      globalRerender(
         <WrappedRegistrationSkillType
            createSkill={createSkill}
            loading={true}
         />
      );
      const submitButton = screen.getByRole("button", { name: /Submit/i });

      expect(submitButton).toBeDisabled();
   });

   test("error handling", async () => {
      globalRerender(
         <WrappedRegistrationSkillType createSkill={createSkillFail} />
      );
      fireEvent.change(screen.getByLabelText("Skill"), {
         target: { value: "Coding" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

      await waitFor(() => {
         expect(screen.getByText("Error")).toBeInTheDocument();
         expect(screen.getByText("Error message")).toBeInTheDocument();
      });
   });
});
