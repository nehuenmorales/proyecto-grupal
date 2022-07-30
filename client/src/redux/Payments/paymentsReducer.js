import { POST_PAYMENT, RESET_URL_PAYMENT } from "./paymentsAction";


const initialState = {
    urlPayment: ''
};


const paymentsReducer = (state = initialState, action) => {

    switch (action.type) {
        case POST_PAYMENT:
            return {...state, urlPayment: action.payload};

        case RESET_URL_PAYMENT:
            return {...state, urlPayment: ''}

        default:
            return state

    }
}


export default paymentsReducer;