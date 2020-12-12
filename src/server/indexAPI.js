import { http, baseUrl} from "./http";

export function getLogin(data) { //用户登录
    const url = baseUrl + "/review/login";
    return http(url, "get", data)
}
export function getProject(data) { //小组投票项目列表
    const url = baseUrl + "/review/project";
    return http(url, "get", data)
}
/**
 * projectId:"",	//材料id
    result:			//投票结果  0 待定 1 通过 -1 不通过} data 
 */
export function postVote(data) { //专家投票
    const url = baseUrl + "/review/vote";
    return http(url, "post", data)
}
/**
 * groupId:""   //小组id
 */
export function getResult(data) { //投票结果
    const url = baseUrl + "/review/result";
    return http(url, "get", data)
}
/**
 *     result: ,		//结果 0 待定 1 通过 -1 不通过
    projectIdList:[1111,2222,3333]	//项目id
 */
export function postProgectEdit(data) { //投票结果
    const url = baseUrl + "/review/project/edit";
    return http(url, "post", data)
}
