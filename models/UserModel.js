const connection = require("../configs/Dbconnect");
const { Request, TYPES } = require("tedious");

const getUserdata = async (uid, pass) => {
  //  console.log(uid, pass);
  const allData = {};
  const selectQuery = `SELECT userid, nama FROM username WHERE userid = @uid AND password = @pass`;
  let row = 0;

  //Set the promise awaiting it gets results
  await new Promise((resolve, reject) => {
    const request = new Request(selectQuery, function (err /*, rowCount*/) {
      if (err) {
        return reject(err);
      } else {
        //console.log(rowCount + " rows");
      }
    });

    request.addParameter("uid", TYPES.VarChar, uid); //Param declaration
    request.addParameter("pass", TYPES.VarChar, pass); //Param declaration
    request.on("row", function (columns) {
      allData[row] = {};
      columns.forEach(function (column) {
        allData[row][column.metadata.colName] = column.value;
      });
      row += 1;
    });

    request.on("doneProc", function (/*rowCount, more, returnStatus, rows*/) {
      // console.log("onDoneProc");
      return resolve(allData); //Resolve allData using promise in order to get it´s content later
    });
    connection.execSql(request);
  });

  return allData;
};

// Export of all methods as object
module.exports = {
  getUserdata,
};
