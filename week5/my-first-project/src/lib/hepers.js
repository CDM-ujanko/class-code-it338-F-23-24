function fun1 () {
    //
}

export function sum(a, b) {
    fun1();
    return a + b;
}

export function subtract (a, b) {
    return a - b;
}

export function alert(message) {
    console.log(message)
}

export const MY_OBJ = {
    prop: 'value',
    prop2: 'value',
    prop3: 'value',
}

// export {
//     sum,
//     subtract,
//     alert,
//     MY_OBJ
// }