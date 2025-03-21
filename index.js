const addLine = (options) => {

  const { AMap, map, path } = options;
  const polyline = new AMap.Polyline({
    path: path,
    strokeColor: "#007FF871",
    strokeOpacity: 1,
    strokeWeight: 8,
    showDir: true, // 显示方向箭头
    dirColor: "#b5d9ff",
    strokeDasharray: [10, 5],
  });

  map.add(polyline);

  polyline.on('click', (e) => {
    console.log(e);
    polyline.setOptions({
      strokeColor: "#007FF8",

    });
  });

};
