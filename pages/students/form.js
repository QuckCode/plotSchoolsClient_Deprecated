import React from 'react'
import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import {
  Printer,
  Download,
} from 'react-feather';
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

const data=`
<html lang="en"><head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="author" content="">
		
		<title>Brilliant Impact International Academy - Staff Profile</title>
		
		<link rel="shortcut icon" href="https://www.integratedschoolrecords.com/logo.ico">

		<!-- Bootstrap core CSS-->
		
		<link href="https://www.integratedschoolrecords.com/legacy/css_custom/cssall_reports.css" rel="stylesheet">
		<link href="https://www.integratedschoolrecords.com/bootstrap-4.3.1-dist/css/bootstrap_reports.css" rel="stylesheet">
		<!-- Custom fonts for this template-->
		<link href="https://www.integratedschoolrecords.com/fontawesome-free-5.10.1-web/css/all.css" rel="stylesheet" type="text/css">
		<!-- Page level plugin CSS-->
		<link href="https://www.integratedschoolrecords.com/startbootstrap-sb-admin-gh-pages/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
		
	</head>	
	
	<body data-new-gr-c-s-check-loaded="14.981.0">
			
		<div class="container-fluid">
					
				
	<div class="container-fluid">

	<div class="row">

		<div class="col-sm-6">
			<img class="img-fluid" src="https://www.integratedschoolrecords.com/storage/images/school_configuration/schoollogo/biiagauraka/mastlogo.gif" alt="School Logo" id="schoolimglogo" border="0px">
		</div>
		
		<div class="col-sm-6">
			<div class="d-flex align-items-end flex-column">
				<div><i class="fas fa-phone-square-alt"></i> &nbsp; 08060769034</div>
				<div><i class="fas fa-envelope"></i> &nbsp;brilliantimpactschool@gmail.com</div>
				<div><i class="fas fa-location-arrow"></i> &nbsp;Angwan Tomato, Gauraka, Tafa L.G.A, Niger State</div>
			</div>
		</div>
	
	</div>
	
</div>
	<br>

	<table border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<td>
			
				<span class="fieldtitle_bold_18_505050">
					
					<br>
					
					Staff Profile
					
					<br>
					<br>
					
				</span>
			</td>
		</tr>
	</tbody></table>

	<br>

	<table border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
		  <td align="left">
			<label class="col-form-label">Staff No:</label>&nbsp;____________________________________________________
			<br>
			<br>										  
			<label class="col-form-label">First Name:</label>&nbsp;____________________________________________________
			&nbsp;&nbsp;&nbsp;
			<label class="col-form-label">Middle Name:</label><em> (optional)</em>&nbsp;____________________________________________________
			<br>
			<br>										  
			<label class="col-form-label">Surname:</label>&nbsp;_________________________________________________________________________________________________________________________________________										  
			<br>
			<br>										  
			<label class="col-form-label">Birth Date:</label><em> (M/D/Y)</em>&nbsp;____________________________________________________
			&nbsp;&nbsp;&nbsp;
			<label class="col-form-label">Sex:</label>&nbsp;&nbsp;Male&nbsp;&nbsp;<i class="fas fa-square"></i>&nbsp;&nbsp;Female&nbsp;&nbsp;<i class="fas fa-square"></i>
			<br>
			<br>										  
			<label class="col-form-label">Employment Date:</label>
			<em> (M/D/Y)</em>&nbsp;____________________________________________________										  
			<br>
			<br>										  
			<label class="col-form-label">Designation:</label>&nbsp;_________________________________________________________
			&nbsp;&nbsp;&nbsp;
			<label class="col-form-label">Department:</label>&nbsp;_________________________________________________________										  
			<br>
			<br>										  
			<label class="col-form-label">Block:</label>&nbsp;______________________________________
			&nbsp;&nbsp;&nbsp;
			<label class="col-form-label">Floor:</label>&nbsp;______________________________________										  
			&nbsp;&nbsp;&nbsp;
			<label class="col-form-label">Room No:</label>&nbsp;______________________________________										  
			<br>
			<br>										  
			<label class="col-form-label">Mobile Phone No:</label>&nbsp;______________________________________________
			&nbsp;&nbsp;&nbsp;
			<label class="col-form-label">Office Phone No:</label><em> (optional)</em>&nbsp;______________________________________________										  
			<br>
			<br>										  
			<label class="col-form-label">Email Address:</label>&nbsp;___________________________________________________________________
		  </td>
		</tr>
	  </tbody></table>
				  
				
							
		</div>	
		
		<!-- Bootstrap core JavaScript-->			
		<script src="https://www.integratedschoolrecords.com/jquery/jquery-3.4.1.js"></script>
		<script src="https://www.integratedschoolrecords.com/bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js"></script>

	
	
</body></html>
`
const Title = Typography.Title

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const StaffFormPage = (props) =>{

    function printPDF () {
//    let x =  document.getElementById('form')
//     html2canvas(x)
//     .then( async (canvas) => {
//         const img =  await canvas.toDataURL('image/png')
//         const pdf = new jsPdf()
//             await  pdf.addImage(img, 'JPEG', 0, 0,100,100)
//         //  await   pdf.save('your-filename.pdf')
// }) 
  }

  return (

        <Card 
        title="Print Staff Form"
        bodyStyle={{ padding: '1rem' }}
        extra={
          <div>
             <Button onClick={()=>printPDF()}>
             <Download/> 
           </Button>
           <Button>
             <Printer/> 
           </Button>
          </div>
        }
        className="mb-4"> 
          
       </Card>
  )
};


export default StaffFormPage;
