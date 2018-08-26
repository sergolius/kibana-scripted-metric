import { map, noop } from 'lodash';
import { AggTypesMetricsMetricAggTypeProvider } from 'ui/agg_types/metrics/metric_agg_type';
import { fieldFormats, RegistryFieldFormatsProvider } from 'ui/registry/field_formats';

import jsonEditor from './json.html';
import formatterEditor from './formatter.html';

export function AggTypeMetricScriptedMetricProvider(Private) {
  const MetricAggType = Private(AggTypesMetricsMetricAggTypeProvider);
  const _fieldFormats = fieldFormats || Private(RegistryFieldFormatsProvider);
  const formatters = map(['number', 'percent'], _fieldFormats.getType);

  return new MetricAggType({
    name: 'scripted_metric',
    title: 'Scripted Metric',
    makeLabel: (aggConfig) => `Scripted ${aggConfig.id}`,
    supportsOrderBy: false,
    params: [
      {
        name: 'value',
        editor: jsonEditor,
        default: '{\n"params": {\n  "_agg": {}\n},\n"init_script": "",\n"map_script": "",\n"combine_script": "",\n"reduce_script": ""\n}',
        write: (aggConfig, output) => {
          output.params = JSON.parse(aggConfig.params.value);
        },
      }, {
        name: 'formatter',
        editor: formatterEditor,
        default: 'number',
        getFormatters: () => formatters,
        write: noop,
      },
    ],
    getFormat: (agg) => {
      const formatterId = agg.params.formatter;
      return formatterId ? _fieldFormats.getInstance(formatterId) : _fieldFormats.getDefaultInstance('number');
    },
  });
}
