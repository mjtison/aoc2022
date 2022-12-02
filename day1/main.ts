import { getAllTotals } from "./getAllTotals.ts";

const text = await Deno.readTextFile("./data.txt");
const allTotals = getAllTotals(text);
const maxTotal = allTotals.reduce((a, b) => Math.max(a, b));
const top3 = allTotals.sort((a, b) => b - a).slice(0, 3);
const top3Total = top3.reduce((a, b) => a + b);

console.log(`output: ${maxTotal}`);
console.log(`top 3: ${top3.join(",")}`);
console.log(`part 2: ${top3Total}`)

export { 
    
};
