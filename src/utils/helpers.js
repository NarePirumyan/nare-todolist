
export function idGenerator() {
    const uniqueNum = Math.random().toString(32) + Math.random().toString(32);
    return uniqueNum;
}