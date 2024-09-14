// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addTeam POST /team/add */
export async function addTeamUsingPost(body: API.TeamAddRequest, options?: { [key: string]: any }) {
  return request('/team/addTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /team/update */
export async function updateTeamUsingPost(
  body: API.TeamUpdateRequest,
  options?: { [key: string]: any },
) {
  return request('/team/updateTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserByPage POST /team/list/page */
export async function listTeamByPageUsingPost(
  body: API.TeamQueryRequest,
  options?: { [key: string]: any },
) {
  return request('/team/listTeamByPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
