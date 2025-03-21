let door1path = [
  [108.962926, 34.215756],
  [108.962564, 34.21579],
  [108.962333, 34.215974],
  [108.961864, 34.215931],
  [108.96188, 34.215818],

];
let door2path = [
  [108.962932, 34.216426],
  [108.962732, 34.216444],
  [108.962735, 34.216638],
  [108.962859, 34.216641],
  [108.962865, 34.216671],
];
let door3path = [
  [108.962782, 34.217251],
  [108.962686, 34.21714],
  [108.962734, 34.216645],
  [108.962868, 34.216641],
  [108.962865, 34.21667],
];
let door4path = [
  [108.961869, 34.217335],
  [108.961877, 34.217278],
  [108.961982, 34.217189],
  [108.962684, 34.217154],
  [108.96273, 34.216643],
  [108.962864, 34.216643],
  [108.962864, 34.216668],
];
let door5path = [
  [108.961257, 34.216322],
  [108.961483, 34.216306],
  [108.961574, 34.215938],
  [108.961866, 34.215934],
  [108.961874, 34.215823],
];

/**
 * 去往餐厅的第一个电梯的路线
 * @type {*[]}
 */
let toRestaurant1path = [
  [108.962889, 34.216666],
  [108.962734, 34.216678],
  [108.96283, 34.216467],
  [108.962725, 34.216321],
  [108.962726, 34.216254],
  [108.962619, 34.216253],
];
/**
 * 去往餐厅的第二个电梯的路线
 * @type {*[]}
 */
let toRestaurant2path = [
  [108.961888, 34.215844],
  [108.96189, 34.215981],
  [108.962502, 34.215988],
  [108.962682, 34.216063],
  [108.962692, 34.21625],
  [108.962612, 34.216252],
];


const doorPaths = [
  {
    id: '1',
    // 进门路线
    doorPath: door1path,
    // 进门路线的终点
    doorLngLat: door1path[0],
    // 去往餐厅的路线
    toRestaurantPath: toRestaurant2path,
    // 路线所属的电梯
    elevator: toRestaurant2path[0],
  },
  {
    id: '2',
    doorPath: door2path,
    doorLngLat: door2path[0],
    toRestaurantPath: toRestaurant1path,
    elevator: toRestaurant1path[0],
  },
  {
    id: '3',
    doorPath: door3path,
    doorLngLat: door3path[0],
    toRestaurantPath: toRestaurant1path,
    elevator: toRestaurant1path[0],
  },
  {
    id: '4',
    doorPath: door4path,
    doorLngLat: door4path[0],
    toRestaurantPath: toRestaurant1path,
    elevator: toRestaurant1path[0],
  },
  {
    id: '5',
    doorPath: door5path,
    doorLngLat: door5path[0],
    toRestaurantPath: toRestaurant2path,
    elevator: toRestaurant2path[0],
  },
];
