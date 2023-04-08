import React from "react";
import { render, screen } from "@testing-library/react";
import ArmTable from "../ArmTable";
import AppProvider from "../../shared/AppProvider";

describe("ArmTable", () => {
   const sampleArm = {
      loading: false,
      arms: [
         { class: "JSS 1", arm: "A", section: "Junior Secondary ", key: "1" },
         { class: "JSS 2", arm: "B", section: "Junior Secondary", key: "2" },
      ],
   };

   test("renders table component and column titles", () => {
      render(
         <AppProvider>
            <ArmTable arm={sampleArm} />
         </AppProvider>
      );

      expect(screen.getByText("Arms")).toBeInTheDocument();
      expect(screen.getByText("Class")).toBeInTheDocument();
      expect(screen.getByText("Section")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
   });

   test("displays arms data properly", () => {
      render(
         <AppProvider>
            <ArmTable arm={sampleArm} />
         </AppProvider>
      );

      expect(screen.getByText("JSS 1 A")).toBeInTheDocument();
      expect(screen.getByText("JSS 2 B")).toBeInTheDocument();
   });

   test("renders edit and delete buttons", () => {
      render(
         <AppProvider>
            <ArmTable arm={sampleArm} />
         </AppProvider>
      );

      expect(screen.getAllByText("Edit").length).toBe(2);
      expect(screen.getAllByText("Delete").length).toBe(2);
   });

   test("handles loading state", () => {
      const loadingArm = { ...sampleArm, loading: true };
      let { container } = render(
         <AppProvider>
            <ArmTable arm={loadingArm} />
         </AppProvider>
      );
      let loaderItem = container.getElementsByClassName("ant-spin-dot-item");
      expect(loaderItem.length).toBe(4);
   });
});
