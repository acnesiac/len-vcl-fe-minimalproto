import { type AnnualStatistic } from "@len-schemas/len-vestacalc-schema";
import { Box } from "@mui/material";
import { DataGridPro, type GridColDef } from "@mui/x-data-grid-pro";
import { nanoid } from "@reduxjs/toolkit";
import { currencyFormatter, percentFormatter } from "../../../utils/AppUtil";

export type AnnualStatisticsType = "community" | "consolidated";

function buildColumns(source: ({ Year: string } & any)[]): GridColDef[] {
  const columns: GridColDef[] = source.map(item => ({
    field: `${item.Year}`,
    headerName: `${item.Year}`,
    width: 150,
    flex: 1,
  }));
  columns.unshift({
    field: "label",
    headerName: "",
    width: 350,
    flex: 2,
  });
  return columns;
}

interface ILookup {
  label: string;
  property: string;
  formatter?: { format: (value: any) => string };
}

const lookupCommunity: ILookup[] = [
  { label: "Starts", property: "HomeStarts" },
  { label: "Sales", property: "HomeSales" },
  { label: "Closings", property: "HomeClosings" },
  {
    label: "ASP w/o Inf",
    property: "ASPWithoutInflation",
    formatter: currencyFormatter,
  },
  {
    label: "Avg. Inflation to Revenue",
    property: "AvgInflationToRevenue",
    formatter: percentFormatter,
  },
  {
    label: "Gross Margin ($)",
    property: "GrossMargin",
    formatter: currencyFormatter,
  },
  {
    label: "Gross Margin (%)",
    property: "GrossMarginPercent",
    formatter: percentFormatter,
  },
  {
    label: "Net Pretax Income ($)",
    property: "NetPretaxIncome",
    formatter: currencyFormatter,
  },
  {
    label: "Net Pretax Margin (%)",
    property: "NetPreTaxMarginPercent",
    formatter: percentFormatter,
  },
  { label: "Net Cash Flow", property: "NetCF", formatter: currencyFormatter },
];

const lookupConsolidated: ILookup[] = [
  { label: "Starts", property: "HomeStarts" },
  { label: "Sales", property: "Sales" },
  { label: "Closings", property: "Closings" },
  {
    label: "ASP with Inf",
    property: "ASPWithInflation",
    formatter: currencyFormatter,
  },
  {
    label: "ASP w/o Inf",
    property: "ASPWithoutInflation",
    formatter: currencyFormatter,
  },
  {
    label: "Avg. Inflation to Revenue",
    property: "AvgInflationToRevenue",
    formatter: percentFormatter,
  },
  {
    label: "Gross Margin ($)",
    property: "GrossMargin",
    formatter: currencyFormatter,
  },
  {
    label: "Gross Margin (%)",
    property: "GrossMarginPercent",
    formatter: percentFormatter,
  },
  {
    label: "Gross Margin Loss ($)",
    property: "GrossMarginLoss",
    formatter: currencyFormatter,
  },
  {
    label: "Net Pretax Income ($)",
    property: "NetPretaxIncome",
    formatter: currencyFormatter,
  },
  {
    label: "Net Pretax Income Loss ($)",
    property: "NetPreTaxIncomeLoss",
    formatter: currencyFormatter,
  },
  {
    label: "Net Pretax Margin (%)",
    property: "NetPreTaxMarginPercent",
    formatter: percentFormatter,
  },
  { label: "Net Cash Flow", property: "NetCF", formatter: currencyFormatter },
  {
    label: "Inflation to Revenues ($)",
    property: "InflationtoRevenues",
    formatter: currencyFormatter,
  },
];

function buildRows(source: ({ Year: string } & any)[], lookup: ILookup[]): any[] {
  if (!source.length) return [];
  const rows = lookup.map(({ label, property, formatter }) => {
    const row = source.reduce<any>(
      (acc, item: any) => {
        const key = `${item.Year}`;
        const value = item[property];
        acc[key] = formatter ? formatter.format(value ?? 0) : value ?? "-";
        return acc;
      },
      { label },
    );
    row.id = nanoid();
    return row;
  });
  return rows;
}

function build(source: ({ Year: string } & any)[], annualStatisticsType?: AnnualStatisticsType) {
  const columns = buildColumns(source);
  let rows: any[] = [];

  switch (annualStatisticsType) {
    case "community":
      rows = buildRows(source, lookupCommunity);
      break;
    case "consolidated":
      rows = buildRows(source, lookupConsolidated);
      break;
  }

  return { columns, rows };
}

// TODO: Adjust grid width as '100%'
export const AnnualStatistics: React.FC<{
  source?: ({ Year: string } & any)[];
  annualStatisticsType?: AnnualStatisticsType;
}> = ({ annualStatisticsType = "community", source = [] }): JSX.Element => {
  const { columns, rows } = build(source, annualStatisticsType);

  return (
    <Box>
      <DataGridPro autoHeight rows={rows} columns={columns} hideFooterPagination pinnedColumns={{ left: ["label"] }} />
    </Box>
  );
};
