import { getDomain } from '../../helpers/getDomain';
const CHAT_SERVICE = getDomain();

const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }


  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};


export function getItem(itemId) {
  return request({
    url: CHAT_SERVICE + "/items/" + itemId,
    method: "GET",
  });
}

export function countNewMessages(matchId) {
  return request({
    url: CHAT_SERVICE + "/messages/" + matchId + "/count",
    method: "GET",
  });
}

export function findItemMatches(ItemId) {
  return request({
    url: CHAT_SERVICE + "/" + ItemId + "/showmatches",
    method: "GET",
  });
}

export function findChatMessages(matchId) {
  return request({
    url: CHAT_SERVICE + "/messages/" + matchId,
    method: "GET",
  });
}

export function findChatMessage(id) {
  return request({
    url: CHAT_SERVICE + "/message/" + id,
    method: "GET",
  });
}
