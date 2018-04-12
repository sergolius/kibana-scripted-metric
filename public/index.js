import {uiModules} from 'ui/modules';
import {getApp} from 'ui/chrome';
import {decorateAggTypes} from './decorators/agg_types';

if (getApp().id === 'kibana') {
  uiModules
  .get('scripted_metric', ['kibana'])
  .run((Private) => decorateAggTypes(Private));
}
