export const validateText  = ( name ) => {
    const expresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
    if (name.match(expresion) === null) {
        console.log('texto valido')
    } else {
        console.log('texto invalido')
    }
}
