/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from "lodash";
import { type IClaims } from "../components/Home/Home";
import { type IUserOktaData } from "../store/slice/CommonSlice";
import { type Tokens } from "@okta/okta-auth-js/lib/types/Token";
import { object } from "decoders";

export const stringAvatar = (name?: string): any => {
  if (name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return "?";
};

const stringToColor = (name: string): any => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

/**
 * Retrive "email" initials
 * @param email
 * @example first.name@lennar.com
 * @returns Initials on uppercase
 * @example FN
 */
export function emailInitials(email?: string): string {
  const leftSide = String(email ?? "").split("@")[0] ?? "";
  const value = leftSide
    .split(".")
    .map(item => item.charAt(0)?.toUpperCase())
    .filter(i => !!i)
    .join("");
  return value;
}

export function sizeMb(value: number) {
  return value / Math.pow(2, 20);
}

/**
 * Transform value in bytes to mega bytes
 * @example (15.01MB)
 * @param value number of bytes
 */
export function sizeLabelMb(value?: number): string {
  if (typeof value != "number") return "";
  const mb = sizeMb(value);
  const label = `(${mb.toPrecision(3)}MB)`;
  return label;
}

// #region Number Formatters
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencySign: "accounting",
});

const intlPercentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
});
export const percentFormatter = {
  /**
   * Format value with local "en-US" to percent.
   * @param value
   * @param decimals Indicate whether tha value is in decimals otherwise is in hundreds.
   * @default false
   * @example
   * - decimals: true   := 0.22
   * - decimals: false  := 22
   */
  format(value: number, decimals: boolean = false): string {
    const _default = "-";
    if (typeof value !== "number") return _default;
    const sanitize = decimals ? value : value / 100;
    return intlPercentFormatter.format(sanitize);
  },
};
// #endregion
export const tokenHandler = (claim?: IClaims): IUserOktaData | undefined => {
  if (!claim) {
    const token: Tokens = JSON.parse(window.sessionStorage.getItem("okta-token-storage")! ?? "{}");
    if (Object.keys(token).length > 0) {
      claim = token.idToken?.claims;
    } else {
      return undefined;
    }
  }
  const division: string[] = [];
  const region: string[] = [];
  claim &&
    _.each(claim.Groups, element => {
      if (element.indexOf("-") > 0) {
        let nData = _.split(_.replace(element, "LEN-OKTA-LAND-NPRD-", "").trim(), "-", 2);
        if (!nData || nData.length === 0) {
          nData = _.split(_.replace(element, "LEN-OKTA-LAND-PRD-", "").trim(), "-", 2);
        }
        division.push(nData[0]);
        region.push(nData[1]);
      }
    });
  const userData: IUserOktaData = {
    name: claim?.name,
    email: claim?.email,
    avatarurl: "",
    groups: claim?.Groups,
    division: _.uniq(division),
    region: _.uniq(region),
  };
  return userData;
};
