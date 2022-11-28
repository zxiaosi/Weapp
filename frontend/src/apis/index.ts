import { get, post } from "~/request";
import { EncryptedData } from "./model";

/** 更新手机号 */
export const updatePhone = (encryptedData: EncryptedData) => post("/user/updatePhone", { ...encryptedData });

/** 得到用户信息 */
export const getUserInfo = () => get("/user/getUserInfo");
