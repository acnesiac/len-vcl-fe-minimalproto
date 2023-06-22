export const LOCAL_STORAGE_NAVIGATION_TAB = "ls_nav_tab";

// ! FIXME: BFF Api to retrieve communities
export interface ICommunityDummy {
  CommunityID: string;
  CommunityName: string;
  DealID: string;
  DealName: string;
  DivisionID: string;
  DivisionName: string;
  Region: string;
}

export const communites: ICommunityDummy[] = [
  {
    CommunityID: "C0003167",
    CommunityName: "Wellborne Village - Cottage",
    DealID: "D00000865",
    DealName: "Wellborne Village",
    DivisionID: "DFW",
    DivisionName: "Dallas-Fort Worth",
    Region: "Grove Region",
  },
  {
    CommunityID: "C0003168",
    CommunityName: "Wellborne Village - Classic",
    DealID: "D00000865",
    DealName: "Wellborne Village",
    DivisionID: "DFW",
    DivisionName: "Dallas-Fort Worth",
    Region: "Grove Region",
  },
  {
    CommunityID: "C0003166",
    CommunityName: "Wellborne Village - Watermill",
    DealID: "D00000865",
    DealName: "Wellborne Village",
    DivisionID: "DFW",
    DivisionName: "Dallas-Fort Worth",
    Region: "Grove Region",
  },
];
