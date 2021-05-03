import ChecklistDate from '../../helpers/checklistDate';
import { 
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILED,
  TOGGLE_ITEM,
  START_LOADING,
  END_LOADING,
  CATCH_ERROR,
  // SET_TIME_DIAPAZONE,
  SET_DATE,
  SET_NEXT_DATE,
  SET_PREV_DATE,
} from './constants';

const date = new ChecklistDate();
date.setStartMonday();

export const INIT_STATE = {
  data: [],
  loading: false,
  error: null,
  date: date,
  // start_date: new Date(new Date().toJSON().split("T")[0]),
  // end_date: new Date(new Date(new Date().toJSON().split("T")[0]).getTime()+86400000*7),
  // mode: "WEEK"
};

const checklistReducer = (state=INIT_STATE, action)=>{
  switch (action.type) {
    case FETCH_DATA:
      return {...state, loading: true};
    case FETCH_DATA_SUCCESS:
    case TOGGLE_ITEM:
      return {...state, loading: false, data: action.payload, error: null};
    case FETCH_DATA_FAILED:
      return {...state, loading: false, data: [], error: action.payload};

    case SET_DATE:
      return {
        ...state, 
        date: new ChecklistDate(
          action.payload.start_date || state.date.start_date,
          action.payload.mode || state.date.mode
        )
      };
    case SET_NEXT_DATE:
      return (()=>{
        const date = new ChecklistDate(state.date.start_date, state.date.mode);
        date.toNext();
        return { ...state, date }
      })();
    case SET_PREV_DATE:
      return (()=>{
        const date = new ChecklistDate(state.date.start_date, state.date.mode);
        date.toPrev();
        return { ...state, date }
      })();
      
    case START_LOADING: return {...state, loading: true};
    case END_LOADING: return {...state, loading: false};
    case CATCH_ERROR: return {...state, error: action.payload};
    
    default: return state;
  }
};

export default checklistReducer;