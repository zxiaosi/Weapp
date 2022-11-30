import { get, post } from "~/request";
import { IRequestOption } from "~/request/http";
import { EncryptedData, User } from "./model";

/** 得到用户信息 */
export const getUserInfo = () => get("/user/getUserInfo");

/** 解密手机号 */
export const decryptPhone = (encryptedData: EncryptedData) => post("/user/decryptPhone", { ...encryptedData });

/** 更新用户信息 */
export const updateUserInfo = (data: User, option?: IRequestOption) => post("/user/updateUserInfo", { ...data }, { ...option });