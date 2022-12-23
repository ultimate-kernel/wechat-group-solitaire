/**
 * 添加报名信息
 */
module.exports = async function (event, content, cloud) {
  const db = cloud.database()
  const _ = db.command
	const { id,nickName,selectedCarLocation } = event.data || {}
  const OPENID = await cloud.getWXContext().OPENID
	const res = {}
  res.data = await db.collection('registration_activity').doc(id).update({
    data:{
      signupList:_.push({nickName,openId:OPENID,selectedCarLocation})
    }
  })
  console.log('add_registration_activity_user_res',res)
  res.code = 0
  return res
}
