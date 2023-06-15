const connection = require("../configs/Dbconnect");
const { Request } = require("tedious");

const getUserdata = async () => {
  //ar id = "id you want or user inputs";

  const allData = {};
  let row = 0;
  const selectQuery = `SELECT top 10 * FROM username`;
  // We now set the promise awaiting it gets results
  await new Promise((resolve, reject) => {
    const request = new Request(selectQuery, function (err, rowCount) {
      if (err) {
        return reject(err);
      } else {
        //console.log(rowCount + " rows");
      }
    });

    // request.addParameter("id", TYPES.NVarChar, id); //Param id declaration
    request.on("row", function (columns) {
      allData[row] = {};
      columns.forEach(function (column) {
        allData[row][column.metadata.colName] = column.value;
      });
      row += 1;
    });

    request.on("doneProc", function (rowCount, more, returnStatus, rows) {
      console.log("onDoneProc");
      return resolve(allData); //Here we resolve allData using promise in order to get it´s content later
    });
    connection.execSql(request);
  });
  //console.log(allData);
  return allData;
  //console.log(allData);
};

// Export of all methods as object
module.exports = {
  getUserdata,
};
