import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SkillScoreForm from "../SkillScoreForm";
import { Form } from "antd";

// Mock functions and data
const sections = [
   { _id: "1", section: "Section 1" },
   { _id: "2", section: "Section 2" },
   { _id: "3", section: "Section 3" },
];
const classes = [
   { _id: "1", name: "Class 1", sectionId: "1" },
   { _id: "2", name: "Class 2", sectionId: "2" },
   { _id: "3", name: "Class 3", sectionId: "3" },
];
const arms = [
   { id: "1", arm: "Arm A", classID: "1" },
   { id: "2", arm: "Arm B", classID: "2" },
   { id: "3", arm: "Arm C", classID: "3" },
];
const tests = [
   { id: "1", name: "Test 1" },
   { id: "2", name: "Test 2" },
   { id: "3", name: "Test 3" },
];
const getStudentTestScore = jest.fn(() => Promise.resolve({ data: {} }));
const errorMessage = "Error message";
const errorTitle = "Error title";

// Wrapped component to pass the form prop
const WrappedSkillScoreForm = Form.create()(SkillScoreForm);

describe("SkillScoreForm component", () => {
   beforeEach(() => {
      render(
         <WrappedSkillScoreForm
            sections={sections}
            classes={classes}
            arms={arms}
            tests={tests}
            getStudentTestScore={getStudentTestScore}
         />
      );
   });

   test("renders section dropdown with correct options and labels", () => {
      const sectionDropdown = screen.getByLabelText("Section");
      expect(sectionDropdown).toBeInTheDocument();
      expect(screen.getByText("Please select an section")).toBeInTheDocument();
      sections.forEach((section) => {
         expect(screen.getByText(section.section)).toBeInTheDocument();
      });
   });

   test("renders class dropdown with correct options and labels, based on selected section", async () => {
      const sectionDropdown = screen.getByLabelText("Section");
      fireEvent.change(sectionDropdown, { target: { value: "1" } });
      await waitFor(() => {
         const classDropdown = screen.getByLabelText("Class");
         expect(classDropdown).toBeInTheDocument();
         expect(screen.getByText("Please select an class")).toBeInTheDocument();
         classes
            .filter((c) => c.sectionId === "1")
            .forEach((c) => {
               expect(screen.getByText(c.name)).toBeInTheDocument();
            });
      });
   });

   test("renders arm dropdown with correct options and labels, based on selected class", async () => {
      const sectionDropdown = screen.getByLabelText("Section");
      const classDropdown = screen.getByLabelText("Class");
      fireEvent.change(sectionDropdown, { target: { value: "1" } });
      fireEvent.change(classDropdown, { target: { value: "1" } });
      await waitFor(() => {
         const armDropdown = screen.getByLabelText("Arm");
         expect(armDropdown).toBeInTheDocument();
         expect(screen.getByText("Please select an arm")).toBeInTheDocument();
         arms
            .filter((a) => a.classID === "1")
            .forEach((a) => {
               expect(screen.getByText(a.arm)).toBeInTheDocument();
            });
      });
   });

   test("renders section dropdown with correct options and labels", () => {
      render(
         <SkillScoreForm
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
            getStudentTestScore={() => {}}
         />
      );

      expect(screen.getByLabelText("Section")).toBeInTheDocument();
      expect(screen.getByLabelText("Section")).toHaveTextContent("Section");
      expect(screen.getByLabelText("Section")).toHaveTextContent(
         "Please select an section"
      );
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
   });

   test("renders class dropdown with correct options and labels based on selected section", () => {
      render(
         <SkillScoreForm
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
            getStudentTestScore={() => {}}
         />
      );

      const sectionDropdown = screen.getByLabelText("Section");
      fireEvent.change(sectionDropdown, { target: { value: "1" } });

      expect(screen.getByLabelText("Class")).toBeInTheDocument();
      expect(screen.getByLabelText("Class")).toHaveTextContent("Class");
      expect(screen.getByLabelText("Class")).toHaveTextContent(
         "Please select an class"
      );
      expect(screen.getByText("Class 1")).toBeInTheDocument();
      expect(screen.queryByText("Class 2")).not.toBeInTheDocument();
   });

   test("renders arm dropdown with correct options and labels based on selected class", () => {
      render(
         <SkillScoreForm
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
            getStudentTestScore={() => {}}
         />
      );
      // select a section
      fireEvent.change(screen.getByLabelText("Section"), {
         target: { value: "1" },
      });

      // select a class
      fireEvent.change(screen.getByLabelText("Class"), {
         target: { value: "1" },
      });

      // check that the arm dropdown is properly rendered with the correct options and labels
      const armDropdown = getByLabelText("Arm");
      expect(armDropdown).toBeInTheDocument();
      expect(armDropdown.tagName).toBe("SELECT");
      expect(armDropdown.children.length).toBe(2);
      expect(armDropdown.children[0].value).toBe("");
      expect(armDropdown.children[0].textContent).toBe("Please select an arm");
      expect(armDropdown.children[1].value).toBe("1");
      expect(armDropdown.children[1].textContent).toBe("Arm 1");
   });

   test("displays error message if no section is selected and form is submitted", async () => {
      const { getByText, getByRole } = render(
         <SkillScoreForm
            clientTest={() => {}}
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
            getStudentTestScore={() => {}}
         />
      );

      fireEvent.submit(getByRole("button"));

      expect(getByText("Please select a section")).toBeInTheDocument();
   });

   test("displays error message if no class is selected and form is submitted", async () => {
      const { getByText, getByRole } = render(
         <SkillScoreForm
            clientTest={() => {}}
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
            getStudentTestScore={() => {}}
         />
      );

      fireEvent.change(getByLabelText("Section"), {
         target: { value: sections[0]._id },
      });

      fireEvent.submit(getByRole("button"));

      expect(getByText("Please select a class")).toBeInTheDocument();
   });

   test("displays an error message if no arm is selected and the form is submitted", async () => {
      render(
         <SkillScoreForm
            clientTest={{}}
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
            subjects={[]}
            getStudentTestScore={getStudentTestScore}
         />
      );

      const sectionSelect = screen.getByLabelText("Section");
      fireEvent.change(sectionSelect, { target: { value: "1" } });

      const classSelect = screen.getByLabelText("Class");
      fireEvent.change(classSelect, { target: { value: "1" } });

      const loadBtn = screen.getByRole("button", {
         name: /Load Student & Subject/i,
      });
      fireEvent.click(loadBtn);

      const armSelect = screen.getByLabelText("Arm");
      expect(
         await screen.findByText("Please select a arm")
      ).toBeInTheDocument();
   });

   test("renders 'Load Student & Subject' button", () => {
      const { getByRole } = render(
         <SkillScoreForm
            sections={sections}
            classes={classes}
            arms={arms}
            tests={[]}
         />
      );
      const loadButton = getByRole("button", {
         name: /Load Student & Subject/i,
      });
      expect(loadButton).toBeInTheDocument();
   });

   test("calls getStudentTestScore with correct parameters when form is submitted", async () => {
      const { getByLabelText, getByText } = render(
         <SkillScoreForm
            sections={sections}
            classes={classes}
            arms={arms}
            getStudentTestScore={getStudentTestScore}
         />
      );

      fireEvent.change(getByLabelText("Section"), { target: { value: "1" } });
      fireEvent.change(getByLabelText("Class"), { target: { value: "1" } });
      fireEvent.change(getByLabelText("Arm"), { target: { value: "1" } });

      fireEvent.click(getByText("Load Student & Subject"));

      await waitFor(() =>
         expect(getStudentTestScore).toHaveBeenCalledWith(
            { sectionId: "1", classId: "1", armId: "1" },
            []
         )
      );
   });
});
