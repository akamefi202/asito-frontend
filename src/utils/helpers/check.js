export const fieldsNotEmpty = (data, status = true) => {
  if (!data) return status;

  if (typeof data === 'object') {
    Object.entries(data).forEach(([key, val]) => {
      if (!val) {
        status = false;
        return;
      }

      if (!Array.isArray(val) && typeof val === 'object') {
        status = fieldsNotEmpty(val, status);
      }
      

      if (Array.isArray(val)) {
        val.forEach(item => {
          status = fieldsNotEmpty(item, status);
        });
      }
    });
  }

  if (Array.isArray(data)) {
    data.forEach(item => {
      status = fieldsNotEmpty(item, status);
    });
  }

  return status;
}

export const fieldsQqual = (prevValue, value, status = true) => {
  if (!prevValue || !value) {
    return status
  }

  if (typeof prevValue === 'object' && typeof value === 'object') {
    Object.keys(prevValue).forEach((key, i) => {
      if (typeof prevValue[key] !== 'object' && value[key] !== prevValue[key]) {
        status = false;
        return;
      }

      if (prevValue[key] && !Array.isArray(prevValue[key]) && typeof prevValue[key] === 'object') {
        status = fieldsQqual(prevValue[key], value[key], status);
      }
      

      if (Array.isArray(value[key])) {
        if (value[key].length !== prevValue[key].length) {
          status = false;
          return;
        }

        prevValue[key].forEach((item, index) => {
          status = fieldsQqual(item, value[key][index], status);
        });
      }
    });
  }

  if (Array.isArray(value) && Array.isArray(prevValue)) {
    if (value.length !== prevValue.length) {
      status = false;
    } else {
      prevValue.forEach((item, index) => {
        status = fieldsQqual(item, value[index], status);
      });
    }
  }

  return status;
}