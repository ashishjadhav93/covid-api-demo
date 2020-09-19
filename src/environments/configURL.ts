import { environment } from './environment'

export const URLS = {
      
  manageInfo: {    
   // getInfo: environment.baseURL + '/extension/getdomainverification',
    getInfo:'http://api.covid19india.org/raw_data7.json',
   // add: environment.baseURL + '/extension/adddomainverification'
  },
  manageCountryInfo:{
      getCntryInfo:'https://api.covid19api.com/summary'
  },
  manageCountryLogInfo:{
    getCntryLogInfo:'https://api.covid19india.org/updatelog/log.json'
  },
  manageCalendarViceData:{
    getCalendarViceData:'https://api.covid19india.org/v4/min/'
  },

  countryTotalCount:{
    getTotalCntryInfo:'https://api.covid19api.com/world/total'
  },
  stateInfo:{
    getStateNameInfo:'https://api.covid19india.org/v4/min/data.min.json'
  },
  stateName:{
    getStateName:'https://gist.githubusercontent.com/shubhamjain/35ed77154f577295707a/raw/7bc2a915cff003fb1f8ff49c6890576eee4f2f10/IndianStates.json'
  }
}