import { IForumPostsRaw } from '../components/Forum/ForumPostList/ForumPostList';

export const makePostTree = (arr: IForumPostsRaw[]) => {
  const tmp: IForumPostsRaw[] = Object.values(arr);
  const res = [];
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].firstLevel) {
      res.push(Object.assign(tmp[i], { level: 1 }));
      for (let k = 0; k < tmp.length; k++) {
        if (tmp[k].parentID && tmp[k].parentID && tmp[k].parentID === tmp[i].id) {
          res.push(Object.assign(tmp[k], { level: 2 }));
          tmp.splice(k, 1);
          k--;
        }
      }
      tmp.splice(i, 1);
      i--;
    }
  }
  for (let level = 3; level < 6; level++) {
    if (tmp.length) levelDown(tmp, level, res);
  }
  return res;
};

const levelDown = (tmp: any[], level: number, res: any[]) => {
  if (level == 5) {
    for (let i = 0; i < tmp.length; i++) {
      Object.assign(tmp[i], { level: 5 });
      const id = tmp[i].parentID;
      for (let k = 0; k < res.length; k++) {
        if ((res[k].id = id)) {
          res.splice(k + 1, 0, tmp[i]);
          tmp.splice(i, 1);
          i--;
        }
      }
    }
  }
  for (let i = 0; i < res.length; i++) {
    if (res[i].level == level - 1) {
      for (let k = tmp.length - 1; k >= 0; k--) {
        if (tmp[k].parentID && tmp[k].parentID === res[i].id) {
          res.splice(i + 1, 0, Object.assign(tmp[k], { level: level }));
          tmp.splice(k, 1);
        }
      }
    }
  }
  return tmp;
};
