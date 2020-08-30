import { get, post, put, remove } from '$baseService';
const STUDENT_RESOURCE = 'students';
function retrieve(queryObj, response, error, final) {
  get(STUDENT_RESOURCE, queryObj, response, error, final);
}

function create(model, response, error, final) {
  post(STUDENT_RESOURCE, model, response, error, final);
}

function update(model, id, response, error, final) {
  put(STUDENT_RESOURCE, id, model, response, error, final);
}

function deleteStudent(id, response, error, final) {
  remove(STUDENT_RESOURCE, id, response, error, final);
}
export default { retrieve, create, update, deleteStudent };
