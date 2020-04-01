const ROLES = {
  ADMIN: 0,
  USER: 5,
  PREMIUM: 6,
  BANNED: 11
};

const PLANS = {
  FREE: 2
};

const ACTION_TYPES = {
  ADD_PAYMENT: 2,
  ADD_UNACCOUNTED_PAYMENT: -2,
  REMOVE_PAYMENT: 3,
  TRANSFER_CASH: 4
};

const ACTION_TYPES_VALIDATIONS = {
  [ACTION_TYPES.ADD_PAYMENT]: ["amount"],
  [ACTION_TYPES.ADD_UNACCOUNTED_PAYMENT]: ["amount"],
  [ACTION_TYPES.REMOVE_PAYMENT]: [""],
  [ACTION_TYPES.TRANSFER_CASH]: ["amount target"]
};

const ERRORS = {
  // 10 global
  //10 01 (route id)
  auth: {
    // 10 01
    BAD_AUTH_TOKEN: {
      status: 400,
      msg: "Bad auth token",
      code: 100101
    },
    NO_AUTH_TOKEN: {
      status: 400,
      msg: "No auth token",
      code: 100102
    }
  },
  files: {
    INVALID_FILE_FORMAT: {
      status: 400,
      msg: "Invalid file format",
      code: 100201
    },
    FILE_NOT_FOUND: {
      status: 404,
      msg: "Cant find file",
      code: 100202
    }
  }
};
module.exports = {
  ROLES,
  ACTION_TYPES_VALIDATIONS,
  ACTION_TYPES,
  PLANS,
  ERRORS
};
