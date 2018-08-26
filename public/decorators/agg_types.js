import { AggTypesIndexProvider } from 'ui/agg_types';
import { AggTypeMetricScriptedMetricProvider } from '../agg_types/scripted_metric';

export function decorateAggTypes(Private) {
  const AggTypes = Private(AggTypesIndexProvider);
  const AggFormula = Private(AggTypeMetricScriptedMetricProvider);
  AggFormula.type = 'metrics';
  AggTypes.push(AggFormula);
}
