import {
  FETCH_SCRATCH_CARDS_BEGIN,
  FETCH_SCRATCH_CARDS_ERROR,
  FETCH_SCRATCH_CARDS_SUCCESS,
  FETCH_SCRATCH_CARD_STATS
  } from '../varables'
  
  const initialState = {
    cards: [],
    loading:false,
    error:null,
    stats:{ 
      totalScratchCard: 0,
      totalUsedScratchCard: 0, 
      totalNotUsedScratchCard: 0,
    }
  };
  
  export const scratchCardReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SCRATCH_CARDS_BEGIN :
        return {
          ...state,
          loading:true
        };
      case FETCH_SCRATCH_CARDS_ERROR :
          return {
            ...state,
            loading:false,
            error:action.payload.error
         };
      case FETCH_SCRATCH_CARDS_SUCCESS :
          return {
            ...state,
            loading:false,
            cards:action.payload.cards
       };
       case   FETCH_SCRATCH_CARD_STATS :
        return {
          ...state,
          loading:false,
          stats:action.payload.stats
     };
      default:
        return {...state};
    }
  };