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
import { useGetWeekSalesData } from "@/hooks/salesQueries";
export const description = "A simple area chart";
const chartData = [
  { day: "Sunday", amount: 0 },
  { day: "Monday", amount: 0 },
  { day: "Tuesday", amount: 0 },
  { day: "Wednesday", amount: 0 },
  { day: "Thursday", amount: 0 },
  { day: "Friday", amount: 0 },
  { day: "Saturday", amount: 0 },
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

  const { data: weekly } = useGetWeekSalesData(session?.accessToken);

  // console.log(weekly);

  const weeklyChartData =
    weekly && weekly.length === 0 ? weekly.flat() : chartData;

  console.log(weeklyChartData);

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
