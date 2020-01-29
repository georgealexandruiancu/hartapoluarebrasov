## Database looking

```
{
  "admins" : [ 
    null, {
        "_createdAt" : "DateOfCreation",
        "_id" : "AdminID",
        "_lastLogin" : "LastLoginForAdmin",
        "_mode" : "Administrator",
        "email" : "EmailWillBeHere",
        "name" : "NameWillBeHere",
        "phone" : "PhoneWillBeHere"
    } 
  ],
  "devices" : [ 
      null, {
            "_deviceId" : "IdForDevice",
            "_entryId" : "CorrespondWithUserID",
            "author" : "NameOfUser",
            "data" : {
            "coordLat" : "CoordonaiteForLatitudeOnDevice",
            "coordLng" : "CoordinateForLongituteOnDevice",
            "currency" : "MesuringMode",
            "date" : "dateForValue",
            "history" : [ 
                null, {
                    "date" : "DataOfHistoryValue",
                    "percent" : "RelativePercent",
                    "time" : "TimeOfHistoryStored",
                    "value" : "Value"
                } 
            ],
            "name" : "WhatIsMeasuring?",
            "percent" : "RelativeMeasureFromAllTime",
            "time" : "ActualTimeWhenStoreData",
            "value" : "ValueForSensor"
            },
            "zone" : "ZoneForDevice"
        } 
  ],
  "users" : [ 
      null, {
        "_createdAt" : "DateOfCreation",
        "_id" : "_IdWillBeHere",
        "_lastLogIn" : "LastDateForLogin",
        "_mode" : "ModeForUser",
        "email" : "EmailWillBeHere",
        "name" : "NameWillBeHere",
        "phone" : "PhoneWillBeHere"
    } 
  ]
}

```
NULL value from array will be the index of registration (unique ID / array index)