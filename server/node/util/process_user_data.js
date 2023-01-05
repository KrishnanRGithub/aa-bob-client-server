const processUserDataFI = (type,data) => {
  var processedData=[]
  var reply ={}
  if(type=="equities"){
    var summary = data[1]['Account']['Summary']['Investment']
    var alldetails = data[1]['Account']['Transactions']['Transaction']
      summary.forEach(function(i,index){
        // i.forEach(function(j,index){
          var raw  = i["Holdings"]
          raw.forEach(function(k,index){
            var d=k["Holding"]['investmentDateTime'].split("T")
            processedData.push({
              "type": k["Type"],
              "issuerName": k['Holding']["issuerName"],
              "units": k['Holding']["units"],
              "rate": k['Holding']["rate"],
              "dateOfInvestment": d[0],
              "timeOfInvestment": d[1],
            })
          })
      //  })
      })
      reply['summary'] = processedData.reverse();
      processedData=[]
      alldetails.forEach(function(i,index){
        var d=i['transactionDateTime'].split("T")
        processedData.push({
          "symbol": "RELIANCE",
          "exchange": "NSE",
          "dateOfTransaction": d[0],
          "timeOfTransaction": d[1],
          "equityCategory": "EQUITY",
          "rate": "2664.25",
          "tradeValue": "29306.75",
          "type": "BUY",
          "units": "11",
        })
      })
      reply['all'] = processedData.reverse();
      return reply;
   }
   return processedData;

}

const processUserDataAA = (type,data) => {
    var processedData=[]
    if(type=="allTransactions"){
      var temp = data.analytics["allTransactions"]
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
        processedData.reverse()
    }
    return processedData;
  };
module.exports = {processUserDataAA,processUserDataFI};
