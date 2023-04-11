import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ClassTableSubjectGroup from "../ClassTableSubjectGroup";

// Mock useAppState hook to provide state values for testing
jest.mock("../../shared/AppProvider", () => ({
   useAppState: () => [
      {
         mobile: false,
      },
   ],
}));

const classesMock = {
   classes: [
      { _id: "1", name: "Class 1", section: "A", hasSubjectGroup: true },
      { _id: "2", name: "Class 2", section: "B", hasSubjectGroup: false },
   ],
   loading: false,
};

const setHasSubjectGroupMock = jest.fn();

describe("ClassTableSubjectGroup", () => {
   beforeEach(() => {
      render(
         <ClassTableSubjectGroup
            classes={classesMock}
            setHasSubjectGroup={setHasSubjectGroupMock}
         />
      );
   });

   test("renders without crashing", () => {
      screen.getByRole("table");
   });

   test("renders the correct columns", () => {
      expect(screen.getByText("Class")).toBeInTheDocument();
      expect(screen.getByText("Section")).toBeInTheDocument();
      expect(screen.getByText("Has Subject Groups")).toBeInTheDocument();
   });

   test("displays the correct data", () => {
      expect(screen.getByText("Class 1")).toBeInTheDocument();
      expect(screen.getByText("Class 2")).toBeInTheDocument();
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
   });

   test("sets the correct checkbox state", () => {
      expect(screen.getByTestId("checkbox-1")).toBeChecked();
      expect(screen.getByTestId("checkbox-2")).not.toBeChecked();
   });

   test("calls setHasSubjectGroup with correct arguments on checkbox click", () => {
      fireEvent.click(screen.getByTestId("checkbox-1"));
      expect(setHasSubjectGroupMock).toHaveBeenCalledWith(false, "1");

      fireEvent.click(screen.getByTestId("checkbox-2"));
      expect(setHasSubjectGroupMock).toHaveBeenCalledWith(true, "2");
   });
});
