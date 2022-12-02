function getAllTotals(text: string) : number[] {
    const lines = text.trim().split("\n")
    .map(s => s.trim());

    let currentTotal = 0;
    const allTotals: number[] = [];
    
    lines.forEach(line => {
        if (line.length === 0) {
            allTotals.push(currentTotal);
            currentTotal = 0;
        } else {
            const parsedVal = parseInt(line);
            if (isNaN(parsedVal)) {
                throw `${line} is not a number!`
            }
            currentTotal += parseInt(line);
        }
    });
    allTotals.push(currentTotal);
    
    return allTotals;
}


export { 
    getAllTotals
};