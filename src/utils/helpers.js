
export function idGenerator() {
    console.log("idgenerator");
    const uniqueNum = Math.random().toString(32) + Math.random().toString(32);
    return uniqueNum;
}