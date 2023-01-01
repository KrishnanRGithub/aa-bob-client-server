const processUserDataFI = (type,data) => {
  var temp = data[type]
  var processedData=[]
  return processedData;
};

const processUserDataAA = (type,data) => {
    var temp = data.analytics[type]
    var processedData=[]
    if(type=="allTransactions"){
        for (i in temp){
            var d=temp[i].dateOfTransaction.split("T")
            processedData.push({
                "type": temp[i].type,
                "amount": temp[i].amount,
                "dateOfTransaction": d[0],
                "timeOfTransaction": d[1],
                "categoryCode": temp[i].categoryCode,
                "counterParty": temp[i].counterParty,
                "category": temp[i].category,
            })
        }
    }
    return processedData;
  };
module.exports = {processUserDataAA,processUserDataFI};
