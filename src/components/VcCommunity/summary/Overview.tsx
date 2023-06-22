import { AnnualStatistic, KeyResults, type InvestmentOverview } from "@len-schemas/len-vestacalc-schema";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { currencyFormatter, percentFormatter } from "../../../utils/AppUtil";
import { type ICardProps } from "../../Common/cards/card-props";
import { CardGrid } from "../../Common/cards/CardGrid";
import { CardSimple } from "../../Common/cards/CardSimple";

export type OverviewType = "community" | "consolidated";

function buildKeyAssumptionsCommunity(source: InvestmentOverview): ICardProps[] {
  const items: ICardProps[] = [
    {
      title: "Total HS:",
      highlight: `${source?.GeneralInformation?.TotalHomes ?? "-"}`,
    },
    {
      title: "Avg. Base Sales Price:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageBaseSalesPrice ?? 0),
    },
    {
      title: "Avg. Homesite Premiums:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageHomesitePremium ?? 0),
    },
    {
      title: "Avg. Sales Incentives:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageSalesIncentive ?? 0),
    },
    {
      title: "Avg. Options/Upgrade Revenue:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageOptionsUpgradeRevenue ?? 0),
    },
    {
      title: "Avg. Inflation to Revenue:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageInflationsToRevenue ?? 0),
    },
    {
      title: "Avg. Net Sales Revenue:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageNetSalesRevenue ?? 0),
    },
    {
      title: "Avg. Base Sales Price Per Sq. Ft.:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageBaseSalesPricePerSqFt ?? 0),
    },
    {
      title: "Avg. Net Sales Price Per Sq. Ft.:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.AverageNetSalesPricePerSqFt ?? 0),
    },
    {
      title: "Direct Construction Cost/Sq. Ft.:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.DirectConstructionCostSqFt ?? 0),
    },
    {
      title: "Monthly Sales Absorption Rate:",
      highlight: `${source?.SelectedAssumptions?.MonthlySalesAbsorptionRate ?? "-"}`,
    },
    {
      title: "Average Cycle Time (Months):",
      highlight: `${source?.SelectedAssumptions?.AvgNoOfMonthsToCompleteEachProdHome ?? "-"}`,
    },
    {
      title: "Total Site Development Cost:",
      highlight: currencyFormatter.format(source?.SelectedAssumptions?.TotalSiteDevelopmentCosts ?? 0),
    },
    {
      title: "Field Overhead (%):",
      highlight: percentFormatter.format(source?.SelectedAssumptions?.FieldOverheadPercent ?? 0),
    },
    {
      title: "S&M Overhead (%):",
      highlight: percentFormatter.format(source?.SelectedAssumptions?.SalesAndMarkettingOverheadPercent ?? 0),
    },
    {
      title: "Divisional Overhead (%):",
      highlight: percentFormatter.format(source?.SelectedAssumptions?.DivisionalOverhead ?? 0),
    },
  ];
  return items;
}

function buildKeyResultsCommunity(source: InvestmentOverview): ICardProps[] {
  const items: ICardProps[] = [
    {
      title: "Gross Margin (%):",
      highlight: percentFormatter.format(source?.KeyResults?.GrossMarginPercent ?? 0),
    },
    {
      title: "Gross Margin ($):",
      highlight: currencyFormatter.format(source?.KeyResults?.GrossMargin ?? 0),
    },
    {
      title: "Net Pretax Income (%):",
      highlight: percentFormatter.format(source?.KeyResults?.NetPreTaxMarginPercent ?? 0),
    },
    {
      title: "Net Pretax Income ($):",
      highlight: currencyFormatter.format(source?.KeyResults?.NetPreTaxIncome ?? 0),
    },
    {
      title: "Peak Capital:",
      highlight: currencyFormatter.format(source?.CapitalImplications?.PeakCapital ?? 0),
    },
    {
      title: "Months to Breakeven:",
      highlight: `${source?.KeyMileStones?.NoOfMonthsToBreakEven ?? "-"}`,
    },
    {
      title: "IRR (%):",
      highlight: percentFormatter.format(source?.KeyResults?.UnleveragedIRRPercent ?? 0),
    },
    {
      title: "RONA (%):",
      highlight: percentFormatter.format(source?.KeyResults?.RONAPercent ?? 0),
    },
  ];
  return items;
}

function buildKeyAssumptionsConsolidated(source: any): ICardProps[] {
  const items: ICardProps[] = [
    {
      title: "Total HS:",
      highlight: `${source?.TotalHS ?? "-"}`,
    },
    {
      title: "Avg. Base Sales Price:",
      highlight: currencyFormatter.format(source?.AvgBaseSalePrice ?? 0),
    },
    {
      title: "Avg. Homesite Premiums:",
      highlight: currencyFormatter.format(source?.AvgHomesitePremium ?? 0),
    },
    {
      title: "Avg. Sales Incentives:",
      highlight: currencyFormatter.format(source?.AvgSalesIncentives ?? 0),
    },
    {
      title: "Avg. Options/Upgrade Revenue:",
      highlight: currencyFormatter.format(source?.AvgOptionsOrUpgradeRev ?? 0),
    },
    {
      title: "Avg. Inflation to Revenue:",
      highlight: currencyFormatter.format(source?.AvgInflationToRev ?? 0),
    },
    {
      title: "Avg. Net Sales Revenue:",
      highlight: currencyFormatter.format(source?.AvgNetSalesRev ?? 0),
    },
    {
      title: "Avg. Base Sales Price Per Sq. Ft.:",
      highlight: currencyFormatter.format(source?.AvgBaseSalesPricePerSqFt ?? 0),
    },
    {
      title: "Avg. Net Sales Price Per Sq. Ft.:",
      highlight: currencyFormatter.format(source?.AvgNetSalesPricePerSqFt ?? 0),
    },
    {
      title: "Direct Construction Cost/Sq. Ft.:",
      highlight: currencyFormatter.format(source?.DirectConstructionCostPerSqFt ?? 0),
    },
    {
      title: "Monthly Sales Absorption Rate:",
      highlight: `${source?.MontlySalesAbsoptionRate ?? "-"}`,
    },
    {
      title: "Average Cycle Time (Months):",
      highlight: `${source?.AverageCycleTimeInMonths ?? "-"}`,
    },
    {
      title: "Field Overhead (%):",
      highlight: percentFormatter.format(source?.FieldOverheadPercent ?? 0),
    },
    {
      title: "S&M Overhead (%):",
      highlight: percentFormatter.format(source?.SalesAndMarketingOverheadPercent ?? 0),
    },
    {
      title: "Divisional Overhead (%):",
      highlight: percentFormatter.format(source?.DivisionOverheadPercent ?? 0),
    },
  ];
  return items;
}

function buildKeyResultsConsolidated(source: any): ICardProps[] {
  const items: ICardProps[] = [
    {
      title: "Gross Margin (%):",
      highlight: percentFormatter.format(source?.GrossMarginPercent ?? 0),
    },
    {
      title: "Gross Margin ($):",
      highlight: currencyFormatter.format(source?.GrossMargin ?? 0),
    },
    {
      title: "Net Pretax Income (%):",
      highlight: percentFormatter.format(source?.NetPreTaxPercent ?? 0),
    },
    {
      title: "Net Pretax Income ($):",
      highlight: currencyFormatter.format(source?.NetPretaxIncome ?? 0),
    },
    {
      title: "Peak Capital:",
      highlight: currencyFormatter.format(source?.PeakCapital ?? 0),
    },
    {
      title: "Months to Breakeven:",
      highlight: `${source?.MonthsToBreakEven ?? "-"}`,
    },
    {
      title: "IRR (%):",
      highlight: percentFormatter.format(source?.IRR ?? 0),
    },
  ];
  return items;
}

function build(data: any, overviewType: OverviewType) {
  let keyAssumptions: ICardProps[] = [];
  let keyResults: ICardProps[] = [];
  switch (overviewType) {
    case "community":
      keyAssumptions = buildKeyAssumptionsCommunity(data);
      keyResults = buildKeyResultsCommunity(data);
      break;
    case "consolidated":
      keyAssumptions = buildKeyAssumptionsConsolidated(data?.KeyAssumptions);
      keyResults = buildKeyResultsConsolidated(data?.KeyResults);
      break;
  }
  return { keyAssumptions, keyResults };
}

export const Overview: React.FC<{ source?: any; overviewType?: OverviewType }> = ({
  source,
  overviewType = "community",
}): JSX.Element => {
  const { keyAssumptions, keyResults } = build(source, overviewType);

  return (
    <>
      <Box component="div" sx={{ py: "12px" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600, lineHeight: "28px" }}>Key Results</Typography>
      </Box>

      <CardGrid>
        {keyResults.map((item, index) => (
          <CardSimple key={index} {...item} />
        ))}
      </CardGrid>

      <Box component="div" sx={{ py: "12px", mt: "24px" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600, lineHeight: "28px" }}>Key Assumptions</Typography>
      </Box>

      <CardGrid>
        {keyAssumptions.map((item, index) => (
          <CardSimple key={index} {...item} />
        ))}
      </CardGrid>
    </>
  );
};
