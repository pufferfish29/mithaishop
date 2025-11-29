"use client";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
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
import { useGetWeekSales, useGetWeekSalesData } from "@/hooks/salesQueries";
import SelectGraphType from "./SelectGraphType";
import { useState } from "react";

export interface ProductInteface {
  data: ProductDataArray[];
  productId: number;
  productName: string;
}

interface ProductDataArray {
  date: string;
  quantity: number;
  amount: number;
}

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

const dayMap: Record<number, string> = {
  1: "Sunday",
  2: "Monday",
  3: "Tuesday",
  4: "Wednesday",
  5: "Thursday",
  6: "Friday",
  7: "Saturday",
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
const Graph = () => {
  const { data: session } = useSession();
  const [graphType, setGraphType] = useState<"OVERALL" | "PRODUCT" | "">("");
  const [productSelectedName, setProductSelectedName] = useState<string>("");
  const [selecteProduct, setSelectedProduct] = useState<ProductInteface | null>(
    null
  );

  const { data: weekly } = useGetWeekSalesData(session?.accessToken);

  const weeklyChartData =
    weekly && weekly.length > 0
      ? chartData.map((entry) => {
          const found = weekly?.find(
            (item: any) => dayMap[item.day_of_week] === entry.day
          );
          return {
            day: entry.day,
            amount: found ? found.total_sale : 0,
          };
        })
      : chartData;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const productWeeklyData =
    graphType === "PRODUCT" && selecteProduct
      ? chartData.map((entry) => {
          const dayData = selecteProduct.data.find(
            (d) => daysOfWeek[new Date(d.date).getDay()] === entry.day
          );

          return {
            day: entry.day,
            amount: dayData ? dayData.amount : 0, // default 0 if no sale
          };
        })
      : [];

  return (
    <div className=' '>
      <SelectGraphType
        type={graphType}
        setType={setGraphType}
        productName={productSelectedName}
        setProductName={setProductSelectedName}
        selecteProduct={selecteProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Card className='bg-orange-200'>
        <CardHeader>
          <CardTitle>Sales Chart</CardTitle>
          <CardDescription>
            Showing graph of the sales for the last 7 days
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={
                graphType === "PRODUCT" && selecteProduct
                  ? productWeeklyData
                  : weeklyChartData
              }
              margin={{
                top: 20,
                left: 12,
                right: 12,
                bottom: 12,
              }}
            >
              <YAxis domain={[0, (dataMax: any) => dataMax + 500]} />
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
              <Line
                dataKey='amount'
                type='natural'
                stroke='var(--chart-1)'
                strokeWidth={3}
                dot={{
                  fill: "var(--chart-1)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  dataKey={"amount"}
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 leading-none font-medium'>
                See the trending or most sales day in a week
                <TrendingUp className='h-4 w-4' />
              </div>
              <div className='text-muted-foreground flex items-center gap-2 leading-none'>
                Sunday to Saturday
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Graph;
