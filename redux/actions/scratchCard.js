
import {
  FETCH_SCRATCH_CARDS_BEGIN,
  FETCH_SCRATCH_CARDS_ERROR,
  FETCH_SCRATCH_CARDS_SUCCESS,
  FETCH_SCRATCH_CARD_STATS,
  DELETE_SCRATCH_CARD,
  GENERATE_SCRATCH_CARD,
  url, school
} from '../varables';
import axios from 'axios'

export const getScratchCard = () => {
 return dispatch => {
   dispatch( getScratchCardBegin())
   return axios.get(`${url}/ScratchCard/${school}`)
   .then(({data})=>{
         dispatch(getScratchCardSuccess((data)))
   })
   .catch((error)=>{
      dispatch(getScratchCardError(error.response))
   })
 };
};

const getScratchCardBegin= ()=>({
 type: FETCH_SCRATCH_CARDS_BEGIN
})

const  getScratchCardSuccess= (cards)=>({
 type:FETCH_SCRATCH_CARDS_SUCCESS,
 payload:{
   cards,
 }
})

const  getScratchCardError= error=>({
 type:FETCH_SCRATCH_CARDS_ERROR,
 payload:{
    error
 }
})


export const getScratchCardStatsRequest = ({schoolId}) => {
  return dispatch => {
    try {
     return  axios.get(`${url}/ScratchCard/stats/${school}`)
       .then(({data})=>{
            dispatch(getScratchCardStats(data))
       })
    } catch (error) {
      console.trace(error)
      return   dispatch(getScratchCardStats({totalScratchCard: 0,totalUsedScratchCard: 0,  totalNotUsedScratchCard: 0 }))
    }
  };
};

 const getScratchCardStats = (stats) => ({
   type:FETCH_SCRATCH_CARD_STATS,
   payload:{
    stats
   }
});


export const generateScratchCardRequest = ({amount,numberOfCard, schoolId}) => {
  return dispatch => {
       generateScratchCard()
    try {
     return  axios.post(`${url}/ScratchCard/generate`, {amount, numberOfCard, school})
       .then(({data})=>{
          return    dispatch( getScratchCard())
       })
    } catch (error) {
      return     dispatch( getScratchCard())
    }
  };
};

 const generateScratchCard = () => ({
   type:GENERATE_SCRATCH_CARD,
});