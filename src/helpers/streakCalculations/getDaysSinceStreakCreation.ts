import moment from 'moment-timezone';

export const getDaysSinceStreakCreation = ({ createdAt, timezone }: { createdAt: Date; timezone: string }) => {
    const currentTime = moment().tz(timezone);
    const createdAtDate = moment(createdAt).tz(timezone);
    const duration = moment.duration(currentTime.diff(createdAtDate));
    const daysSinceStreakCreation = Number(duration.asDays().toFixed(0));
    return daysSinceStreakCreation;
};
