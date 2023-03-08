import { BarChart, Bar, ReferenceLine, ResponsiveContainer, Cell } from "recharts";

export function BarChartCmp({ data, values }) {
    return (
        <div className="chart-container flex align-center justify-center">
            <ResponsiveContainer width="60%" height={60}>
                <BarChart data={data}>
                    <Bar dataKey="count" maxBarSize={3}  >
                        {
                            data?.map(({ price }, index) => (
                                <Cell key={`cell-${index}`}
                                    fill={(values[0] <= +price && values[1] >= +price) ? '#8F9BB3' : '#d8d8d8'} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}