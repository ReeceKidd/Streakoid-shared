import { getCountdownTime } from './getCountdownTime';

describe('getCountdownTime', () => {
    test('returns correct time till end of day for timezone', () => {
        expect.assertions(2);
        const { hoursDifference, minutesDifference } = getCountdownTime('Europe/London');
        expect(hoursDifference).toBeGreaterThan(0);
        expect(minutesDifference).toBeGreaterThanOrEqual(0);
    });
});
