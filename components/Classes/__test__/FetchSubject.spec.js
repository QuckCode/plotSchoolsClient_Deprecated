import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import FetchSubjectForm from "../FetchSubject";
import { Form } from "antd";

describe("FetchSubjectForm", () => {
   const sections = [
      { _id: "1", section: "Section A" },
      { _id: "2", section: "Section B" },
      { _id: "3", section: "Section C" },
   ];

   const classes = [
      { _id: "1", sectionId: "1", name: "Class 1" },
      { _id: "2", sectionId: "1", name: "Class 2" },
      { _id: "3", sectionId: "2", name: "Class 3" },
      { _id: "4", sectionId: "3", name: "Class 4" },
   ];

   const onLoadSubject = jest.fn();
   const onSave = jest.fn();

   let WrappedFetchSubjectForm = Form.create()(FetchSubjectForm);

   afterEach(() => {
      cleanup();
      jest.clearAllMocks();
   });

   it("renders without errors", () => {
      render(<WrappedFetchSubjectForm sections={sections} classes={classes} />);
   });

   it("displays section options", () => {
      const { getByText, getByLabelText } = render(
         <WrappedFetchSubjectForm sections={sections} classes={classes} />
      );
      expect(getByText("Select Section")).toBeInTheDocument();
      fireEvent.click(getByText("Select Section"));
      expect(getByText("Section A")).toBeInTheDocument();
      expect(getByText("Section B")).toBeInTheDocument();
      expect(getByText("Section C")).toBeInTheDocument();
   });

   it("displays class options after section is selected", () => {
      const { getByText, queryByText } = render(
         <FetchSubjectForm sections={sections} classes={classes} />
      );
      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section A"));
      expect(getByText("Select Class")).toBeInTheDocument();
      fireEvent.click(getByText("Select Class"));
      expect(getByText("Class 1")).toBeInTheDocument();
      expect(getByText("Class 2")).toBeInTheDocument();
      expect(queryByText("Class 3")).not.toBeInTheDocument();
      expect(queryByText("Class 4")).not.toBeInTheDocument();
   });

   it("displays error message when section is not selected", () => {
      const { getByText } = render(
         <FetchSubjectForm sections={sections} classes={classes} />
      );
      fireEvent.submit(getByText("Load Subject"));
      expect(getByText("Please select a section")).toBeInTheDocument();
      expect(onLoadSubject).not.toHaveBeenCalled();
   });

   it("displays error message when class is not selected", () => {
      const { getByText, getByRole } = render(
         <FetchSubjectForm sections={sections} classes={classes} />
      );
      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section A"));
      fireEvent.submit(getByRole("submit"));
      expect(getByText("Please select a class")).toBeInTheDocument();
      expect(onLoadSubject).not.toHaveBeenCalled();
   });

   it("calls onLoadSubject when form is submitted with valid data", () => {
      const { getByText, getByRole } = render(
         <FetchSubjectForm
            sections={sections}
            classes={classes}
            onLoadSubject={onLoadSubject}
         />
      );
      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section A"));
      fireEvent.click(getByText("Select Class"));
      fireEvent.click(getByText("Class 1"));
      fireEvent.submit(getByRole("submit"));
      expect(onLoadSubject).toHaveBeenCalledTimes(1);
      expect(onLoadSubject).toHaveBeenCalledWith({ section: "1", class: "1" });
   });
   it("displays save button when form is disabled", () => {
      const { getByText } = render(
         <WrappedFetchSubjectForm
            sections={[]}
            onLoadSubject={jest.fn()}
            onSave={onSave}
            classes={[]}
            disable={true}
         />
      );
      const saveButton = getByText("Save Changes");
      expect(saveButton).toBeInTheDocument();

      fireEvent.click(saveButton);
      expect(onSave).toHaveBeenCalledTimes(1);
   });
});
