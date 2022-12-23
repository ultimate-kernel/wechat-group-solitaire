/**
 * 删除报名信息
 */
module.exports = async function (event, content, cloud) {
  const db = cloud.database()
  const _ = db.command
	const { id } = event.data || {}
  const OPENID = await cloud.getWXContext().OPENID
	const res = {}
  const activityInfo = await db.collection('registration_activity').doc(id).get()
  const filterSignList = activityInfo.data.signupList.filter(item=>item.openId!== OPENID)
  res.data = await db.collection('registration_activity').doc(id).update({
    data:{
      signupList:_.set(filterSignList)
    }
  })
  console.log('delete_activity_user',res)
  res.code = 0
  return res
}
