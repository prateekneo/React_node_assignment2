import { DATA_LOADED } from '../constants/action-types'
import { CHECK_SEARCH } from '../constants/action-types'
import { SORT_BY_COST } from '../constants/action-types'
import { SORT_BY_PUBLISHED_DATE } from '../constants/action-types'
import { SHOW_RECENT_SEARCHES } from '../constants/action-types'
import { APPLY_FILTER } from '../constants/action-types'
import { APPLY_COST_FILTER } from '../constants/action-types'

export function getData() {
        return function (dispatch) {
       
        return fetch("http://localhost:3005/api/data")
        .then(response => response.json())
      .then(json => {
          //console.log(json);
          
        dispatch({ type: DATA_LOADED, payload: json });
      })
    }
  }

  export function checkSearch(value){
    return function (dispatch) {
        return fetch("http://localhost:3005/api/search/" + value)
        .then(response => response.json())
      .then(json => {
          //console.log(json);
          
        dispatch({ type: CHECK_SEARCH, payload: json });
        
      })
    }
  }

  export function sortByCost(){
              
        return { type: SORT_BY_COST}
  }

  export function sortByPublishedDate(){
   
          
        return { type: SORT_BY_PUBLISHED_DATE}
  }

  export function showRecentSearches(){
    return function (dispatch) {
      return fetch("http://localhost:3005/api/show_recent_search/")
      .then(response => response.json())
    .then(json => {
        console.log(json);
        
      dispatch({ type: SHOW_RECENT_SEARCHES, payload: json });
    });
  }
} 

export function handleDateFilter(from_date, to_date){
  return {
    type : APPLY_FILTER,
    from_date : from_date,
    to_date : to_date
  }
}

export function handleCostFilter(min, max){
  return {
    type : APPLY_COST_FILTER,
    min : min,
    max : max
  }
}