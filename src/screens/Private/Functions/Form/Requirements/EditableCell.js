import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NAME_SPACES } from "../../../../../shared/locales/constants";
import { SelectFormControl } from "../../../../../shared/components/SelectFormControl/SelectFormControl";
import { bindInputProps } from "../../../../../utils/helpers/input";
import { useLazyQuery } from "@apollo/react-hooks";
import { uniq } from "../../../../../utils/helpers/fn";
import { messages } from "../../../../../utils/helpers/message";
import { CertificateQueries } from "../../../../../shared/graphql/queries";
import { DatePickerFormControl } from "../../../../../shared/components/DatePickerFormControl/DatePickerFormControl";
import moment from "moment";

const {CERTIFICATE_TYPES} = CertificateQueries;

const Select = ({t, localRequirements, formik, index, loading, onScroll, onSearch}) => (
   <SelectFormControl customStyleWrapper='table-select'
      placeholder={t('FORM.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE_PLACEHOLDER')}
      items={localRequirements}
      {...bindInputProps({name: `requirements.${index}.requirement.id`, ...formik})}
      loading={loading}
      optionTitle='type'
      onScroll={onScroll}
      onSearch={onSearch}
   />)

const DatePicker = ({t, formik, index}) => {
  const disabledDate = (current) => current && current < moment().subtract(1, 'day').endOf('day');

  return (
     <DatePickerFormControl
        customStyleWrapper='table-date-picker'
        placeholder={t('FORM.REQUIREMENTS.COLUMNS.VALID_UNTIL_PLACEHOLDER')}
        {...bindInputProps({name: `requirements.${index}.validAtLeastUntil`, ...formik})}
        disabledDate={disabledDate}
     />)
}

export const EditableCell =
   ({
      index,
      formik,
      editable,
      colName,
      requirements,
      children,
      ...props
    }) => {
     const {t} = useTranslation(NAME_SPACES.ROLES);
     const [localRequirements, setLocalRequirements] = useState(requirements || []);

     const [scan, setScan] = useState('');
     const [skip, setSkip] = useState(0);
     const [take] = useState(50);
     const [page, setPage] = useState(1);
     const [total, setTotal] = useState(0);

     useEffect(() => {
       if (editable && localRequirements?.length === 0) getRequirements();
     }, []);

     const [getRequirements, {loading}] = useLazyQuery(CERTIFICATE_TYPES, {
       variables: {scan, skip, take},
       onCompleted: (loadData) => {
         setLocalRequirements(scan
            ? loadData?.requirements?.data
            : uniq([...localRequirements, ...(loadData?.requirements?.data || [])], 'id'));

         setTotal(loadData?.requirements?.count || 0);
       },
       onError: (error) => messages({data: error})
     });

     const onScroll = () => {
       if ((total <= skip) || (take >= total)) return;
       setPage(page + 1);
       setSkip(take * page);
       getRequirements();
     }

     const onSearch = (value) => {
       setPage(1);
       setSkip(0);
       setScan(value);
       getRequirements();
     }

     const getEditableField = () => {
       switch (colName) {
         case 'requirement':
           return <Select
              t={t}
              localRequirements={localRequirements}
              formik={formik}
              index={index}
              loading={loading}
              onScroll={onScroll}
              onSearch={onSearch}/>
         case 'validAtLeastUntil':
           return <DatePicker t={t} formik={formik} index={index}/>
         default:
           return children
       }
     }

     return (<td {...props}>{getEditableField()}</td>);
   };
