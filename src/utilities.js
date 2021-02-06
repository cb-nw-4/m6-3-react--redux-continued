export const convertNumOfFollowers = (value) => {
    if (value >= 1000000) {
        value = parseInt(value / 1000000) + 'M';
    }
    else if (value >= 1000) {
        value = parseInt(value / 1000) + 'K';
    }
    return value;
}