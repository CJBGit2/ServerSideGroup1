export type Operation = "+" | "-" | "*" | "/";

export interface EvaluationInput {
  value1: number;
  value2: number;
  operation: Operation;
}