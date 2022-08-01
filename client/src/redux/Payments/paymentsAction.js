import axios from 'axios';

export const POST_PAYMENT = 'POST_PAYMENT';
export const RESET_URL_PAYMENT = 'RESET_URL_PAYMENT';

export function postPayments(id, datos) {
    console.log('soy el id', id);
    console.log('soy los datos del usuario', datos);
    return dispatch => {
      axios.post(`https://falta-uno-1.herokuapp.com/games/comprar/${id}`, datos)
      .then((res) => {
        dispatch({
            type: POST_PAYMENT,
            payload: res.data
            })
            window.location.href = res.data.global.init_point
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