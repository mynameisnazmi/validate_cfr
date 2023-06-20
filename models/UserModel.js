const connection = require("../configs/Dbconnect");
const { Request, TYPES } = require("tedious");

const getUserdata = async (uid, pass) => {
  //  console.log(uid, pass);
  const allData = {};
  let row = 0;
  const query =
    "SELECT userid, nama FROM username WHERE userid = @uid AND password = @pass";
  //Set the promise awaiting it gets results
  await new Promise((resolve, reject) => {
    //create request
    const request = new Request(query, function (err /*, rowCount*/) {
      if (err) {
        return reject(err);
      } else {
        //console.log(rowCount + " rows");
      }
      //connection.close();
    });

    //Add parameter and get value from DB
    request.addParameter("uid", TYPES.VarChar, uid); //Param declaration
    request.addParameter("pass", TYPES.VarChar, pass); //Param declaration
    request.on("row", function (columns) {
      allData[row] = {};
      columns.forEach(function (column) {
        //data sample  object  [0] : "colname" : "value"
        allData[row][column.metadata.colName] = column.value;
      });
      row += 1;
    });

    //When done return value
    request.on("doneProc", function (/*rowCount, more, returnStatus, rows*/) {
      //console.log(allData);
      return resolve(allData); //Resolve allData using promise in order to get it´s content later
    });
    connection.execSql(request);
  });

  return allData;
};

const addUserdata = async (uid, nama, pass) => {
  let row = 0;
  const allData = {};
  allData[row] = {};
  try {
    //Check user
    const sp_name = "[dbo].[register_username]";

    //Set the promise awaiting it gets results
    await new Promise((resolve, reject) => {
      const request = new Request(sp_name, function (error, rowCount, rows) {
        if (error) {
          return reject("Error executing stored procedure:", error);
        } else {
          //console.log("Stored procedure executed successfully");
        }
        // Close the connection after executing the stored procedure
        //connection.close();
      });

      //Add parameter input
      request.addParameter("uid", TYPES.VarChar, uid); //Param declaration
      request.addParameter("nama", TYPES.VarChar, nama); //Param declaration
      request.addParameter("pass", TYPES.VarChar, pass); //Param declaration

      //Add parameter output
      request.addOutputParameter("result", TYPES.VarChar); //Param declaration

      //get output value
      request.on("returnValue", (parameterName, value, metadata) => {
        allData[row][parameterName] = value;
        row += 1;
      });
      //console.log(allData);

      //When done return value
      request.on("doneProc", function (/*rowCount, more, returnStatus, rows*/) {
        //console.log(allData);
        return resolve(allData); //Resolve allData using promise in order to get it´s content later
      });

      connection.callProcedure(request);
    });
  } catch (error) {
    console.log(error);
  }
  return allData;
};

// Export of all methods as object
module.exports = {
  getUserdata,
  addUserdata,
};
