"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useGetWeekSales } from "@/hooks/salesQueries";
export const description = "A simple area chart";
const chartData = [
  { day: "Sunday", amount: 186 },
  { day: "Monday", amount: 305 },
  { day: "Tuesday", amount: 237 },
  { day: "Wednesday", amount: 73 },
  { day: "Thursday", amount: 209 },
  { day: "Friday", amount: 214 },
  { day: "Saturday", amount: 204 },
];

interface ChartSalesProps {
  date: string;
  amount: number;
  quantity: number;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
const Graph = () => {
  const { data: session } = useSession();

  const { data: weekly } = useGetWeekSales(session?.accessToken, 1, 1, 1);

  console.log(weekly);

  const weeklyChartData = weekly
    ? weekly.series
        .map((w) =>
          w.data.map((d: ChartSalesProps) => {
            const parsedDate = new Date(d.date);
            const getDayName = parsedDate.toLocaleDateString("en-US", {
              weekday: "long",
            });
            return {
              day: getDayName,
              amount: d.amount,
            };
          })
        )
        .flat()
    : chartData;

  return (
    <Card className='bg-orange-200  w-[75%] max-lg:w-full shadow-none'>
      <CardHeader>
        <CardTitle>Sales Chart</CardTitle>
        <CardDescription>
          Showing graph of the sales for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={weeklyChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='amount'
              type='natural'
              fill='var(--color-desktop)'
              fillOpacity={0.4}
              stroke='var(--color-desktop)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Graph;
