import React, { useState, useEffect } from 'react';
import { Lightbulb, Volume2, Home, Wifi, WifiOff, Settings } from 'lucide-react';

interface EmotionData {
  emotion: string;
  confidence: number;
  color: string;
}

interface SmartDeviceIntegrationProps {
  currentEmotion: EmotionData | null;
}

interface DeviceState {
  lights: {
    enabled: boolean;
    brightness: number;
    color: string;
  };
  music: {
    enabled: boolean;
    volume: number;
    currentTrack: string;
  };
  connected: boolean;
}

const SmartDeviceIntegration: React.FC<SmartDeviceIntegrationProps> = ({ currentEmotion }) => {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    lights: {
      enabled: false,
      brightness: 70,
      color: '#ffffff'
    },
    music: {
      enabled: false,
      volume: 50,
      currentTrack: 'None'
    },
    connected: false
  });

  const [showSettings, setShowSettings] = useState(false);

  // Simulate device connection
  const toggleConnection = () => {
    setDeviceState(prev => ({
      ...prev,
      connected: !prev.connected
    }));
  };

  // Auto-adjust devices based on emotion
  useEffect(() => {
    if (currentEmotion && deviceState.connected) {
      const emotion = currentEmotion.emotion.toLowerCase();
      
      // Adjust lighting based on emotion
      if (deviceState.lights.enabled) {
        let newColor = '#ffffff';
        let newBrightness = 70;
        
        switch (emotion) {
          case 'happy':
            newColor = '#FFD700'; // Warm yellow
            newBrightness = 90;
            break;
          case 'sad':
            newColor = '#4169E1'; // Soft blue
            newBrightness = 40;
            break;
          case 'angry':
            newColor = '#FF6B6B'; // Soft red
            newBrightness = 60;
            break;
          case 'fear':
            newColor = '#DDA0DD'; // Soft purple
            newBrightness = 30;
            break;
          case 'surprised':
            newColor = '#FFA500'; // Orange
            newBrightness = 80;
            break;
          default:
            newColor = '#F0F8FF'; // Alice blue
            newBrightness = 60;
        }
        
        setDeviceState(prev => ({
          ...prev,
          lights: {
            ...prev.lights,
            color: newColor,
            brightness: newBrightness
          }
        }));
      }

      // Suggest music based on emotion
      if (deviceState.music.enabled) {
        let suggestedTrack = 'Ambient Sounds';
        
        switch (emotion) {
          case 'happy':
            suggestedTrack = 'Upbeat Pop Playlist';
            break;
          case 'sad':
            suggestedTrack = 'Calming Piano Music';
            break;
          case 'angry':
            suggestedTrack = 'Meditation & Breathing';
            break;
          case 'fear':
            suggestedTrack = 'Peaceful Nature Sounds';
            break;
          case 'surprised':
            suggestedTrack = 'Energetic Instrumental';
            break;
          default:
            suggestedTrack = 'Ambient Background';
        }
        
        setDeviceState(prev => ({
          ...prev,
          music: {
            ...prev.music,
            currentTrack: suggestedTrack
          }
        }));
      }
    }
  }, [currentEmotion, deviceState.connected, deviceState.lights.enabled, deviceState.music.enabled]);

  const getEmotionRecommendation = (emotion: string) => {
    const recommendations = {
      happy: "Bright, warm lighting and upbeat music to enhance your joy!",
      sad: "Soft blue lighting and calming music to provide comfort.",
      angry: "Gentle lighting and meditation sounds to help you relax.",
      fear: "Warm, dim lighting and peaceful sounds for reassurance.",
      surprised: "Bright, energetic lighting to match your excitement!",
      neutral: "Balanced lighting and ambient sounds for focus."
    };
    return recommendations[emotion?.toLowerCase() as keyof typeof recommendations] || "Adjusting environment to match your mood...";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Smart Device Integration</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={toggleConnection}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              deviceState.connected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {deviceState.connected ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span>{deviceState.connected ? 'Connected' : 'Disconnected'}</span>
          </button>
        </div>
      </div>

      {/* Connection Status */}
      {!deviceState.connected ? (
        <div className="text-center py-8 text-gray-500">
          <Home size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Connect to Smart Devices</p>
          <p className="text-sm mt-2">Enable smart home integration to automatically adjust your environment based on detected emotions.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Current Emotion Recommendation */}
          {currentEmotion && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Environment Recommendation</h4>
              <p className="text-sm text-blue-700">
                {getEmotionRecommendation(currentEmotion.emotion)}
              </p>
            </div>
          )}

          {/* Device Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Smart Lights */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb size={20} className="text-yellow-500" />
                  <span className="font-medium">Smart Lights</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deviceState.lights.enabled}
                    onChange={(e) => setDeviceState(prev => ({
                      ...prev,
                      lights: { ...prev.lights, enabled: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {deviceState.lights.enabled && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Brightness: {deviceState.lights.brightness}%</label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={deviceState.lights.brightness}
                      onChange={(e) => setDeviceState(prev => ({
                        ...prev,
                        lights: { ...prev.lights, brightness: parseInt(e.target.value) }
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded border-2 border-gray-300"
                      style={{ backgroundColor: deviceState.lights.color }}
                    ></div>
                    <span className="text-sm text-gray-600">Auto-adjusted for {currentEmotion?.emotion || 'neutral'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Smart Music */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Volume2 size={20} className="text-blue-500" />
                  <span className="font-medium">Smart Audio</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deviceState.music.enabled}
                    onChange={(e) => setDeviceState(prev => ({
                      ...prev,
                      music: { ...prev.music, enabled: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {deviceState.music.enabled && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Volume: {deviceState.music.volume}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={deviceState.music.volume}
                      onChange={(e) => setDeviceState(prev => ({
                        ...prev,
                        music: { ...prev.music, volume: parseInt(e.target.value) }
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Now Playing:</span> {deviceState.music.currentTrack}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Device Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Device Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Smart Lights:</span>
                <span className={deviceState.lights.enabled ? 'text-green-600' : 'text-gray-500'}>
                  {deviceState.lights.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Smart Audio:</span>
                <span className={deviceState.music.enabled ? 'text-green-600' : 'text-gray-500'}>
                  {deviceState.music.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartDeviceIntegration;