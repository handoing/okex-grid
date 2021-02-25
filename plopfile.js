module.exports = function (plop) {
  plop.setGenerator('init', {
    description: 'init user.json',
    prompts: [
      {
        type: 'append',
        name: 'apiKey',
        message: 'Please input api key: '
      },
      {
        type: 'append',
        name: 'secretKey',
        message: 'Please input secret key: '
      },
      {
        type: 'append',
        name: 'passphrase',
        message: 'Please input passphrase: '
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'user.json',
        templateFile: 'plop/user.plop'
      }
    ]
  });
};