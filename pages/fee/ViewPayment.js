import React, { useEffect } from "react";
import { Card } from "antd";
import { PrivateRoute } from "../../components/PrivateRoute";
import StudentTable from "../../components/Student/StudentTable";
import { getAllStudents } from "../../redux/actions/student";
import { connect } from "react-redux";
import FeeTable from "../../components/Fee/FeeTable";

const ViewPaymentPage = ({ student }) => {
   useEffect(() => {
      getAllStudents();
      return () => {
         // Anything in here is fired on component unmount.
         getAllStudents();
      };
   }, []);
   return (
      <Card
         title="View Payments"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            <FeeTable student={student} />
         </div>
      </Card>
   );
};

const mapStateToProps = (state) => ({
   student: state.student,
});

const mapDispatchToProps = {
   getAllStudents: getAllStudents,
};
export default PrivateRoute(
   connect(mapStateToProps, mapDispatchToProps)(ViewPaymentPage)
);
