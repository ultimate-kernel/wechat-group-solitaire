/**
 * 获取活动信息
 */
module.exports = async function (event, content, cloud) {
  const db = cloud.database()
  const _ = db.command
	const { id } = event.data || {}
  const OPENID = await cloud.getWXContext().OPENID
	const res = {}
	const { data }= await db.collection('registration_activity').doc(id).get()
  res.data = data
  console.log('get_activity_res',res)
  res.code = 0
  return res
}
