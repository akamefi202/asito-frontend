export const bindInputProps = ({
  name,
  prefix,
  values,
  handleChange,
  setFieldTouched,
  touched,
  errors,
}) => {
  if (prefix) {
    name.split('.').map(item => {
      if (errors && typeof errors !== 'string') {
        errors = errors[item];
      }
      if (touched && typeof touched !== 'boolean') {
        touched = touched[item];
      }

      if (values) {
        values = values[item];
      }
    });
  }

  return {
    value: prefix ? values : values[name] || '',
    onChange: handleChange(name),
    onBlur: () => setFieldTouched(name),
    touched: prefix ? touched : touched[name],
    errors: prefix ? errors : errors[name],
  };
};
