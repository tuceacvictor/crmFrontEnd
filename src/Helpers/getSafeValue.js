export const getSafe = (fn, defaultVal) => {
    try {
        if(!fn()){
            return defaultVal
        }
        return fn();
    } catch (e) {
        return defaultVal;
    }
};

export default getSafe;