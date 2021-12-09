const getGasoline = () => {
    return true;
};

const drive = () => {
    const gasoline = getGasoline();

    if (!gasoline) {
        throw new Error("没了");
    }

    console.log('ssss');
};

try {
    drive();
} catch (error) {
    console.log(error.message);
}