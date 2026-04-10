import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useId } from "react";

export interface SimulationDataPoint {
  id: string;
  postCount: number;
  audience: number;
  mentalHealth: number;
}

interface SimulationChartProps {
  data: SimulationDataPoint[];
}

export const SimulationChart = ({ data }: SimulationChartProps) => {
  const idAudience = useId();
  const idHealth = useId();
  if (!data || data.length === 0) return null;

  const isGameStarted = data.length > 1;

  // Déclaration explicite des couleurs pour éviter les bugs liés à var() dans le SVG
  const COLOR_AUDIENCE = "#2563eb"; // Correspond à --color-metric-audience
  const COLOR_HEALTH = "#f43f5e";   // Correspond à --color-metric-health-low

  return (
    <div className="w-full bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-700 glass-panel">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Évolution Psychologique vs Audience
      </h3>

      {!isGameStarted ? (
        <div className="w-full h-[250px] flex flex-col items-center justify-center text-slate-500 animate-pulse">
          <span className="text-4xl mb-3">📊</span>
          <p className="text-sm font-bold text-slate-400">En attente de données</p>
          <p className="text-xs text-center mt-1">Publiez votre premier contenu pour générer le graphique.</p>
        </div>
      ) : (
        <div className="w-full h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id={idAudience} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLOR_AUDIENCE} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLOR_AUDIENCE} stopOpacity={0} />
                </linearGradient>
                <linearGradient id={idHealth} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLOR_HEALTH} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLOR_HEALTH} stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              
              <XAxis
                dataKey="postCount"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value)}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "0.5rem",
                  color: "#f8fafc",
                }}
                itemStyle={{ fontWeight: "bold" }}
              />

              <Area
                isAnimationActive={false}
                type="monotone"
                dataKey="audience"
                name="Abonnés"
                stroke={COLOR_AUDIENCE}
                fillOpacity={1}
                fill={`url(#${idAudience})`}
                strokeWidth={2}
              />
              <Area
                isAnimationActive={false}
                type="monotone"
                dataKey="mentalHealth"
                name="Santé Mentale"
                stroke={COLOR_HEALTH}
                fillOpacity={1}
                fill={`url(#${idAudience})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};