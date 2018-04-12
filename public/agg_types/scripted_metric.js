import {noop, map} from 'lodash';
import {AggTypesMetricsMetricAggTypeProvider} from 'ui/agg_types/metrics/metric_agg_type';
import {RegistryFieldFormatsProvider} from 'ui/registry/field_formats';
import textEditor from './text.html';
import formatterEditor from './formatter.html';
import jsonEditor from './json.html';

export function AggTypeMetricScriptedMetricProvider(Private) {
  const MetricAggType = Private(AggTypesMetricsMetricAggTypeProvider);
  const fieldFormats = Private(RegistryFieldFormatsProvider);
  const formatters = map(['number', 'percent'], fieldFormats.getType);

  return new MetricAggType({
    name: 'scripted_metric',
    title: 'Scripted Metric',
    makeLabel: (aggConfig) => `Scripted ${aggConfig.id}`,
    supportsOrderBy: false,
    params: [
      {
        name: 'params',
        editor: jsonEditor,
        default: '{\n"_agg": {}\n}',
        write: (aggConfig, output) => {
          output.params.params = JSON.parse(aggConfig.params.params);
        }
      }, {
        name: 'init_script',
        editor: textEditor,
        default: ''
      }, {
        name: 'map_script',
        editor: textEditor,
        default: ''
      }, {
        name: 'combine_script',
        editor: textEditor,
        default: ''
      }, {
        name: 'reduce_script',
        editor: textEditor,
        default: ''
      },
      {
        name: 'formatter',
        editor: formatterEditor,
        default: 'number',
        getFormatters: () => formatters,
        write: noop
      }
    ],
    getFormat: (agg) => {
      const formatterId = agg.params.formatter;
      return formatterId ? fieldFormats.getInstance(formatterId) : fieldFormats.getDefaultInstance('number');
    }
  });
}
