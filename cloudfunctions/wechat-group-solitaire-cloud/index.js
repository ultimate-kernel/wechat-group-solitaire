const cloud = require('wx-server-sdk') // 云开发服务端SDK引入
cloud.init({ // 初始化云开发环境
  env: cloud.DYNAMIC_CURRENT_ENV // 当前环境的常量
})
const db = cloud.database()
const name = 'registration' // 该模版的标识
exports.main = async (event, context) => {
  const res = { name }
  // 预置创建集合，如果存在则自动失败跳过，自己上架时可以去掉
  try {
    await db.createCollection('registration_activity')
  } catch (e) {}
  return res
}
