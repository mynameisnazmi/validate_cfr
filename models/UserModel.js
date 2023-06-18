const connection = require("../configs/Dbconnect");
const { Request, TYPES } = require("tedious");

const getUserdata = async (uid, pass) => {
  //  console.log(uid, pass);
  const allData = {};
  let row = 0;
  const selectQuery = `SELECT userid, nama FROM username WHERE userid = @uid AND password = @pass`;

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

const addUserdata = async(uid,nama, pass)=>{
  //const allData = {};
  //let row = 0;
  const sp_name = '[dbo].[sample]'

//Set the promise awaiting it gets results
await new Promise((resolve, reject) => {
  const request = new Request(sp_name, function (err /*, rowCount*/) {
    if (err) {
      return reject('Error executing stored procedure:',err);
    } else {
      console.log('Stored procedure executed successfully');;
    }
     // Close the connection after executing the stored procedure
     connection.close();
  });


  request.addParameter('inputVal', TYPES.VarChar, 'hello world');
  request.addOutputParameter('outputCount', TYPES.Int);

  request.on('returnValue', (paramName, value, metadata) => {
    //console.log(paramName + ' : ' + value);
    return resolve(value); //Resolve allData using promise in order to get it´s content later
  });
  connection.callProcedure(request);

});
}


// Export of all methods as object
module.exports = {
  getUserdata,
  addUserdata
};
