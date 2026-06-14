export const carReducer = (state,action)=>{
    switch (action.type){
        case "ADD_CAR":
            return[...state,action.payload];

            case "DELETE_CAR":
                return [...state.filter(car=>car.id !== action.payload)];

                case "UPDATE_CAR":
                    return state.map(car=>car.id === action.payload.id ? {...car,...action.payload}:car)

                default:
                    return state;
    }
};