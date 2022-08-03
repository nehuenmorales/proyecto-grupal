import React from 'react'

const useValidateForm = () => {

    const validateText = text => {
        const expresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
        if (text.match(expresion) === null) return true;
        else return false;
    }
    
    const validateIntNumber = number => {
        const expresion = /[A-Z/a-z/,*-+._&=]/gi;
        if (number.match(expresion)) return false;
        else return true;
    }

    return {
        validateText,
        validateIntNumber,
    }

}

export default useValidateForm;

