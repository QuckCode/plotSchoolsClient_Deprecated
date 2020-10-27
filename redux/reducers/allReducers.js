import {combineReducers} from 'redux';
import { armReducer } from './armReducer';
import { classesReducer } from './classesReducer';
import {departmentReducer} from './departmentReducer'
import {schoolReducer} from './schoolsReducer'
import { sectionReducer } from './sectionReducer';
import { staffReducer } from './staffReducer';
import {studentReducer} from './studentReducer'
import { subjectsReducer } from './subjectReducer';

export const allReducers = combineReducers({
  departments:departmentReducer,
  schools:schoolReducer,
  section:sectionReducer,
  classes:classesReducer,
  arm:armReducer,
  student:studentReducer,
  staff:staffReducer,
  subject:subjectsReducer
});
