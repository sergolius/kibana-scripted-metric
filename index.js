export default kibana => new kibana.Plugin({
  id: 'scripted_metric',
  require: ['kibana'],

  uiExports: {
    hacks: ['plugins/scripted_metric']
  }
});
