import { Right } from './right';
import { FieldProperties } from './fieldproperties';

export interface UserDefinedField {
  TableRight: Right;
  FieldProperties: FieldProperties;
  UDefFieldId: number;
  ColumnId: number;
  FieldDefault: string;
  FieldHeight: number;
  FieldLabel: string;
  FieldLeft: number;
  FieldTop: number;
  FieldType: string;
  FieldWidth: number;
  FormatMask: string;
  HideLabel: boolean;
  IsIndexed: boolean;
  LabelHeight: number;
  LabelLeft: number;
  LabelTop: number;
  LabelWidth: number;
  LastVersionId: number;
  ListTableId: number;
  IsMandatory: boolean;
  Type: string;
  Page1LineNo: number;
  ProgId: string;
  IsReadOnly: boolean;
  ShortLabel: string;
  TabOrder: number;
  TextLength: number;
  Tooltip: string;
  UdefIdentity: number;
  UDListDefinitionId: number;
  Justification: string;
  Version: number;
  TemplateVariableName: string;
  HasBeenPublished: boolean;
}
