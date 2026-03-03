import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LineCharts({ data }: { data: any[] }) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            }
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tickMargin={20}
            dataKey="weekStart"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            }
          />
          <YAxis />
          <Area
            name="Ticket sold"
            type="monotone"
            dataKey="totalTickets"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineCharts;
