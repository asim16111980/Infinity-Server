import httpStatusText from "../constants/httpStatusText.js";

export const jsendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: httpStatusText.SUCCESS,
    data,
  });
};

export const jsendFail = (res, data, statusCode = 400) => {
  return res.status(statusCode).json({
    status: httpStatusText.FAIL,
    data,
  });
};

export const jsendError = (res, message, code = 500, data = null) => {
  return res.status(code).json({
    status: httpStatusText.ERROR,
    message,
    code,
    data,
  });
};
