"use client";
import dynamic from "next/dynamic";
import StatsCard from "@/app/components/organisms/StatsCard";
import Dropdown from "@/app/components/molecules/Dropdown";
import { BarChart2, DollarSign, LineChart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import useFormatPrice from "@/app/hooks/ui/useFormatPrice";
import { useQuery } from "@apollo/client";
import { GET_ANALYTICS_OVERVIEW } from "@/app/gql/Dashboard";
import CustomLoader from "@/app/components/feedback/CustomLoader";
import ListCard from "@/app/components/organisms/ListCard";
import { withAuth } from "@/app/components/HOC/WithAuth";

const AreaChart = dynamic(
  () => import("@/app/components/charts/AreaChartComponent"),
  { ssr: false }
);
const BarChart = dynamic(
  () => import("@/app/components/charts/BarChartComponent"),
  { ssr: false }
);

interface FormData {
  timePeriod: string;
  year?: string;
  startDate?: string;
  endDate?: string;
  useCustomRange?: boolean;
}

const Dashboard = () => {
  const { control, watch } = useForm<FormData>({
    defaultValues: {
      timePeriod: "allTime",
      useCustomRange: false,
    },
  });
  const formatPrice = useFormatPrice();

  const timePeriodOptions = [
    { label: "So'nggi 7 Kun", value: "last7days" },
    { label: "So'nggi Oy", value: "lastMonth" },
    { label: "So'nggi Yil", value: "lastYear" },
    { label: "Barcha Vaqt", value: "allTime" },
  ];

  const { timePeriod } = watch();

  const queryParams = {
    timePeriod: timePeriod || "allTime",
  };

  const { data, loading, error } = useQuery(GET_ANALYTICS_OVERVIEW, {
    variables: { params: queryParams },
  });

  const topItems =
    data?.productPerformance?.slice(0, 10).map((p) => ({
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      revenue: formatPrice(p.revenue),
    })) || [];

  const salesByProduct = {
    categories: data?.productPerformance?.map((p) => p.name) || [],
    data: data?.productPerformance?.map((p) => p.revenue) || [],
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Dashboard ma'lumotlarini yuklashda xatolik
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 sm:p-6 min-h-screen space-y-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Dashboard Umumiy Ko'rinishi
        </h1>
        <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <Controller
            name="timePeriod"
            control={control}
            render={({ field }) => (
              <Dropdown
                onChange={field.onChange}
                options={timePeriodOptions}
                value={field.value}
                label="Vaqt Oralig'i"
                className="w-full sm:min-w-[150px] sm:max-w-[200px]"
              />
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Umumiy Daromad"
          value={formatPrice(data?.revenueAnalytics?.totalRevenue || 0)}
          percentage={data?.revenueAnalytics?.changes?.revenue}
          caption="so'nggi davrdan beri"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatsCard
          title="Umumiy Sotuvlar"
          value={data?.orderAnalytics?.totalSales || 0}
          percentage={data?.orderAnalytics?.changes?.sales}
          caption="so'nggi davrdan beri"
          icon={<BarChart2 className="w-5 h-5" />}
        />
        <StatsCard
          title="Umumiy O'zaro Ta'sirlar"
          value={data?.interactionAnalytics?.totalInteractions || 0}
          percentage={0}
          caption="barcha o'zaro ta'sirlar"
          icon={<LineChart className="w-5 h-5" />}
        />
        <StatsCard
          title="Umumiy Foydalanuvchilar"
          value={data?.userAnalytics?.totalUsers || 0}
          percentage={data?.userAnalytics?.changes?.users}
          caption="so'nggi davrdan beri"
          icon={<Users className="w-5 h-5" />}
        />
      </div>
      <AreaChart
        title="Daromad Tendensiyalari"
        data={data?.revenueAnalytics?.monthlyTrends?.revenue || []}
        categories={data?.revenueAnalytics?.monthlyTrends?.labels || []}
        color="#22c55e"
        percentageChange={data?.revenueAnalytics?.changes?.revenue}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard
          title="Eng Yaxshi Mahsulotlar"
          viewAllLink="/shop"
          items={topItems}
          itemType="product"
        />
        <BarChart
          title="Mahsulot bo'yicha Sotuvlar"
          data={salesByProduct.data}
          categories={salesByProduct.categories}
          color="#4CAF50"
        />
      </div>
    </motion.div>
  );
};

export default withAuth(Dashboard);
