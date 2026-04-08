import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Schéma JSON typé pour les données du graphique (comme demandé dans le PDF)
export interface SimulationDataPoint {
  id: string; // [cite: 61]
  postCount: number;
  audience: number;
  mentalHealth: number;
}

interface SimulationChartProps {
  data: SimulationDataPoint[];
}

export const SimulationChart = ({ data }: SimulationChartProps) => {
  return (
    <div className="w-full h-64 bg-slate-800 rounded-xl p-4 border border-slate-700 glass-panel">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Évolution Psychologique vs Audience
      </h3>

      {/* ResponsiveContainer est obligatoire selon le PDF [cite: 203] */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAudience" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-metric-audience)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-metric-audience)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-metric-health-low)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-metric-health-low)"
                stopOpacity={0}
              />
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
          />

          {/* Tooltip personnalisé accessible [cite: 253] */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderColor: "#334155",
              borderRadius: "0.5rem",
              color: "#f8fafc",
            }}
            itemStyle={{ fontWeight: "bold" }}
          />

          {/* Courbes de données */}
          <Area
            type="monotone"
            dataKey="audience"
            stroke="var(--color-metric-audience)"
            fillOpacity={1}
            fill="url(#colorAudience)"
          />
          <Area
            type="monotone"
            dataKey="mentalHealth"
            stroke="var(--color-metric-health-low)"
            fillOpacity={1}
            fill="url(#colorHealth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
