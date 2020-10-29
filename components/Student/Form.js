
import React from 'react';
import {Document,View, Image, Text, Font, StyleSheet, Page, pdf} from '@react-pdf/renderer'
import ReactPDF from '@react-pdf/renderer';
import {Phone}  from "react-feather"

 const StudentForm = () => (
<Document>
<Page   style={styles.body}>
  <View style= {styles.header}>
    <Image
    style={styles.image}
    source="https://react-pdf.org/images/document-graphic.png"
   />
   <View style={styles.description}>
      <Text>  Just A test </Text>
      <Text>  Just A test </Text>
      <Text>  Just A test </Text>
    </View>
  </View>
    <View style= {styles.body}>
      <View style={styles.field}>
           <Text style= {styles.fieldName}> Admission date </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> First Name</Text>
           <View style={styles.line}></View>
      </View>
      
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Middle Name </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Surname Name </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Date of Birth </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> State </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Local Goverment </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Arm </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Address </Text>
           <View style={styles.line}></View>
      </View>
       <View style={styles.field}>
           <Text style= {styles.fieldName}> Parent Number </Text>
           <View style={styles.line}></View>
      </View>

  </View>
   <Text style={styles.bottomText}> Generated using quantum cube generate pdf for plat school {'\uFFC8'} </Text>
   <Text style={styles.bottomText}> www.plotSchools.com </Text>
  
   <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
    `${pageNumber} / ${totalPages}`
  )} fixed />
</Page>
</Document>
);

Font.register({
family: 'Oswald',
src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
header:{
  display:"flex",
  flexDirection:'row',
  width:'100%'
},
field:{
  display:"flex",
  flexDirection:'row',
  width:'100%',
  padding:'10',
  marginTop:'15'
},
line:{
  width:'80%',
  borderWidth:'1',
  height:'0',
  marginTop:'20'
},
fieldName:{
  width:'20%',
  fontFamily: 'Oswald'
},
image:{
  width:'60%',
  height:'80'
}, 
description :{
  display:"flex",
  width:'40%',
  height:'80',
},
body:{
  marginTop:'20'
},
bottomText:{
  textAlign:'center',
  fontSize:"13",
  marginTop:'12',
  fontFamily: 'Oswald'
},
can:{
 width:""
},
pageNumber: {
  position: 'absolute',
  fontSize: 12,
  bottom: 30,
  left: 0,
  right: 0,
  textAlign: 'center',
  color: 'grey',
},
});


 export const saveStudentFile = ()=>{
  const blob = pdf(StudentForm).toBlob().then(
    (m)=>{
      console.log("ss")
    }
  )
  .catch(err=>{
    console.log("ss")
  })

}
