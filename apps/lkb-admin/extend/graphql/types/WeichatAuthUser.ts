interface WechatAuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  sessionKey: string;
  openId: string;
  gender: number;
  unionId?: string;
  nickname: string;
  avatarUrl: string;
  birthday: string | null;
  createdAt: string | null;
  lastLoginAt: string | null;
}

export default WechatAuthUser;
