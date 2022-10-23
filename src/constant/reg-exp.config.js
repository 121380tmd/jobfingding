// 正则表达式相关
const REG_EXP = Object.freeze({
  NUMBER_REG_EXP: /^\d+(.\d+)?$/, // 数字,包含正负数，小数
  POSITIVE_INTEGER_REG_EXP: /^\+\d+$|^\d+$/, // 正整数
  PHONE_NUMBER_REG_EXP: /(^(\d{2,4}[-－—]?)?\d{3,8}([-－—]?\d{3,8})?([-－—]?\d{1,7})?$)|(^0?1[2-9]\d{9}$)/, // 电话号码，包含手机号，固话号
  CELL_PHONE_NUMBER_11_REG_EXP: /(^1[2-9]\d{9}$)/, // 11位电话号码
})
export default REG_EXP
