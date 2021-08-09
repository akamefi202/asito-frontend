export const bindInputProps =
  ({
     name,
     values,
     handleChange,
     setFieldTouched,
     touched,
     errors,
   }) => {

  return ({
    value: getFieldValue(name, values),
    onChange: handleChange(name),
    onBlur: () => setFieldTouched(name),
    touched: getFieldValue(name, touched),
    errors: getFieldValue(name, errors)
  })
};


const getFieldValue = (fields, object) => {
  return fields.split('.').reduce((acc, value) => (acc = acc?.[value], acc), object)
}
