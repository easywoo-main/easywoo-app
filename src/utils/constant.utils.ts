export enum TimeUnit {
    SECONDS = 'seconds',
    MINUTES = 'minutes',
    HOURS = 'hours',
    DAYS = 'days',
}

export const TIME_IN_SECOND: { [key in TimeUnit]: number } = {
    [TimeUnit.SECONDS]: 1,
    [TimeUnit.MINUTES]: 60,
    [TimeUnit.HOURS]: 3600,
    [TimeUnit.DAYS]: 86400,
};

export const MATH_OPERATORS = ['+', '-', '*', '/', '^', '(', ')'];
