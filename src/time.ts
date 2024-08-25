type Duration = {
    milliseconds?: number;
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
};

export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;

export const duration = ({
    milliseconds = 0,
    seconds = 0,
    minutes = 0,
    days = 0,
    hours = 0,
    months = 0,
    years = 0,
}: Duration) => {
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
