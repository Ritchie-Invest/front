export enum TabName {
  Landing = 'Landing',
  InvestmentDashboard = 'InvestmentDashboard',
}

export type TabNameType = keyof typeof TabName;

export type Tab = {
  name: TabNameType;
  label: string;
};
