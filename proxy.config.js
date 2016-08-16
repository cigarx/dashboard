// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  '/api/todos': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: '定制模板布局',
            isComplete: true,
          },
          {
            id: 2,
            text: 'demo for redux by sagas/action ',
          },
          {
            id: 3,
            text: 'demo for react-router ',
          },
          {
            id: 4,
            text: '分级页面设计',
          },
          {
            id: 5,
            text: '数据访问',
          },
        ],
      });
    }, 500);
  },
};
