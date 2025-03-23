let door1path = [
  [108.962928, 34.215761],
  [108.96233, 34.215757],
  [108.96233, 34.215976],
  [108.961869, 34.215927],
  [108.961864, 34.215819],
];

let door2path = [
  [108.962932, 34.216426],
  [108.962732, 34.216444],
  [108.962735, 34.216638],
  [108.962859, 34.216641],
  [108.962865, 34.216671],
];
let door3path = [
  [108.9628, 34.217255],
  [108.962684, 34.217156],
  [108.962506, 34.217162],
  [108.962503, 34.217317],
  [108.962542, 34.217317],
];


let door4path = [
  [108.961881, 34.21734],
  [108.961885, 34.217264],
  [108.961994, 34.217188],
  [108.962303, 34.217187],
  [108.962502, 34.217169],
  [108.962503, 34.217318],
  [108.962547, 34.217318],
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
/**
 * 去往餐厅的第三个电梯的路线
 * @type {*[]}
 */
let toRestaurant3path = [
  [108.962568, 34.217333],
  [108.962686, 34.217333],
  [108.962891, 34.217151],
  [108.962641, 34.216942],
  [108.962828, 34.216459],
  [108.962737, 34.216325],
  [108.962734, 34.216252],
  [108.962621, 34.216251],
];


const doorPaths = [
  {
    id: '1',
    // 进电梯门路线
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
    toRestaurantPath: toRestaurant3path,
    elevator: toRestaurant3path[0],
  },
  {
    id: '4',
    doorPath: door4path,
    doorLngLat: door4path[0],
    toRestaurantPath: toRestaurant3path,
    elevator: toRestaurant3path[0],
  },
  {
    id: '5',
    doorPath: door5path,
    doorLngLat: door5path[0],
    toRestaurantPath: toRestaurant2path,
    elevator: toRestaurant2path[0],
  },
];


