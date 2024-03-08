import { GetGroupsResponse } from '../types/groups.type';
import groups from '../mocks/groups.json'


export const groupsService = {
  loadItem(): Promise<GetGroupsResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = Math.floor(Math.random() * 2)
        if (result === 1) {
          resolve({
            result: result as 1,
            data: groups
          })
        } else {
          resolve({
            result: result as 0,
          })
        }
      }, 1000);
    });
  }
}
