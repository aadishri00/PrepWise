const generateArray = (size, min, max) => {
    const arr = [];

    for (let i = 0; i < size; i++) {
        const number =
            Math.floor(Math.random() * (max - min + 1)) + min;

        arr.push(number);
    }

    return arr;
};


const generateLargestElementTestCases = (count) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {

      
        const size =
            Math.floor(Math.random() * 1000) + 1;

        const arr = generateArray(
            size,
            -100000,
            100000
        );

        const expectedOutput = Math.max(...arr);

        const input =
            `${size}\n${arr.join(" ")}`;

        testCases.push({
            input: input,
            expectedOutput: String(expectedOutput)
        });
    }

    return testCases;
};


module.exports = {
    generateLargestElementTestCases
};