/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from "@mui/material";
import { Colors } from "./colors";
import { Spacing } from "./spacing";
import type {} from "@mui/x-data-grid/themeAugmentation";

/**
 * Notes
 * Md: Medium
 */

declare module "@mui/material/styles" {
  interface TypographyVariants {
    bodyL: React.CSSProperties;
    bodyLBold: React.CSSProperties;
    bodyLMd: React.CSSProperties;
    bodyM: React.CSSProperties;
    bodyMBold: React.CSSProperties;
    bodyMMd: React.CSSProperties;
    bodyS: React.CSSProperties;
    bodySBold: React.CSSProperties;
    bodySMd: React.CSSProperties;
    labelL: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    bodyL?: React.CSSProperties;
    bodyLBold?: React.CSSProperties;
    bodyLMd?: React.CSSProperties;
    bodyM?: React.CSSProperties;
    bodyMBold?: React.CSSProperties;
    bodyMMd?: React.CSSProperties;
    bodyS?: React.CSSProperties;
    bodySBold?: React.CSSProperties;
    bodySMd?: React.CSSProperties;
    labelL?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodyL: true;
    bodyLBold: true;
    bodyLMd: true;
    bodyM: true;
    bodyMBold: true;
    bodyMMd: true;
    bodyS: true;
    bodySBold: true;
    bodySMd: true;
    labelL: true;
  }
}

export const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        row: {
          ":nth-of-type(odd)": {
            backgroundColor: Colors.white,
          },
          ":nth-of-type(even)": {
            backgroundColor: Colors.grey1,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: {
          fontSize: "1rem",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        standard: {
          backgroundColor: Colors.grey1,
          borderColor: Colors.lightBlue4,
          borderStyle: "solid",
          borderWidth: "1.5px",
          paddingBottom: Spacing.spacing2,
          paddingLeft: Spacing.spacing3,
          paddingRight: Spacing.spacing3,
          paddingTop: Spacing.spacing2,
          "&:focus": {
            borderRadius: 4,
            boxShadow: "0 0 0 0.1rem " + Colors.lightBlue4,
          },
        },
      },
    },
  },
});

// Body L
theme.typography.bodyL = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 400,
  [theme.breakpoints.down("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
};
// Body L Bold
theme.typography.bodyLBold = {
  ...theme.typography.bodyL,
  fontWeight: 700,
};
// Body L Medium
theme.typography.bodyLMd = {
  ...theme.typography.bodyL,
  fontWeight: 500,
};
// Body M
theme.typography.bodyM = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 400,
  [theme.breakpoints.down("md")]: {
    // 14/24/0
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 14/24/0
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
};
// Body M Bold
theme.typography.bodyMBold = {
  ...theme.typography.bodyM,
  fontWeight: 700,
};
// Body M Medium
theme.typography.bodyMMd = {
  ...theme.typography.bodyM,
  fontWeight: 500,
};
// Body S
theme.typography.bodyS = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 400,
  [theme.breakpoints.down("md")]: {
    // 12/20/0
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 12/20/0
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    letterSpacing: "0px",
  },
};
// Body S Bold
theme.typography.bodySBold = {
  ...theme.typography.bodyS,
  fontWeight: 700,
};
// Body S Medium
theme.typography.bodySMd = {
  ...theme.typography.bodyM,
  fontWeight: 500,
};
// Caption
theme.typography.caption = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    // 11/16/0
    fontSize: "0.6875rem",
    lineHeight: "1rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 11/16/0
    fontSize: "0.6875rem",
    lineHeight: "1rem",
    letterSpacing: "0px",
  },
};
// Heading 2
theme.typography.h2 = {
  fontFamily: "Reckless",
  fontStyle: "normal",
  fontWeight: 400,
  color: Colors.grey10,
  [theme.breakpoints.down("md")]: {
    // 24/32/0.5
    fontSize: "1.5rem",
    lineHeight: "2rem",
    letterSpacing: "0.5px",
  },
  [theme.breakpoints.up("md")]: {
    // 32/40/0.5
    fontSize: "2rem",
    lineHeight: "2.5rem",
    letterSpacing: "0.5px",
  },
};
// Heading 3
theme.typography.h3 = {
  fontFamily: "Reckless",
  fontStyle: "normal",
  fontWeight: 400,
  color: Colors.grey10,
  [theme.breakpoints.down("md")]: {
    // 22/28/0.5
    fontSize: "1.375rem",
    lineHeight: "1.75rem",
    letterSpacing: "0.5px",
  },
  [theme.breakpoints.up("md")]: {
    // 24/32/0.5
    fontSize: "1.5rem",
    lineHeight: "2rem",
    letterSpacing: "0.5px",
  },
};
// Heading 4
theme.typography.h4 = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 700,
  color: Colors.grey10,
  [theme.breakpoints.down("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 20/28/0
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    letterSpacing: "0px",
  },
};
// Heading 5
theme.typography.h5 = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 700,
  color: Colors.grey10,
  [theme.breakpoints.down("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
};
// Label L
theme.typography.labelL = {
  fontFamily: "Karla",
  fontStyle: "normal",
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
  [theme.breakpoints.up("md")]: {
    // 16/24/0
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
  },
};
