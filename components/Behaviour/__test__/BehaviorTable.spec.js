import React from "react";
import { render, screen } from "@testing-library/react";
import BehaviourTable from "../BehaviorTable";
import AppProvider from "../../shared/AppProvider";

const mockBehaviors = [
   { _id: "1", name: "Behaviour 1" },
   { _id: "2", name: "Behaviour 2" },
];

describe("BehaviourTable", () => {
   test("renders component and displays correct column titles", () => {
      render(
         <AppProvider>
            <BehaviourTable
               behaviour={{ behaviors: mockBehaviors, loading: false }}
            />
         </AppProvider>
      );

      expect(screen.getByText("Behavior")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
   });

   test("displays behaviour data properly", () => {
      render(
         <AppProvider>
            <BehaviourTable
               behaviour={{ behaviors: mockBehaviors, loading: false }}
            />
         </AppProvider>
      );

      expect(screen.getByText("Behaviour 1")).toBeInTheDocument();
      expect(screen.getByText("Behaviour 2")).toBeInTheDocument();
   });

   test("renders Edit button in Action column", () => {
      render(
         <AppProvider>
            <BehaviourTable
               behaviour={{ behaviors: mockBehaviors, loading: false }}
            />
         </AppProvider>
      );

      const editButtons = screen.getAllByText("Edit");
      expect(editButtons.length).toBe(2);
   });

   test("displays loading indicator when loading is true", () => {
      let { container } = render(
         <AppProvider>
            <BehaviourTable
               behaviour={{ behaviors: mockBehaviors, loading: true }}
            />
         </AppProvider>
      );

      let loaderItem = container.getElementsByClassName("ant-spin-dot-item");
      expect(loaderItem.length).toBe(4);
   });
});
