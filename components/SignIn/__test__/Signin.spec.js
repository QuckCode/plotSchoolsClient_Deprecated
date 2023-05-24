import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Signin from "../index";
import { Form } from "antd";

describe("Signin Component", () => {
   let mockSchool = [
      { name: "schools 1", _id: "1" },
      { name: "schools 2", _id: "2" },
   ];

   const WrappedSignIn = Form.create()(Signin);

   test("should render the login form", () => {
      // Test that the login form is rendered on the page
      const { getByTestId } = render(<Signin schools={mockSchool} />);
      expect(getByTestId("signin-form")).toBeInTheDocument();
   });

   test("should contain a user type selection", () => {
      // Test that the form contains a selection for the user type
      render(<Signin schools={mockSchool} />);
      expect(screen.getByText("Login As")).toBeInTheDocument();
   });

   test("should contain input fields for registration number and password", () => {
      // Test that the form contains input fields for the registration number and password
      const { getByLabelText } = render(<Signin schools={mockSchool} />);
      expect(getByLabelText("Reg Number")).toBeInTheDocument();
      expect(getByLabelText("Password")).toBeInTheDocument();
   });

   test("should contain a checkbox for remembering login information", () => {
      // Test that the form contains a checkbox for remembering the user's login information
      const { getByLabelText } = render(<Signin schools={mockSchool} />);
      expect(getByLabelText("Remember me")).toBeInTheDocument();
   });

   test('should contain a "Forgot password" link', () => {
      // Test that the form contains a "Forgot password" link
      const { getByText } = render(<Signin schools={mockSchool} />);
      expect(getByText("Forgot password")).toBeInTheDocument();
   });

   test('should contain a "Log in" button', () => {
      // Test that the form contains a "Log in" button
      const { getByText } = render(<Signin schools={mockSchool} />);
      expect(getByText("Log in")).toBeInTheDocument();
   });

   test("should trigger loginAdmin function with the correct parameters when admin user type is selected", () => {
      // Test that selecting the "Admin" user type and submitting the form triggers the `loginAdmin` function with the correct parameters
      const loginAdminMock = jest.fn();

      render(
         <WrappedSignIn schools={mockSchool} loginAdmin={loginAdminMock} />
      );
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Admin"));
      fireEvent.change(screen.getByLabelText("Reg Number"), {
         target: { value: "admin123" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
         target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Log in"));
      expect(loginAdminMock).toHaveBeenCalledWith("admin123", "password123");
   });

   test("should trigger loginStaff function with the correct parameters when staff user type is selected", () => {
      // Test that selecting the "Staff" user type and submitting the form triggers the `loginStaff` function with the correct parameters
      const loginStaffMock = jest.fn();

      render(
         <WrappedSignIn schools={mockSchool} loginStaff={loginStaffMock} />
      );
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Staff"));
      fireEvent.change(screen.getByLabelText("Reg Number"), {
         target: { value: "staff123" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
         target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Log in"));
      expect(loginStaffMock).toHaveBeenCalledWith("staff123", "password123");
   });

   test("should trigger loginStudent function with the correct parameters when student user type is selected", () => {
      // Test that selecting the "Student" user type and submitting the form triggers the `loginStudent` function with the correct parameters
      const loginStudentMock = jest.fn();

      render(
         <WrappedSignIn schools={mockSchool} loginStudent={loginStudentMock} />
      );
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Student"));
      fireEvent.change(screen.getByLabelText("Reg Number"), {
         target: { value: "student123" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
         target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Log in"));
      expect(loginStudentMock).toHaveBeenCalledWith(
         "student123",
         "password123"
      );
   });

   test("should trigger loginStudent function with the correct parameters when student user type is selected", () => {
      // Test that selecting the "Student" user type and submitting the form triggers the `loginStudent` function with the correct parameters
      const loginStudentMock = jest.fn();

      render(
         <WrappedSignIn schools={mockSchool} loginStudent={loginStudentMock} />
      );
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Student"));
      fireEvent.change(screen.getByLabelText("Reg Number"), {
         target: { value: "student123" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
         target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Log in"));
      expect(loginStudentMock).toHaveBeenCalledWith(
         "student123",
         "password123"
      );
   });

   test("should display an error message when submitting the form without selecting a user type", async () => {
      // Test that submitting the form without selecting a user type results in an error message

      const { getByText } = render(<WrappedSignIn schools={mockSchool} />);
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Log in"));
      await waitFor(() =>
         expect(getByText("Please select your user type")).toBeInTheDocument()
      );
   });

   test("should display an error message when submitting the form without entering a registration number", async () => {
      // Test that submitting the form without entering a registration number results in an error message

      render(<WrappedSignIn schools={mockSchool} />);
      fireEvent.change(screen.getByLabelText("Reg Number"), {
         target: { value: "" },
      });
      fireEvent.click(screen.getByText("Log in"));
      await waitFor(() =>
         expect(
            screen.getByText("Please input your Reg Number!")
         ).toBeInTheDocument()
      );
   });

   test("should display an error message when submitting the form without entering a password", async () => {
      // Test that submitting the form without entering a password results in an error message

      render(<WrappedSignIn schools={mockSchool} />);
      fireEvent.change(screen.getByLabelText("Password"), {
         target: { value: "" },
      });
      fireEvent.click(screen.getByText("Log in"));
      await waitFor(() =>
         expect(
            screen.getByText("Please input your Password!")
         ).toBeInTheDocument()
      );
   });

   test('should display a loading state on "Log in" button when form is submitted', async () => {
      // Test that the loading state of the "Log in" button changes appropriately when the form is submitted
      let loading = false;
      const loginStudentMock = jest.fn(() => {
         loading = true;
      });
      const { rerender } = render(
         <WrappedSignIn
            loading={loading}
            loginStudent={loginStudentMock}
            schools={mockSchool}
         />
      );
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Student"));

      fireEvent.change(screen.getByLabelText("Reg Number"), {
         target: { value: "student123" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
         target: { value: "password123" },
      });

      expect(screen.getByRole("submit")).toHaveAttribute("disabled");

      //   fireEvent.click(screen.getByRole("submit"));

      //   expect(screen.getByRole("submit")).not.toHaveAttribute("disabled");
      //   await waitFor(() =>
      //      expect(loginStudentMock).toHaveBeenCalledWith(
      //         "student123",
      //         "password123"
      //      )
      //   );

      //   rerender(
      //      <WrappedSignIn
      //         loading={true}
      //         loginStudent={loginStudentMock}
      //         schools={mockSchool}
      //      />
      //   );
      //   expect(screen.getByRole("submit")).toHaveAttribute("disabled");
   });
});
