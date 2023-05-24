import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BehaviourScoreForm from "../BehaviourScoreForm";
import { Form } from "antd";

const sections = [
   { _id: "section1", section: "Section 1" },
   { _id: "section2", section: "Section 2" },
];

const classes = [
   { _id: "class1", name: "Class 1", sectionId: "section1" },
   { _id: "class2", name: "Class 2", sectionId: "section1" },
   { _id: "class3", name: "Class 3", sectionId: "section2" },
];

const arms = [
   { id: "arm1", arm: "Arm 1", classID: "class1" },
   { id: "arm2", arm: "Arm 2", classID: "class1" },
   { id: "arm3", arm: "Arm 3", classID: "class2" },
   { id: "arm4", arm: "Arm 4", classID: "class3" },
];

const getScore = jest.fn();
const WrappedRegisterBehaviourType = Form.create()(BehaviourScoreForm);

describe("BehaviourScoreForm", () => {
   beforeEach(() => {
      render(
         <WrappedRegisterBehaviourType
            sections={sections}
            classes={classes}
            arms={arms}
            getScore={getScore}
         />
      );
   });

   test("form component is rendered", () => {
      expect(screen.getByTestId("behaviour-score-form")).toBeInTheDocument();
   });

   test("labels 'Section', 'Class', and 'Arm' are displayed", () => {
      expect(screen.getByText("Section")).toBeInTheDocument();
      expect(screen.getByText("Class")).toBeInTheDocument();
      expect(screen.getByText("Arm")).toBeInTheDocument();
   });

   test("button 'Load Student & Subject' is displayed", () => {
      expect(screen.getByText("Load Student & Subject")).toBeInTheDocument();
   });

   test("dropdowns populate with options", async () => {
      fireEvent.click(screen.getByText("Select a section"));
      sections.forEach((section) => {
         expect(screen.getByText(section.section)).toBeInTheDocument();
      });
   });

   test("dropdown selection triggers filtering", async () => {
      fireEvent.click(screen.getByLabelText("Section"));
      fireEvent.click(screen.getByText(sections[0].section));

      fireEvent.click(screen.getByLabelText("Class"));

      await waitFor(() => {
         expect(screen.getByText("Class 1")).toBeInTheDocument();
         expect(screen.getByText("Class 2")).toBeInTheDocument();
         expect(screen.queryByText("Class 3")).not.toBeInTheDocument();
      });
   });

   test("form submission with valid data", async () => {
      fireEvent.click(screen.getByLabelText("Section"));
      fireEvent.click(screen.getByText(sections[0].section));

      fireEvent.click(screen.getByLabelText("Class"));
      fireEvent.click(screen.getByText(classes[0].name));

      fireEvent.click(screen.getByLabelText("Arm"));
      fireEvent.click(screen.getByText(arms[0].arm));

      fireEvent.click(screen.getByText("Load Student & Subject"));

      await waitFor(() => {
         expect(getScore).toHaveBeenCalledTimes(1);
         expect(getScore).toHaveBeenCalledWith({
            sectionId: "section1",
            classId: "class1",
            armId: "arm1",
         });
      });
   });

   test("form submission with invalid data", async () => {
      fireEvent.click(screen.getByText("Load Student & Subject"));

      expect(
         await screen.findByText("Please select a section")
      ).toBeInTheDocument();
      expect(
         await screen.getByText("Please select a class")
      ).toBeInTheDocument();
      expect(await screen.getByText("Please select a arm")).toBeInTheDocument();
   });
});
