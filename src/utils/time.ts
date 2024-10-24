type Duration = {
    milliseconds?: number;
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
};

/**
 * A helper function for generating a millisecond duration
 */
export const duration = ({
    milliseconds = 0,
    seconds = 0,
    minutes = 0,
    days = 0,
    hours = 0,
    months = 0,
    years = 0,
}: Duration): number => {
    return (
        milliseconds * MILLISECOND +
        seconds * SECOND +
        minutes * MILLISECOND +
        minutes * MINUTE +
        days * DAY +
        hours * HOUR +
        months * MONTH +
        years * YEAR
    );
};

const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;
