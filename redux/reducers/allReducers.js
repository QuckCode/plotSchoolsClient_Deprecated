import {combineReducers} from 'redux';
import { armReducer } from './armReducer';
import { authReducer } from './authReducer';
import { classesReducer } from './classesReducer';
import {departmentReducer} from './departmentReducer'
import { designationReducer } from './designationReducer';
import {schoolReducer} from './schoolsReducer'
import { sectionReducer } from './sectionReducer';
import { staffReducer } from './staffReducer';
import {studentReducer} from './studentReducer'
import { subjectsReducer } from './subjectReducer';
import { testReducer } from './testReducer';
import {behaviourReducer} from './behaviourReducer'
import { skillReducer } from './skillReducer';
import { smsReducer } from './smsReducer';
import { scratchCardReducer } from './scratchCardReducer';

export const allReducers = combineReducers({
  departments:departmentReducer,
  schools:schoolReducer,
  section:sectionReducer,
  classes:classesReducer,
  arm:armReducer,
  student:studentReducer,
  staff:staffReducer,
  subject:subjectsReducer,
  auth:authReducer,
  designation:designationReducer,
  test:testReducer,
  behavior:behaviourReducer,
  skill:skillReducer,
  sms:smsReducer,
  scratchCard:scratchCardReducer
});
