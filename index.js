//infoArray = [name, surname, title, rate]
function createEmployeeRecord(infoArray){
    const newRecord = {
        'firstName': infoArray[0],
        'familyName': infoArray[1],
        'title': infoArray[2],
        'payPerHour': infoArray[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
    try {
        throw new Error("Whoops!");
      } catch (e) {
        console.error(`${e.name}: ${e.message}`);
      }
    return newRecord
}

function createEmployeeRecords(infoArrays){
    const newRecords = []
    infoArrays.forEach((element) => newRecords.push(createEmployeeRecord(element)))
    return newRecords
}

function createTimeInEvent(record, dateStamp){
    const splitDate = dateStamp.split(' ')
    const hour = Number(splitDate[splitDate.length-1])
    const date = splitDate[0]
    record.timeInEvents.push({
        'type':'TimeIn',
        'hour': hour,
        'date': date
    })
    return record
}

function createTimeOutEvent(record, dateStamp){
    const splitDate = dateStamp.split(' ')
    const hour = Number(splitDate[splitDate.length-1])
    const date = splitDate[0]
    record.timeOutEvents.push({
        'type':'TimeOut',
        'hour': hour,
        'date': date
    })
    return record
}

function hoursWorkedOnDate(record, date){
    let hourIn = null
    let hourOut = null
    for(let event of record.timeInEvents){
        if(event.date === date){
            hourIn = event.hour
        }
    }
    for(let event of record.timeOutEvents){
        if(event.date === date){
            hourOut = event.hour
        }
    }
    return Math.round(hourOut - hourIn)/100
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
    return record.timeInEvents.reduce(function(accumulator, element){
        return wagesEarnedOnDate(record, element.date) + accumulator
    }, 0)
}

function calculatePayroll(records){
    let payroll = 0
    for(let record of records){
        payroll += allWagesFor(record)
    }
    return payroll
}