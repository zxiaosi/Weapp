import { get } from "../../src/request";

// 回收物异议提交反馈
export const getUserList = (): Promise<any> => get(`/user/list`, {}, { isNeedToken: false });

