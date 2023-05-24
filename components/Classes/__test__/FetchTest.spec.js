import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FetchTestForm from "../FetchTest";
import { Form } from "antd";

// Mock useAppState hook to provide state values for testing
jest.mock("../../shared/AppProvider", () => ({
   useAppState: () => [
      {
         mobile: false,
      },
   ],
}));

describe("FetchTestForm", () => {
   const sections = [
      { _id: "1", section: "Section 1" },
      { _id: "2", section: "Section 2" },
   ];
   const classes = [
      { _id: "1", name: "Class 1", sectionId: "1" },
      { _id: "2", name: "Class 2", sectionId: "1" },
      { _id: "3", name: "Class 3", sectionId: "2" },
      { _id: "4", name: "Class 4", sectionId: "2" },
   ];
   const onLoadTest = jest.fn();
   const onSave = jest.fn();
   const WrapperFetchTestForm = Form.create()(FetchTestForm);

   it("should render the form correctly", () => {
      const { getByText, getByRole } = render(
         <WrapperFetchTestForm
            sections={sections}
            onLoadTest={onLoadTest}
            onSave={onSave}
            classes={classes}
            disable={false}
         />
      );
      expect(getByText("Section")).toBeInTheDocument();
      expect(getByText("Class")).toBeInTheDocument();
      expect(getByRole("submit")).toBeInTheDocument();
      expect(getByText("Save Changes")).toBeInTheDocument();
   });

   it("should call onLoadSubject when the form is submitted", () => {
      const { getByText, getByRole } = render(
         <WrapperFetchTestForm
            sections={sections}
            onLoadTest={onLoadTest}
            onSave={onSave}
            classes={classes}
            disable={false}
         />
      );
      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section 1"));
      fireEvent.click(getByText("Select Class"));
      fireEvent.click(getByText("Class 1"));
      fireEvent.submit(getByRole("submit"));
      expect(onLoadTest).toHaveBeenCalledWith({ section: "1", class: "1" });
   });

   it("should filter classes based on section selection", () => {
      const { getByText, queryByText } = render(
         <WrapperFetchTestForm
            sections={sections}
            onLoadTest={onLoadTest}
            onSave={onSave}
            classes={classes}
            disable={false}
         />
      );
      fireEvent.click(getByText("Select Section"));
      fireEvent.click(getByText("Section 1"));
      fireEvent.click(getByText("Select Class"));
      expect(getByText("Class 1")).toBeInTheDocument();
      expect(getByText("Class 2")).toBeInTheDocument();
      expect(queryByText("Class 3")).not.toBeInTheDocument();
      expect(queryByText("Class 4")).not.toBeInTheDocument();
   });

   it("should disable form when disable prop is true", () => {
      const { getByLabelText, getByText, debug, queryByText, getByRole } =
         render(
            <WrapperFetchTestForm
               sections={sections}
               onLoadTest={onLoadTest}
               onSave={onSave}
               classes={classes}
               disable={true}
            />
         );
      fireEvent.click(getByText("Select Section"));
      expect(queryByText("Section 1")).not.toBeInTheDocument();
      fireEvent.click(getByText("Select Class"));
      expect(queryByText("Class 1")).not.toBeInTheDocument();
      expect(getByRole("load-tests")).toBeDisabled();
      expect(getByRole("submit")).toBeEnabled();
   });
});
