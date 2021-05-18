import AntTable from "./AntTable";
import WithPageSize from "./WithPageSize";
import WithSelect from "./WithSelect";

const Table = WithPageSize(WithSelect(AntTable));

export default Table;
