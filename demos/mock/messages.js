import { Avatar } from 'antd';
import subDays from 'date-fns/sub_days';
import subHours from 'date-fns/sub_hours';
import subMinutes from 'date-fns/sub_minutes';
import { User } from 'react-feather';
import { randomColor } from '../../lib/helpers';


const now = Date.now();

const mockData = 
[
  {
      "linkId": "9b354379-0d2d-4da7-b307-3b3361326e21",
      "text": "nnnnnnn",
      "to": "20425",
      "id": 523112,
      "date": "2021-01-05T18:23:12.101Z",
      "from": "+234903474740"
  },
  {
      "linkId": "ccd86a15-85ee-4813-964e-596803d0bc22",
      "text": "jdeehfehfhefhefehdeheeefeedcdscdcdcdcdc",
      "to": "20425",
      "id": 52315222,
      "date": "2021-01-05T19:25:31.308Z",
      "from": "+2348024968233"
  },
  {
    "linkId": "9b354379-0d2d-4da7-b307-3b3361326e2e",
    "text": "nnnnnnn",
    "to": "20425",
    "id": 52314222,
    "date": "2021-01-05T18:23:12.101Z",
    "from": "+23490347474"
},
{
    "linkId": "ccd86a15-85ee-4813-964e-596803d0bc24",
    "text": "jdeehfehfhefhefehdeheeefeedcdscdcdcdcdc",
    "to": "20425",
    "id": 52315222,
    "date": "2021-01-05T19:25:31.308Z",
    "from": "+2348024968233"
},
{
  "linkId": "9b354379-0d2d-4da7-b307-3b3361326eve",
  "text": "nnnnnnn",
  "to": "20425",
  "id": 52314102,
  "date": "2021-01-05T18:23:12.101Z",
  "from": "+23490347474"
},
{
  "linkId": "ccd86a15-85ee-4813-964e-596803d0bcj2",
  "text": "jdeehfehfhefhefehdeheeefeedcdscdcdcdcdc",
  "to": "20425",
  "id": 52315,
  "date": "2021-01-05T19:25:31.308Z",
  "from": "+2348024968233"
},
{
  "linkId": "ccd86a15-85ee-4813-964e-596803d0bcj2",
  "text": "jdeehfehfhefhefehdeheeefeedcdscdcdcdcdc",
  "to": "20425",
  "id": 52315,
  "date": "2021-01-05T19:25:31.308Z",
  "from": "+2348024968233"
},
{
  "linkId": "ccd86a15-85ee-4813-964e-596803d0bcj2",
  "text": "jdeehfehfhefhefehdeheeefeedcdscdcdcdcdc",
  "to": "20425",
  "id": 52315,
  "date": "2021-01-05T19:25:31.308Z",
  "from": "+2348024968233"
},
{
  "linkId": "ccd86a15-85ee-4813-964e-596803d0bcj2",
  "text": "jdeehfehfhefhefehdeheeefeedcdscdcdcdcdc",
  "to": "20425",
  "id": 52315,
  "date": "2021-01-05T19:25:31.308Z",
  "from": "+2348024968233"
}
]

let colorArray = []
let mockMessages = mockData.length !==0 ?   mockData.map(({from , date, id , text}, i)=>{ 
   if(colorArray.find(x=>x.from===from) ){
     let color = (colorArray.find(x=>x.from===from))
     return  {id , from,date, body:text, avatar:(<Avatar size="large" style={{ color:color.color, backgroundColor:color.backgroundColor }}  > <User/> </Avatar> ) 
   }}
   else {
    let color= randomColor()
    let backgroundColor = randomColor()
    colorArray.push({from,color, backgroundColor})
    return  {id , from,date, body:text, avatar:(<Avatar size="large" style={{ color, backgroundColor }}  > <User/> </Avatar> )}
   }
 
}) : []


export default mockMessages;
