export const mysqlErrorMap = {
    ER_DUP_ENTRY: { status: 409, message: 'Duplicate entry detected.' }, // 1062
    ER_NO_SUCH_TABLE: { status: 500, message: 'Database table not found.' }, // 1146
    ER_BAD_FIELD_ERROR: { status: 500, message: 'Invalid field in the database query.' }, // 1054
    ER_PARSE_ERROR: { status: 400, message: 'Syntax error in the SQL query.' }, // 1064
    ER_LOCK_WAIT_TIMEOUT: { status: 408, message: 'Database lock wait timeout exceeded.' }, // 1205
    ER_LOCK_DEADLOCK: { status: 409, message: 'Deadlock detected in database operation.' }, // 1213
    ER_ROW_IS_REFERENCED: { status: 409, message: 'Cannot delete or update a parent row: a foreign key constraint fails.' }, // 1451
    ER_NO_REFERENCED_ROW: { status: 409, message: 'Cannot add or update a child row: a foreign key constraint fails.' }, // 1452
    ER_DATA_TOO_LONG: { status: 400, message: 'Data too long for column.' }, // 1406
    ER_OUT_OF_RESOURCES: { status: 500, message: 'Out of memory or resources in database.' }, // 1041
    ER_ACCESS_DENIED_ERROR: { status: 403, message: 'Access denied for user to the database.' }, // 1045
    ER_DBACCESS_DENIED_ERROR: { status: 403, message: 'Access denied for user to the specified database.' }, // 1044
    ER_CON_COUNT_ERROR: { status: 503, message: 'Too many connections to the database.' }, // 1040
    ER_TABLE_EXISTS_ERROR: { status: 409, message: 'Table already exists in the database.' }, // 1050
    ER_CANT_DROP_FIELD_OR_KEY: { status: 400, message: 'Can’t drop field or key in the database.' }, // 1091
    ER_NET_READ_ERROR: { status: 500, message: 'Network read error while connecting to the database.' }, // 1158
    ER_NET_WRITE_ERROR: { status: 500, message: 'Network write error while connecting to the database.' }, // 1159
    ER_TOO_MANY_KEY_PARTS: { status: 400, message: 'Too many parts specified for a key.' }, // 1070
    ER_WRONG_DB_NAME: { status: 400, message: 'Invalid database name.' }, // 1102
    ER_WRONG_TABLE_NAME: { status: 400, message: 'Invalid table name.' }, // 1103
    ER_TOO_MANY_COLUMNS: { status: 400, message: 'Too many columns specified in the query.' }, // 1117
    ER_UNKNOWN_CHARACTER_SET: { status: 400, message: 'Unknown character set used in the query.' }, // 1115
    ER_KEY_DOES_NOT_EXIST: { status: 400, message: 'Key does not exist in the table.' }, // 1176
    ER_UNSUPPORTED_EXTENSION: { status: 400, message: 'Unsupported SQL extension.' }, // 1235
    ER_TOO_LONG_FIELD_COMMENT: { status: 400, message: 'Field comment is too long.' }, // 1247
    ER_MUST_CHANGE_PASSWORD: { status: 403, message: 'Password change required.' }, // 1820
    ER_PASSWORD_NO_MATCH: { status: 400, message: 'Password does not match.' }, // 1133
    ER_PASSWORD_EXPIRED: { status: 403, message: 'Password has expired.' }, // 1820
    ER_JSON_DOCUMENT_TOO_DEEP: { status: 400, message: 'JSON document is too deep.' }, // 3141
    ER_JSON_TOO_LARGE: { status: 400, message: 'JSON document is too large.' }, // 3142
    ER_JSON_SYNTAX_ERROR: { status: 400, message: 'JSON syntax error.' }, // 3143
    ER_JSON_BAD_ONE_OR_ALL_ARG: { status: 400, message: 'Incorrect JSON argument.' }, // 3150
    ER_JSON_BAD_SCHEMA_VALIDATION: { status: 400, message: 'JSON schema validation error.' }, // 3160
    ER_UNKNOWN_ERROR: { status: 500, message: 'Unknown MySQL error occurred.' }, // 1105
    ER_WRONG_FIELD_SPEC: { status: 400, message: 'Incorrect field specification.' }, // 1166
    ER_TRUNCATED_WRONG_VALUE: { status: 400, message: 'Truncated incorrect value.' }, // 1366
    ER_DIVISION_BY_ZERO: { status: 400, message: 'Division by zero in SQL query.' }, // 1365
    ER_SP_DOES_NOT_EXIST: { status: 404, message: 'Stored procedure does not exist.' }, // 1305
    ER_EVENT_DOES_NOT_EXIST: { status: 404, message: 'Event does not exist.' }, // 1360
    ER_TRIGGER_DOES_NOT_EXIST: { status: 404, message: 'Trigger does not exist.' }, // 1360
    ER_PARTITION_MGMT_ON_NONPARTITIONED: { status: 400, message: 'Partition management operation on a non-partitioned table.' }, // 1505
    ER_ROW_IS_REFERENCED_2: { status: 409, message: 'Cannot delete or update a row that is referenced in another table.' }, // 1451
    ER_NO_REFERENCED_ROW_2: { status: 409, message: 'Cannot add or update a row with a foreign key that does not exist.' }, // 1452
    ER_SPATIAL_CANT_HAVE_NULL: { status: 400, message: 'Spatial index cannot contain NULL values.' }, // 1252
    ER_SPATIAL_INDEX_ON_TOO_BIG: { status: 400, message: 'Spatial index on a column with a data type that is too large.' }, // 1259
    ER_DATA_TRUNCATED: { status: 400, message: 'Data was truncated during processing.' }, // 1265
    ER_TABLENAME_TOO_LONG: { status: 400, message: 'Table name is too long.' }, // 1103
    ER_UNKNOWN_TABLE: { status: 404, message: 'Unknown table.' }, // 1109
    ER_BLOB_CANT_HAVE_DEFAULT: { status: 400, message: 'BLOB column cannot have a default value.' }, // 1101
    ER_AUTO_CONVERT_ERROR: { status: 500, message: 'Error converting data between types.' }, // 1367
    ER_AUTOINC_READ_FAILED: { status: 500, message: 'Auto-increment read failed.' }, // 1467
    ER_QUERY_INTERRUPTED: { status: 500, message: 'Query execution was interrupted.' }, // 1317
    ER_CUT_VALUE_GROUP_CONCAT: { status: 500, message: 'Result of GROUP_CONCAT function was cut off.' }, // 1260
    ER_ERROR_WHILE_EXECUTING_COMMAND: { status: 500, message: 'Error occurred while executing the command.' }, // 1314
    ER_NETWORK_READ_EVENT: { status: 500, message: 'Network read event failed.' }, // 1053
    ER_NETWORK_WRITE_EVENT: { status: 500, message: 'Network write event failed.' }, // 1054
    ER_SQL_MODE_ERROR: { status: 400, message: 'Invalid SQL mode setting.' }, // 1292
    ER_UNSUPPORTED_STORAGE_ENGINE: { status: 500, message: 'Storage engine is not supported.' }, // 1286
    ER_LOCK_OR_ACTIVE_TRANSACTION: { status: 500, message: 'Cannot perform the operation while a transaction is active.' }, // 1364
    ER_SPATIAL_CANT_HAVE_NULL_2: { status: 400, message: 'Spatial index cannot contain NULL values.' }, // 1252
};

function classifyDatabaseError(error) {
    const errorCode = extractErrorCode(error.message);

    return mysqlErrorMap[errorCode] || { status: 500, message: 'Unknown database error occurred.' };
}

function extractErrorCode(errorMessage) {
    const match = errorMessage.match(/ER_[A-Z_]+/);
    return match ? match[0] : null;
}