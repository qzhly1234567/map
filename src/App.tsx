import './App.css';
import IndoorMap from './components/IndoorMap';

function App() {
  // 替换为您的高德地图开发者密钥
  const mapKey = 'c89c2ef731407d06c9da03308085d6b0';

  return (
    <div className="app" style={{ height: '100vh', width: '100%' }}>
      <IndoorMap mapKey={mapKey}/>
    </div>
  );

}

export default App;
