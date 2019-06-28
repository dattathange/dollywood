export class NavItem {
  displayName: string;
  iconName: string;
  route?: string;
  children?: NavItem[];
  path: string;
  type: string;
  alias: string;
}