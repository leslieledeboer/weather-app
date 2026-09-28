export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

export interface LabeledIcon {
  readonly label: string;
  readonly icon: Icon;
}