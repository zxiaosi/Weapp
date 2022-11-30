export interface EncryptedData {
  code?: string; // 换取手机号的动态令牌【与换取OpenId的code不一样】
  encryptedData?: string; // 包括敏感数据在内的完整用户信息的加密数据
  iv?: string; // 加密算法的初始向量
}

export interface User {
  name?: string;
  avatar?: string;
  phone?: string;
}