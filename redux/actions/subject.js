import {
   CREATE_SUBJECT_BEGIN,
   CREATE_SUBJECT_ERROR,
   CREATE_SUBJECT_SUCCESS,
   FETCH_ALL_SUBJECTS_BEGIN,
   FETCH_ALL_SUBJECTS_SUCCESS,
   FETCH_ALL_SUBJECTS_ERROR,
   FETCH_ALL_SUBJECTS_IN_CURRENT_CLASS_BEGIN,
   FETCH_ALL_SUBJECTS_IN_CURRENT_CLASS_SUCCESS,
   FETCH_ALL_SUBJECTS_IN_CURRENT_CLASS_ERROR,
   ADD_CLASS_SUBJECT_BEGIN,
   ADD_CLASS_SUBJECT_ERROR,
   ADD_CLASS_SUBJECT_SUCCESS,
   REMOVE_CLASS_SUBJECT_BEGIN,
   REMOVE_CLASS_SUBJECT_SUCCESS,
   REMOVE_CLASS_SUBJECT_ERROR,
   url,
   school,
} from "../varables";
import axios from "axios";
import { message } from "antd";

export const createSubject = (data) => {
   return (dispatch) => {
      dispatch(createSubjectBegin());
      return axios
         .post(`${url}/subject`, data)
         .then(({ data }) => {
            message.success("Created subject", 10);
            setTimeout(() => dispatch(createSubjectSuccess()), 1000);
            return Promise.resolve();
         })
         .catch(({ response }) => {
            message.error("PLease an error occurred");
            dispatch(createSubjectError(response.data));
            return Promise.resolve(response.data);
         });
   };
};

const createSubjectBegin = () => ({
   type: CREATE_SUBJECT_BEGIN,
});

const createSubjectSuccess = () => ({
   type: CREATE_SUBJECT_SUCCESS,
});

const createSubjectError = (error) => ({
   type: CREATE_SUBJECT_ERROR,
   payload: {
      error,
   },
});

export const addSubjects = (data) => {
   return (dispatch) => {
      dispatch(addSubjectsBegin());
      return axios
         .post(`${url}/class/subject/add`, data)
         .then(({ data }) => {
            dispatch(addSubjectsSuccess());
            return Promise.resolve();
         })
         .catch(({ response }) => {
            dispatch(addSubjectsError(response.data));
            return Promise.reject(response.data);
         });
   };
};

const addSubjectsBegin = () => ({
   type: ADD_CLASS_SUBJECT_BEGIN,
});

const addSubjectsSuccess = () => ({
   type: ADD_CLASS_SUBJECT_SUCCESS,
});

const addSubjectsError = (error) => ({
   type: ADD_CLASS_SUBJECT_ERROR,
   payload: {
      error,
   },
});

export const removeSubject = (data) => {
   return (dispatch) => {
      dispatch(removeSubjectBegin());
      return axios
         .post(` ${url}/class/subject/remove`, data)
         .then(() => {
            dispatch(removeSubjectSuccess());
            return Promise.resolve();
         })
         .catch((err) => {
            dispatch(removeSubjectError());
            return Promise.reject();
         });
   };
};

const removeSubjectBegin = () => ({
   type: REMOVE_CLASS_SUBJECT_BEGIN,
});

const removeSubjectSuccess = () => ({
   type: REMOVE_CLASS_SUBJECT_SUCCESS,
});

const removeSubjectError = (error) => ({
   type: REMOVE_CLASS_SUBJECT_ERROR,
   payload: {
      error,
   },
});

export const getAllSubjects = (schoolID) => {
   return (dispatch) => {
      dispatch(getAllSubjectBegin());
      return axios
         .get(`${url}/subject/${school}`)
         .then(({ data }) => {
            dispatch(getAllSubjectSuccess(data));
            return Promise.resolve();
         })
         .catch(({ response }) => {
            dispatch(getAllSubjectError(response.data));
            return Promise.reject(response.data);
         });
   };
};

export const getStaffSubjects = (staffId) => {
   return (dispatch) => {
      dispatch(getAllSubjectBegin());
      return axios
         .get(`${url}/staff/subjects/${staffId}`)
         .then(({ data }) => {
            dispatch(getAllSubjectSuccess(data));
            return Promise.resolve();
         })
         .catch(({ response }) => {
            dispatch(getAllSubjectError(response.data));
            return Promise.reject(response.data);
         });
   };
};

const getAllSubjectBegin = () => ({
   type: FETCH_ALL_SUBJECTS_BEGIN,
});

const getAllSubjectSuccess = (subjects) => ({
   type: FETCH_ALL_SUBJECTS_SUCCESS,
   payload: {
      subjects,
   },
});

const getAllSubjectError = (error) => ({
   type: FETCH_ALL_SUBJECTS_ERROR,
   payload: {
      error,
   },
});

export const getCurrentClassSubjects = (classId) => {
   return (dispatch) => {
      dispatch(getCurrentClassSubjectsBegin());
      return axios
         .get(`${url}/class/subject/${classId}`)
         .then(({ data }) => {
            dispatch(getCurrentClassSubjectsSuccess(data));
            return Promise.resolve();
         })
         .catch(({ response }) => {
            dispatch(getCurrentClassSubjectsError(response.data));
            return Promise.reject(response.data);
         });
   };
};

const getCurrentClassSubjectsBegin = () => ({
   type: FETCH_ALL_SUBJECTS_IN_CURRENT_CLASS_BEGIN,
});

const getCurrentClassSubjectsSuccess = (currentClassSubjects) => ({
   type: FETCH_ALL_SUBJECTS_IN_CURRENT_CLASS_SUCCESS,
   payload: {
      currentClassSubjects,
   },
});

const getCurrentClassSubjectsError = (error) => ({
   type: FETCH_ALL_SUBJECTS_IN_CURRENT_CLASS_ERROR,
   payload: {
      error,
   },
});
