const initialState = {
    companies: [],
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVOURITES":
            return {
                ...state,
                companies: [...state.companies, action.payload],
            };
        case "REMOVE_FROM_FAVOURITES":
            return {
                ...state,
                companies: state.companies.filter((company, i) => {
                    return company !== action.payload;
                }),
            };
        default:
            return state;
    }
};

export default mainReducer;
