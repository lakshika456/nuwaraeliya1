import React, { useState } from 'react';
import { CloudFog, Sun, Wind, Droplets, Compass, Thermometer, Sparkles } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const forecast = [
    { day: 'Today', temp: '16°C / 61°F', condition: 'Misty & Pleasant', mistLevel: '78%', icon: 'mist', note: 'Ideal for Tea Factory & Lake walks' },
    { day: 'Tomorrow', temp: '17°C / 63°F', condition: 'Partly Sunny Dawn', mistLevel: '65%', icon: 'sun-cloud', note: 'Clear horizon at World’s End' },
    { day: 'Thursday', temp: '15°C / 59°F', condition: 'Light Highland Drizzle', mistLevel: '88%', icon: 'rain', note: 'Vibrant emerald tea terraces' },
    { day: 'Friday', temp: '18°C / 64°F', condition: 'Golden Mountain Mist', mistLevel: '55%', icon: 'sun', note: 'Perfect for Gregory Lake boating' },
  ];

  return (
    <div
      id="weather-widget-container"
      className="bg-white rounded-2xl p-6 md:p-8 border border-[#e1e3e4] shadow-sm max-w-7xl mx-auto my-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#e1e3e4] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#2c694e] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highland Microclimate Live Tracker</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#012d1d]">
            Nuwara Eliya Live Climate & Mist Index
          </h2>
          <p className="text-sm text-[#414844] mt-1">
            Perched at 1,868 meters above sea level, experience Sri Lanka’s coolest sub-tropical highland atmosphere.
          </p>
        </div>

        {/* Current Live Pill */}
        <div className="flex items-center space-x-3 bg-[#f3f4f5] px-4 py-3 rounded-xl border border-[#e1e3e4] self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-[#012d1d] flex items-center justify-center text-[#aeeecb]">
            <CloudFog className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-3xl font-bold text-[#012d1d]">16°C</span>
              <span className="text-xs text-[#414844]">/ 61°F</span>
            </div>
            <div className="text-xs font-medium text-[#2c694e]">Highland Mist Layer</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]/80">
          <div className="flex items-center space-x-2 text-xs text-[#414844] mb-1">
            <CloudFog className="w-4 h-4 text-[#2c694e]" />
            <span>Highland Mist Index</span>
          </div>
          <div className="font-serif text-xl font-bold text-[#012d1d]">78% (Misty)</div>
          <div className="text-[11px] text-[#414844] mt-0.5">Atmospheric cloud cover</div>
        </div>

        <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]/80">
          <div className="flex items-center space-x-2 text-xs text-[#414844] mb-1">
            <Droplets className="w-4 h-4 text-[#2c694e]" />
            <span>Relative Humidity</span>
          </div>
          <div className="font-serif text-xl font-bold text-[#012d1d]">82%</div>
          <div className="text-[11px] text-[#414844] mt-0.5">Optimal for tea growth</div>
        </div>

        <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]/80">
          <div className="flex items-center space-x-2 text-xs text-[#414844] mb-1">
            <Wind className="w-4 h-4 text-[#2c694e]" />
            <span>Gentle Mountain Breeze</span>
          </div>
          <div className="font-serif text-xl font-bold text-[#012d1d]">9 km/h NE</div>
          <div className="text-[11px] text-[#414844] mt-0.5">Crisp pine scent</div>
        </div>

        <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#e1e3e4]/80">
          <div className="flex items-center space-x-2 text-xs text-[#414844] mb-1">
            <Sun className="w-4 h-4 text-[#2c694e]" />
            <span>Dawn & Sunset</span>
          </div>
          <div className="font-serif text-xl font-bold text-[#012d1d]">06:12 AM / 06:22 PM</div>
          <div className="text-[11px] text-[#414844] mt-0.5">Best photography hours</div>
        </div>
      </div>

      {/* 4-Day Forecast selector */}
      <div className="pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#414844] mb-3">
          Traveler Weather Forecast & Activity Recommendation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {forecast.map((item, idx) => {
            const isSelected = selectedDay === idx;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'border-[#2c694e] bg-[#aeeecb]/20 shadow-sm'
                    : 'border-[#e1e3e4] bg-white hover:border-[#2c694e]/40'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm text-[#012d1d]">{item.day}</span>
                  <span className="text-xs font-medium text-[#2c694e] bg-white px-2 py-0.5 rounded-full border border-[#2c694e]/20">
                    Mist: {item.mistLevel}
                  </span>
                </div>
                <div className="font-serif text-lg font-bold text-[#012d1d]">{item.temp}</div>
                <div className="text-xs text-[#414844] mt-1">{item.condition}</div>
                <div className="text-[11px] text-[#2c694e] mt-2 font-medium bg-[#f8f9fa] p-1.5 rounded">
                  💡 {item.note}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
