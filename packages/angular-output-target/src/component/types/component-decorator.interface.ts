export interface ComponentDecorator {
  selector: string;
  changeDetection: string;
  template: string;
  inputs: string[];
}
