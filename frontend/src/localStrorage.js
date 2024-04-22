export const setLocalItem =(key,object)=>{
    try {
         let value = JSON.stringify(object);
         localStorage.setItem(key,value);
    } catch (error) {
        console.log(error);
    }
}

export const getLocalItem =(key)=>{
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.log(error);
    }
}

export const removeItem =(key)=>{
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}