import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "../../../../../shared/locales/constants";
import {SelectFormControl} from "../../../../../shared/components/SelectFormControl/SelectFormControl";
import {bindInputProps} from "../../../../../utils/helpers/input";
import {useLazyQuery} from "@apollo/react-hooks";
import {uniq} from "../../../../../utils/helpers/fn";
import {messages} from "../../../../../utils/helpers/message";
import {DepartmentQueries} from "../../../../../shared/graphql/queries";

const {DEPARTMENTS} = DepartmentQueries;

export const EditableCell =
  ({
     editable,
     children,
     index,
     formik,
     departments,
     ...props
   }) => {
    const {t} = useTranslation(NAME_SPACES.ROLES);
    const [localDepartments, setLocalDepartments] = useState( departments || []);

    const [scan, setScan] = useState('');
    const [skip, setSkip] = useState(0);
    const [take] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      if (editable && localDepartments?.length === 0) getDepartments();
    }, [])

    const [getDepartments, {loading}] = useLazyQuery(DEPARTMENTS, {
      variables: {scan, skip, take, orderBy: { name: 'name', type: 'ASC' }},
      onCompleted: (loadData) => {
        setLocalDepartments(scan
          ? loadData?.departments?.data
          : uniq([...localDepartments, ...(loadData?.departments?.data || [])], 'id'));

        setTotal(loadData?.departments?.count || 0);
      },
      onError: (error) => messages({data: error})
    });

    const onScroll = () => {
      if ((total <= skip) || (take >= total)) return;
      setPage(page + 1);
      setSkip(take * page);
      getDepartments();
    }

    const onSearch = (value) => {
      setPage(1);
      setSkip(0);
      setScan(value);
      getDepartments();
    }

    return (
      <td {...props}>
        {editable
          ? <SelectFormControl customStyleWrapper='table-select'
            placeholder={t('FORM.DEPARTAMENT.COLUMNS.NAME_PLACEHOLDER')}
            items={localDepartments.filter(d => !formik.values.departments.some((fd, i) => i !== index && fd.department && d.id === fd.department.id))}
            {...bindInputProps({name: `departments.${index}.department.id`, ...formik})}
            loading={loading}
            optionTitle='name'
            onScroll={onScroll}
            onSearch={onSearch}/>
          : children}
      </td>
    );
  };
