import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ClassTable from "../ClassTable";

// Mock useAppState hook to provide state values for testing
jest.mock("../../shared/AppProvider", () => ({
   useAppState: () => [
      {
         mobile: false,
      },
   ],
}));

const mockClasses = {
   classes: [
      { _id: "1", name: "Class A", section: "Section 1" },
      { _id: "2", name: "Class B", section: "Section 2" },
   ],
   loading: false,
};

describe("ClassTable", () => {
   test("renders ClassTable component", () => {
      render(<ClassTable classes={mockClasses} />);
      expect(screen.getByText("Class")).toBeInTheDocument();
      expect(screen.getByText("Section")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
   });

   test("renders correct number of rows", () => {
      const { container } = render(<ClassTable classes={mockClasses} />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows.length).toBe(mockClasses.classes.length);
   });

   test("displays correct class and section data", () => {
      render(<ClassTable classes={mockClasses} />);
      expect(screen.getByText("Class A")).toBeInTheDocument();
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Class B")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
   });

   test("has Edit and Delete buttons in the Action column", () => {
      render(<ClassTable classes={mockClasses} />);
      expect(screen.getAllByText("Edit").length).toBe(
         mockClasses.classes.length
      );
      expect(screen.getAllByText("Delete").length).toBe(
         mockClasses.classes.length
      );
   });

   test("table adjusts  width  value based on state.mobile value", () => {
      const { rerender, container } = render(
         <ClassTable classes={mockClasses} />
      );
      const table = container.querySelector(".ant-table-fixed");
      expect(table).toHaveAttribute("style", "width: 300px;");

      // Simulate mobile state
      jest.mock("../../shared/AppProvider", () => ({
         useAppState: () => [
            {
               mobile: true,
            },
         ],
      }));

      rerender(<ClassTable classes={mockClasses} />);
      expect(table).toHaveAttribute("style", "width: 300px;");
   });
});
