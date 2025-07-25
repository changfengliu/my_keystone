export const APPID = "wxd1951bacce1aa350";
export const SECRET = "f7a0097a422c1681b29c7982fe4e0ac5";

export const getLoginApi = (code: string) => {
  return `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
};
