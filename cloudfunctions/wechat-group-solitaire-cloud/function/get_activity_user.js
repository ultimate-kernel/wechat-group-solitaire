/**
 * 新增活动信息
 */
module.exports = async function (event, content, cloud) {
  const db = cloud.database()
  const _ = db.command
	const { formData } = event.data || {}
  const OPENID = cloud.getWXContext().OPENID
	const res = {}
	res.data = await db.collection('registration_activity').add({
    data: {
      openid: OPENID,
      ...formData
    }
  })
  console.log('add_activity_res',res)
  res.code = 0
  return res
}
