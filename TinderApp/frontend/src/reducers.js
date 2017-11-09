import resource, {COMPUTE} from './actions'

export const Reducer = (state =  {
	nextId: 2,
	success: "",
	location: "Landing.js",
  mostPopularColor: "",
  averageLength: 0,
  mostPopularManufacturer: "",
	visibilityFilter: 'SHOW_ALL'
}, action) => {
	switch(action.type) {
		case 'goToLandingToDo':
			return { ...state, nextId: state.nextId + 1, location: "Landing.js"
			}
    case COMPUTE:
    {
        return { ...state, nextId: state.nextId + 1, location: "Metrics.js",
           mostPopularColor: action.payload[0]['attribute'],
           mostPopularManufacturer: action.payload[1]['attribute'],
           averageLength: action.payload[2]['averageLength'],
           ebayAveragePrice: action.payload[3]['ebayAveragePrice'],
           amazonAveragePrice: action.payload[3]['amazonAveragePrice']
       }
     }
		default:
			return {
				...state,
				nextId: state.nextId + 1,
				...action.payload,
			}
	}

}

export default Reducer
