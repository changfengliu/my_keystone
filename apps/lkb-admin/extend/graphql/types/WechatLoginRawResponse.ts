interface WechatLoginRawResponse {
  openid: string;
  session_key: string;
  unionid?: string;
  errmsg?: string;
  errcode?: number;
}

export default WechatLoginRawResponse;
