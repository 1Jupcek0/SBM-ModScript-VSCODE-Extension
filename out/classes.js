"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classes = void 0;
exports.classes = {
    "ADLog": {
        "className": "ADLog",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "A class for logging to Active Diagnostics.",
        "meathods": [
            {
                "meathodName": "Message",
                "meathodDescription": "Writes a message to Active Diagnostics",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "level",
                        "type": "int",
                        "description": "Corresponds to values from ADLogLevelConstants [page\n342].",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "Value will be converted to a string and written to the log.",
                        "optional": false
                    }
                ]
            }
        ],
        "properties": []
    },
    "AppDb": {
        "className": "AppDb",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A class for logging to Active Diagnostics.",
        "meathods": [
            {
                "meathodName": "ColName",
                "meathodDescription": "Converts the parameter to the form of a valid database column name, using the same\ntransformation applied when you enter logical field names in SBM Composer.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A column name in legal database form, containing only upper case\nletters and underscores, prefixed with \"TS_\".",
                "meathodParms": [
                    {
                        "name": "colname",
                        "type": "string",
                        "description": "Base name of field or column (without \"TS_\"). Can contain\nspaces, punctuation, and mixed case.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ExecuteSQL",
                "meathodDescription": "Executes SQL in the database. See important notes below.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to pass in.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "GetConnectionInfo",
                "meathodDescription": "Provides information on the data source name, the name of the\ndatabase, the name or IP address of the server that contains the database currently\nconnected to SBM, and whether the connection is remote.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method was successful; false if not.",
                "meathodParms": [
                    {
                        "name": "dsn",
                        "type": "string",
                        "description": "(Output) The data source name from ODBC that the\nconnection is using to access the database.",
                        "optional": false
                    },
                    {
                        "name": "dbname",
                        "type": "string",
                        "description": "(Output) The full database name that the connection is\naccessing.",
                        "optional": false
                    },
                    {
                        "name": "srvname",
                        "type": "string",
                        "description": "(Output) The server name that the connection is using to\naccess the DBMS. This could be a machine name or an IP\naddress.",
                        "optional": false
                    },
                    {
                        "name": "remote",
                        "type": "bool",
                        "description": "(Output) Always false.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadFolderItems",
                "meathodDescription": "Provides a list of items in a folder.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method was successful; false if not. A successful\nread may return zero results if no items match the query. Check for\nresults by calling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "list",
                        "type": "FolderItemList",
                        "description": "(Output) The list of items in the folder.",
                        "optional": false
                    },
                    {
                        "name": "folderId",
                        "type": "int",
                        "description": "The parent folder of the items you wish to access.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetDbType",
                "meathodDescription": "Returns the database connection type.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Oracle: 1\n• SQL Server: 2\n• Import Source DB possible values:\n▪ Access: 3\n▪ Sybase: 4\n▪ DB2: 5",
                "meathodParms": []
            },
            {
                "meathodName": "IsMSSQL",
                "meathodDescription": "Returns true if database connection is SQL Server",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if database connection is SQL Server.",
                "meathodParms": []
            },
            {
                "meathodName": "IsOracle",
                "meathodDescription": "Returns true if database connection is Oracle.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if database connection is Oracle.",
                "meathodParms": []
            },
            {
                "meathodName": "ReadIntWithSQL",
                "meathodDescription": "Reads any single integer out of the database.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The int value from the database.",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to pass in.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadTextWithSQL",
                "meathodDescription": "Reads any single varchar value, up to 256 characters, out of\nthe database.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The value that was read from the database.",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to pass in.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadIntegersWithSQL",
                "meathodDescription": "Reads any single varchar value, up to 256 characters, out of\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the Vector.empty() method.",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to pass in.",
                        "optional": false
                    },
                    {
                        "name": "out",
                        "type": "Vector",
                        "description": "The results of the query. Each entry in the Vector will be an\nint.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadTextValsWithSQL",
                "meathodDescription": "Reads multiple rows of a single text column from the\ndatabase, filling the Vector \"out\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the Vector.empty() method.",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to pass in.",
                        "optional": false
                    },
                    {
                        "name": "out",
                        "type": "Vector",
                        "description": "The results of the query. Each entry in the Vector will be an\nint.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadIntegerPairsWithSQL",
                "meathodDescription": "Reads multiple rows of two integer columns from the\ndatabase, filling the Vector \"out\" with Pair<int,int> values.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the Vector.empty() method.",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to pass in.",
                        "optional": false
                    },
                    {
                        "name": "out",
                        "type": "Vector",
                        "description": "The results of the query. Each entry in the Vector will be a\nPair of int values. See Pair, Map_Pair, and Dictionary_Pair\n[page 123].",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadDynaSQL",
                "meathodDescription": "Reads multiple rows of a set of columns from the database,\nfilling the Vector \"out\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the Vector.empty() method.",
                "meathodParms": [
                    {
                        "name": "sqlText",
                        "type": "string",
                        "description": "The SQL to invoke.",
                        "optional": false
                    },
                    {
                        "name": "sqlColumns",
                        "type": "Vector",
                        "description": "A Vector storing SQL output column definitions, where each\nentry is a SQLColumnDef [page 281].",
                        "optional": false
                    },
                    {
                        "name": "out",
                        "type": "Vector",
                        "description": "The results of the query. Each entry in the Vector will be a\nVector; each entry in that Vector is specified by the type\nfrom the corresponding entry in sqlColumns.\nFor instance, if sqlColumns has a DBConstants.INTEGER\nand a DBConstants.VARCHAR, each entry in the out Vector\nwill be a Vector that contains an int and a string.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "An optional Vector storing SQL bind parameters, where each\nentry is a Pair, with the first value as the parameter type\nand the second value as the value to bind to the SQL\nparameter. Corresponds to DBTypeConstants [page 347].\nSee Pair, Map_Pair, and Dictionary_Pair [page 123].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "WriteBlobToFile",
                "meathodDescription": "Get the contents of a blob written to the file system.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise",
                "meathodParms": [
                    {
                        "name": "blobID",
                        "type": "int",
                        "description": "The TS_ID of the blob from the TS_BLOBS table.",
                        "optional": false
                    },
                    {
                        "name": "filepath",
                        "type": "string",
                        "description": "The full file name and path to write the file to.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "UpdateBlobFromFile",
                "meathodDescription": "Put a file's contents into a blob.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise.",
                "meathodParms": [
                    {
                        "name": "blobID",
                        "type": "int",
                        "description": "The TS_ID of the blob from the TS_BLOBS table.",
                        "optional": false
                    },
                    {
                        "name": "filepath",
                        "type": "string",
                        "description": "The full file name and path to write the file to.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "UserId",
                "meathodDescription": "Gets the current user's TS_ ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the current user from the TS_USERS table.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "AppRecord": {
        "className": "AppRecord",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "AppRecord is the base object type for the majority of SBM objects. An AppRecord can\nrepresent any row of any table from the current SBM database. The table is specified by a\nnumeric table ID which must be supplied when the AppRecord is created. Thus,\nAppRecord objects must be created using Ext.CreateAppRecord() and cannot be created\nwith CreateObject(). For details on Ext.CreateAppRecord, refer to Ext.CreateAppRecord(\ntableId [, recType] ) [page 47]. For details on working with SBM database records, refer\nto Working with SBM Database Records [page 23].",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "This method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "On most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "Returns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "Returns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "Gets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "Gets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "Gets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "Gets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "Gets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "Gets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "Retrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "Returns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "Gets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "Returns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "Tests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "Tests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "Tests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "Locks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "Looks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "Used to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "Reads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "Reads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "Reads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "Sets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "Sets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "Unlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "This method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "Updates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": []
    },
    "AppRecordList": {
        "className": "AppRecordList",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "An AppRecordList contains a list of AppRecords of any subtype. The AppRecord objects on\na single AppRecordList need not be from the same table or of the same AppRecord\nsubtype, though homogeneous lists are easier to work with.\nAppRecordList, and all child classes, can be iterated using ChaiScript's for loop. See\nexample in ReadWithWhere() [page 193].",
        "meathods": [
            {
                "meathodName": "Count",
                "meathodDescription": "Returns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "DeleteRecord",
                "meathodDescription": "Removes the specified record from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "recordId",
                        "type": "int",
                        "description": "The TS_ID of the record to delete from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FindRecord",
                "meathodDescription": "Find a specific record in the current list by matching its name or TS_ID.",
                "meathodReturn": "AppRecord",
                "meathodReturnDescription": "The first AppRecord in the list that matches the given name or ID. If\nthere is no match, returns null. Use is_var_null() to check for null.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": "Variant",
                        "description": "If this parameter is a non-numeric string, it is taken as\nthe desired record's name. Otherwise, it is converted to\nan integer and taken as the desired record's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Length",
                "meathodDescription": "Returns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Read",
                "meathodDescription": "Fills the AppRecordList from its table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": []
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "Reads any record list type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "Reads any record list type by two column values.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "An alternative to Read(), this method uses SQL to select\nonly certain records from the calling AppRecordList's table, rather than reading the entire\ntable.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "A SQL \"where clause\" specifying the records to find. SBM\nwill build a SQL string requesting all fields for the calling\nAppRecordList's table. The string contents of\nwhereClause will appear after the word \"where\" in this\nSQL statement.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "Params is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, with the first\nvalue as the parameter type and the second value as the\nvalue to bind to the SQL parameter. See Pair, Map_Pair,\nand Dictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page\n347].",
                        "optional": true
                    },
                    {
                        "name": "orderBy",
                        "type": "string",
                        "description": "Identifies a column used for ordering the AppRecordList.\nTo use the templateRec parameter without the orderBy\nparameter, use an empty string as a parameter for the\norderBy parameter.",
                        "optional": true
                    },
                    {
                        "name": "templateRec",
                        "type": "AppRecord",
                        "description": "Optional. Identifies which fields are read into all\nAppRecords in the AppRecordList. Using this parameter\nmay improve performance when using AppRecordOjbects\nwhich contain a VarFieldList from Primary or Auxiliary\ntables.\nTo use this optional parameter, create a VarRecord\nagainst the Primary table you are doing your\nReadWithWhere against. Get the VarFieldList of that\nVarRecord through the Fields() method. Call SelectAll,\nand pass it false to clear all fields. Then, explicitly turn\non the fields you wish to read by finding the Field on the\nVarFieldList, and then calling that Field's Select() method\nand passing it true.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "clear",
                "meathodDescription": "Removes all records from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "Returns true if the list is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the list is empty; false if there are items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "erase_at",
                "meathodDescription": "Removes the item at specified index from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero-based index of the item to remove from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "size",
                "meathodDescription": "Returns the number of items in the list",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Update",
                "meathodDescription": "Perform a database update on all records in the list.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if all applicable records are successfully updated; false\notherwise.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "Change": {
        "className": "Change",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "Each time users modify an SBM table in the system using a browser, it is logged as a\nChange object in the TS_CHANGES table. This class is mainly used in conjunction with the\nChangeList class. Once a change list is found for a table record, the ChangeList is a list of\nChange objects. This class can be used to access member variables that describe the\nchange. You can read and write with this class by using the inherited AppRecord methods.\nAll of the methods listed on this class directly relate to fields on the Changes table. Please\nsee the SBM schema document for details of each of the fields.",
        "properties": [
            {
                "propertyName": "Action",
                "propertyDescription": "Numeric code classifying the type of change, as listed in the Action\nCodes table.\nCode Description\n0 A record was submitted\n1 A record was modified\n2 A record was deleted\n3 An attachment was added\n4 An attachment was updated\n5 An attachment was deleted",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "FldId",
                "propertyDescription": "TS_ID of the field that was modified during this change.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "FldType",
                "propertyDescription": "Data type of the field that was modified during this change. ID\nTypes are listed in the following table.\nType Description\n100 Numeric field (integer or floating point)\n101 Text field\n103 Date/Time field\n104 Drop-down Selection field\n105 Binary/Trinary field\n106 The system-defined State field (a selection field)\n107 User field (a selection field)\n108 System-defined Project field (a selection field)\nSBM ModScript Reference Guide 199\nType Description\n109 Calculated Summation fields\n110 Multi-Selection field\n111 Contact Selection field\n113 Incident Selection field\n116 Folder link Selection field\n122 Relational field\n123 Sub-Relational field\n124 System field\n125 Multi-Relational field\n126 Multi-User field\n127 Multi-Group field",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "IssueId",
                "propertyDescription": "TS_ID of the record that was modified. Use in conjunction with the\nTableId property to find the record.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "NewChar",
                "propertyDescription": "If the modified field's data type was text, this field holds the\nfield's value after the change. Check the Type property to determine whether this\nproperty is valid.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "NewInt",
                "propertyDescription": "If the modified field's data type was an integer, this field holds the\nfield's value after the change. Check the Type property to determine whether this\nproperty is valid.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "NewReal",
                "propertyDescription": "If the modified field's data type was a floating point number,\nthis field holds the field's value after the change. Check the Type property to\ndetermine whether this property is valid.",
                "propertyType": "double",
                "readOnly": true
            },
            {
                "propertyName": "PriorChar",
                "propertyDescription": "If the modified field's data type was text, this field holds the\nfield's value before the change. Check the Type property to determine whether this\nproperty is valid.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "PriorInt",
                "propertyDescription": "If the modified field's data type was an integer, this field holds the\nfield's value before the change. Check the Type property to determine whether this\nproperty is valid.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "PriorReal",
                "propertyDescription": "If the modified field's data type was a floating point number,\nthis field holds the field's value before the change. Check the Type property to\ndetermine whether this property is valid.",
                "propertyType": "double",
                "readOnly": true
            },
            {
                "propertyName": "TableId",
                "propertyDescription": "Table ID of the record that was modified. Use in conjunction with the\nIssueId property to find the record.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "Time",
                "propertyDescription": "Returns the time that change was made, as the number of seconds\nsince the beginning of Jan. 1, 1970. To get the time as a formatted string, use the\nGetTime property. To convert it to a Date quantity, use the TimeT [page 296] class.",
                "propertyType": "int64_t",
                "readOnly": true
            },
            {
                "propertyName": "Type",
                "propertyDescription": "Identifies the database type of the quantity that changed, according to\nthe data types listed in the following table. If the quantity was an integer, then its\nold and new values are available in the PriorInt and NewInt properties. If it was a\nfloating point number, then PriorReal and NewReal are valid. If it was text, then\nPriorChar and NewChar are valid.\nID Description\n0 Modification to an integer\n1 Modification to a floating point\n2 Modification to a Text field",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "UserId",
                "propertyDescription": "TS_ID of the user who made the change. Use the GetUserName\nmethod if the name of the user is needed.",
                "propertyType": "int",
                "readOnly": true
            }
        ],
        "meathods": [
            {
                "meathodName": "GetTime",
                "meathodDescription": "Returns the date and time of the change, formatted as a string.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The date the change was created in the given format.",
                "meathodParms": [
                    {
                        "name": "format",
                        "type": "Variant",
                        "description": "If int, a code telling how to format the date/time.\nIf a User object, that user's date/time format preference\nwill be used. If omitted, the format defaults as indicated in\nthe following list.\nValid int format codes:\n• 1 – mm/dd/YYYY hh:mm:ss pp (default)\n• 2 – dd/mm/YYYY hh:mm:ss pp\n(\"pp\" denotes the AM/PM indicator)",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "GetUserName",
                "meathodDescription": "Returns the display name of the user who made the change.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The display name of the user who made the change.",
                "meathodParms": []
            },
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "inheritsDone": true
    },
    "ChangeList": {
        "className": "ChangeList",
        "exposed": false,
        "inheritsFrom": "AppRecordList",
        "classDescription": "A ChangeList is an AppRecordList that holds Change objects. Typically, a ChangeList\nrepresents the history of an SBM item, using the ReadWithWhere() method to read all\nChange records for a specific item.",
        "meathods": [
            {
                "meathodName": "Count",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "DeleteRecord",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the specified record from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "recordId",
                        "type": "int",
                        "description": "The TS_ID of the record to delete from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FindRecord",
                "meathodDescription": "inherited -> AppRecordList\nFind a specific record in the current list by matching its name or TS_ID.",
                "meathodReturn": "AppRecord",
                "meathodReturnDescription": "The first AppRecord in the list that matches the given name or ID. If\nthere is no match, returns null. Use is_var_null() to check for null.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": "Variant",
                        "description": "If this parameter is a non-numeric string, it is taken as\nthe desired record's name. Otherwise, it is converted to\nan integer and taken as the desired record's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Length",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecordList\nFills the AppRecordList from its table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": []
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by two column values.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecordList\nAn alternative to Read(), this method uses SQL to select\nonly certain records from the calling AppRecordList's table, rather than reading the entire\ntable.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "A SQL \"where clause\" specifying the records to find. SBM\nwill build a SQL string requesting all fields for the calling\nAppRecordList's table. The string contents of\nwhereClause will appear after the word \"where\" in this\nSQL statement.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "Params is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, with the first\nvalue as the parameter type and the second value as the\nvalue to bind to the SQL parameter. See Pair, Map_Pair,\nand Dictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page\n347].",
                        "optional": true
                    },
                    {
                        "name": "orderBy",
                        "type": "string",
                        "description": "Identifies a column used for ordering the AppRecordList.\nTo use the templateRec parameter without the orderBy\nparameter, use an empty string as a parameter for the\norderBy parameter.",
                        "optional": true
                    },
                    {
                        "name": "templateRec",
                        "type": "AppRecord",
                        "description": "Optional. Identifies which fields are read into all\nAppRecords in the AppRecordList. Using this parameter\nmay improve performance when using AppRecordOjbects\nwhich contain a VarFieldList from Primary or Auxiliary\ntables.\nTo use this optional parameter, create a VarRecord\nagainst the Primary table you are doing your\nReadWithWhere against. Get the VarFieldList of that\nVarRecord through the Fields() method. Call SelectAll,\nand pass it false to clear all fields. Then, explicitly turn\non the fields you wish to read by finding the Field on the\nVarFieldList, and then calling that Field's Select() method\nand passing it true.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "clear",
                "meathodDescription": "inherited -> AppRecordList\nRemoves all records from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "inherited -> AppRecordList\nReturns true if the list is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the list is empty; false if there are items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "erase_at",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the item at specified index from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero-based index of the item to remove from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "size",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecordList\nPerform a database update on all records in the list.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if all applicable records are successfully updated; false\notherwise.",
                "meathodParms": []
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "DbImport": {
        "className": "DbImport",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "DbImport is a class that contains values representing the source database values. For\ndetails on using DbImport, refer to Database Import Shell Properties [page 53].",
        "meathods": [
            {
                "meathodName": "SrcColumn",
                "meathodDescription": "The database column from the source database.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The name of column from the source database.",
                "meathodParms": []
            },
            {
                "meathodName": "SrcType",
                "meathodDescription": "The database column type from the source database.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The column type from the source database. \nThe following database data types are supported:\n• 1 SQL_CHAR\n• 2 SQL_NUMERIC\n• 3 SQL_DECIMAL\n• 4 SQL_INTEGER\n• 5 SQL_SMALLINT\n• 6 SQL_FLOAT\n• 7 SQL_REAL\n• 8 SQL_DOUBLE\n• 9 SQL_DATE\n• 10 SQL_TIME\n• 11 SQL_TIMESTAMP\n• 12 SQL_VARCHAR\n• 91 SQL_TYPE_DATE\n• 92 SQL_TYPE_TIME\n• 93 SQL_TYPE_TIMESTAMP\n• -1 SQL_LONGVARCHAR\n• -5 SQL_BIGINT\n• -6 SQL_TINYINT",
                "meathodParms": []
            },
            {
                "meathodName": "SrcLabel",
                "meathodDescription": "If an \"Int\" type value maps to a reference table, this string value represents the label\nfrom the source database.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The referenced label.",
                "meathodParms": []
            },
            {
                "meathodName": "DestFldId",
                "meathodDescription": "If mapped, this value represents the destination (SBM) field ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the field that this column is mapped to in the SBM\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "SrcData",
                "meathodDescription": "The actual data from the source database.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The data read from the database.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "Dictionary": {
        "className": "Dictionary",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A class for supporting dictionary objects in scripts that are converted from SBM AppScript\nto SBM ModScript. A dictionary is a case sensitive key-value container. In general, use\nChaiScript's Map instead.",
        "meathods": [
            {
                "meathodName": "at",
                "meathodDescription": "Accesses value at location key. Throws exception if not found.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Value at location key. Throws exception if not found.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "key",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "size",
                "meathodDescription": "Returns the count of items in the container.",
                "meathodReturn": "uint64_t",
                "meathodReturnDescription": "The count of items in the container.",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "Returns if the container is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the container is empty. False otherwise.",
                "meathodParms": []
            },
            {
                "meathodName": "clear",
                "meathodDescription": "Removes all items from the container",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "count",
                "meathodDescription": "Returns 1 if key is found inside the container; otherwise, 0.",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "1 if key is found inside the container; otherwise, 0.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "key",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "insert",
                "meathodDescription": "Inserts entry into the container.\nDictionary_Pair is the data type that represents an entry.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "entry",
                        "type": "Dictionary_Pair",
                        "description": "Dictionary_Pair of the entry that you want to insert.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Add",
                "meathodDescription": "Adds an entry to the container. Throws if key is already in\nthe dictionary.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "Key of the entry that you want to insert.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value of the entry that you want to insert.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Remove",
                "meathodDescription": "Removes the entry with key. Returns true if found.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if found.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "key",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "RemoveAll",
                "meathodDescription": "Removes all items from the container.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "Count",
                "meathodDescription": "Returns the count of items in the container.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The count of items in the container.",
                "meathodParms": []
            },
            {
                "meathodName": "Item",
                "meathodDescription": "Accesses value at location key. Inserts value if not found.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Value at location key.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "key",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Key",
                "meathodDescription": "Inserts key if not found.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "SetKey",
                "meathodDescription": "Moves entry from keyOrig to keyNew.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "keyOrig",
                        "type": "string",
                        "description": "Orginal Key",
                        "optional": false
                    },
                    {
                        "name": "keyNew",
                        "type": "string",
                        "description": "New Key",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Exists",
                "meathodDescription": "Returns true if key is found.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if key is found.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "key",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Keys",
                "meathodDescription": "Returns a Vector of keys.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Vector of keys.",
                "meathodParms": []
            },
            {
                "meathodName": "Items",
                "meathodDescription": "Returns a Vector of values.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Vector of values.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "Ext": {
        "className": "Ext",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "\"Ext\" is another SBM application object containing extensions to ChaiScript's built-in\n\tfunctions. These functions provide features or conversions not available in core ChaiScript.\n\t\"Ext\" contains merely functions, not data.",
        "meathods": [
            {
                "meathodName": "AcquireLock",
                "meathodDescription": "A mutex-locking function called by a concurrent script when\n\t\t\t\tit needs to use a shared resource that should only be accessed by one script at a time.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if a lock was acquired successfully. Returns false if the\n\t\t\t\ttime-out period passed. If false, the script should not execute\n\t\t\t\tsensitive operations because another concurrent script has the lock.",
                "meathodParms": [
                    {
                        "name": "msTimeout",
                        "type": "int",
                        "description": "Optional. The number of milliseconds to wait for the lock to\n\t\t\t\t\t\tbe available. Defaults to an infinite wait.\n\t\t\t\t\t\tWhile the script is waiting, its execution is frozen. This may\n\t\t\t\t\t\tcause performance problems for long scripts or scripts that\n\t\t\t\t\t\toccur repeatedly. The wait occurs until other scripts have\n\t\t\t\t\t\treleased the lock.\n\t\t\t\t\t\tAll scripts share the same mutex.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "AppendTextFile",
                "meathodDescription": "Writes the string contents to the file referred to by string\n\t\t\t\tfileName, appending to the file's previous contents.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns the parameter \"contents\".",
                "meathodParms": [
                    {
                        "name": "fileName",
                        "type": "string",
                        "description": "Specifies a fully-qualified path and file name. The fileName\n\t\t\t\t\t\tcan be any valid file path, including a path to a network\n\t\t\t\t\t\tdevice.",
                        "optional": false
                    },
                    {
                        "name": "contents",
                        "type": "Variant",
                        "description": "The value to be appended to the file contents",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CmdLineWait",
                "meathodDescription": "Executes the string cmdLine in the operating system's command\n\t\t\t\tline interpreter and waits for the command to finish.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The command line interpreter's return value, which is the exit code\n\t\t\t\tof the program or batch file called.",
                "meathodParms": [
                    {
                        "name": "cmdLine",
                        "type": "string",
                        "description": "This argument can contain redirect symbols, pipe characters,\n\t\t\t\t\t\twildcards, and anything else legal at a command line\n\t\t\t\t\t\tprompt. The Operating System account that is executing the\n\t\t\t\t\t\tscript on the server requires privilege to perform any\n\t\t\t\t\t\tcommand is invoked.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CreateAppRecord",
                "meathodDescription": "Creates a new AppRecord object of a subtype appropriate for the database table specified\n\t\t\t\tby tableId.",
                "meathodReturn": "AppRecord",
                "meathodReturnDescription": "The newly-created AppRecord object.",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "A value from TS_TABLES. See Ext.TableId() [page 96].",
                        "optional": false
                    },
                    {
                        "name": "fieldType",
                        "type": "int",
                        "description": "Optional. When creating field objects, specifies the data type\n\t\t\t\t\t\tto be stored in the field. See FieldTypeConstants [page 350].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "CreateAppRecordList",
                "meathodDescription": "Creates list objects that can hold multiple items from the given table.",
                "meathodReturn": "AppRecordList",
                "meathodReturnDescription": "The newly created AppRecordList object. Objects on the list are of\n\t\t\t\ttype AppRecord, though they may represent objects of any\n\t\t\t\tAppRecord subtype.\n\t\t\t\t",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "A value from TS_TABLES. See Ext.TableId() [page 96].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CreateProjectBasedRecord",
                "meathodDescription": "Returns objects that are of the subtype ProjectBasedRecord.",
                "meathodReturn": "ProjectBasedRecord",
                "meathodReturnDescription": "The newly-created ProjectBasedRecord object containing a field\n\t\t\t\tlist with all variable fields defined for the given table. The fields\n\t\t\t\tare created empty and can be written to individually or\n\t\t\t\tpopulated for a specific item using the Read() method. The\n\t\t\t\treturned object supports all functionality for a primary table\n\t\t\t\titem.\n\t\t\t\t",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "A value from TS_TABLES. See Ext.TableId() [page 96].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CreateVarRecord",
                "meathodDescription": "Returns objects of the subtype VarRecord.",
                "meathodReturn": "VarRecord",
                "meathodReturnDescription": "The newly-created VarRecord object containing a field list with all\n\t\t\t\tvariable fields defined for the given table. The fields are created\n\t\t\t\tempty and can be written to individually or populated for a specific\n\t\t\t\titem using the Read() method.",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "A value from TS_TABLES. See Ext.TableId() [page 96].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "DateToDbLong",
                "meathodDescription": "Converts the variant date value date to the int format used in an SBM database.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns the int date value",
                "meathodParms": [
                    {
                        "name": "date",
                        "type": "Variant",
                        "description": "Use this parameter to convert the variant date value to the\n\t\t\t\t\t\tnumber of seconds since midnight, Jan. 1, 1970. This is not\n\t\t\t\t\t\tthe same as converting date to an int using other built-in\n\t\t\t\t\t\toperators; that conversion yields the number of days since\n\t\t\t\t\t\tmidnight Dec. 31, 1899.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "DbLongToDate",
                "meathodDescription": "Converts the int value to the variant date value format used in an SBM database.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The variant date value.",
                "meathodParms": [
                    {
                        "name": "dateInt",
                        "type": "int",
                        "description": "Use this argument to convert the int date value from the\nnumber of seconds since midnight, Jan. 1, 1970 to a Variant\nstoring a date. This is not the same as converting dateInt to\na Date using other built-in operators; that conversion\ninterprets dateInt as the number of days since midnight Dec.\n31, 1899.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "DirtyTableCache",
                "meathodDescription": "Clears Application Engine cache for a specified table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the table was cached. Throws an exception if the table\ndoes not exist.",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "A value from TS_TABLES. See Ext.TableId() [page 96].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "EncodeHTML",
                "meathodDescription": "Escapes HTML values in a string.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The HTML-encoded version of the string value.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The text that may have HTML characters that need to be\nescaped.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "EncodeJavaScript",
                "meathodDescription": "Escapes JavaScript values in a string.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The JavaScript-encoded version of the string value.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The text that may have JavaScript characters that need to be\nescaped.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "EncodeURL",
                "meathodDescription": "Escapes special character values in a URL string.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The URL-encoded version of the string urlString.",
                "meathodParms": [
                    {
                        "name": "urlString",
                        "type": "string",
                        "description": "The text that may have characters that need to be escaped.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FileExists",
                "meathodDescription": "Determines whether the file specified in fileName exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the file exists; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fileName",
                        "type": "string",
                        "description": "Use the fileName parameter to provide a fully-qualified path\nand file name. The fileName can be any valid file path,\nincluding a path to a network device.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetCharacterSet",
                "meathodDescription": "(Deprecated—always returns \"UTF-8\")",
                "meathodReturn": "bool",
                "meathodReturnDescription": "UTF-8",
                "meathodParms": []
            },
            {
                "meathodName": "GetCompatibilityVersion",
                "meathodDescription": "Gets the compatibility version. Refer to Ext.SetCompatibilityVersion().",
                "meathodReturn": "string",
                "meathodReturnDescription": "A string in the form majorVersion.minorVersion (for example,\n\"11.3\").",
                "meathodParms": []
            },
            {
                "meathodName": "HasLock",
                "meathodDescription": "Determines if the current script has a mutex lock.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the current script has a lock; otherwise, false.",
                "meathodParms": []
            },
            {
                "meathodName": "IsStringValidUTF8",
                "meathodDescription": "Returns true if string contents are valid UTF8.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the contents are valid UTF8.",
                "meathodParms": [
                    {
                        "name": "s",
                        "type": "string",
                        "description": "Use this parameter to provide a string to evaluate.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "LoadString",
                "meathodDescription": "If your SBM user interface uses multiple languages, this function returns the specified\nstring ID in the language specified by each user.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns the translated string associated with the stringId.",
                "meathodParms": [
                    {
                        "name": "stringId",
                        "type": "string",
                        "description": "Use this parameter to specify a record in the String\nIdentifiers table. For example, Ext.LoadString(\n\"IDS_REPORTS_MYREPORTS\" ) returns the string associated\nwith the My Reports text in the browser interface.",
                        "optional": false
                    },
                    {
                        "name": "arg (up to 6)",
                        "type": "string",
                        "description": "Use up to six optional parameters, which can be a string\nidentifier, in which case it will be loaded like stringId.\nOtherwise, the value will be treated as literal text, integer,\ndouble, etc.\nThese values will be used to format a string using the text\nloaded from stringId as the format, with entries like {0}\nthat correspond to arg0 etc.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "LockIsAvailable",
                "meathodDescription": " Determines if the mutex lock is available to be acquired.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if a concurrent script lock is available to be acquired.\nReturns false if the concurrent script lock is not available to be\nacquired.",
                "meathodParms": []
            },
            {
                "meathodName": "LogErrorMsg",
                "meathodDescription": "Writes an error message to the Application Event Log.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "msg",
                        "type": "Variant",
                        "description": "Use this parameter to provide an error message that\nappears in the Windows Event Viewer.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "LogInfoMsg",
                "meathodDescription": "Writes an info message to the Application Event Log.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "msg",
                        "type": "Variant",
                        "description": "Use this parameter to provide an info message that\nappears in the Windows Event Viewer.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "LogWarningMsg",
                "meathodDescription": "Writes a warning message to the Application Event Log.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "msg",
                        "type": "Variant",
                        "description": "Use this parameter to provide an warning message that\nappears in the Windows Event Viewer.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "NewTask",
                "meathodDescription": "Executes an external application as a new process, passing any\ngiven arguments.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the operating system handle of the new process. This handle\nis useless within SBM ModScript, but occasionally a script may have\nsome reason to pass the handle to another program. The\napplication's exit code is unavailable because this function generally\nreturns before the application exits.",
                "meathodParms": [
                    {
                        "name": "appName",
                        "type": "string",
                        "description": "The appName can be any external application.\n• If appName does not contain a path component, it is\nsearched for in the path list given by the optional SBM\nregistry setting \"ScriptAppPath.\" If not found, appName\nis then searched for in the path list given by the\noperating system's environment variable \"Path.\"\nScriptAppPath conforms to the same syntax as Path.\n• Folder paths are separated by semicolons, environment\nvariables are surrounded by '%' characters, and spaces\ndo not need to be escaped or quoted.\n• Unlike Path, any quotes in ScriptAppPath are interpreted\nliterally as part of the folder name.\n• If appName does not contain a file extension, the system\ntries .COM, .EXE, .BAT, and then .CMD. Arguments\nfollowing appName are optional.",
                        "optional": false
                    },
                    {
                        "name": "arg (up to 6)",
                        "type": "Variant",
                        "description": "Optional. Between 0-6 parameters to pass to the command.\nFor more than 6 parameters, pass a single Vector with unlimited parameters",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "NewTaskWait",
                "meathodDescription": "Executes an external application, passing any given arguments\nand awaiting the results.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the application's exit code. For details about exit codes, refer\nto Ext.CmdLineWait() [page 65].",
                "meathodParms": [
                    {
                        "name": "appName",
                        "type": "string",
                        "description": "The appName can be any external application.\n• If appName does not contain a path component, it is\nsearched for in the path list given by the optional SBM\nregistry setting \"ScriptAppPath.\" If not found, appName\nis then searched for in the path list given by the\noperating system's environment variable \"Path.\"\nScriptAppPath conforms to the same syntax as Path.\n• Folder paths are separated by semicolons, environment\nvariables are surrounded by '%' characters, and spaces\ndo not need to be escaped or quoted.\n• Unlike Path, any quotes in ScriptAppPath are interpreted\nliterally as part of the folder name.\n• If appName does not contain a file extension, the system\ntries .COM, .EXE, .BAT, and then .CMD. Arguments\nfollowing appName are optional.",
                        "optional": false
                    },
                    {
                        "name": "arg (up to 6)",
                        "type": "Variant",
                        "description": "Optional. Between 0-6 parameters to pass to the command.\nFor more than 6 parameters, pass a single Vector with unlimited parameters",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "OutputStreamExists",
                "meathodDescription": "Checks if an output stream exists, such as an HTTP connection to the user's browser. If\nso, scripts can write to it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the output stream exists; false otherwise.",
                "meathodParms": []
            },
            {
                "meathodName": "PrimaryTableId",
                "meathodDescription": "Provides the TS_ID of a primary table for a specific application.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the TS_ID of the primary table for the specified application.",
                "meathodParms": [
                    {
                        "name": "applicationPrefixOrId",
                        "type": "Variant",
                        "description": "If applicationPrefixOrID is a non-numeric string, it is\ntaken as the application's prefix, such as TTT.\nBecause application prefixes do not need to be\nunique, the first table with the prefix encountered is\nreturned. If applicationPrefixOrID is numeric, it is\ntaken as the application's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadTextFile",
                "meathodDescription": "Opens, reads, and closes a file.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns string holding entire contents of file referred to by fileName.",
                "meathodParms": [
                    {
                        "name": "fileName",
                        "type": "string",
                        "description": "Specifies a fully-qualified path and file name. The fileName\ncan be any valid file path, including a path to a network\ndevice.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReleaseLock",
                "meathodDescription": "Releases a mutex-lock acquired by the current script",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the lock was released successfully. Returns false if the\nlock was not released.",
                "meathodParms": []
            },
            {
                "meathodName": "SetCompatibilityVersion",
                "meathodDescription": "The compatibility version controls how Variant interacts with dates:\n• A value of 7.0 or higher will cause Variant to process date strings as ISO 8601 and\nstore them as a double, which holds the number of days since Dec 30, 1899.\n• A compatibility version less than 7.0 will cause Variant to process date strings using\nthe system locale and store them as an integer number of seconds since Jan 1, 1970\n(GMT).",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true",
                "meathodParms": [
                    {
                        "name": "majorVersion",
                        "type": "int",
                        "description": "This is the major version number for the version of SBM with\nwhich you want the script to be compatible.",
                        "optional": false
                    },
                    {
                        "name": "minorVersion",
                        "type": "int",
                        "description": "Optional; 0 by default. This is the minor version number for\nthe version of SBM with which you want your script to be\ncompatible.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "SetCookie",
                "meathodDescription": "Allows SBM ModScript to set HTTP cookies.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the cookie is successfully added or modified; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "sNameValue",
                        "type": "string",
                        "description": "Use this parameter to add a cookie name that does not exist\nor update the value of a cookie name that exists.\nExample: \"CookieName=CookieValue.\"",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetCookieExists",
                "meathodDescription": "Determines if cookies are available in the context.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "If true, SBM ModScript can set cookies; false otherwise.",
                "meathodParms": []
            },
            {
                "meathodName": "ShellHasProp",
                "meathodDescription": "Determines if Shell has a specified property.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the string is the name of an existing shell property;\nfalse otherwise.",
                "meathodParms": [
                    {
                        "name": "propName",
                        "type": "string",
                        "description": "The name of the property to check.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Sleep",
                "meathodDescription": "Freezes script execution and the thread that called the script\nfor the specified number of milliseconds.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "milliseconds",
                        "type": "int",
                        "description": "Specifies the number of milliseconds for which a script\nexecution should sleep.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SolutionIdForPrefix",
                "meathodDescription": "Provides the TS_ID of the specified prefix string.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the TS_ID of the first application encountered in the\ndatabase with the specified prefix.",
                "meathodParms": [
                    {
                        "name": "applicationPrefix",
                        "type": "string",
                        "description": "Specifies an application prefix string, such as \"UBG\".\nBecause application prefixes do not need to be unique, the\nfirst table with the prefix encountered is returned.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SolutionIdForTable",
                "meathodDescription": "Provides the TS_ID of an application with the specified primary table.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the TS_ID of the application. 0 if not found.",
                "meathodParms": [
                    {
                        "name": "table",
                        "type": "Variant",
                        "description": "Returns the TS_ID of the application with the specified\nprimary table. If table is a non-numeric string, it is taken\nas the table's database name, such as \"UBG_ISSUES\". If it\nis numeric, it is taken as the table's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "TableDatabaseName",
                "meathodDescription": "Returns the database name of the specified table.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns the database name of the table if the display name exists. If\nnot, an empty string is returned.",
                "meathodParms": [
                    {
                        "name": "table",
                        "type": "Variant",
                        "description": "Specifies a table's display name in order to return the\ntable's database name. If table is a non-numeric string, it\nis taken as the table's display name, such as \"Issues\".\nOtherwise, the parameter is converted to a number and\ntaken as the table's ID. Use caution when using the display\nname because it can be changed in SBM Composer.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "TableId",
                "meathodDescription": "Returns the numeric ID of the specified table. If the table does not exist, returns zero.\nExamples:\nvar myTableId = Ext.TableId( \"APP_WORKFLOW\", \"workflow\" ) );\nvar myTableId = Ext.TableId( 8, \"workflow\" ) );\nvar myTableId = Ext.TableId( \"f4c6fa0d-5484-4dd3-b443-5363c4573a18\",\n\"project\" ) );",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the numeric ID of the specified table. If the table does not exist, returns zero",
                "meathodParms": [
                    {
                        "name": "tableName",
                        "type": "Variant",
                        "description": "Specifies a table display name or database name. If the\noptional nameType parameter is omitted or equals\n\"database\", the tableName parameter is taken as the\ntable's database name, such as \"UBG_ISSUES\". If the\nnameType parameter equals \"display\", tableName is taken\nas the table's display name, such as \"Issues\". Use caution\nwhen using the display name because it can be changed in\nSBM Composer.",
                        "optional": false
                    },
                    {
                        "name": "nameType",
                        "type": "string",
                        "description": "Behavior depends on the value:\n• \"database\": (default) The tableName value is taken as\nthe TS_TABLES.TS_DBNAME of the table.\n• \"display\": The tableName value is taken as the\nTS_TABLES.TS_NAME of the table.\n• \"project\": The tableName value is taken as the TS_ID,\ninternal name, or UUID, of a project. If a matching\nproject is found, the corresponding table ID is returned.\n• \"workflow\": The tableName value is taken as the TS_ID,\ninternal name, or UUID, of a workflow. If a matching\nworkflow is found, the corresponding table ID is\nreturned.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "TableSingularName",
                "meathodDescription": "Returns the singular name of the specified table.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns the singular name of the specified table. Returns an empty\nstring if the specified table does not exist.",
                "meathodParms": [
                    {
                        "name": "table",
                        "type": "Variant",
                        "description": "Specifies a tables's database name or TS_ID. If a nonnumeric string, it is taken as the table's database name,\nsuch as \"UBG_ISSUES\". Otherwise, the parameter is\nconverted to a number and taken as the table's ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "TeamTrackDLLName",
                "meathodDescription": "Provides the name of the SBM DLL.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns \"tmtrack.dll\".",
                "meathodParms": []
            },
            {
                "meathodName": "UnencodeURL",
                "meathodDescription": "Converts URL-encoded version of urlString from hex-encoded sequences.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The unencoded version of the string.",
                "meathodParms": [
                    {
                        "name": "urlString",
                        "type": "string",
                        "description": "Use this parameter to provide a string to unencode.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "WriteStream",
                "meathodDescription": "Writes to the current output stream.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the write operation succeeded; false otherwise.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "The value should be properly encoded, depending on the\ncontext. For instance, if the context is pre-transition script,\nthe output is the transition form; therefore, the value\nshould be HTML or potentially JavaScript.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "WriteTextFile",
                "meathodDescription": "Writes the string contents to the file referred to by string\nfileName, overwriting the file's previous contents.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns the string parameter \"contents\".",
                "meathodParms": [
                    {
                        "name": "fileName",
                        "type": "string",
                        "description": "Specifies a fully-qualified path and file name. The fileName\ncan be any valid file path, including a path to a network\ndevice.",
                        "optional": false
                    },
                    {
                        "name": "contents",
                        "type": "Variant",
                        "description": "The value to be written to the file.",
                        "optional": false
                    }
                ]
            }
        ],
        "properties": []
    },
    "Field": {
        "className": "Field",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "A Field object represents a variable field, from a primary or auxiliary item. Field objects\nare typically retrieved using the VarRecord method GetFieldValue() or the VarFieldList\nmethod FindField(). Field methods allow you to read and write the field's value and control\nwhether it will be processed when the item is updated in the database.",
        "meathods": [
            {
                "meathodName": "AppendJournalText",
                "meathodDescription": "Appends text to a journal entry.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is a Journal Text field (and hence the text\nwas appended); false if not.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The text to append as a journal entry.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetDbValueString",
                "meathodDescription": "Gets the field's internal value as it is currently stored in the database.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDbValueInt",
                "meathodDescription": "Gets the field's internal value as it is currently stored in the database.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDbValueInt64",
                "meathodDescription": "Gets the field's internal value as it is currently stored in the database.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDbValueDouble",
                "meathodDescription": "Gets the field's internal value as it is currently stored in the database.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "Gets the field's internal value as it is currently stored in the database.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDbValue",
                "meathodDescription": "Gets the field's internal value as it is currently stored in the database.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayValue",
                "meathodDescription": "Gets the current value of this field, reflecting any changes that may have been made since\nthe last database Update().",
                "meathodReturn": "string",
                "meathodReturnDescription": "The field's current value as a formatted string.",
                "meathodParms": [
                    {
                        "name": "checkPrivs",
                        "type": "bool",
                        "description": "Defaults to true if omitted. If true, the value will\nonly be supplied if the current user has sufficient privileges\nto see this field.",
                        "optional": true
                    },
                    {
                        "name": "format",
                        "type": "string",
                        "description": "For File or URL fields, the value \"json\" indicates\nthat the output should be a JSON string value.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "GetRequiredFlag",
                "meathodDescription": "Used to check whether or not a field is required.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns a value that corresponds to the constant\nFieldRequiredConstants. For details, see FieldRequiredConstants\n[page 350].",
                "meathodParms": []
            },
            {
                "meathodName": "GetSelectionList",
                "meathodDescription": "Returns a list of all possible selection values for single and multi-select fields.",
                "meathodReturn": "AppRecordList",
                "meathodReturnDescription": "All possible selections, as AppRecord objects from the\nTS_SELECTIONS table.",
                "meathodParms": []
            },
            {
                "meathodName": "GetType",
                "meathodDescription": "Returns a code that identifies the type of data stored in a field.",
                "meathodReturn": "int",
                "meathodReturnDescription": "A code that identifies the type of data stored in the field. See\nFieldTypeConstants [page 350].",
                "meathodParms": []
            },
            {
                "meathodName": "GetTypeString",
                "meathodDescription": "Returns a string that identifies the type of data stored in a field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A string that identifies the type of data stored in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetValueString",
                "meathodDescription": "Gets the field's internal value without checking privileges, including changes made to the\nvalue during the transition if in a transition context.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetValueInt",
                "meathodDescription": "Gets the field's internal value without checking privileges, including changes made to the\nvalue during the transition if in a transition context.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetValueInt64",
                "meathodDescription": "Gets the field's internal value without checking privileges, including changes made to the\nvalue during the transition if in a transition context.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetValueDouble",
                "meathodDescription": "Gets the field's internal value without checking privileges, including changes made to the\nvalue during the transition if in a transition context.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetValueTimeT",
                "meathodDescription": "Gets the field's internal value without checking privileges, including changes made to the\nvalue during the transition if in a transition context.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetValue",
                "meathodDescription": "Gets the field's internal value without checking privileges, including changes made to the\nvalue during the transition if in a transition context.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": []
            },
            {
                "meathodName": "IsAuto",
                "meathodDescription": "Determines whether this field is set to be automatically populated.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if this field is automatically populated; false if not.",
                "meathodParms": []
            },
            {
                "meathodName": "IsBlank",
                "meathodDescription": "Determines whether a field does not contain data.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if this field contains no data; false if it does.",
                "meathodParms": []
            },
            {
                "meathodName": "IsDbBlank",
                "meathodDescription": "Determines whether a field does not contain data stored in the database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if this field contains data; false if not.",
                "meathodParms": []
            },
            {
                "meathodName": "IsSelected",
                "meathodDescription": "Determines whether a field has been selected for Update() processing by the Select()\nmethod.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if selected; false if not.",
                "meathodParms": []
            },
            {
                "meathodName": "Select",
                "meathodDescription": "Sets or clears a field's select flag to control processing during the next Update().",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "selectFlag",
                        "type": "bool",
                        "description": "If true, the field will be processed during the next Update().\nIf false, it will be skipped unless overridden by the\nVarFieldList method SelectAll().",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetBlankValue",
                "meathodDescription": "Removes data from a field, returning it to an uninitialized\nstate.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "SetValue",
                "meathodDescription": "Sets or changes a field's value to the internal value supplied.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The internal value for the field. For Text fields, this is the\nexact value entered in the field.\nTimeT can be used with Date/Time fields to set the internal\ndate value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "Folder": {
        "className": "Folder",
        "exposed": false,
        "inheritsFrom": "TreeItem",
        "classDescription": "Folder objects provide a convenient interface for examining folder contents and adding or\nremoving folder items. A Folder object describes a single folder and corresponds to a\nrecord in the TS_FOLDERS table. To examine the folder hierarchy or generate the full\nfolder name, use inherited TreeItem methods. To generate a list of items in an folder, see\nFolderItemList.",
        "meathods": [
            {
                "meathodName": "AddItem",
                "meathodDescription": "Adds an AppRecord item to a folder.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is added successfully; false if not.",
                "meathodParms": [
                    {
                        "name": "rec",
                        "type": "AppRecord",
                        "description": "The item to add to the folder.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Contains",
                "meathodDescription": "Used to determine whether a given item is in the current folder.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if this folder contains the item; false if not.",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "Table ID of the item to search for.",
                        "optional": false
                    },
                    {
                        "name": "recId",
                        "type": "int",
                        "description": "TS_ID of the item to search for.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "DeleteItem",
                "meathodDescription": "Removes an AppRecord item from a folder.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if removed successfully; false if not.",
                "meathodParms": [
                    {
                        "name": "rec",
                        "type": "AppRecord",
                        "description": "The item to remove from the folder.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "FolderItem": {
        "className": "FolderItem",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "The TS_FOLDERITEMS table identifies the contents of all folders. Each record identifies\none item of one folder by associating three TS_IDs: the folder's ID, the table ID of the\nitem stored in the folder, and the TS_ID of the item. A folder has one entry in the\nTS_FOLDERITEMS table for each primary item, auxiliary item, and report it contains, and\none entry in the TS_URLSTORE table for each URL it contains. Though it is possible to\nsupply the table ID of a system table other than TS_REPORTS, folder items created this\nway are not supported and will yield undefined behavior when accessed by a user.",
        "properties": [
            {
                "propertyName": "FolderId",
                "propertyDescription": "TS_ID of the folder.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "TableId",
                "propertyDescription": "Table ID of the item stored in this folder.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "RecId",
                "propertyDescription": "TS_ID of the item stored in this folder.",
                "propertyType": "int",
                "readOnly": true
            }
        ],
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "inheritsDone": true
    },
    "FolderItemList": {
        "className": "FolderItemList",
        "exposed": false,
        "inheritsFrom": "AppRecordList",
        "classDescription": "A FolderItemList is an AppRecordList that holds objects of type FolderItem. Typically, the\nReadWithWhere() method is used to fill the list with all items from a given folder.",
        "meathods": [
            {
                "meathodName": "Contains",
                "meathodDescription": "Used to determine whether a folder contains an item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is found in the list.",
                "meathodParms": [
                    {
                        "name": "tableId",
                        "type": "int",
                        "description": "Table ID of the item to search for.",
                        "optional": false
                    },
                    {
                        "name": "recId",
                        "type": "int",
                        "description": "TS_ID of the item to search for.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Count",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "DeleteRecord",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the specified record from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "recordId",
                        "type": "int",
                        "description": "The TS_ID of the record to delete from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FindRecord",
                "meathodDescription": "inherited -> AppRecordList\nFind a specific record in the current list by matching its name or TS_ID.",
                "meathodReturn": "AppRecord",
                "meathodReturnDescription": "The first AppRecord in the list that matches the given name or ID. If\nthere is no match, returns null. Use is_var_null() to check for null.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": "Variant",
                        "description": "If this parameter is a non-numeric string, it is taken as\nthe desired record's name. Otherwise, it is converted to\nan integer and taken as the desired record's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Length",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecordList\nFills the AppRecordList from its table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": []
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by two column values.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecordList\nAn alternative to Read(), this method uses SQL to select\nonly certain records from the calling AppRecordList's table, rather than reading the entire\ntable.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "A SQL \"where clause\" specifying the records to find. SBM\nwill build a SQL string requesting all fields for the calling\nAppRecordList's table. The string contents of\nwhereClause will appear after the word \"where\" in this\nSQL statement.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "Params is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, with the first\nvalue as the parameter type and the second value as the\nvalue to bind to the SQL parameter. See Pair, Map_Pair,\nand Dictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page\n347].",
                        "optional": true
                    },
                    {
                        "name": "orderBy",
                        "type": "string",
                        "description": "Identifies a column used for ordering the AppRecordList.\nTo use the templateRec parameter without the orderBy\nparameter, use an empty string as a parameter for the\norderBy parameter.",
                        "optional": true
                    },
                    {
                        "name": "templateRec",
                        "type": "AppRecord",
                        "description": "Optional. Identifies which fields are read into all\nAppRecords in the AppRecordList. Using this parameter\nmay improve performance when using AppRecordOjbects\nwhich contain a VarFieldList from Primary or Auxiliary\ntables.\nTo use this optional parameter, create a VarRecord\nagainst the Primary table you are doing your\nReadWithWhere against. Get the VarFieldList of that\nVarRecord through the Fields() method. Call SelectAll,\nand pass it false to clear all fields. Then, explicitly turn\non the fields you wish to read by finding the Field on the\nVarFieldList, and then calling that Field's Select() method\nand passing it true.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "clear",
                "meathodDescription": "inherited -> AppRecordList\nRemoves all records from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "inherited -> AppRecordList\nReturns true if the list is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the list is empty; false if there are items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "erase_at",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the item at specified index from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero-based index of the item to remove from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "size",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecordList\nPerform a database update on all records in the list.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if all applicable records are successfully updated; false\notherwise.",
                "meathodParms": []
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "Free_Functions": {
        "className": "",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "",
        "meathods": [
            {
                "meathodName": "CreateObject",
                "meathodDescription": "Creates a Lib or Dictionary object.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns a Variant wrapping the desired object.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "A string that represents the type of object to create.\n• To create a Lib object, use \"SBMLibrary\". See Lib [page\n227].\n• To create a Dictionary object, use \"Scripting.Dictionary\".\nSee Dictionary [page 207].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CreateLocale",
                "meathodDescription": "Creates a specified locale, such as \"en_US\".",
                "meathodReturn": "Locale",
                "meathodReturnDescription": "Returns a Locale.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "A string that specifies the locale.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CreateUserLocale",
                "meathodDescription": "Returns the current user's locale.",
                "meathodReturn": "Locale",
                "meathodReturnDescription": "The current user's locale that is specified in the user profile. If the\nuser does not have a specified locale in his or her profile, the system\nlocale is returned.",
                "meathodParms": []
            },
            {
                "meathodName": "CreateSystemLocale",
                "meathodDescription": "Returns the default locale for the system.",
                "meathodReturn": "Locale",
                "meathodReturnDescription": "The current system locale. This is the default locale, configured in\nSBM System Administrator, which is used as the default locale for\nusers who do not have one specified.",
                "meathodParms": []
            },
            {
                "meathodName": "CreateTimeZone",
                "meathodDescription": "Creates the specified TimeZone.",
                "meathodReturn": "TimeZone",
                "meathodReturnDescription": "The specified TimeZone.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "A string that specifies the TimeZone, such as \"MST\",\n\"America/Denver\", \"US/Mountain\".",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "CreateUserTimeZone",
                "meathodDescription": "Returns the current user's TimeZone",
                "meathodReturn": "TimeZone",
                "meathodReturnDescription": "The user's current TimeZone that is set in the user profile. If not\nspecified, the system TimeZone is used.",
                "meathodParms": []
            },
            {
                "meathodName": "CreateUTCTimeZone",
                "meathodDescription": "Returns a TimeZone set to Coordinated Universal Time (UTC).",
                "meathodReturn": "TimeZone",
                "meathodReturnDescription": "The UTC TimeZone.",
                "meathodParms": []
            },
            {
                "meathodName": "ExitScript",
                "meathodDescription": "Gracefully exits the script from wherever it is invoked.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "include",
                "meathodDescription": "Used to include scripts within other scripts",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The name of the script to include.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ScriptEngine",
                "meathodDescription": "Returns \"ChaiScript\"",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns \"ChaiScript\"",
                "meathodParms": []
            },
            {
                "meathodName": "ScriptEngineVersion",
                "meathodDescription": "Returns the ChaiScript version number.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns the ChaiScript version number.",
                "meathodParms": []
            },
            {
                "meathodName": "ScriptEngineMajorVersion",
                "meathodDescription": "Returns the ChaiScript major version number.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns \"ChaiScript\"",
                "meathodParms": []
            },
            {
                "meathodName": "ScriptEngineMinorVersion",
                "meathodDescription": "Returns the ChaiScript minor version number.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the ChaiScript minor version number.",
                "meathodParms": []
            },
            {
                "meathodName": "ScriptEngineBuildVersion",
                "meathodDescription": "Returns SBM version.",
                "meathodReturn": "string",
                "meathodReturnDescription": "Returns SBM version.",
                "meathodParms": []
            },
            {
                "meathodName": "TimeMillisDate",
                "meathodDescription": "Returns a TimeMillis set to current date (time truncated to midnight UTC).",
                "meathodReturn": "TimeMillis",
                "meathodReturnDescription": "The current date (with the time truncated to midnight UTC).",
                "meathodParms": []
            },
            {
                "meathodName": "TimeMillisNow",
                "meathodDescription": "Returns a TimeMillis set to current time.",
                "meathodReturn": "TimeMillis",
                "meathodReturnDescription": "The current date/time with millisecond precision.",
                "meathodParms": []
            },
            {
                "meathodName": "TimeTDate",
                "meathodDescription": "Returns a TimeT set to current date (time truncated to midnight UTC).",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The current date (with the time truncated to midnight UTC).",
                "meathodParms": []
            },
            {
                "meathodName": "TimeTNow",
                "meathodDescription": "Returns a TimeT set to current time.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The current date/time.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "Free_Functions_AppScript_Conversion": {
        "className": "",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "",
        "meathods": [],
        "properties": []
    },
    "Free_Functions_Constructors": {
        "className": "",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "",
        "meathods": [
            {
                "meathodName": "Dictionary",
                "meathodDescription": "Creates a dictionary object.",
                "meathodReturn": "Dictionary",
                "meathodReturnDescription": "A new Dictionary Object",
                "meathodParms": []
            },
            {
                "meathodName": "Map",
                "meathodDescription": "Creates a map object.",
                "meathodReturn": "Map",
                "meathodReturnDescription": "A new Map Object",
                "meathodParms": [
                    {
                        "name": "m",
                        "type": "Map",
                        "description": "If a map is passed in, constructer returns a copy of m.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Map_Pair",
                "meathodDescription": "Creates a Map_Pair object.",
                "meathodReturn": "Map_Pair",
                "meathodReturnDescription": "A new Map_Pair Object",
                "meathodParms": [
                    {
                        "name": "first",
                        "type": [
                            "Map_Pair",
                            "Variant"
                        ],
                        "description": "If a Map_Pair is passed in, constructer returns a copy of mp, else you can pass two variables to create a new Map_Pair Object.",
                        "optional": true
                    },
                    {
                        "name": "second",
                        "type": "Variant",
                        "description": "The second value in a Map_Pair, used to initlilize a new Map_Pair",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Pair",
                "meathodDescription": "Creates a Pair object.",
                "meathodReturn": "Pair",
                "meathodReturnDescription": "A new Pair Object",
                "meathodParms": [
                    {
                        "name": "first",
                        "type": [
                            "Pair",
                            "Variant"
                        ],
                        "description": "If a Pair is passed in, constructer returns a copy of first, else you can pass two variables to create a new Pair Object.",
                        "optional": true
                    },
                    {
                        "name": "second",
                        "type": "Variant",
                        "description": "The second value in a pair, used to initlilize a new Pair",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Dictionary_Pair",
                "meathodDescription": "Creates a Dictionary_Pair object.",
                "meathodReturn": "Dictionary_Pair",
                "meathodReturnDescription": "A new Dictionary_Pair Object",
                "meathodParms": [
                    {
                        "name": "first",
                        "type": [
                            "Dictionary_Pair",
                            "Variant"
                        ],
                        "description": "If a Dictionary_Pair is passed in, constructer returns a copy of first, else you can pass two variables to create a new Dictionary_Pair Object.",
                        "optional": true
                    },
                    {
                        "name": "second",
                        "type": "Variant",
                        "description": "The second value in a Dictionary_Pair, used to initlilize a new Dictionary_Pair",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "string",
                "meathodDescription": "Creates a string object.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A new string Object",
                "meathodParms": [
                    {
                        "name": "s",
                        "type": "string",
                        "description": "If a string is passed in, constructer returns a copy of s.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "u32string",
                "meathodDescription": "Creates a u32string object.",
                "meathodReturn": "u32string",
                "meathodReturnDescription": "A new u32string Object",
                "meathodParms": [
                    {
                        "name": "s",
                        "type": "u32string",
                        "description": "If a u32string is passed in, constructer returns a copy of s.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Vector",
                "meathodDescription": "Creates a Vector object.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "A new Vector Object",
                "meathodParms": [
                    {
                        "name": "v",
                        "type": "Vector",
                        "description": "If a Vector is passed in, constructer returns a copy of v.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "SQLColumnDef",
                "meathodDescription": "Creates a SQLColumnDef object.",
                "meathodReturn": "Log",
                "meathodReturnDescription": "A new SQLColumnDef Object",
                "meathodParms": [
                    {
                        "name": "dbType",
                        "type": "DBTypeConstants",
                        "description": "If first 2 params passed in creates a SQLColumnDef object and populates members.",
                        "optional": true
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "description": "If first 2 params passed in creates a SQLColumnDef object and populates members.",
                        "optional": true
                    },
                    {
                        "name": "hint",
                        "type": "SQLColumnDefOutputHint",
                        "description": "Optional hint if passing in params.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "TempFile",
                "meathodDescription": "Creates a TempFile object.",
                "meathodReturn": "TempFile",
                "meathodReturnDescription": "A new TempFile Object",
                "meathodParms": []
            },
            {
                "meathodName": "TimeMillis",
                "meathodDescription": "Creates a TimeMillis object.",
                "meathodReturn": "TimeMillis",
                "meathodReturnDescription": "A new TimeMillis Object",
                "meathodParms": [
                    {
                        "name": "time",
                        "type": [
                            "int",
                            "TimeT"
                        ],
                        "description": "If parm passed creates a TimeMillis with date equal to time param, can be of type int or TimeT.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "TimePoint",
                "meathodDescription": "Creates a TimePoint object.",
                "meathodReturn": "TimePoint",
                "meathodReturnDescription": "A new TimePoint Object",
                "meathodParms": [
                    {
                        "name": "v",
                        "type": [
                            "TimePoint",
                            "TimeZone",
                            "TimeMillis"
                        ],
                        "description": "Passing no value Creates a TimePoint populated with the current moment in time and\nUTC timezone.\nPassing TimePoint Creates a TimePoint copying the values from \"v\"\nPassing TimeZone  Creates a TimePoint populated with the current\nmoment in time and uses \"tz\" as the timezone.\nPassing TimeMillis Creates a TimePoint populated with the\nmoment in time from \"v\" and uses \"tz\" as the timezone. TimeT can implicitly convert\nto a TimeMillis, allowing this function to be used with TimeT values as well.\nIf Passing TimeMillis, Second Parm required.",
                        "optional": true
                    },
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "Required if first Param is TimeMillis.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "TimeT",
                "meathodDescription": "Creates a TimeT object.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "A new TimeT Object",
                "meathodParms": [
                    {
                        "name": "seconds",
                        "type": "int",
                        "description": "Creates a TimeT with date equal to seconds.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Variant",
                "meathodDescription": "Creates a Variant object.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "A new Variant Object",
                "meathodParms": [
                    {
                        "name": "v",
                        "type": [
                            "Variant",
                            "bool",
                            "double",
                            "short",
                            "int",
                            "int64_t",
                            "uint64_t",
                            "string"
                        ],
                        "description": "A new Variant Object with internal value of v",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Regex",
                "meathodDescription": "Creates a Regex object.",
                "meathodReturn": "Regex",
                "meathodReturnDescription": "A new Regex Object",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "Free_Functions_Math": {
        "className": "",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "",
        "meathods": [
            {
                "meathodName": "abs",
                "meathodDescription": "Math Function: abs",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fabs",
                "meathodDescription": "Math Function: fabs",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fmod",
                "meathodDescription": "Math Function: fmod",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "remainder",
                "meathodDescription": "Math Function: remainder",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "remquo",
                "meathodDescription": "Math Function: remquo",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg3",
                        "type": "int",
                        "description": "int",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fdim",
                "meathodDescription": "Math Function: fdim",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fma",
                "meathodDescription": "Math Function: fma",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fma",
                "meathodDescription": "Math Function: fma",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg3",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fmax",
                "meathodDescription": "Math Function: fmax",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "fmin",
                "meathodDescription": "Math Function: fmin",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg1",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    },
                    {
                        "name": "arg2",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "nan",
                "meathodDescription": "Math Function: nan",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "string",
                        "description": "string",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ceil",
                "meathodDescription": "Math Function: ceil",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "floor",
                "meathodDescription": "Math Function: floor",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "trunc",
                "meathodDescription": "Math Function: trunc",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "round",
                "meathodDescription": "Math Function: round",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "lround",
                "meathodDescription": "Math Function: lround",
                "meathodReturn": "int",
                "meathodReturnDescription": "int",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "llround",
                "meathodDescription": "Math Function: llround",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "int64_t",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "rint",
                "meathodDescription": "Math Function: rint",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "lrint",
                "meathodDescription": "Math Function: lrint",
                "meathodReturn": "int",
                "meathodReturnDescription": "int",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "llrint",
                "meathodDescription": "Math Function: llrint",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "int64_t",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "nearbyint",
                "meathodDescription": "Math Function: nearbyint",
                "meathodReturn": "double",
                "meathodReturnDescription": "double",
                "meathodParms": [
                    {
                        "name": "arg",
                        "type": "double",
                        "description": "double",
                        "optional": false
                    }
                ]
            }
        ],
        "properties": []
    },
    "Incident": {
        "className": "Incident",
        "exposed": false,
        "inheritsFrom": "ProjectBasedRecord",
        "classDescription": "Not commonly used, as this maps to a specific primary table that may not exist in your\ndatabase.\nAn incident is simply a ProjectBasedRecord from the Incident Management application's\nprimary table. Objects of type incident can be created using CreateObject(), and SBM will\nautomatically look up the Incidents table.",
        "meathods": [
            {
                "meathodName": "GetProjectId",
                "meathodDescription": "inherited -> ProjectBasedRecord\nIdentifies the calling record's project.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling record's project.",
                "meathodParms": []
            },
            {
                "meathodName": "StartSubmitToProject",
                "meathodDescription": "inherited -> ProjectBasedRecord\nStarts a submit transition for an item using a project ID,\n\t\t\t\tproject UUID, or project internal name.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\n\t\t\t\tShell.GetLastErrorMessage() for more information",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "StartSubmitToProjectUsingTransition",
                "meathodDescription": "inherited -> ProjectBasedRecord\nStarts a submit transition for an item, specifying the project\nand transition to use.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    },
                    {
                        "name": "trans",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be transition ID, transition UUID, or transition internal\nname.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FinishSubmitToProject",
                "meathodDescription": "inherited -> ProjectBasedRecord\nFinishes a submit transition for an item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "FinishSubmitToProjectUsingTransition",
                "meathodDescription": "inherited -> ProjectBasedRecord\nFinish a submit transition for an item using a non-default\ntransition.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be transition ID, transition UUID, or transition internal\nname.",
                        "optional": false
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickSubmitToProject",
                "meathodDescription": "inherited -> ProjectBasedRecord\n Identical to FinishSubmitToProject() except\nStartSubmitToProject() is not required, and thus, the project must be specified.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickSubmitToProjectUsingTransition",
                "meathodDescription": "inherited -> ProjectBasedRecord\nIdentical to FinishSubmitToProjectUsingTransition() except\nStartSubmitToProjectUsingTransition() is not required, and thus, the project must be\nspecified.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    },
                    {
                        "name": "trans",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be transition ID, transition UUID, or transition internal\nname.",
                        "optional": false
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "GetDisplayIssueId",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nReturns the item's display ID, consisting of a prefix indicating the item's type and a serial\nnumber within the item's project.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for the field. For Text fields,\nthis is the exact value entered in the field. For values that\nare not Variant or TimeT, this internally gets the value\nfrom the field as a Variant, and then tries to convert the\nvalue to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe calling record's variable field list.\nField names for variable fields should be provided in upper\ncase for database names (TITLE, for example) or in lower/\nmixed-case for display names (Title, for example). For\ndetails on working with different types of database fields,\nrefer to Working with SBM Database Fields [page 39].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetItemNumber",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nReturns the numeric portion of the item's display ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetItemPrefix",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nReturns the prefix of the item's display ID, indicating the item's type. Item types and their\nprefixes are defined when an SBM designer configures a workflow.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The prefix of the item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetStateId",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nIdentifies the calling record's state within a workflow.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the record's state within the item's workflow. If the record\nis not from a primary table, then it does not have a workflow and the\nreturn value is -1.",
                "meathodParms": []
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the field was changed.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    },
                    {
                        "name": "fieldList",
                        "type": "Variant",
                        "description": "Optional. If supplied and equal to the global\nconstant Nothing, this parameter will refer to the calling\nrecord's VarFieldList when this method returns. If supplied\nand not equal to Nothing, this parameter is taken to be the\ncalling record's VarFieldList.\nDo not set this parameter's value yourself. Always pass a\nvariable set to Nothing and then reuse the variable for\nsubsequent calls to GetFieldValue() and SetFieldValue() on\nthe same VarRecord object. If this parameter is omitted,\nno functionality changes, but efficiency may suffer.",
                        "optional": true
                    },
                    {
                        "name": "field",
                        "type": "Variant",
                        "description": "Optional. If supplied and equal to the global\nconstant Nothing, this parameter will refer to the Field\nobject on the calling record's VarFieldList whose name\nmatches the name input parameter when this method\nreturns. If supplied and not equal to Nothing, this\nparameter is taken to be that Field object.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartTransition",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nStarts a transition on an item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartTransitionWithLock",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\n Identical to StartTransition(), assumes AppRecord.Lock()\nhas been invoked.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "FinishTransition",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nFinishes a transition on an item after StartTransition() has\nbeen invoked and field values have been set.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickTransition",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nIdentical to FinishTransition() except that StartTransition() is\nnot required.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartSubmitToAux",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nStarts the submit of a new item into an auxiliary table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "FinishSubmitToAux",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nFinishes the submit into an auxiliary table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "QuickSubmitToAux",
                "meathodDescription": "inherited -> VarRecord -> ProjectBasedRecord\nIdentical to FinishSubmitToAux except StartSubmitToAux is\nnot required.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord -> VarRecord -> ProjectBasedRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "Lib": {
        "className": "Lib",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A class for loading and invoking a custom DLL. For details on usage and examples, refer\nto Calling Functions in a DLL from SBM ModScript [page 360].\nTo create Use CreateObject() [page 107] with \"SBMLibrary\".",
        "meathods": [
            {
                "meathodName": "SetLibraryName",
                "meathodDescription": "Sets the DLL name.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name—and optionally the path—of the DLL. For details,\nrefer to Loading the Library in SBM ModScript [page 361].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "LoadLibrary",
                "meathodDescription": "Loads the DLL.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the DLL was successfully loaded; returns false\notherwise.",
                "meathodParms": []
            },
            {
                "meathodName": "FreeLibrary",
                "meathodDescription": "Unloads a previously loaded DLL.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the DLL was successfully unloaded; returns false\notherwise.",
                "meathodParms": []
            },
            {
                "meathodName": "IsLibraryLoaded",
                "meathodDescription": "Verifies if the library has already been loaded.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the library is already loaded; returns false otherwise.",
                "meathodParms": []
            },
            {
                "meathodName": "CallLibraryFunction",
                "meathodDescription": "Sets the DLL name.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns the integer that the DLL function returned.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The function to be invoked.",
                        "optional": false
                    },
                    {
                        "name": "argVect",
                        "type": "Vector",
                        "description": "(Input/Ouput) All entries in the Vector will be converted to\nstring and passed as input/output parameters to the DLL.\nIf the DLL sets any of the parameters to a new value, the\nengine attempts to convert the string back to the original\ndata type of the object inside the Vector. See example\nbelow.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "CallLibraryFunctionInt",
                "meathodDescription": "Sets the DLL name.",
                "meathodReturn": "int",
                "meathodReturnDescription": "Returns the integer that the DLL function returned.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The function to be invoked.",
                        "optional": false
                    },
                    {
                        "name": "argVect",
                        "type": "Vector",
                        "description": "(Input/Ouput) All entries in the Vector will be converted to\nstring and passed as input/output parameters to the DLL.\nIf the DLL sets any of the parameters to a new value, the\nengine attempts to convert the string back to the original\ndata type of the object inside the Vector. See example\nbelow.",
                        "optional": false
                    }
                ]
            }
        ],
        "properties": []
    },
    "Locale": {
        "className": "Locale",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Provides functions that create a locale.",
        "meathods": [],
        "properties": []
    },
    "Log": {
        "className": "Log",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A class for writing output messages and appending an output log file. Optionally,\ndatestamps can be pre-pended to output messages.",
        "meathods": [],
        "properties": []
    },
    "Project": {
        "className": "Project",
        "exposed": false,
        "inheritsFrom": "TreeItem",
        "classDescription": "A project represents any SBM project and is stored in the TS_PROJECTS table. To examine\nthe project hierarchy or generate the full project name, use inherited TreeItem methods.",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord -> TreeItem\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "ProjectBasedRecord": {
        "className": "ProjectBasedRecord",
        "exposed": false,
        "inheritsFrom": "VarRecord",
        "classDescription": "A ProjectBasedRecord is any record from a primary table. It thus represents items that\n\tbelong to a project and can be transitioned. ProjectBasedRecord objects require a table ID\n\tat creation using Ext.CreateProjectBasedRecord().",
        "meathods": [
            {
                "meathodName": "GetProjectId",
                "meathodDescription": "Identifies the calling record's project.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling record's project.",
                "meathodParms": []
            },
            {
                "meathodName": "StartSubmitToProject",
                "meathodDescription": "Starts a submit transition for an item using a project ID,\n\t\t\t\tproject UUID, or project internal name.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\n\t\t\t\tShell.GetLastErrorMessage() for more information",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "StartSubmitToProjectUsingTransition",
                "meathodDescription": "Starts a submit transition for an item, specifying the project\nand transition to use.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    },
                    {
                        "name": "trans",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be transition ID, transition UUID, or transition internal\nname.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FinishSubmitToProject",
                "meathodDescription": "Finishes a submit transition for an item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "FinishSubmitToProjectUsingTransition",
                "meathodDescription": "Finish a submit transition for an item using a non-default\ntransition.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be transition ID, transition UUID, or transition internal\nname.",
                        "optional": false
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickSubmitToProject",
                "meathodDescription": " Identical to FinishSubmitToProject() except\nStartSubmitToProject() is not required, and thus, the project must be specified.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickSubmitToProjectUsingTransition",
                "meathodDescription": "Identical to FinishSubmitToProjectUsingTransition() except\nStartSubmitToProjectUsingTransition() is not required, and thus, the project must be\nspecified.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "project",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be project ID, project UUID, or project internal name.",
                        "optional": false
                    },
                    {
                        "name": "trans",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "Can be transition ID, transition UUID, or transition internal\nname.",
                        "optional": false
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "GetDisplayIssueId",
                "meathodDescription": "inherited -> VarRecord\nReturns the item's display ID, consisting of a prefix indicating the item's type and a serial\nnumber within the item's project.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> VarRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for the field. For Text fields,\nthis is the exact value entered in the field. For values that\nare not Variant or TimeT, this internally gets the value\nfrom the field as a Variant, and then tries to convert the\nvalue to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe calling record's variable field list.\nField names for variable fields should be provided in upper\ncase for database names (TITLE, for example) or in lower/\nmixed-case for display names (Title, for example). For\ndetails on working with different types of database fields,\nrefer to Working with SBM Database Fields [page 39].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetItemNumber",
                "meathodDescription": "inherited -> VarRecord\nReturns the numeric portion of the item's display ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetItemPrefix",
                "meathodDescription": "inherited -> VarRecord\nReturns the prefix of the item's display ID, indicating the item's type. Item types and their\nprefixes are defined when an SBM designer configures a workflow.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The prefix of the item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetStateId",
                "meathodDescription": "inherited -> VarRecord\nIdentifies the calling record's state within a workflow.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the record's state within the item's workflow. If the record\nis not from a primary table, then it does not have a workflow and the\nreturn value is -1.",
                "meathodParms": []
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> VarRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the field was changed.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    },
                    {
                        "name": "fieldList",
                        "type": "Variant",
                        "description": "Optional. If supplied and equal to the global\nconstant Nothing, this parameter will refer to the calling\nrecord's VarFieldList when this method returns. If supplied\nand not equal to Nothing, this parameter is taken to be the\ncalling record's VarFieldList.\nDo not set this parameter's value yourself. Always pass a\nvariable set to Nothing and then reuse the variable for\nsubsequent calls to GetFieldValue() and SetFieldValue() on\nthe same VarRecord object. If this parameter is omitted,\nno functionality changes, but efficiency may suffer.",
                        "optional": true
                    },
                    {
                        "name": "field",
                        "type": "Variant",
                        "description": "Optional. If supplied and equal to the global\nconstant Nothing, this parameter will refer to the Field\nobject on the calling record's VarFieldList whose name\nmatches the name input parameter when this method\nreturns. If supplied and not equal to Nothing, this\nparameter is taken to be that Field object.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartTransition",
                "meathodDescription": "inherited -> VarRecord\nStarts a transition on an item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartTransitionWithLock",
                "meathodDescription": "inherited -> VarRecord\n Identical to StartTransition(), assumes AppRecord.Lock()\nhas been invoked.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "FinishTransition",
                "meathodDescription": "inherited -> VarRecord\nFinishes a transition on an item after StartTransition() has\nbeen invoked and field values have been set.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickTransition",
                "meathodDescription": "inherited -> VarRecord\nIdentical to FinishTransition() except that StartTransition() is\nnot required.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartSubmitToAux",
                "meathodDescription": "inherited -> VarRecord\nStarts the submit of a new item into an auxiliary table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "FinishSubmitToAux",
                "meathodDescription": "inherited -> VarRecord\nFinishes the submit into an auxiliary table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "QuickSubmitToAux",
                "meathodDescription": "inherited -> VarRecord\nIdentical to FinishSubmitToAux except StartSubmitToAux is\nnot required.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord -> VarRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "Regex": {
        "className": "Regex",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Constructor for Regex object. A Regex object cannot be stored in a Variant.",
        "meathods": [
            {
                "meathodName": "Compile",
                "meathodDescription": "Compiles a regular expression.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns false if Compile() fails.",
                "meathodParms": [
                    {
                        "name": "pattern",
                        "type": "string",
                        "description": "Holds the regular expression pattern to be compiled.",
                        "optional": false
                    },
                    {
                        "name": "options",
                        "type": "int",
                        "description": "Indicates regular expression behavior, such as case\nsensitivity. See RegexOptionBitsConstants [page 353]. Bits\ncan be combined using the bitwise OR operator: | .",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Matches",
                "meathodDescription": "Executes a search for a match in a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if a match was found.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "Holds the string to be searched.",
                        "optional": false
                    },
                    {
                        "name": "offset",
                        "type": "int",
                        "description": "The index that denotes where in the string to start the\nsearch; use 0 to start at the beginning.",
                        "optional": true
                    },
                    {
                        "name": "start",
                        "type": "int",
                        "description": "(Output) If a match was found, the zero-based index of the\nbeginning of the matched-text.",
                        "optional": true
                    },
                    {
                        "name": "end",
                        "type": "int",
                        "description": "(Output) If a match was found, the zero-based index of the\nend of the matched-text.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "MatchesAgain",
                "meathodDescription": "Once Matches() has been called, use MatchesAgain to find the next match.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the compiled regular expression matches the value\npassed in.",
                "meathodParms": [
                    {
                        "name": "start",
                        "type": "int",
                        "description": "(Output) If a match was found, the zero-based index of the\nbeginning of the matched-text.",
                        "optional": true
                    },
                    {
                        "name": "end",
                        "type": "int",
                        "description": "(Output) If a match was found, the zero-based index of the\nend of the matched-text.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReplaceAll",
                "meathodDescription": "Replaces all matched parts of a string with a replacement value using the compiled regex.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A string where all matches for the compiled Regex in \"value\" are\nreplaced with \"replacement\".",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The string to be searched.",
                        "optional": false
                    },
                    {
                        "name": "replacement",
                        "type": "string",
                        "description": "The value inserted into the string in the matched locations.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReplaceFirst",
                "meathodDescription": "Replaces the first matched part of a string with a replacement value using the compiled\nregex.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A string where the first match for the compiled Regex in \"value\" is\nreplaced with \"replacement\".",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The string to be searched.",
                        "optional": false
                    },
                    {
                        "name": "replacement",
                        "type": "string",
                        "description": "The value inserted into the string in the first matched\nlocation.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetLastError",
                "meathodDescription": "Provides an error message explanation if Compile() or Matches() fails.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The text of the last error message.",
                "meathodParms": []
            },
            {
                "meathodName": "GroupCount",
                "meathodDescription": "After calling Matches(), if the regex pattern used parenthesis to denote grouping,\nGroupCount() returns the number of groups.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of groups.",
                "meathodParms": []
            },
            {
                "meathodName": "GroupVal",
                "meathodDescription": "After calling Matches(), if the regex pattern used parenthesis to denote grouping, this\nreturns the group specified.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The specified group.",
                "meathodParms": [
                    {
                        "name": "group",
                        "type": "int",
                        "description": "Value 0 will return the full text matched by the regex; groups\n1-n (see GroupCount() [page 266]) will return the groupings\nthat the regex pattern identified using parentheses.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Split",
                "meathodDescription": "Splits the string into parts using the regular expression as a delineator.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "A Vector containing substrings as its elements.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The string to be searched.",
                        "optional": false
                    },
                    {
                        "name": "trim",
                        "type": "bool",
                        "description": "If true, the resulting strings in the Vector will have the\nwhitespace trimmed.",
                        "optional": false
                    }
                ]
            }
        ],
        "properties": []
    },
    "RESTDataSource": {
        "className": "RESTDataSource",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "This class reads records from the TS_RESTDATASOURCE table and invokes the described\nREST call. You can define REST Data Sources in SBM Composer, and then bind them to\nendpoints that are configurable per environment in Application Repository. You can set up\na server to host custom behavior written in any programming language (C#, Java,\nGroovy, Python, etc.) and SBM ModScript can interact with that server, either gathering\ndata or invoking actions to be taken based on activity occurring in SBM. Because you can\nrun SBM ModScripts during a transition, during a notification, or trigger them by a simple\nURL, this is a powerful integration point.\nFor more details on working with the RESTDataSource object, see\nhttps://www.serenacentral.com/blogs/entry/sbm-modscript-part-8-rest-callouts.",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "SchemaColumn": {
        "className": "SchemaColumn",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Provides information about columns for AppRecord.GetSchemaColumns(). See\nGetSchemaColumns() [page 171].",
        "meathods": [],
        "properties": []
    },
    "Shell": {
        "className": "Shell",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "\"Shell\" is the SBM application object, like the Internet Explorer \"Document.\" The Shell\ncontains all SBM data accessible to the script. It contains only properties, no methods.\nThese properties, plus output stream access as noted in the following table, compose the\nentire interface between the SBM application and any script that it calls.",
        "properties": [
            {
                "propertyName": "RESTTimeout",
                "propertyDescription": "The timeout value used during REST calls. To override the default value (30\nseconds), you must add a new entry to the TS_SYSTEMSETTINGS table called\nDefaultRESTTimeout with TS_DATATYPE set to 1 and specify the desired timeout in the\nTS_LONGVALUE column.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "ScriptName",
                "propertyDescription": "The script's name as stored in the database and shown in the Scripts\neditor in SBM Composer.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "ScriptId",
                "propertyDescription": "This is the script's TS_ID. For details on the TS_ID, refer to Identifying\nRecords by TS_ID and Table ID [page 37].",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "ScriptFileName",
                "propertyDescription": "This is the file name from which the script was most recently read and\nparsed.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Context",
                "propertyDescription": "Identifies the current context. Possible values are pre-transition, post-\ntransition, pre-state, post-state, HTML template, URL, notification, self registration, pre-\nDbImport, post-DbImport, and RunModScript (SOAP). For details on contexts, refer to\nSBM ModScript Contexts [page 27].",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Db",
                "propertyDescription": "The current SBM database object. It provides global data related to\nthe SBM database.",
                "propertyType": "AppDb",
                "readOnly": true
            },
            {
                "propertyName": "RedirectURL",
                "propertyDescription": "If the script writes a URL string to this property, the browser is redirected\nthere when the script exits. The server generates an HTTP 302 response containing\nheader values appropriate for most uses.",
                "propertyType": "string",
                "readOnly": false
            },
            {
                "propertyName": "RedirectHTTP",
                "propertyDescription": "If the script writes an entire HTTP response string to this property, the\nbrowser is sent this HTTP response verbatim when the script exits. This is an advanced\nfeature for special situations, such as when writing cookie values into the redirect\nresponse. Care must be taken to ensure that the HTTP string is complete, syntactically\nvalid, and accepted by all browsers in use.",
                "propertyType": "string",
                "readOnly": false
            },
            {
                "propertyName": "ClientBrand",
                "propertyDescription": "If the script writes an entire HTTP response string to this property, the\nbrowser is sent this HTTP response verbatim when the script exits. This is an advanced\nfeature for special situations, such as when writing cookie values into the redirect\nresponse. Care must be taken to ensure that the HTTP string is complete, syntactically\nvalid, and accepted by all browsers in use.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "ClientVersion",
                "propertyDescription": "The browser's release version. If Shell.ClientBrand() is API, this is the SBM\nAPI version of the external program and is formatted v.r where v is the API version and r\nis the API revision.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Project",
                "propertyDescription": "The SBM project to which Shell.Item() belongs.",
                "propertyType": "Project",
                "readOnly": true
            },
            {
                "propertyName": "SolutionName",
                "propertyDescription": "The name of the application bound to the Primary table containing\nShell.Item(). Application names are not unique.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "SolutionPrefix",
                "propertyDescription": "The prefix identifying the application bound to the Primary table containing\nShell.Item().",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "SolutionId",
                "propertyDescription": "The TS_ID of the application bound to the Primary table containing\nShell.Item(). For details on the TS_ID, refer to Identifying Records by TS_ID and Table ID\n[page 37].",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "Item",
                "propertyDescription": "The current item in use, such as the item being\ntransitioned.",
                "propertyType": "ProjectBasedRecord",
                "readOnly": false
            },
            {
                "propertyName": "ItemId",
                "propertyDescription": "The TS_ID of the current item in use.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "TableId",
                "propertyDescription": "The TS_ID of the table containing the current item.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "ImportAction",
                "propertyDescription": "Specifies the operation of the data import on the current item. Possible\nvalues are add (add a new item) and update (update an existing item).",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "ImportCommand",
                "propertyDescription": "Applies a command to the currently running script. Possible values are:\n• 0 (Continue) – The default value, which allows the data import to continue running.\n• 1 (Bypass import Item) – Stops all actions on the current item and moves on to the\nnext item. The current item will not be added or updated if this value is set.\n• 2 (Kill Import) – Stops the data import for all items.",
                "propertyType": "int",
                "readOnly": false
            },
            {
                "propertyName": "ImportID",
                "propertyDescription": "ID of the current Import Option Set record.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "ImportLog",
                "propertyDescription": "The TSLog object is a complex object used to log messages\ninto the DBImport log file. The logging levels defined in the TSLog object are minimal,\naverage, and verbose. The message function defined in the TSLog object logs messages\ndirectly into the DbImport log using the following syntax:\nMessage ( Logging Level ( Int ), Message ( String ) )",
                "propertyType": "TSLog",
                "readOnly": false
            },
            {
                "propertyName": "ImportName",
                "propertyDescription": "Name of the current Import Option Set record.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Source",
                "propertyDescription": "",
                "propertyType": "dictionary",
                "readOnly": true
            },
            {
                "propertyName": "SourceDb",
                "propertyDescription": "The source database object.",
                "propertyType": "AppDB",
                "readOnly": true
            },
            {
                "propertyName": "ContentType",
                "propertyDescription": "A list of the MIME types supported by the requesting user agent.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "HTTPAuthorization",
                "propertyDescription": "Contains SBM authentication information for the current request. This information is\navailable only if your system uses basic authentication.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "HTTPCookie",
                "propertyDescription": "Contains SBM cookie information for the current request. Cookies are returned in a\nsemicolon-separated list in the form \"Name=Value\" or \"Cookie Name=Value.\" For details\nin setting cookies using SBM ModScript, refer to Ext.SetCookie() [page 90].",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "HTTPUserAgent",
                "propertyDescription": "Contains information about the user agent, including the name and version number.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Referer",
                "propertyDescription": "The URL of the referring document.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "RemoteAddr",
                "propertyDescription": "The Internet Protocol (IP) address of the requesting machine.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "RemoteUser",
                "propertyDescription": "The network ID of the user making the request if the user has been authenticated. This\ninformation is only available if the user has been authenticated through NT Challenge/\nResponse or a similar authentication method.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "RequestMethod",
                "propertyDescription": "The HTTP request method.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "ServerSoftware",
                "propertyDescription": "The name and software version of the Web server.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "ServerProtocol",
                "propertyDescription": "The name and version of the protocol the request uses in the form protocol/majorVersion/\n.minorVersion. For example, HTTP/1.1 may be returned.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "GetLastErrorMessage",
                "propertyDescription": "The last error message that was set",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "PostData",
                "propertyDescription": "The POST data from the HTTP call.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "LoginId",
                "propertyDescription": "The user's login ID.\nRegistration shell property accessors are defined when registering a new user.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Password",
                "propertyDescription": "The user's password.\nRegistration shell property accessors are defined when registering a new user.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "RegistrationMethod",
                "propertyDescription": "Indicates the registration method in use. Possible\nvalues are manual and automatic and correspond to options available on the External\nUser tab of the Settings dialog box in SBM System Administrator.\nRegistration shell property accessors are defined when registering a new user.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "Contact",
                "propertyDescription": "A Contact record representing the new user.\nChanges made to this object are stored in the database after the script exits. See\nVarRecord [page 326].\nRegistration shell property accessors are defined when registering a new user.",
                "propertyType": "VarRecord",
                "readOnly": true
            },
            {
                "propertyName": "Rerun",
                "propertyDescription": "This flag is true if SBM re-runs the script because a\nform is invalid. For example, a form may be rejected when a user provides invalid data or\ndoes not provide a value for a required field. When the form re-opens for the user to\nprovide valid data, the script can be re-run if the Re-run Pre-transition Script if Form\nIs Invalid option is enabled for the transition where the script is defined.",
                "propertyType": "VarRecord",
                "readOnly": true
            },
            {
                "propertyName": "RedoMessage",
                "propertyDescription": "If the script writes a non-empty string to this\nproperty, the current operation is rejected and may be retried.\nForm-based operations are rejected similarly to when required fields are missing. The user\nis redirected to the same form (still maintaining any data they entered) and has another\nchance to submit the form. The string in Shell.RedoMessage() is used as an error\nmessage, appearing at the top of the form and in the Windows Event Viewer. If the script\ndoes not write to Shell.RedoMessage(), the form is processed normally.",
                "propertyType": "string",
                "readOnly": false
            },
            {
                "propertyName": "Params",
                "propertyDescription": "This is a Dictionary of name/value\nstring pairs containing runtime parameters. These parameters typically come from HTML\ntemplates or from URL strings. For example, when accessing the following URL:\nhttp://server/workcenter/tmtrack.dll?ScriptPage&scriptName=myScript&x=10",
                "propertyType": "Dictionary",
                "readOnly": true
            },
            {
                "propertyName": "TransitionName",
                "propertyDescription": "The name of the current transition.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "TransitionId",
                "propertyDescription": "The TS_ID of the current transition. For details on the\nTS_ID, refer to Identifying Records by TS_ID and Table ID [page 37].",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "TransitionType",
                "propertyDescription": "Identifies the type of the current transition.\nPossible values are: Regular, Copy, Update, Delete, Post Item, Create Subtask, Publish\nProblem, and Post to External Database.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "FromStateName",
                "propertyDescription": "The name of the state from which the transition\nbegins.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "FromStateId",
                "propertyDescription": "The TS_ID of the state from which the transition\nbegins. For details on the TS_ID, refer to Identifying Records by TS_ID and Table ID [page\n37].",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "ToStateName",
                "propertyDescription": " The name of the state to which the item is\ntransitioned.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "ToStateId",
                "propertyDescription": "The TS_ID of the state to which the transition travels.\nFor details on the TS_ID, refer to Identifying Records by TS_ID and Table ID [page 37].",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "MassTransPreForm",
                "propertyDescription": "Detects if a pre-transition script is running while the\nmass transition form is being initiated.",
                "propertyType": "bool",
                "readOnly": true
            },
            {
                "propertyName": "URLProtocol",
                "propertyDescription": " Returns http or https.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "URLServer",
                "propertyDescription": "Returns the server name for the current URL.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "URLPort",
                "propertyDescription": "Returns the TCP/IP port for the current URL (often\nomitted, defaults to 80).",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "URLPath",
                "propertyDescription": "Returns /tmtrack/tmtrack.dll.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "URLQuery",
                "propertyDescription": "Returns ScriptPage&ScriptName=myScript.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "User",
                "propertyDescription": "The \"current user\" for the script and is always the\nlogged-in user, except when used with the Notification context. In the Notification\ncontext, the script is executed once per subscriber, with Shell.User() referring to the\nsubscriber being processed. If there are no subscribers, the script is executed one time\nwith Shell.User() equal to the value Nothing. See User [page 318].",
                "propertyType": "User",
                "readOnly": true
            },
            {
                "propertyName": "UserToken",
                "propertyDescription": "Returns the user's SSO token in Base64-encoded format.",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "IsActingAsAnotherUser",
                "propertyDescription": "Returns true if the user is currently being impersonated.",
                "propertyType": "bool",
                "readOnly": true
            },
            {
                "propertyName": "ActingAsAnotherUserID",
                "propertyDescription": " If the shell context has a User property, and if the user is being\nimpersonated, this returns the actual user's ID.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "NamespacePrefix",
                "propertyDescription": " Returns the namespace table prefixes for the user (this prefix is added\nto the dbname of every primary and auxiliary table when a process app is deployed to a\nnamespace).",
                "propertyType": "string",
                "readOnly": true
            },
            {
                "propertyName": "NamespaceID",
                "propertyDescription": "Returns the user's namespace ID.",
                "propertyType": "int",
                "readOnly": true
            }
        ],
        "meathods": [
            {
                "meathodName": "SetLastErrorMessage",
                "meathodDescription": "Sets Last Error Message",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "Error",
                        "type": "string",
                        "description": "The error message to set",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ClearLastErrorMessage",
                "meathodDescription": "Clears the last error message",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            }
        ]
    },
    "SQLColumnDef": {
        "className": "SQLColumnDef",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Provides information about a single column. See also AppDB.ReadDynaSQL.",
        "meathods": [],
        "properties": []
    },
    "TempFile": {
        "className": "TempFile",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A class that creates a temporary file that exists for the scope of the object. This can be\nused in conjunction with executing a command-line executable or PowerShell script that\nneeds to write output to a file.",
        "meathods": [],
        "properties": []
    },
    "TimeMillis": {
        "className": "TimeMillis",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Stores a point in time as milliseconds in UnixEpoch format.",
        "meathods": [],
        "properties": []
    },
    "TimePoint": {
        "className": "TimePoint",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Provides a breakdown of a point in time based on a time zone.",
        "meathods": [],
        "properties": []
    },
    "TimeT": {
        "className": "TimeT",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Stores a point in time as seconds in UnixEpoch format.",
        "meathods": [
            {
                "meathodName": "ParseDateText",
                "meathodDescription": "Parses a human-readable date string into a TimeT using built-in date formats.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "Optional. Defaults to true if not supplied. The value to which\nall Fields' select flags will be set.",
                        "optional": false
                    },
                    {
                        "name": "attrib",
                        "type": "int",
                        "description": "See DateTimeAttributeConstants [page 347] for values",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ParseDateText",
                "meathodDescription": "Parses a human-readable date string into a TimeT using built-in date formats.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "Optional. Defaults to true if not supplied. The value to which\nall Fields' select flags will be set.",
                        "optional": false
                    },
                    {
                        "name": "attrib",
                        "type": "int",
                        "description": "See DateTimeAttributeConstants [page 347] for values",
                        "optional": false
                    },
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "The time zone used to determine the point in time\nrepresented by the text. If not provided, the current\nuser's time zone is used.",
                        "optional": false
                    },
                    {
                        "name": "loc",
                        "type": "Locale",
                        "description": "The locale used during parsing. Especially important if\ndateformat is set to DateFormatConstants.FROM_LOCALE.\nHelps identify keywords such as \"AM\" and \"PM\".",
                        "optional": false
                    },
                    {
                        "name": "dateformat",
                        "type": "int",
                        "description": "The date format. See DateFormatConstants [page 345].",
                        "optional": false
                    },
                    {
                        "name": "timeformat",
                        "type": "int",
                        "description": "The time format. See TimeFormatConstants [page 355].\nIgnored if dateformat is\nDateFormatConstants.FROM_LOCALE.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ParseDateText",
                "meathodDescription": "Parses a human-readable date string into a TimeT using a custom format.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if date parsing was successful.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The text to parse.",
                        "optional": false
                    },
                    {
                        "name": "format",
                        "type": "string",
                        "description": "Optional. Defaults to true if not supplied. The value to which\nall Fields' select flags will be set.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ParseDateText",
                "meathodDescription": "Parses a human-readable date string into a TimeT using a custom format.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if date parsing was successful.",
                "meathodParms": [
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The text to parse.",
                        "optional": false
                    },
                    {
                        "name": "format",
                        "type": "string",
                        "description": "Optional. Defaults to true if not supplied. The value to which\nall Fields' select flags will be set.",
                        "optional": false
                    },
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "Timezone used to determine the point in time\nrepresented by the text. If not provided, the current\nuser's timezone is used.",
                        "optional": false
                    },
                    {
                        "name": "loc",
                        "type": "Locale",
                        "description": "Locale used during parsing. Especially important if\ndateformat is set to DateFormatConstants.FROM_LOCALE.\nHelps identify keywords such as \"AM\", \"PM\", month\nnames, etc.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FormatDateText",
                "meathodDescription": "Formats a date into a human-readable string using built-in date formats.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The date in human-readable text format.",
                "meathodParms": [
                    {
                        "name": "attrib",
                        "type": "int",
                        "description": "See DateTimeAttributeConstants [page 347] for values",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FormatDateText",
                "meathodDescription": "Formats a date into a human-readable string using built-in date formats.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The date in human-readable text format.",
                "meathodParms": [
                    {
                        "name": "attrib",
                        "type": "int",
                        "description": "See DateTimeAttributeConstants [page 347] for values",
                        "optional": false
                    },
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "The time zone used to determine the point in time\nrepresented by the text. If not provided, the current\nuser's time zone is used.",
                        "optional": false
                    },
                    {
                        "name": "loc",
                        "type": "Locale",
                        "description": "The locale used during parsing. Especially important if\ndateformat is set to DateFormatConstants.FROM_LOCALE.\nHelps identify keywords such as \"AM\" and \"PM\".",
                        "optional": false
                    },
                    {
                        "name": "dateformat",
                        "type": "int",
                        "description": "The date format. See DateFormatConstants [page 345].",
                        "optional": false
                    },
                    {
                        "name": "timeformat",
                        "type": "int",
                        "description": "The time format. See TimeFormatConstants [page 355].\nIgnored if dateformat is\nDateFormatConstants.FROM_LOCALE.",
                        "optional": false
                    },
                    {
                        "name": "dateFormatPref",
                        "type": "int",
                        "description": "See DateFormatFromLocaleConstants [page 346]. Only\nused when dateformat is set to\nDateFormatConstants.FROM_LOCALE. Indicates whether\nto use the terse or verbose format of the locale. If not\nprovided, the current user's preference is used.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FormatDateText",
                "meathodDescription": "Formats a date into a human-readable string using a custom date format.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The date in human-readable text format.",
                "meathodParms": [
                    {
                        "name": "format",
                        "type": "string",
                        "description": "A string with symbols and literals.\nFormat value is a string with symbols and literals (literals can be escaped inside single tick\n( ' ) values if necessary). Symbols are described in ICU documentation. When formatting,\nthe number of times a symbol occurs determines the length of values during output. For\ninstance, \"M\" will output January as \"1\", but \"MM\" will output January as \"01\". When\nparsing, it is often best to provide the simplest option \"M\", which will work with both \"1\"\nand \"01\". Keep in mind that TimeT is measured in seconds, therefore millisecond values\nwill always be zero.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FormatDateText",
                "meathodDescription": "Formats a date into a human-readable string using a custom date format.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The date in human-readable text format.",
                "meathodParms": [
                    {
                        "name": "format",
                        "type": "string",
                        "description": "A string with symbols and literals.\nFormat value is a string with symbols and literals (literals can be escaped inside single tick\n( ' ) values if necessary). Symbols are described in ICU documentation. When formatting,\nthe number of times a symbol occurs determines the length of values during output. For\ninstance, \"M\" will output January as \"1\", but \"MM\" will output January as \"01\". When\nparsing, it is often best to provide the simplest option \"M\", which will work with both \"1\"\nand \"01\". Keep in mind that TimeT is measured in seconds, therefore millisecond values\nwill always be zero.",
                        "optional": false
                    },
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "The time zone used to convert the point in time\nrepresented by the TimeT to text. If not provided, the\ncurrent user's timezone is used.",
                        "optional": false
                    },
                    {
                        "name": "loc",
                        "type": "Locale",
                        "description": "Locale used during formatting. Especially important if\ndateformat is set to DateFormatConstants.FROM_LOCALE.\nIndicates language to use for keywords such as \"AM\",\n\"PM\", month names, day of week names, etc.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ToTimePoint",
                "meathodDescription": "Resolves date into a TimePoint that represents year/month/day/etc. based on the\nspecified TimeZone.",
                "meathodReturn": "TimePoint",
                "meathodReturnDescription": "A breakdown of the fields in a date (year, month, day, etc.)\nSee TimePoint [page 294].",
                "meathodParms": [
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "The time zone used to convert the point in time\nrepresented by the TimeT to the TimePoint.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Add",
                "meathodDescription": "Adds or subtracts to date using TimeZone rules (to subtract use negative values).",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "tz",
                        "type": "TimeZone",
                        "description": "The time zone used to determine the point in time\nrepresented by the text. If not provided, the current\nuser's timezone is used.",
                        "optional": false
                    },
                    {
                        "name": "years",
                        "type": "int",
                        "description": "The number of years to add or subtract from the current\ndate. (Use negative values to subtract).",
                        "optional": false
                    },
                    {
                        "name": "months",
                        "type": "int",
                        "description": "The number of months to add or subtract from the current\ndate. (Use negative values to subtract).",
                        "optional": false
                    },
                    {
                        "name": "days",
                        "type": "int",
                        "description": "The number of days to add or subtract from the current\ndate. (Use negative values to subtract).",
                        "optional": false
                    },
                    {
                        "name": "hours",
                        "type": "int",
                        "description": "The number of hours to add or subtract from the current\ndate. (Use negative values to subtract).",
                        "optional": false
                    },
                    {
                        "name": "minutes",
                        "type": "int",
                        "description": "The number of minutes to add or subtract from the current\ndate. (Use negative values to subtract).",
                        "optional": false
                    },
                    {
                        "name": "seconds",
                        "type": "int",
                        "description": "The number of seconds to add or subtract from the current\ndate. (Use negative values to subtract).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "TruncateToDateOnly",
                "meathodDescription": "Rounds date down to midnight UTC.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "ToVariant",
                "meathodDescription": "Rounds date down to midnight UTC.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Variant that internally represents the date.",
                "meathodParms": []
            }
        ],
        "properties": [
            {
                "propertyName": "date",
                "propertyDescription": "Number of seconds since midnight 1/1/1970 UTC (GMT).",
                "propertyType": "int",
                "readOnly": true
            }
        ]
    },
    "TimeZone": {
        "className": "TimeZone",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Provides functions that create a TimeZone. You can create a TimeZone for the user you\nare acting as, or you use the UTC TimeZone, or a TimeZone delineating string.",
        "meathods": [],
        "properties": []
    },
    "Transition": {
        "className": "Transition",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "Identifies the type of transition.",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "TreeItem": {
        "className": "TreeItem",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "TreeItem is an object type for internal use and supports the concept of hierarchical\nrelationships (\"trees\"). Nested objects, such as projects, workflows, and folders inherit\nfrom TreeItem so they can support the following methods. TreeItem objects are never\nmerely of type TreeItem; they must be a subtype of TreeItem.",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "TreeList": {
        "className": "TreeList",
        "exposed": false,
        "inheritsFrom": "AppRecordList",
        "classDescription": "A TreeList is an AppRecordList that holds TreeItem objects. Typically, a TreeList is obtained\nby referencing the SubList property of a TreeItem, and it represents a sub-tree of projects\nor folders. The tree can be traversed using TreeItem methods.",
        "meathods": [
            {
                "meathodName": "Count",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "DeleteRecord",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the specified record from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "recordId",
                        "type": "int",
                        "description": "The TS_ID of the record to delete from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FindRecord",
                "meathodDescription": "inherited -> AppRecordList\nFind a specific record in the current list by matching its name or TS_ID.",
                "meathodReturn": "AppRecord",
                "meathodReturnDescription": "The first AppRecord in the list that matches the given name or ID. If\nthere is no match, returns null. Use is_var_null() to check for null.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": "Variant",
                        "description": "If this parameter is a non-numeric string, it is taken as\nthe desired record's name. Otherwise, it is converted to\nan integer and taken as the desired record's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Length",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecordList\nFills the AppRecordList from its table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": []
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by two column values.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecordList\nAn alternative to Read(), this method uses SQL to select\nonly certain records from the calling AppRecordList's table, rather than reading the entire\ntable.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "A SQL \"where clause\" specifying the records to find. SBM\nwill build a SQL string requesting all fields for the calling\nAppRecordList's table. The string contents of\nwhereClause will appear after the word \"where\" in this\nSQL statement.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "Params is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, with the first\nvalue as the parameter type and the second value as the\nvalue to bind to the SQL parameter. See Pair, Map_Pair,\nand Dictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page\n347].",
                        "optional": true
                    },
                    {
                        "name": "orderBy",
                        "type": "string",
                        "description": "Identifies a column used for ordering the AppRecordList.\nTo use the templateRec parameter without the orderBy\nparameter, use an empty string as a parameter for the\norderBy parameter.",
                        "optional": true
                    },
                    {
                        "name": "templateRec",
                        "type": "AppRecord",
                        "description": "Optional. Identifies which fields are read into all\nAppRecords in the AppRecordList. Using this parameter\nmay improve performance when using AppRecordOjbects\nwhich contain a VarFieldList from Primary or Auxiliary\ntables.\nTo use this optional parameter, create a VarRecord\nagainst the Primary table you are doing your\nReadWithWhere against. Get the VarFieldList of that\nVarRecord through the Fields() method. Call SelectAll,\nand pass it false to clear all fields. Then, explicitly turn\non the fields you wish to read by finding the Field on the\nVarFieldList, and then calling that Field's Select() method\nand passing it true.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "clear",
                "meathodDescription": "inherited -> AppRecordList\nRemoves all records from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "inherited -> AppRecordList\nReturns true if the list is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the list is empty; false if there are items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "erase_at",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the item at specified index from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero-based index of the item to remove from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "size",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecordList\nPerform a database update on all records in the list.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if all applicable records are successfully updated; false\notherwise.",
                "meathodParms": []
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "UGBase": {
        "className": "UGBase",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "UGBase is an object type for internal use and supports concepts useful to users and\ngroups. UGBase objects are never merely of type UGBase; they must be of type User. The\ntype Group also inherits from UGBase and is created when Ext.CreateAppRecord is\ninvoked using the group's table ID.",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "User": {
        "className": "User",
        "exposed": false,
        "inheritsFrom": "UGBase",
        "classDescription": "This type represents an SBM user. All methods are inherited from the UGBase object type.",
        "meathods": [
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the value of any field.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for a field or column.\nFor Text fields, this is the exact value entered in the field;\nfor selection fields, the value is the database ID for the\nselection. For values that are not Variant or TimeT, this\ninternally gets the value from the field as a Variant, and\nthen tries to convert the value to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nSets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the column value was successfully set; false\notherwise.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord -> UGBase\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "VarFieldList": {
        "className": "VarFieldList",
        "exposed": false,
        "inheritsFrom": "AppRecordList",
        "classDescription": "Primary and Auxiliary tables allow the user to add columns, and these user-defined\ncolumns are known as \"variable fields.\" A VarFieldList is a list of Field objects representing\nthe variable fields of a primary or auxiliary item. Note that Field is a subtype of\nAppRecord. It is possible to create your own VarFieldList object, in which case it will\ncontain any Field objects you choose to add to it, not necessarily corresponding to the\nvariable fields for any existing table.",
        "meathods": [
            {
                "meathodName": "ApplyProjectStateOverrides",
                "meathodDescription": "Applies the field ordering and privilege sections from the item's current state to the item's\nfield list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "FindField",
                "meathodDescription": "Finds the first field on the list that matches the given name or TS_ID.",
                "meathodReturn": "Field",
                "meathodReturnDescription": "The first Field on the list to match the given name or ID. If no Field\nobjects matched, it returns null. Check for null using is_var_null().",
                "meathodParms": [
                    {
                        "name": "fldNameOrId",
                        "type": "Variant",
                        "description": "If a non-numeric string, the name of the field to be looked\nup. If all uppercase, it is taken as the field's database\nname. Otherwise, it is taken as the display name. The\nsearch is not case sensitive; case is only used to determine\nwhether to search by database name or display name. Note\nthat the database name cannot be changed, but the logical\nname can be changed.\nIf not a non-numeric string, it is converted to an int and\ntaken as the desired field's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FindSysField",
                "meathodDescription": "Finds a field by syscode.",
                "meathodReturn": "Field",
                "meathodReturnDescription": "The Field on the list matching the given syscode. If no Field objects\nmatched, it returns null. Check for null using is_var_null().",
                "meathodParms": [
                    {
                        "name": "syscode",
                        "type": "int",
                        "description": "The system code of the field to be found.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SelectAll",
                "meathodDescription": "Can force all fields to be examined for changes (or ignored) on the next Update(),\noverriding the effect of the Field method Select().",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "Optional. Defaults to true if not supplied. The value to which\nall Fields' select flags will be set.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Count",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "DeleteRecord",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the specified record from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "recordId",
                        "type": "int",
                        "description": "The TS_ID of the record to delete from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "FindRecord",
                "meathodDescription": "inherited -> AppRecordList\nFind a specific record in the current list by matching its name or TS_ID.",
                "meathodReturn": "AppRecord",
                "meathodReturnDescription": "The first AppRecord in the list that matches the given name or ID. If\nthere is no match, returns null. Use is_var_null() to check for null.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": "Variant",
                        "description": "If this parameter is a non-numeric string, it is taken as\nthe desired record's name. Otherwise, it is converted to\nan integer and taken as the desired record's TS_ID.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Length",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecordList\nFills the AppRecordList from its table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": []
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecordList\nReads any record list type by two column values.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecordList\nAn alternative to Read(), this method uses SQL to select\nonly certain records from the calling AppRecordList's table, rather than reading the entire\ntable.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if successful; false otherwise. A successful read may\nreturn zero results if no items match the query. Check for results by\ncalling the AppRecordList.empty() method.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "A SQL \"where clause\" specifying the records to find. SBM\nwill build a SQL string requesting all fields for the calling\nAppRecordList's table. The string contents of\nwhereClause will appear after the word \"where\" in this\nSQL statement.",
                        "optional": false
                    },
                    {
                        "name": "params",
                        "type": "Vector",
                        "description": "Params is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, with the first\nvalue as the parameter type and the second value as the\nvalue to bind to the SQL parameter. See Pair, Map_Pair,\nand Dictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page\n347].",
                        "optional": true
                    },
                    {
                        "name": "orderBy",
                        "type": "string",
                        "description": "Identifies a column used for ordering the AppRecordList.\nTo use the templateRec parameter without the orderBy\nparameter, use an empty string as a parameter for the\norderBy parameter.",
                        "optional": true
                    },
                    {
                        "name": "templateRec",
                        "type": "AppRecord",
                        "description": "Optional. Identifies which fields are read into all\nAppRecords in the AppRecordList. Using this parameter\nmay improve performance when using AppRecordOjbects\nwhich contain a VarFieldList from Primary or Auxiliary\ntables.\nTo use this optional parameter, create a VarRecord\nagainst the Primary table you are doing your\nReadWithWhere against. Get the VarFieldList of that\nVarRecord through the Fields() method. Call SelectAll,\nand pass it false to clear all fields. Then, explicitly turn\non the fields you wish to read by finding the Field on the\nVarFieldList, and then calling that Field's Select() method\nand passing it true.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "clear",
                "meathodDescription": "inherited -> AppRecordList\nRemoves all records from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "inherited -> AppRecordList\nReturns true if the list is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the list is empty; false if there are items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "erase_at",
                "meathodDescription": "inherited -> AppRecordList\nRemoves the item at specified index from the list.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero-based index of the item to remove from the list.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "size",
                "meathodDescription": "inherited -> AppRecordList\nReturns the number of items in the list",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "The number of items in the list.",
                "meathodParms": []
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecordList\nPerform a database update on all records in the list.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if all applicable records are successfully updated; false\notherwise.",
                "meathodParms": []
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "Variant": {
        "className": "Variant",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A class that wraps multiple data types, especially for scripts that are converted from SBM\nAppScript to SBM ModScript.\nVariant is supported in SBM ModScript in order to ease conversion from SBM AppScript.\nVariant is modeled after VBScript's \"Variant\".",
        "meathods": [],
        "properties": []
    },
    "VarRecord": {
        "className": "VarRecord",
        "exposed": false,
        "inheritsFrom": "AppRecord",
        "classDescription": "A VarRecord is any record that has variable fields. In other words, it represents any\nprimary or auxiliary item. The item's fields are not defined by the database schema. They\nare added by designers using SBM Composer. VarRecord objects require a table ID at\ncreation, using Ext.CreateVarRecord().",
        "meathods": [
            {
                "meathodName": "GetDisplayIssueId",
                "meathodDescription": "Returns the item's display ID, consisting of a prefix indicating the item's type and a serial\nnumber within the item's project.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValue",
                "meathodDescription": "Gets the value of a field in the calling record's variable field list.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The internal value for the field. For Text fields,\nthis is the exact value entered in the field. For values that\nare not Variant or TimeT, this internally gets the value\nfrom the field as a Variant, and then tries to convert the\nvalue to the requested type.\nTimeT can be used with Date/Time fields to get the\ninternal date value.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe calling record's variable field list.\nField names for variable fields should be provided in upper\ncase for database names (TITLE, for example) or in lower/\nmixed-case for display names (Title, for example). For\ndetails on working with different types of database fields,\nrefer to Working with SBM Database Fields [page 39].",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetItemNumber",
                "meathodDescription": "Returns the numeric portion of the item's display ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetItemPrefix",
                "meathodDescription": "Returns the prefix of the item's display ID, indicating the item's type. Item types and their\nprefixes are defined when an SBM designer configures a workflow.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The prefix of the item's display ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetStateId",
                "meathodDescription": "Identifies the calling record's state within a workflow.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the record's state within the item's workflow. If the record\nis not from a primary table, then it does not have a workflow and the\nreturn value is -1.",
                "meathodParms": []
            },
            {
                "meathodName": "SetFieldValue",
                "meathodDescription": "Sets the value of any column.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the field was changed.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the column whose value will be set in the\nAppRecord schema.",
                        "optional": false
                    },
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string",
                            "int64_t",
                            "double",
                            "TimeT",
                            "Variant"
                        ],
                        "description": "The new value for the column. The value\nmust be specified as it is stored in the database. For\nexample, for integer columns that are a foreign key to the\nTS_USERS table, the value must be the database ID for\nthe user. TimeT values should only be used with columns\nthat represent dates, either as a native database date or\nas a integer that represents dates in Unix Epoch time\nformat.",
                        "optional": false
                    },
                    {
                        "name": "fieldList",
                        "type": "Variant",
                        "description": "Optional. If supplied and equal to the global\nconstant Nothing, this parameter will refer to the calling\nrecord's VarFieldList when this method returns. If supplied\nand not equal to Nothing, this parameter is taken to be the\ncalling record's VarFieldList.\nDo not set this parameter's value yourself. Always pass a\nvariable set to Nothing and then reuse the variable for\nsubsequent calls to GetFieldValue() and SetFieldValue() on\nthe same VarRecord object. If this parameter is omitted,\nno functionality changes, but efficiency may suffer.",
                        "optional": true
                    },
                    {
                        "name": "field",
                        "type": "Variant",
                        "description": "Optional. If supplied and equal to the global\nconstant Nothing, this parameter will refer to the Field\nobject on the calling record's VarFieldList whose name\nmatches the name input parameter when this method\nreturns. If supplied and not equal to Nothing, this\nparameter is taken to be that Field object.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartTransition",
                "meathodDescription": "Starts a transition on an item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartTransitionWithLock",
                "meathodDescription": " Identical to StartTransition(), assumes AppRecord.Lock()\nhas been invoked.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition was started. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "FinishTransition",
                "meathodDescription": "Finishes a transition on an item after StartTransition() has\nbeen invoked and field values have been set.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "QuickTransition",
                "meathodDescription": "Identical to FinishTransition() except that StartTransition() is\nnot required.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": [
                    {
                        "name": "trans",
                        "type": "Variant",
                        "description": "Can be transition ID, 0 (will use default Update transition\nfor item), transition UUID, or transition internal name.",
                        "optional": false
                    },
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "If true, any item lock on this item will be stolen by\nthis transition. If it was locked, the user who had the item\nlocked (in transition) will not be able to complete their\ntransition. Does not guarantee that the transition succeeds,\nas scripts can steal locks from each other.",
                        "optional": true
                    },
                    {
                        "name": "signedUserID",
                        "type": "string",
                        "description": "Optional. Provides the user name portion of the signature if\nthe transition requires a user's signature.",
                        "optional": true
                    },
                    {
                        "name": "signedUserPwd",
                        "type": "string",
                        "description": "Optional, required if signedUserID is provided. Provides the\npassword portion of the signature if the transition requires a\nuser's signature.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "StartSubmitToAux",
                "meathodDescription": "Starts the submit of a new item into an auxiliary table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "FinishSubmitToAux",
                "meathodDescription": "Finishes the submit into an auxiliary table.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "QuickSubmitToAux",
                "meathodDescription": "Identical to FinishSubmitToAux except StartSubmitToAux is\nnot required.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if transition completed successfully. If false, use\nShell.GetLastErrorMessage() for more information.",
                "meathodParms": []
            },
            {
                "meathodName": "Add",
                "meathodDescription": "inherited -> AppRecord\nThis method adds a new row to a table. After creating an AppRecord from\nthe desired table and setting any desired field values, use this method to add the\nrecord as a new row in its table. This is not for use with Primary tables, because\nthose items must go through a Submit transition. However, it is possible to make a\ncopy of a Primary table item using this method.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The TS_ID of the record added, which is unique to this table.\nZero means the record could not be added due to an error.",
                "meathodParms": []
            },
            {
                "meathodName": "Delete",
                "meathodDescription": "inherited -> AppRecord\nOn most tables, this method removes the record from the database. On\ntables such as States and Users, the records are marked as deleted but remain in\nthe database.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "True if the record is deleted from or marked as deleted in the\ndatabase.",
                "meathodParms": []
            },
            {
                "meathodName": "Fields",
                "meathodDescription": "inherited -> AppRecord\nReturns a VarFieldList containing all fields for a VarRecord.",
                "meathodReturn": "VarFieldList",
                "meathodReturnDescription": "The list of fields from this AppRecord. If there is no FieldList for this\nrecord, this method returns null. Use is_var_null() to check for\nnull.",
                "meathodParms": []
            },
            {
                "meathodName": "GetDisplayName",
                "meathodDescription": "inherited -> AppRecord\nReturns the display name of a record.",
                "meathodReturn": "string",
                "meathodReturnDescription": "This record's display name, formatted according to table settings.",
                "meathodParms": []
            },
            {
                "meathodName": "GetFieldValueString",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueInt64",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "int64_t",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueDouble",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "double",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetFieldValueTimeT",
                "meathodDescription": "inherited -> AppRecord\nGets the value of a field in the calling record's variable field list.",
                "meathodReturn": "TimeT",
                "meathodReturnDescription": "The internal value for the field. For Text fields, this is the exact value\nentered in the field.",
                "meathodParms": [
                    {
                        "name": "name",
                        "type": "string",
                        "description": "The name of the field whose value will be retrieved from\nthe variable field list or the AppRecord column. Field\nnames for variable fields should be provided in uppercase\ncharacters for database names or in lowercase/mixed-case\ncharacters for display names (for Title, for example).",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "GetId",
                "meathodDescription": "inherited -> AppRecord\nRetrieves the current AppRecord's TS_ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "TS_ID of the calling AppRecord.",
                "meathodParms": []
            },
            {
                "meathodName": "GetUUID",
                "meathodDescription": "inherited -> AppRecord\nReturns the item's UUID, if applicable.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The item's UUID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetName",
                "meathodDescription": "inherited -> AppRecord\nGets the calling AppRecord's \"Name\" system field.",
                "meathodReturn": "string",
                "meathodReturnDescription": "A text string from the associated Name field.",
                "meathodParms": []
            },
            {
                "meathodName": "GetRecTableId",
                "meathodDescription": "inherited -> AppRecord\nReturns the calling AppRecord's table ID.",
                "meathodReturn": "int",
                "meathodReturnDescription": "The calling AppRecord's table ID.",
                "meathodParms": []
            },
            {
                "meathodName": "GetSchemaColumns",
                "meathodDescription": "inherited -> AppRecord\nReturns a Vector of SchemaColumn objects. Will not include fields for VarRecord or\nProjectBasedRecord objects.",
                "meathodReturn": "Vector",
                "meathodReturnDescription": "Each entry will be a SchemaColumn object representing a column in\nthe database that this item can interact with.",
                "meathodParms": []
            },
            {
                "meathodName": "HasVariableDBFields",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord is from a table with variable fields.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the calling AppRecord's table has variable fields.",
                "meathodParms": []
            },
            {
                "meathodName": "IsFieldEqual",
                "meathodDescription": "inherited -> AppRecord\nTests for equivalence between the specified field and a value formatted as a string.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the field is found and is equal; false otherwise.",
                "meathodParms": [
                    {
                        "name": "fieldNameOrId",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If a non-numeric string, the name of the field to be tested.\nOtherwise, it is converted to a number and taken as the\nTS_ID of the field to be tested.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "string",
                        "description": "The value to be compared to. The field's value will be\nformatted as a string and compared to this value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "IsLocked",
                "meathodDescription": "inherited -> AppRecord\nTests whether the calling AppRecord has been locked, meaning it is in use by another\nuser.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "lockedByThisUser",
                        "type": "bool",
                        "description": "Without an input parameter ( or with \"false\" as the input ),\nIsLocked() means \"Does someone else have this record\nlocked?\"\nWith \"true\" as the input parameter, the meaning is \"May I\n(as the current user) update this record?\"",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Lock",
                "meathodDescription": "inherited -> AppRecord\nLocks the calling AppRecord, so other users will not attempt\nto update it.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is locked by another user.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Defaults to false, meaning if this item is already\nlocked, no lock will be established.\nIf true, any existing lock on this record will be broken, and\nchanges made by the former lock holder are lost.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Read",
                "meathodDescription": "inherited -> AppRecord\nLooks up a row in the AppRecord's table",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the TS_ID or name was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "recordIdOrName",
                        "type": [
                            "int",
                            "string"
                        ],
                        "description": "If this is an int or string that SBM ModScript can convert to\nan int, it is taken as the value to search for in the TS_ID\ncolumn. All other parameter types are converted to a string\nand searched for in the Name system field.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadWithWhere",
                "meathodDescription": "inherited -> AppRecord\nUsed to find a record by passing in a string containing a SQL\n\"where\" clause, not including the keyword \"where\".",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the method found the record, in which case the calling\nobject becomes a copy of the record found. If more than one record\nis found, the first one is copied to the calling object.",
                "meathodParms": [
                    {
                        "name": "whereClause",
                        "type": "string",
                        "description": "The SQL \"where\" clause to find the specific record in the\ntable, not including the keyword \"where\".",
                        "optional": false
                    },
                    {
                        "name": "queryParams",
                        "type": "Vector",
                        "description": "queryParams is an optional Vector storing SQL bind\nparameters, where each entry is a Pair, where the first value\nis the parameter type and the second value is the value to\nbind to the SQL parameter. See Pair, Map_Pair, and\nDictionary_Pair [page 123].\nFor the type parameter, use DBTypeConstants [page 347].",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "ReadByColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by a column value",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The database name of the column without the TS_ prefix.",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – ReadByColumn() will succeed if the\ncolumn is a floating point column.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByColumnAndColumn",
                "meathodDescription": "inherited -> AppRecord\nReads any record type by two column values",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the item is read successfully; false if the item is not\nfound.",
                "meathodParms": [
                    {
                        "name": "columnName",
                        "type": "string",
                        "description": "The name of the column without the \"TS_\" prefix",
                        "optional": false
                    },
                    {
                        "name": "value",
                        "type": "Variant",
                        "description": "Value must be an int, int64_t, short, byte, bool, or string\nthat can be converted to an int.",
                        "optional": false
                    },
                    {
                        "name": "column2Name",
                        "type": "string",
                        "description": "The name of the second column without the \"TS_\" prefix.",
                        "optional": false
                    },
                    {
                        "name": "value2",
                        "type": "Variant",
                        "description": "Behavior depends on the Variant internal type:\n• string – ReadByColumn() will succeed if the column is a\ntext column.\n• int, int64_t, short, byte, or bool – ReadByColumn() will\nsucceed if the column is an integer column.\n• float or double – Not supported.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "ReadByUUID",
                "meathodDescription": "inherited -> AppRecord\nReads the item using the UUID column, if it exists.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was found, in which case the\ncalling AppRecord object becomes a copy of that row in the table.",
                "meathodParms": [
                    {
                        "name": "itemUUID",
                        "type": "string",
                        "description": "The UUID value that is passed in.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "SetName",
                "meathodDescription": "inherited -> AppRecord\nSets the \"name\" value of the calling object.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "newName",
                        "type": "string",
                        "description": "Text to be used as the new name for the item.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "Unlock",
                "meathodDescription": "inherited -> AppRecord\nUnlocks the calling AppRecord, signaling that it is available\nfor other users.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully unlocked or was not\nlocked to begin with.",
                "meathodParms": [
                    {
                        "name": "currentUserOnly",
                        "type": "bool",
                        "description": "Defaults to false. If true, only the current user's\nlock is unlocked. If false, any user's lock on this record is\nremoved.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "Update",
                "meathodDescription": "inherited -> AppRecord\nThis method updates the item in the database using the\nvalues from the item.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record is updated in the database.",
                "meathodParms": []
            },
            {
                "meathodName": "UpdateWithLock",
                "meathodDescription": "inherited -> AppRecord\nUpdates the record that has been previously locked with\nLock() function.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the record was successfully updated; false otherwise.",
                "meathodParms": [
                    {
                        "name": "stealLock",
                        "type": "bool",
                        "description": "Optional parameter that allows the user to skip the Lock()\nfunction and steal the lock during the update. Defaults to\nfalse. If true, any other user's existing lock will be broken,\ncausing that user's changes to be lost.",
                        "optional": true
                    }
                ]
            }
        ],
        "properties": [],
        "inheritsDone": true
    },
    "char32_t": {
        "className": "char32_t",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "A set of utility functions for identifying Unicode traits of char32_t code points.",
        "meathods": [],
        "properties": []
    },
    "Dictionary_Pair": {
        "className": "Dictionary_Pair",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "Dictionary is a class for supporting dictionary objects in scripts that are converted from\nSBM AppScript to SBM ModScript, in general, use ChaiScript's Map instead. Entries in\nDictionary will be of type Dictionary_Pair. In Dictionary_Pair, first is a string; second is a\nVariant.",
        "meathods": [
            {
                "meathodName": "first",
                "meathodDescription": "Accesses the first object in the Dictionary_Pair.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The first object in the Dictionary_Pair.",
                "meathodParms": []
            },
            {
                "meathodName": "second",
                "meathodDescription": "Accesses the second object in the Dictionary_Pair.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The second object in the Dictionary_Pair.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "int": {
        "className": "int",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "int",
        "meathods": [],
        "properties": []
    },
    "Map": {
        "className": "Map",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "The Map class is a case sensitive key-value container, where the keys are strings. Keys\nwill all be unique.",
        "meathods": [
            {
                "meathodName": "at",
                "meathodDescription": "Accesses value at location key. Throws exception if not\nfound.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The value at location key.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "location of value",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "clear",
                "meathodDescription": "Empties the Map.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "Returns true if the Map is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the Map is empty.",
                "meathodParms": []
            },
            {
                "meathodName": "size",
                "meathodDescription": "Returns the count of items in the Map.",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "Returns the count of items in the Map.",
                "meathodParms": []
            },
            {
                "meathodName": "count",
                "meathodDescription": "Returns 1 if key is found inside the container;\notherwise, 0.",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "Returns 1 if key is found inside the container;\notherwise, 0.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "The key you want to check for.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "erase",
                "meathodDescription": "Removes specified elements from the container, if one\nexists. Returns 1 if key is found inside the container; otherwise, 0.",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "Returns 1 if key is found inside the container; otherwise, 0.",
                "meathodParms": [
                    {
                        "name": "key",
                        "type": "string",
                        "description": "The key you want to remove.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "insert",
                "meathodDescription": "Copies values from m into this Map. Ignores values from m\nwith keys that are already in this map.\nInserts value p into this Map. Ignores p if the key value\nis already in this map.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "m or p",
                        "type": [
                            "Map",
                            "Map_Pair"
                        ],
                        "description": "If a map, copies values from m into this Map. If a map_pair \nInserts value p into this Map. Ignores p if the key value\nis already in this map.",
                        "optional": false
                    }
                ]
            }
        ],
        "properties": []
    },
    "Map_Pair": {
        "className": "Map_Pair",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "The entries in a Map will be of type Map_Pair. In Map_Pair, first is a string; second is\nany object type.",
        "meathods": [
            {
                "meathodName": "first",
                "meathodDescription": "Accesses the first object in the Map_Pair.",
                "meathodReturn": "string",
                "meathodReturnDescription": "The first object in the Map_Pair.",
                "meathodParms": []
            },
            {
                "meathodName": "second",
                "meathodDescription": "Accesses the second object in the Map_Pair.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The second object in the Map_Pair.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "Pair": {
        "className": "Pair",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "The Pair class stores two objects.",
        "meathods": [
            {
                "meathodName": "first",
                "meathodDescription": "Accesses the first object in the Pair.",
                "meathodReturn": "variant",
                "meathodReturnDescription": "The first object in the Pair.",
                "meathodParms": []
            },
            {
                "meathodName": "second",
                "meathodDescription": "Accesses the second object in the Pair.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "The second object in the Pair.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "string": {
        "className": "string",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "The string class stores a text value in UTF-8.",
        "meathods": [],
        "properties": []
    },
    "u32string": {
        "className": "u32string",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "The utility string class that stores a text value in UTF-32. This is not the default string\nclass, but can be used for working with Unicode string contents. See\nstring.to_u32string() in string [page 125].",
        "meathods": [],
        "properties": []
    },
    "Unknown": {
        "className": "Unknown",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "This is a variable of unknown type.\nThe parser determined this was a variable but not its type.\nYou can hint to the parse engine what type it is by commenting:\n//var VARNAME is TYPE\ninside of the scope the variable is in.",
        "meathods": [],
        "properties": []
    },
    "Vector": {
        "className": "Vector",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "The Vector class stores a resizable array of objects.",
        "meathods": [
            {
                "meathodName": "clear",
                "meathodDescription": "Empties the Vector.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "empty",
                "meathodDescription": "Returns true if the Vector is empty.",
                "meathodReturn": "bool",
                "meathodReturnDescription": "Returns true if the Vector is empty.",
                "meathodParms": []
            },
            {
                "meathodName": "size",
                "meathodDescription": "Returns the count of items in the Vector",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "Returns the count of items in the Vector",
                "meathodParms": []
            },
            {
                "meathodName": "front",
                "meathodDescription": "Accesses value at the beginning of the Vector. Throws an\nexception if the Vector is empty.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns the value at the beginning of the Vector.",
                "meathodParms": []
            },
            {
                "meathodName": "back",
                "meathodDescription": "Accesses value at the end of the Vector. Throws an\nexception if the Vector is empty.",
                "meathodReturn": "Variant",
                "meathodReturnDescription": "Returns the value at the end of the Vector.",
                "meathodParms": []
            },
            {
                "meathodName": "push_back",
                "meathodDescription": "Inserts the value o at the end of the Vector",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "o",
                        "type": "Variant",
                        "description": "Inserts the value o at the end of the Vector",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "pop_back",
                "meathodDescription": "Removes value from the end of the Vector. Do not invoke this on\nan empty Vector.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": []
            },
            {
                "meathodName": "insert_at",
                "meathodDescription": "Inserts o at position index. Throws an\nexception if index is out of range.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero based index of where to place the value o.",
                        "optional": false
                    },
                    {
                        "name": "o",
                        "type": "Variant",
                        "description": "The value o will be inserted into the Vector.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "erase_at",
                "meathodDescription": "Removes object at position index. Throws an exception\nif index is out of range.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "index",
                        "type": "int",
                        "description": "The zero based index of where to remove the value.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "resize",
                "meathodDescription": "Resizes the Vector to\ncontain count elements. If the current size is greater than the count, the container\nis reduced to its first count elements. If the current size is less than count,\nadditional elements are appended and copied from o.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "count",
                        "type": "size_t",
                        "description": "The new size of the Vector",
                        "optional": false
                    },
                    {
                        "name": "o",
                        "type": "Variant",
                        "description": "If count is greater than the current size, additional elements are appended and copied from o.\nIf o is not provided the new values will be default-initialized.",
                        "optional": true
                    }
                ]
            },
            {
                "meathodName": "reserve",
                "meathodDescription": "Pre-allocates a buffer of size count for future use.",
                "meathodReturn": "void",
                "meathodReturnDescription": "void",
                "meathodParms": [
                    {
                        "name": "count",
                        "type": "size_t",
                        "description": "New buffer of size of Vector for future use.",
                        "optional": false
                    }
                ]
            },
            {
                "meathodName": "capacity",
                "meathodDescription": "Returns the current buffer size.",
                "meathodReturn": "size_t",
                "meathodReturnDescription": "Returns the current buffer size.",
                "meathodParms": []
            }
        ],
        "properties": []
    },
    "void": {
        "className": "void",
        "exposed": false,
        "inheritsFrom": "",
        "classDescription": "void",
        "meathods": [],
        "properties": []
    },
    "DBTypeConstants": {
        "className": "DBTypeConstants",
        "exposed": true,
        "inheritsFrom": "",
        "classDescription": "Global const object for database types, used in SchemaColumn, SQLColumnDef, and SQL\nparameters.",
        "properties": [
            {
                "propertyName": "BIGINT",
                "propertyDescription": "-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "INTEGER",
                "propertyDescription": "-2,147,483,648 to 2,147,483,647",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "SMALLINT",
                "propertyDescription": "-32,768 to 32,767",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "TINYINT",
                "propertyDescription": "0 to 255",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "DOUBLE",
                "propertyDescription": "8 byte floating point number with a range of 2.2 × 10^-308 to 1.8 × 10^308",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "FLOAT",
                "propertyDescription": "4 byte floating point number with a range of 1.7 × 10^-38 to 3.4 × 10^38",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "DATETIME",
                "propertyDescription": "A date and time combination. Format: YYYY-MM-DD hh:mm:ss. The supported range is from '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "DECIMAL",
                "propertyDescription": "Fixed precision and scale numbers. Allows numbers from -10^38 +1 to 10^38 –1.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "NUMERIC",
                "propertyDescription": "Fixed precision and scale numbers. Allows numbers from -10^38 +1 to 10^38 –1.",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "CHAR",
                "propertyDescription": "Fixed width character string. 8,000 characters Max size",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "VARCHAR",
                "propertyDescription": "Variable width character string. 8,000 characters Max size",
                "propertyType": "int",
                "readOnly": true
            },
            {
                "propertyName": "LONGVARCHAR",
                "propertyDescription": "Variable width character string. 1,073,741,824 characters Max size",
                "propertyType": "int",
                "readOnly": true
            }
        ],
        "meathods": []
    },

};
//# sourceMappingURL=classes.js.map