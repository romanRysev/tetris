import { IForumPostsRaw } from '../components/Forum/ForumPostList/ForumPostList';

interface ForumTree extends IForumPostsRaw {
  level?: number;
}

export const makePostTree = (arr: IForumPostsRaw[]) => {
  const tmp: ForumTree[] = Object.values(arr);
  const res = [];
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].firstLevel) {
      tmp[i].level = 1;
      res.push(tmp[i]);
      for (let k = 0; k < tmp.length; k++) {
        if (tmp[k].parentID && tmp[k].parentID && tmp[k].parentID === tmp[i].id) {
          tmp[k].level = 2;
          res.push(tmp[k]);
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

const levelDown = (tmp: ForumTree[], level: number, res: ForumTree[]) => {
  if (level == 5) {
    for (let i = 0; i < tmp.length; i++) {
      Object.assign(tmp[i], { level: 5 });
      const id = tmp[i].parentID;
      for (let k = 0; k < res.length; k++) {
        if (res[k].id === id) {
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
          tmp[k].level = level;
          res.splice(i + 1, 0, tmp[k]);
          tmp.splice(k, 1);
        }
      }
    }
  }
  return tmp;
};
