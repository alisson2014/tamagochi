export const getAttributeColor = (range: number) => {
    if(range >= 60) return '#2C7429';
    else if(range >= 30) return '#F08000';
    else return '#CA0B00';
};