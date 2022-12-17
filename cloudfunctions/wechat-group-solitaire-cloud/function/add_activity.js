/**
 * 新增活动信息
 */
module.exports = async function (event, content, cloud) {
  const db = cloud.database()
  const _ = db.command
	const { formData } = event.data || {}
  const OPENID = cloud.getWXContext().OPENID // 获取微信上下文
	const res = {}
  console.log('add')
	res = await db.collection('registration_activity').add({
    data: formData
  })
  console.log('res',res)
  res.code = 0
  return res
}
