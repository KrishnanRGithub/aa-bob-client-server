const processUserDataFI = (type,data) => {
  var processedData=[]
  if(type=="equity"){
    var data ={}
    var summary = data[1]['Account']['Summary']['Investment']
    var alldetails = data[1]['Account']['Transactions']['Transaction']
      for (i of summary){
        for(j of i){
          var raw  = j["Holdings"]
          for(k of raw){
            var d=k["Holdings"]['investmentDateTime'].split("T")
            processedData.push({
              "type": k["Type"],
              "issuerName": k['Holding']["issuerName"],
              "units": k['Holding']["units"],
              "rate": k['Holding']["rate"],
              "dateOfInvestment": d[0],
              "timeOfInvestment": d[1],
            })
          }
       }
      }
      data['summary'] = processedData.reverse();
      processedData=[]
      for (i of alldetails){
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
      }
      data['all'] = processedData.reverse();
      return data;
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
