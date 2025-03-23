const addLine = (options) => {

  const { AMap, map, path, highlight, type } = options;
  const polyline = new AMap.Polyline({
    path: path,
    type,
    // strokeColor: "#007FF871",
    strokeColor: highlight ? "#007FF8" : "rgba(0,127,248,0.42)",
    strokeOpacity: 1,
    strokeWeight: 8,
    showDir: true, // 显示方向箭头
    dirColor: highlight ? "rgba(255,255,255,0.84)" : "#007FF8",
  });

  map.add(polyline);

  polyline.on('click', (e) => {
    map.getAllOverlays().forEach(overlay => {
      if (['toDoor', 'toRestaurant'].includes(overlay?.De?.type)) {
        overlay.setOptions({
          strokeColor: "rgba(0,127,248,0.42)",
          dirColor: "#007FF8",
        });
      }
    });
    polyline.setOptions({
      strokeColor: "#007FF8",
      dirColor: "rgba(255,255,255,0.84)",
    });

    if (type === 'toDoor') {
      map.indoorMap.showFloor(1);
    } else if (type === 'toRestaurant') {
      map.indoorMap.showFloor(4);

    }
  });

};
const addOtherLine = (options) => {

  const { AMap, map, current, target } = options;
  const polyline = new AMap.Polyline({
    path: [current, target],
    strokeColor: "#ff2e2e",
    strokeOpacity: 1,
    strokeWeight: 6,
    strokeStyle: 'dashed',
    strokeDasharray: [10, 5],
  });

  map.add(polyline);

};


const addText = (options) => {
  const { map, coordinate, text } = options;
  const marker = new AMap.Text({
    text,
    position: coordinate,
    offset: new AMap.Pixel(-13, -30),
  });
  marker.setMap(map);
};

/**
 * 判断坐标点是否在矩形内
 * @param {Array} targetCoord - 目标坐标点 [经度, 纬度]
 * @param {Array} rectangleCoords - 矩形的四个角坐标 [经度, 纬度]
 * @returns {boolean} - true表示在矩形内，false表示不在矩形内
 */
const isCoordinateInRectangle = (targetCoord) => {
  // 定义矩形的四个角坐标
  const rectangleCoords = [
    [108.961213, 34.217351],
    [108.962903, 34.217346],
    [108.962957, 34.215603],
    [108.961213, 34.215567],
  ];
  // 提取矩形的边界
  const minX = Math.min(...rectangleCoords.map(coord => coord[0]));
  const maxX = Math.max(...rectangleCoords.map(coord => coord[0]));
  const minY = Math.min(...rectangleCoords.map(coord => coord[1]));
  const maxY = Math.max(...rectangleCoords.map(coord => coord[1]));

  // 检查目标坐标是否在矩形边界内
  const x = targetCoord[0];
  const y = targetCoord[1];
  return x >= minX && x <= maxX && y >= minY && y <= maxY;
};

/**
 * 获取最近的进门路线
 * @param {Array} targetCoord - 目标坐标点 [经度, 纬度]
 * @param {Array} doorPaths - 进门路线数组，每个元素是一个坐标点数组
 * @returns {Array|null} - 最近的进门路线，如果没有找到则返回null
 */
const getNearestDoorPath = (targetCoord) => {
  // 计算两点间的距离的函数
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // 地球平均半径，单位为米
    const radLat1 = coord1[1] * Math.PI / 180;
    const radLat2 = coord2[1] * Math.PI / 180;
    const deltaLat = (coord2[1] - coord1[1]) * Math.PI / 180;
    const deltaLon = (coord2[0] - coord1[0]) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(radLat1) * Math.cos(radLat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 返回距离，单位为米
  };

  // 初始化最小距离和最近坐标
  let minDistance = Number.MAX_VALUE;
  let closestCoord = null;
  // 遍历坐标数组，计算每个坐标与目标坐标的距离
  doorPaths.forEach(item => {
    const distance = calculateDistance(item.doorLngLat, targetCoord);
    if (distance < minDistance) {
      minDistance = distance;
      closestCoord = item;
    }
  });
  return closestCoord;
};


/**
 * 删除所有的路线
 * @param map
 */
const delAllLines = (map) => {
  map.getAllOverlays().forEach((item) => {
    item.setMap(null);
  });
};


/**
 * 绘制商场外部步行路线
 */
const drawWalkingLine = (options) => {
  const { AMap, map, coordinate, pathData } = options;

  const isCoordinate = isCoordinateInRectangle(coordinate);
  if (!isCoordinate) {

    AMap.plugin(['AMap.Walking'], function () {
      var ridingOption = {
        policy: 1,
      };
      var walking = new AMap.Walking(ridingOption);

      walking.search(coordinate, pathData.doorLngLat, function (status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
          if (result.routes && result.routes.length) {
            drawRoute(result.routes[0], map);
            console.log('绘制步行路线完成');
          }
        } else {
          console.log('步行路线数据查询失败' + result);
        }
      });
    });

    addText({ map, coordinate: pathData.doorLngLat, text: `从${pathData.id}号门进入商场` });

    // addOtherLine({ AMap, map, path: pathData.doorPath, current: coordinate, target: pathData.doorLngLat });
  }

};

const addMark = (options) => {
  const { AMap, map } = options;
  const content = '<div class="mark"><img class="aaa" src="./aaa.jpg" />绿茉莉</div>';
  const marker = new AMap.Marker({
    content,
    position: [108.9626, 34.216253],
    offset: new AMap.Pixel(-13, -30),
  });

  map.add(marker);


};

const addDw = (options) => {
  const { AMap, map, coordinate } = options;
  const content = '<img class="dw" src="./dw.png" />';
  const bbb = new AMap.Marker({
    content,
    showShadow: true,
    position: coordinate,
  });
  map.add(bbb);
};

const renderLine = (options) => {
  const { AMap, map, coordinate } = options;
  // 获取最近的进门路线
  let pathData = getNearestDoorPath(coordinate);
  console.log(pathData.doorPath);
  delAllLines(map);
  map.indoorMap.showFloor(1);
  addLine({ AMap, map, path: pathData.doorPath, highlight: true, type: 'toDoor' });
  addLine({ AMap, map, path: pathData.toRestaurantPath, type: 'toRestaurant' });
  addText({ map, coordinate: pathData.elevator, text: '乘坐电梯至4F' });
  drawWalkingLine({
    AMap, map, coordinate, pathData,
  });
  addMark({
    AMap, map, coordinate, pathData,
  });
  addDw({
    AMap, map, coordinate, pathData,
  });

};


const getCurrentLocation = async (options) => {
  const { AMap, map } = options;

  // return new Promise(resolve => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     let coordinate = [longitude, latitude];
  //     resolve(coordinate);
  //   });
  // });
  return new Promise(resolve => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

      });
      // map.addControl(geolocation);
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          resolve([result?.position?.lng, result?.position?.lat]);
        }
      });
    });
  });
};


//============


function drawRoute(route, map) {
  var path = parseRouteToPath(route);

  var startMarker = new AMap.Marker({
    position: path[0],
    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
    content: ' ',
    map: map,
  });

  var endMarker = new AMap.Marker({
    position: path[path.length - 1],
    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
    content: ' ',
    map: map,
  });

  var routeLine = new AMap.Polyline({
    path: path,
    isOutline: true,
    outlineColor: '#ffeeee',
    borderWeight: 2,
    strokeWeight: 5,
    showDir: true, // 显示方向箭头
    strokeColor: '#ff4444',
    lineJoin: 'round',
    strokeStyle: 'dashed',
    strokeDasharray: [10, 5],
  });

  routeLine.setMap(map);

  // 调整视野达到最佳显示区域
  map.setFitView([startMarker, endMarker, routeLine]);
}

// 解析WalkRoute对象，构造成AMap.Polyline的path参数需要的格式
// WalkRoute对象的结构文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkRoute
function parseRouteToPath(route) {
  var path = [];

  for (var i = 0, l = route.steps.length; i < l; i++) {
    var step = route.steps[i];

    for (var j = 0, n = step.path.length; j < n; j++) {
      path.push(step.path[j]);
    }
  }

  return path;
}
