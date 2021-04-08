import { pdf } from '@react-pdf/renderer';
import { Avatar } from 'antd';
import { User } from 'react-feather';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const weatherIcons = {
  '01d': '/static/weather/day.svg',
  '02d': '/static/weather/cloudy-day-1.svg',
  '03d': '/static/weather/cloudy-day-2.svg',
  '04d': '/static/weather/cloudy-day-3.svg',
  '09d': '/static/weather/rainy-4.svg',
  '10d': '/static/weather/rainy-1.svg',
  '11d': '/static/weather/thunder.svg',
  '13d': '/static/weather/snowy-3.svg',
  '50d': '/static/weather/cloudy-day-3.svg',
  '01n': '/static/weather/night.svg',
  '02n': '/static/weather/cloudy-night-1.svg',
  '03n': '/static/weather/cloudy-night-2.svg',
  '04n': '/static/weather/cloudy-night-3.svg',
  '09n': '/static/weather/rainy-4.svg',
  '10n': '/static/weather/rainy-5.svg',
  '11n': '/static/weather/thunder.svg',
  '13n': '/static/weather/snowy-5.svg',
  '50n': '/static/weather/cloudy-day-3.svg'
};

// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercase(string) {
  return string.toLowerCase();
}

// Format price
export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(fnumber);
}

// Get wind direction
export function windDirection(degree) {
  const sectors = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  degree += 22.5;

  if (degree < 0) {
    degree = 360 - (Math.abs(degree) % 360);
  } else {
    degree = degree % 360;
  }

  const which = parseInt(degree / 45, 10);
  return sectors[which];
}

// Get weather icon class
export function getWeatherIcon(code, size) {
  const icon = weatherIcons[code];
  return (
    <span
      css={`
        background: none, url(${icon}) no-repeat;
        background-size: contain;
        width: ${size}px;
        height: ${size}px;
        display: inline-block;
      `}
    />
  );
}

// Get weather data
export async function getWeather(city, country, days) {
  let forecast = undefined;
  try {
    const forecast_call = await fetch(
      `//api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${
        process.env.weatherApi
      }&cnt=${days}&units=metric`
    )
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .catch(console.error);

    if (forecast_call !== undefined) {
      forecast = await forecast_call.json();
    }

    return forecast;
  } catch (e) {
    return '';
  }
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');
}

export function objectToCamelCase(origObj) {
  return Object.keys(origObj).reduce(function(newObj, key) {
    let val = origObj[key];
    let newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    newObj[toCamelCase(key)] = newVal;
    return newObj;
  }, {});
}

const saveBlob = (blob, filename) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};



export const savePdf = async (document, filename) => {
  saveBlob(await pdf(document).toBlob(), filename);
};

export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${cookieKey}=`));

  if (!cookie) return undefined;
  return cookie.split("=")[1];
};

export function randomColor() {
   return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," +    Math.floor(Math.random() * 256) + ")";
  }

export const messageFormatting = (message)=>{
  let colorArray = []
  let  formattedMessages = message.length !==0 ?   message.map(({from, date, _id , message}, i)=>{ 
     if(colorArray.find(x=>x.from===from) ){
       let color = (colorArray.find(x=>x.from===from))
       return  {id:_id , from,date, body:message, avatar:(<Avatar size="large" style={{ color:color.color, backgroundColor:color.backgroundColor }}  > <User/> </Avatar> ) 
     }}
     else {
      let color= randomColor()
      let backgroundColor = randomColor()
      colorArray.push({from,color, backgroundColor})
      return  {id:_id , from,date, body:message, avatar:(<Avatar size="large" style={{ color, backgroundColor }}  > <User/> </Avatar> )}
     }
   
  }) : []
  return formattedMessages;
  
}

 export function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

 export function handleEnumScore(number) {
   switch (number) {
     case 1:
      return "Very Poor"
     case 2:
      return "Poor"
     case 3:
      return "Good"
     case 4:
      return "Very Good"
     case 5:
      return "Excellent"
     default:
       return " "
   }
 }


export const savePDF =(id)=> {
  const printArea = document.getElementById(id);
  html2canvas(printArea, {useCORS:true}).then(canvas => {
    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    img.onload = function () {
      let pdf = new jsPDF("portrait", 'mm', 'a4');
      pdf.addImage(img, 10, 0, 190, 200);
      pdf.save('formStaff.pdf');
    }
  })

}

export const printPDF =(id,x=0, y=0, width, height )=> {
const printArea = document.getElementById(id);
html2canvas(printArea, {useCORS:true}).then(canvas => {
  let img = new Image();
  img.src = canvas.toDataURL('image/png');
  img.onload = function () {
    let pdf = new jsPDF();
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    pdf.addImage(img, x, y, width, height);
    window.open(pdf.output('bloburi',{ filename: 'formStaff.pdf' }), '_blank')
  }
})
}

export const printPDFMultiple = async (className, x=0, y=0, width, height )=> {
  let pdfDoc = new jsPDF("portrait", 'mm', 'a4');
  var width = pdfDoc.internal.pageSize.getWidth();
  var height = pdfDoc.internal.pageSize.getHeight();
  const printAreas = document.getElementsByClassName(className);
   for (let index = 0; index < printAreas.length; index++) {
    let img = new Image();
     const currentResult = printAreas[index];
     img.src=  await (await html2canvas(currentResult, {useCORS:true})).toDataURL("image/png")
     pdfDoc.addImage(img, x, y, width, height);
     pdfDoc.addPage(index+1,"portrait") 
   }
   window.open(pdfDoc.output('bloburi',{ filename: 'data.pdf' }), '_blank')
}

 export const romanize = num => {
  const romans = {
    M:1000,
    CM:900,
    D:500,
    CD:400,
    C:100,
    XC:90,
    L:50,
    XL:40,
    X:10,
    IX:9,
    V:5,
    IV:4,
    I:1
  };
  
  let roman = '';
  
  for (let key in romans) {
    const times = Math.trunc(num / romans[key]);
    roman += key.repeat(times);
    num -= romans[key] * times;
  }

  return roman;
}

export const termTextToNUmbers=  text=>{
  switch (text) {
    case "First":
        return 1;
    case "Second":
      return 2;
    case "Third":
       return 3;
    default:
       return " "
  }
}

export  const scrollTop= () => (document.querySelector('.workspace > .ant-layout').scrollTop = 0)


export const dataToExcel = (data, title, label) => {
  var arrData =typeof data !== "object" ? JSON.parse(data) : data;

  var CSV = "";
  if (label) {
    var row = "";
    for (var index in arrData[0]) {
      row += index + ",";
    }
    row = row.slice(0, -1);
    CSV += row + "\r\n";
  }

  //1st loop is to extract each row
  for (var i = 0; i < arrData.length; i++) {
    var row = "";
    for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }

    row.slice(0, row.length - 1);

    CSV += row + "\r\n";
  }

  if (CSV === "") return;

  //Generate a file name
  var fileName = "School_";
  fileName +=title.replace(/ /g, "_");
  var uri = "data:text/csv;charset=utf-8," + escape(CSV);

  var link = document.createElement("a");
  link.href = uri;
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};




export const grade = num => {
  if(num>75) return "A+"
  if(num>=70) return "A"
  if(num>=60) return "B"
  if(num>=55) return "C"
  if(num>=45) return "D"
  if(num>=39) return "E"
  return "F"
}