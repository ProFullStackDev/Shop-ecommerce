const SequelizeAuto = require('./auto.js')

const auto = new SequelizeAuto('demos_v9', 'root', 'bgcTyVxvW9k6RaE', {
  host: '47.112.195.182',
  dialect: 'mysql',
  port: 3306,
  directory: "./src/app/core/models",
  singularize: false,
  useDefine: false,
  lang: 'ts',
  updateUserName: 'xuboyue',
  caseProp: 'c',
  caseModel: 'p',
  caseFile: 'p'
  // tables: ['Users', 'GroupBuying_Users', 'GroupBuying']
})

auto.run()
