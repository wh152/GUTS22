// demo of JSON.stringify() and JSON.parse()
// Salem Bhatti, Octiber 2018

let p1 = { "saleem": 42};

let people = {p1};

let g1 = { "asterix": 1};
let g2 = { "obelix": 2};
let g3 = { "getafix": 3};
let g4 = { "vitalstatistix": 4};

let gauls = {g1, g2, g3, g4};

let r1 = { "brutus": 1};
let r2 = { "cantankerus": 2};
let r3 = { "overanxious": 3};
let r4 = { "fishfingus": 4};

let romans = {r1, r2, r3, r4};

let all = {people, gauls, romans};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

let e = JSON.stringify(all);

console.log("encode - JSON.stringify(): ->\n" + e);

let d = JSON.parse(e);

console.log("\ndecode - JSON.parse(): ->");
console.log(d);

console.log("\nd[\"people\"] ->");
console.log(d["people"]);

console.log("\nd[\"gauls\"] ->");
console.log(d["gauls"]);

console.log("\nd[\"gauls\"][\"g2\"] ->");
console.log(d["gauls"]["g2"]);

console.log("\nd[\"romans\"] ->");
console.log(d["romans"]);

console.log("\nd[\"romans\"][\"r3\"] ->");
console.log(d["romans"]["r3"]);
