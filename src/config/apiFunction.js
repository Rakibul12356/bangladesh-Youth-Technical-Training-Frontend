import axiosInstance from "./axiosInstance";

// Normalize and rethrow errors so callers can handle them consistently
function handleError(err) {
  const res = err?.response;
  const message = res?.data?.message || err.message || "Request failed";
  const status = res?.status;
  return Promise.reject({ message, status, data: res?.data });
}

/**
 * Get list of resources with optional query params
 * @param {string} path - API path (e.g. '/courses')
 * @param {object} params - query params
 * @param {object} config - axios config
 */
export async function getList(path, params = {}, config = {}) {
  try {
    const res = await axiosInstance.get(path, { params, ...config });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Get single resource by id
 */
export async function getItem(path, id, config = {}) {
  try {
    const res = await axiosInstance.get(`${path}/${id}`, config);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Create resource
 */
export async function createItem(path, payload, config = {}) {
  try {
    const res = await axiosInstance.post(path, payload, config);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Update resource (PUT)
 */
export async function updateItem(path, id, payload, config = {}) {
  try {
    const res = await axiosInstance.put(`${path}/${id}`, payload, config);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Patch resource (PATCH)
 */
export async function patchItem(path, id, payload, config = {}) {
  try {
    const res = await axiosInstance.patch(`${path}/${id}`, payload, config);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Delete resource
 */
export async function deleteItem(path, id, config = {}) {
  try {
    const res = await axiosInstance.delete(`${path}/${id}`, config);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Upload file(s) via multipart/form-data
 * formData should be a FormData instance
 */
export async function uploadFile(path, formData, config = {}) {
  try {
    const cfg = {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    };
    const res = await axiosInstance.post(path, formData, cfg);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

// ==================== Course API ====================
export async function getAllCourses(params = {}) {
  return getList("/courses", params);
}

export async function getCourseById(id) {
  return getItem("/courses", id);
}

export async function createCourse(courseData) {
  return createItem("/courses", courseData);
}

export async function updateCourse(id, courseData) {
  return updateItem("/courses", id, courseData);
}

export async function deleteCourse(id) {
  return deleteItem("/courses", id);
}

// ==================== Enrollment API ====================
export async function createEnrollment(payload) {
  return createItem("/enrollments", payload);
}

export async function getUserEnrollments() {
  return getList("/enrollments/user");
}

export async function getPendingEnrollments() {
  return getList("/enrollments/admin/pending");
}

export async function approveEnrollment(id) {
  return updateItem("/enrollments", `${id}/approve`, {});
}

const api = {
  getList,
  getItem,
  createItem,
  updateItem,
  patchItem,
  deleteItem,
  uploadFile,
  // Course APIs
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  // Enrollment APIs
  createEnrollment,
  getUserEnrollments,
  getPendingEnrollments,
  approveEnrollment,
};

export default api;
