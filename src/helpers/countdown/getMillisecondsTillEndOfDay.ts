export const getMillisecondsTillEndOfDay = ({ endOfDay, currentTime }: { endOfDay: Date; currentTime: Date }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return endOfDay - currentTime;
};
