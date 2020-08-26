import { get, post, put, remove } from './BaseService';
const CLASS_RESOURCE = 'classes';
function retrieve(queryObj, response, error, final) {
  get(CLASS_RESOURCE, queryObj, response, error, final);
}

function create(model, response, error, final) {
  post(CLASS_RESOURCE, model, response, error, final);
}
function update(model, id, response, error, final) {
  put(CLASS_RESOURCE, id, model, response, error, final);
}

function deleteClass(id, response, error, final) {
  remove(CLASS_RESOURCE, id, response, error, final);
}
export { retrieve, create, update, deleteClass };
