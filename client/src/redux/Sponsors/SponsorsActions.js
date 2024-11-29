import axios from "axios";

export const CREATE_SPONSOR = "CREATE_SPONSOR";
export const GET_ALL_SPONSORS = "GET_ALL_SPONSORS"
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const CREATE_PRODUCT = "CREATE_PRODUCT"

export const createSponsor =(body)=>{
    return async function (dispatch){
        return axios.post("https://falta-uno-1.herokuapp.com/sponsor/create",body)
        .then((res)=> {
            return dispatch({type:CREATE_SPONSOR,payload:res.data})})    
    }   
}
export const createProduct =(body)=>{
    return async function (dispatch){
        return axios.post("https://falta-uno-1.herokuapp.com/sponsor/createProduct",body)
        .then((res)=> {
            return dispatch({type:CREATE_PRODUCT,payload:res.data})})    
    }   
}


 
 export function getAllSponsors() {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/sponsor/all`)
        .then(res => {
          dispatch({
            type: GET_ALL_SPONSORS,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }
 
  export function getAllProducts() {
    return dispatch =>{
      axios.get(`https://falta-uno-1.herokuapp.com/sponsor/products`)
        .then(res => {
          dispatch({
            type: GET_ALL_PRODUCTS,
            payload: res.data
          })
        })
        .catch (e=>
          console.log(e)
        ) 
    }
  }