export const getMillisecondsTillEndOfDay = ({ endOfDay, currentTime }: { endOfDay: Date; currentTime: Date }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const result = endOfDay - currentTime;
    console.log('RESULT', result);
    return result;
};
