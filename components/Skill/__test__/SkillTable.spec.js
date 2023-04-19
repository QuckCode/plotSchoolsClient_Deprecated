import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SkillTable from "../SkillTable";

const mockSkills = [
   {
      _id: "1",
      name: "Skill 1",
   },
   {
      _id: "2",
      name: "Skill 2",
   },
];

const mockAppState = [
   {
      mobile: false,
   },
];

jest.mock("../../../components/shared/AppProvider", () => ({
   useAppState: jest.fn(() => mockAppState),
}));

describe("SkillTable", () => {
   it("renders the table component with the correct columns", () => {
      const { getByText } = render(
         <SkillTable skill={{ skills: mockSkills }} />
      );
      expect(getByText("Skill")).toBeInTheDocument();
      expect(getByText("Action")).toBeInTheDocument();
   });

   it("renders the table component with the correct data source", () => {
      const { getByText } = render(
         <SkillTable skill={{ skills: mockSkills }} />
      );
      expect(getByText("Skill 1")).toBeInTheDocument();
      expect(getByText("Skill 2")).toBeInTheDocument();
   });

   it("renders the table component with the correct pagination settings", () => {
      const { getByText } = render(
         <SkillTable skill={{ skills: mockSkills }} />
      );
      expect(getByText("1")).toBeInTheDocument();
   });

   it("renders the table component with the correct size settings", () => {
      const { getByTestId } = render(
         <SkillTable skill={{ skills: mockSkills }} />
      );
      expect(getByTestId("table")).toHaveClass("ant-table-default");
   });

   it("renders the table component with the correct scroll settings", () => {
      const { getByTestId } = render(
         <SkillTable skill={{ skills: mockSkills }} />
      );
      expect(getByTestId("table")).toHaveAttribute("scroll", "x:300");
   });

   it("displays a loading indicator while the table data is being fetched", () => {
      const { getByTestId } = render(<SkillTable skill={{ loading: true }} />);
      expect(getByTestId("table")).toHaveClass("ant-table-spin");
   });

   it('displays an "Edit" button for each item in the table', () => {
      const { getAllByText } = render(
         <SkillTable skill={{ skills: mockSkills }} />
      );
      expect(getAllByText("Edit")).toHaveLength(2);
   });

   it('calls the correct function with the correct parameters when an "Edit" button is clicked', async () => {
      const mockEditFunction = jest.fn();
      const { getAllByText } = render(
         <SkillTable
            skill={{ skills: mockSkills }}
            editSkill={mockEditFunction}
         />
      );
      const editButtons = getAllByText("Edit");
      fireEvent.click(editButtons[0]);
      await waitFor(() =>
         expect(mockEditFunction).toHaveBeenCalledWith(mockSkills[0])
      );
   });
});
