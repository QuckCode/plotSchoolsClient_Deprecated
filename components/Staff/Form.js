
import React from 'react';
import {View, Image, Text, Font, StyleSheet,  } from '@react-pdf/renderer'
import Document from 'react-pdf/dist/umd/Document'
import Page from 'react-pdf/dist/umd/Page'
import ReactPDF from '@react-pdf/renderer';
import {Phone}  from "react-feather"

const StaffForm = () => (
    <Document>
    <Page  style={styles.body}>
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
               <Text style= {styles.fieldName}> First Name </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Middle Name </Text>
               <View style={styles.line}></View>
          </View>
          
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Srn Name </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Date of Birth </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Email </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Gender </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Employment date </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Designation </Text>
               <View style={styles.line}></View>
          </View>
           <View style={styles.field}>
               <Text style= {styles.fieldName}> Department </Text>
               <View style={styles.line}></View>
          </View>
      </View>
       <Text style={styles.bottomText}> Generated using quantum cube generate pdf for plat school {'\uFFC8'} </Text>
       <Text style={styles.bottomText}> www.plotSchools.com </Text>
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
    marginTop:'20'
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
      height:'100'
  }, 
  description :{
    display:"flex",
    width:'40%',
    height:'100',
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
  }
});

 
ReactPDF.render(<StaffForm />, `${__dirname}/example.pdf`);