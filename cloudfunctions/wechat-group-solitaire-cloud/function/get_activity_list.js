/**
 * 新增活动信息
 */
module.exports = async function (event, content, cloud) {
  const db = cloud.database()
  const _ = db.command
  const OPENID = await cloud.getWXContext().OPENID
	const res = {}
	const { data }= await db.collection('registration_activity').where({
    openid: OPENID
  }).get()
  res.data = data
  console.log('get_activity_list_res',res)
  res.code = 0
  return res
}
