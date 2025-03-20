import { useEffect, useRef } from 'react';

import AMapLoader from '@amap/amap-jsapi-loader';

interface IndoorMapProps {
  mapKey: string;
}

const IndoorMap: React.FC<IndoorMapProps> = ({ mapKey }) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any = null;

    AMapLoader.load({
      key: mapKey,
      version: '2.0',
      plugins: ['AMap.IndoorMap', 'AMap.ControlBar'],
    }).then((AMap) => {
      var indoorMap = new AMap.IndoorMap({
        zIndex: 999999, // 设置室内图层叠加顺序
        opacity: 1, // 设置室内图层透明度
      });
      if (mapContainer.current) {
        map = new AMap.Map(mapContainer.current, {
          viewMode: "2D",
          center: [116.518542, 39.924677],
          showIndoorMap: false, //显示地图自带的室内地图图层
          zoom: 19,
          layers: [indoorMap, AMap.createDefaultLayer()] // 添加室内等图层
        });
        indoorMap.showIndoorMap('B0FFFAB6J2');
        // 添加错误处理
        map.on('error', (error: any) => {
          console.error('地图加载错误：', error);
          // 如果坐标无效，重置到默认位置
          if (error.message?.includes('Invalid Object: LngLat')) {
            map.setCenter([108.962636, 34.216242]);
          }
        });
        map.on('indoor_create', function () {
          map.indoorMap.showIndoorMap('B000A856LJ', 5);
        });
        map.on('complete', () => {
          // 异步加载室内地图插件
          map.plugin(['AMap.IndoorMap'], () => {
            // 在地图上添加室内图层
            const indoorMap = new AMap.IndoorMap({
              zIndex: 1000, // 设置室内图层叠加顺序
              opacity: 1, // 设置室内图层透明度
            });
            map.add(indoorMap);

            // 添加室内地图控件
            map.addControl(new AMap.ControlBar({
              position: { top: '10px', right: '10px' },
              showZoomBar: true,
              showControlButton: true,
            }));

            // 监听楼层切换事件
            indoorMap.on('floor_complete', (data: { floor: any; }) => {
              console.log('当前楼层：', data.floor);
            });

            // 监听室内地图状态变化
            indoorMap.on('indoor_status_changed', (data: any) => {
              console.log('室内地图状态：', data);
            });
          });
        });
      }
    }).catch((e) => {
      console.error('地图加载失败：', e);
    });

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, [mapKey]);

  return (
    <div
      id={'indoor_map'}
      ref={mapContainer}
      style={{
        width: '1000px',
        height: '1000px',
      }}
    />
  );
};

export default IndoorMap;
