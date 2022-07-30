import axios from 'axios';

export const POST_PAYMENT = 'POST_PAYMENT';
export const RESET_URL_PAYMENT = 'RESET_URL_PAYMENT';

export function postPayments(id, datos) {
    return dispatch => {
      axios.post(`games/comprar/${id}`, datos)
      .then((res) => {
        dispatch({
            type: POST_PAYMENT,
            payload: res.data
            })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  export function resetUrlPayment() {
    return {
        type: RESET_URL_PAYMENT,
    }
}