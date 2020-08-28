import { API } from '../constants/Constants';

//TODO, replace Global with localStorage
function authFetch(input, init = {}) {
  if (!init.headers) init.headers = {};
  init.headers['Authorization'] =
    'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoidXNlcjEiLCJqdGkiOiJlZDY4NTFmZS01ZWJhLTRmZWMtOTgwNy0wNDVhNDA4ODg1ZGEiLCJleHAiOjIwMDg0ODAyNzMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTk2NzciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU5Njc3In0.pg4lHt8ymjsXJuO4sJpkusAkaXQ-krfTnKy7pZLpHe0';
  return fetch(input, init);
}

function get(resource, queryObj, response, error, final) {
  const url = getResourceLink(resource);
  const query = queryObj ? '?' + toQuery(queryObj) : '';
  const requestUrl = url + query;
  return authFetch(requestUrl).then(response).catch(error).finally(final);
}

function post(resource, model, response, error, final) {
  return authFetch(getResourceLink(resource), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  })
    .then(response)
    .catch(error)
    .finally(final);
}

function put(resource, id, model, response, error, final) {
  var path = getResourceLink(resource) + '/' + id;
  return authFetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  })
    .then(response)
    .catch(error)
    .finally(final);
}

function remove(resource, id, response, error, final) {
  var path = getResourceLink(resource) + '/' + id;
  return authFetch(path, {
    method: 'DELETE',
  })
    .then(response)
    .catch(error)
    .finally(final);
}

function getResourceLink(resource) {
  return API.END_POINT + resource;
}

function toQuery(queryObj) {
  let str = [];
  for (let prop in queryObj) {
    if (!Array.isArray(queryObj[prop]))
      str.push(prop + '=' + (queryObj[prop] ?? ''));
    else
      queryObj[prop].forEach((e) => {
        str.push(prop + '=' + (e ?? ''));
      });
  }
  return str.join('&');
}

export { get, post, put, remove };
