/**
 * Created by Wasib on 26/02/18.
 */
//http://localhost:8080/fpai/api/dataValueSets.json?dataSet=S11S5cvcCkR&period=2016&orgUnit=oCL6lUtM3bB&paging=false
//http://localhost:8080/fpai/api/audits/dataValue.json?de=Qn3Yf4iOy63
dataImportApp.directive('calendar', function () {
  return {
    require: 'ngModel',
    link: function (scope, el, attr, ngModel) {
      $(el).datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText) {
          scope.$apply(function () {
            ngModel.$setViewValue(dateText);
          });
        }
      });
    }
  };
});


dataImportApp.controller('DataImportController', function ($rootScope, $scope, $timeout, MetadataService) {

  $scope.SCsheetDeJson = [
	{
		"s_no": 0,
		"name": "Total number of pregnant women registered for ANC",
		"categorycombo_name": "Number reported during the month",
		"id": "j1P6jztUAIT",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 1,
		"name": "Out of the total ANC registered, number registered within 1st trimester (within 12 weeks)",
		"categorycombo_name": "Number reported during the month",
		"id": "QfH5oXzdiCo",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 2,
		"name": "Number of PW given TT1",
		"categorycombo_name": "Number reported during the month",
		"id": "vCBYxOzOFFb",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 3,
		"name": "Number of PW given TT2",
		"categorycombo_name": "Number reported during the month",
		"id": "m5ZMShcazP2",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 4,
		"name": "Number of PW given TT Booster",
		"categorycombo_name": "Number reported during the month",
		"id": "zYnye4A85aP",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 5,
		"name": "Number of PW given 180 Iron Folic Acid (IFA) tablets",
		"categorycombo_name": "Number reported during the month",
		"id": "tPP9zJSqREC",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 6,
		"name": "Number of PW given 360 Calcium tablets",
		"categorycombo_name": "Number reported during the month",
		"id": "MMLgkjP6Mm5",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 7,
		"name": "Number of PW given one Albendazole tablet after 1st  trimester",
		"categorycombo_name": "Number reported during the month",
		"id": "EbzRCswFyij",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 8,
		"name": "Number of PW received 4 or more ANC check ups",
		"categorycombo_name": "Number reported during the month",
		"id": "g17APAT44NM",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 9,
		"name": "Number of PW given ANC Corticosteroids in Pre Term Labour",
		"categorycombo_name": "Number reported during the month",
		"id": "ejg9LzUCVGu",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 10,
		"name": "New cases of PW with hypertension detected",
		"categorycombo_name": "Number reported during the month",
		"id": "IVAc1jW3n4W",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 11,
		"name": "Out of the new cases of PW with hypertension detected, cases managed at institution",
		"categorycombo_name": "Number reported during the month",
		"id": "TbWugOgu8zS",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 12,
		"name": "Number of PW tested for Haemoglobin (Hb ) 4 or more than 4 times for respective ANCs",
		"categorycombo_name": "Number reported during the month",
		"id": "GZBwocz1HkT",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 13,
		"name": "Number of PW having Hb level<11 (tested cases)(7.1 to 10.9)",
		"categorycombo_name": "Number reported during the month",
		"id": "oF1Z2Qilih0",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 14,
		"name": "Number of PW having Hb level<7 (tested cases)",
		"categorycombo_name": "Number reported during the month",
		"id": "tmMbsECywG4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 15,
		"name": "Number of PW tested using POC test for Syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "UJq5NXnRpPm",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 16,
		"name": "Out of above, number of PW found sero positive for syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "EXYMLyP0ISO",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 17,
		"name": "Number of Home Deliveries attended by Skill Birth Attendant(SBA) (Doctor/Nurse/ANM)",
		"categorycombo_name": "Number reported during the month",
		"id": "NZHCW9PBGi6",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 18,
		"name": "Number of Home Deliveries attended by Non SBA (Trained Birth Attendant(TBA) /Relatives/etc.)",
		"categorycombo_name": "Number reported during the month",
		"id": "EduRa7RewJI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 19,
		"name": "Number of PW given Tablet Misoprostol during home delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "hRpzjMGPEP4",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 20,
		"name": "Number of newborns received 7 Home Based Newborn Care (HBNC) visits in case of Home delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "gTuSGgPD2zI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 21,
		"name": "Number of Institutional Deliveries conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "sL53HjxB5JX",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 22,
		"name": "Out of total institutional deliveries number of women discharged within 48 hours of delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "LZuF5ZBX8RK",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 23,
		"name": "Number of newborns received 6 HBNC  visits after Institutional Delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "edOfyH8vNHP",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 24,
		"name": "Live Birth - Male",
		"categorycombo_name": "Number reported during the month",
		"id": "o9GN9y7BcaC",
		"categorycombo": "RffjraraKhQ",
		"type": "text"
	},
	{
		"s_no": 25,
		"name": "Live Birth - Female",
		"categorycombo_name": "Number reported during the month",
		"id": "o9GN9y7BcaC",
		"categorycombo": "v7RmjKvAUhD",
		"type": "text"
	},
	{
		"s_no": 26,
		"name": "Number of Pre term newborns ( < 37 weeks of pregnancy)",
		"categorycombo_name": "Number reported during the month",
		"id": "qaoi2BwSGNV",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 27,
		"name": "Still Birth",
		"categorycombo_name": "Number reported during the month",
		"id": "abrnI99NELO",
		"categorycombo": "esAoDKkQmWM",
		"type": "text"
	},
	{
		"s_no": 28,
		"name": "Abortion (spontaneous)",
		"categorycombo_name": "Number reported during the month",
		"id": "xY5FBS3CXJS",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 29,
		"name": "Number of newborns weighed at birth",
		"categorycombo_name": "Number reported during the month",
		"id": "lLqf7P8p6HX",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 30,
		"name": "Number of newborns having weight less than 2.5 kg",
		"categorycombo_name": "Number reported during the month",
		"id": "r17xWSMeuom",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 31,
		"name": "Number of Newborns breast fed within 1 hour of birth",
		"categorycombo_name": "Number reported during the month",
		"id": "tSGWouC1jnJ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 32,
		"name": "Women receiving 1st post partum checkup within 48 hours of home delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "REomdLkefbF",
		"categorycombo": "esAoDKkQmWM",
		"type": "text"
	},
	{
		"s_no": 33,
		"name": "Women receiving 1st post partum checkup between 48 hours and 14 days",
		"categorycombo_name": "Number reported during the month",
		"id": "gjOcKKNbXlg",
		"categorycombo": "esAoDKkQmWM",
		"type": "text"
	},
	{
		"s_no": 34,
		"name": "Number of mothers provided full course of 180 IFA tablets after delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "WTvVYBs7TnA",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 35,
		"name": "Number of mothers provided 360 Calcium tablets after delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "S9O1Z1G5pgB",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 36,
		"name": "Number of Interval IUCD Insertions (excluding PPIUCD and PAIUCD)",
		"categorycombo_name": "Number reported during the month",
		"id": "UNVR8Mpb8oG",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 37,
		"name": "Number of Post Partum (within 48 hours of delivery) IUCD insertions",
		"categorycombo_name": "Number reported during the month",
		"id": "jelLfZgCHVg",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 38,
		"name": "Number of IUCD Removals ",
		"categorycombo_name": "Number reported during the month",
		"id": "I0Kr9UULvs5",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 39,
		"name": "Number of complications following IUCD Insertion",
		"categorycombo_name": "Number reported during the month",
		"id": "E15hCk6pEpA",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 40,
		"name": "Injectable Contraceptive-Antara Program- First Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "D34X5p8iL1p",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 41,
		"name": "Injectable Contraceptive-Antara Program- Second Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "D3VoU0odfxK",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 42,
		"name": "Injectable Contraceptive-Antara Program- Third Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "UaWPwuSQLdW",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 43,
		"name": "Injectable Contraceptive-Antara Program- Fourth or more than fourth",
		"categorycombo_name": "Number reported during the month",
		"id": "sxNBz0pgh49",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 44,
		"name": "Number of Combined Oral Pill cycles distributed",
		"categorycombo_name": "Number reported during the month",
		"id": "enxCWjlGyAx",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 45,
		"name": "Number of Condom pieces distributed",
		"categorycombo_name": "Number reported during the month",
		"id": "e7emjgYVwG6",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 46,
		"name": "Number of Centchroman (weekly) pill strips distributed",
		"categorycombo_name": "Number reported during the month",
		"id": "QgEajcSQWHH",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 47,
		"name": "Number of Emergency Contraceptive Pills (ECP) given",
		"categorycombo_name": "Number reported during the month",
		"id": "uzc1CoUdbQN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 48,
		"name": "Number of Pregnancy Test Kits (PTK) used",
		"categorycombo_name": "Number reported during the month",
		"id": "EzDEoqYeKOh",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 49,
		"name": "Complications following male sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "uy4Dhct9FuC",
		"categorycombo": "Wqg39HDmVTQ",
		"type": "text"
	},
	{
		"s_no": 50,
		"name": "Complications following female sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "uy4Dhct9FuC",
		"categorycombo": "lQMqxuThJLv",
		"type": "text"
	},
	{
		"s_no": 51,
		"name": "Child immunisation - DPT2",
		"categorycombo_name": "Number reported during the month",
		"id": "ntPRa3iDW7Q",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 52,
		"name": "Child immunisation - Vitamin K1 (Birth Dose)",
		"categorycombo_name": "Number reported during the month",
		"id": "Rf6gaQ5EcZj",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 53,
		"name": "Child immunisation - BCG",
		"categorycombo_name": "Number reported during the month",
		"id": "kawY8POcUfU",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 54,
		"name": "Child immunisation - DPT1",
		"categorycombo_name": "Number reported during the month",
		"id": "ho1FDrYaaM9",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 55,
		"name": "Number of children (6-59 months) provided 8-10 doses (1ml) of IFA syrup (Bi weekly)",
		"categorycombo_name": "Number reported during the month",
		"id": "xYrWuzRAdj8",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 56,
		"name": "Child immunisation - Vitamin A Dose - 1",
		"categorycombo_name": "Number reported during the month",
		"id": "mXN8hgjai3x",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 57,
		"name": "Child immunisation - Vitamin A Dose - 5",
		"categorycombo_name": "Number reported during the month",
		"id": "tsAAEGM5GlP",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 58,
		"name": "Child immunisation - Vitamin A Dose - 9",
		"categorycombo_name": "Number reported during the month",
		"id": "LHSyqKWQiPc",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 59,
		"name": "Number of children (12-59 months) provided Albendazole",
		"categorycombo_name": "Number reported during the month",
		"id": "YQCRYiOImjt",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 60,
		"name": "Number of severely underweight children provided Health Checkup (0-5 yrs)",
		"categorycombo_name": "Number reported during the month",
		"id": "iQIkvbTPuR3",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 61,
		"name": "Child immunisation - DPT3",
		"categorycombo_name": "Number reported during the month",
		"id": "ICeDJudr7G1",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 62,
		"name": "Child immunisation - Pentavalent 1",
		"categorycombo_name": "Number reported during the month",
		"id": "ayY7WpglaXh",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 63,
		"name": "Child immunisation - Pentavalent 2",
		"categorycombo_name": "Number reported during the month",
		"id": "eirObEsJgsO",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 64,
		"name": "Child immunisation - Pentavalent 3",
		"categorycombo_name": "Number reported during the month",
		"id": "osi18eDtDAJ",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 65,
		"name": "Child immunisation - OPV 0 (Birth Dose)",
		"categorycombo_name": "Number reported during the month",
		"id": "czeoaApNx0p",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 66,
		"name": "Child immunisation - OPV1",
		"categorycombo_name": "Number reported during the month",
		"id": "cUU3SoeAvSk",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 67,
		"name": "Child immunisation - OPV2",
		"categorycombo_name": "Number reported during the month",
		"id": "oAo8SwxXF9a",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 68,
		"name": "Child immunisation - OPV3",
		"categorycombo_name": "Number reported during the month",
		"id": "v91ZH4hFQBD",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 69,
		"name": "Child immunisation - Hepatitis-B0 (Birth Dose)",
		"categorycombo_name": "Number reported during the month",
		"id": "arzEsLANFKY",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 70,
		"name": "Child immunisation - Hepatitis-B1",
		"categorycombo_name": "Number reported during the month",
		"id": "LPXJH7vNHLr",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 71,
		"name": "Child immunisation - Hepatitis-B2",
		"categorycombo_name": "Number reported during the month",
		"id": "S4rGboujAtm",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 72,
		"name": "Child immunisation - Hepatitis-B3",
		"categorycombo_name": "Number reported during the month",
		"id": "vsxh072fAXT",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 73,
		"name": "Child immunisation - Inactivated Polio Vaccine 1 (IPV 1)",
		"categorycombo_name": "Number reported during the month",
		"id": "n1gESqJsQuN",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 74,
		"name": "Child immunisation - Inactivated Polio Vaccine 2 (IPV 2)",
		"categorycombo_name": "Number reported during the month",
		"id": "l5PXo0n5h9D",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 75,
		"name": "Child immunisation - Rotavirus 1",
		"categorycombo_name": "Number reported during the month",
		"id": "uvN6TZUMypK",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 76,
		"name": "Child immunisation - Rotavirus 2",
		"categorycombo_name": "Number reported during the month",
		"id": "kpyz1ntf6Ib",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 77,
		"name": "Child immunisation - Rotavirus 3",
		"categorycombo_name": "Number reported during the month",
		"id": "r10PzZRnGSB",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 78,
		"name": "Child immunisation (9-11months) - Measles & Rubella (MR)- 1st Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "ymn50nQYQ7f",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 79,
		"name": "Child immunisation (9-11months) - Measles 1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "hjqgOGnlCH8",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 80,
		"name": "Child immunisation (9-11months) - JE 1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "aYkYAjbmDKC",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 81,
		"name": "Child immunisation - Measles & Rubella (MR)- 1st Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "XWKyP7xsqbE",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 82,
		"name": "Children aged between 9 and 11 months fully immunized- Male",
		"categorycombo_name": "Number reported during the month",
		"id": "WKJl8nPHeuV",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 83,
		"name": "Children aged between 9 and 11 months fully immunized - Female",
		"categorycombo_name": "Number reported during the month",
		"id": "Pndy2RBYPl3",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 84,
		"name": "Child immunisation - Measles-1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "GqEB9p0JiYf",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 85,
		"name": "Child immunisation - JE 1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "aJ1lAHCMzgn",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 86,
		"name": "Child immunisation - OPV Booster",
		"categorycombo_name": "Number reported during the month",
		"id": "o4euO5ozONi",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 87,
		"name": "Child immunisation - Measles & Rubella (MR)- 2nd Dose (16-24 months)",
		"categorycombo_name": "Number reported during the month",
		"id": "J6Av4IdRS95",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 88,
		"name": "Child immunisation - Measles 2nd dose (More than 16 months)",
		"categorycombo_name": "Number reported during the month",
		"id": "NyjNMWDp6Ti",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 89,
		"name": "Child immunisation - DPT 1st Booster",
		"categorycombo_name": "Number reported during the month",
		"id": "ZpAmeSOSsvZ",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 90,
		"name": "Child immunisation - Measles, Mumps, Rubella (MMR) Vaccine",
		"categorycombo_name": "Number reported during the month",
		"id": "PDI37AXKaJ3",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 91,
		"name": "Number of children more than 16 months of age who received Japanese Encephalitis (JE) vaccine",
		"categorycombo_name": "Number reported during the month",
		"id": "YG50ejsHSLx",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 92,
		"name": "Children more than 16 years received TT16",
		"categorycombo_name": "Number reported during the month",
		"id": "oUHHEVTneyU",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 93,
		"name": "Child immunisation - Typhoid",
		"categorycombo_name": "Number reported during the month",
		"id": "hDtofneucK0",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 94,
		"name": "Children more than 5 years received DPT5 (2nd Booster)",
		"categorycombo_name": "Number reported during the month",
		"id": "ATMb46hKN8C",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 95,
		"name": "Children more than 10 years received TT10",
		"categorycombo_name": "Number reported during the month",
		"id": "NwAPJDgY8c9",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 96,
		"name": "Number of cases of AEFI - Abscess",
		"categorycombo_name": "Number reported during the month",
		"id": "WdKTDZNz2Ln",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 97,
		"name": "Number of cases of AEFI - Death",
		"categorycombo_name": "Number reported during the month",
		"id": "y8MKkaCkRCR",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 98,
		"name": "Number of cases of AEFI - Others",
		"categorycombo_name": "Number reported during the month",
		"id": "ZyE4kUVWXzY",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 99,
		"name": "Immunisation sessions planned",
		"categorycombo_name": "Number reported during the month",
		"id": "n1tMl06zqcZ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 100,
		"name": "Immunisation sessions held",
		"categorycombo_name": "Number reported during the month",
		"id": "ZzPmFSItHHJ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 101,
		"name": "Number of Immunisation sessions where ASHAs were present",
		"categorycombo_name": "Number reported during the month",
		"id": "FcZZ8wzSgZH",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 102,
		"name": "Childhood Diseases - Malaria",
		"categorycombo_name": "Number reported during the month",
		"id": "CR9FVvSNOt8",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 103,
		"name": "Childhood Diseases - Tuberculosis (TB)",
		"categorycombo_name": "Number reported during the month",
		"id": "RtYncsAMMwE",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 104,
		"name": "Childhood Diseases - Acute Flaccid Paralysis(AFP)",
		"categorycombo_name": "Number reported during the month",
		"id": "wqGwQIzgZIQ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 105,
		"name": "Childhood Diseases - Measles",
		"categorycombo_name": "Number reported during the month",
		"id": "ogIlDrxlNzO",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 106,
		"name": "Childhood Diseases - Diarrhoea",
		"categorycombo_name": "Number reported during the month",
		"id": "bsZWbu5ENrh",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 107,
		"name": "RDT conducted for Malaria",
		"categorycombo_name": "Number reported during the month",
		"id": "td16xdbUTJq",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 108,
		"name": "Malaria (RDT) - Plasmodium Vivax test positive",
		"categorycombo_name": "Number reported during the month",
		"id": "TYtl78N42kp",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 109,
		"name": "Malaria (RDT) - Plamodium Falciparum test positive",
		"categorycombo_name": "Number reported during the month",
		"id": "hjeUdtWTOMz",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 110,
		"name": "Outpatient - Diabetes",
		"categorycombo_name": "Number reported during the month",
		"id": "Zkip12fx9Nr",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 111,
		"name": "Outpatient - Hypertension",
		"categorycombo_name": "Number reported during the month",
		"id": "gvFbN0Qqtyb",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 112,
		"name": "Outpatient - Stroke (Paralysis)",
		"categorycombo_name": "Number reported during the month",
		"id": "BF9dVPk6Zq4",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 113,
		"name": "Outpatient - Acute Heart Diseases",
		"categorycombo_name": "Number reported during the month",
		"id": "jmJ9QtvGTdI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 114,
		"name": "Outpatient - Mental illness",
		"categorycombo_name": "Number reported during the month",
		"id": "M2F13TlXTsS",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 115,
		"name": "Outpatient - Epilepsy",
		"categorycombo_name": "Number reported during the month",
		"id": "M50BYaFPTNq",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 116,
		"name": "Outpatient - Ophthalmic Related",
		"categorycombo_name": "Number reported during the month",
		"id": "taE2EPSy0oM",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 117,
		"name": "Outpatient - Dental",
		"categorycombo_name": "Number reported during the month",
		"id": "e6lgx28WVEP",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 118,
		"name": "Allopathic- Outpatient attendance",
		"categorycombo_name": "Number reported during the month",
		"id": "aVEFPSzvRPc",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 119,
		"name": "Ayush - Outpatient attendance",
		"categorycombo_name": "Number reported during the month",
		"id": "IBZjh4qzW4d",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 120,
		"name": "Number of Anganwadi centres/ UPHCs reported to have conducted Village Health & Nutrition Day (VHNDs)/ Urban Health & Nutrition Day (UHNDs)/ Outreach / Special Outreach",
		"categorycombo_name": "Number reported during the month",
		"id": "EsXmR4IsbMN",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 121,
		"name": "Number of Hb tests conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "y34Ph7bt8kz",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 122,
		"name": "Out of the total number of Hb tests done, Number having Hb < 7 mg",
		"categorycombo_name": "Number reported during the month",
		"id": "VO2AFAAsIWk",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 123,
		"name": "Number of pregnant women screened for HIV",
		"categorycombo_name": "Number reported during the month",
		"id": "iusJZRuu6fZ",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 124,
		"name": "Out of the above, number screened positive",
		"categorycombo_name": "Number reported during the month",
		"id": "hbPU5uHlDgW",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 125,
		"name": "Last Date of Supply of essential drugs (DD/MM/YYYY)",
		"categorycombo_name": "Number reported during the month",
		"id": "vm6Il58uYZZ",
		"categorycombo": "HllvX50cXC0",
		"type": "date"
	},
	{
		"s_no": 126,
		"name": "IFA tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 127,
		"name": "IFA tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "nX9BZeOBNjF",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 128,
		"name": "IFA tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "nX9BZeOBNjF",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 129,
		"name": "IFA syrup with dispenser",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 130,
		"name": "IFA syrup with dispenser",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "ahH8vdxbQnG",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 131,
		"name": "IFA syrup with dispenser",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "ahH8vdxbQnG",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 132,
		"name": "Vit A syrup",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 133,
		"name": "Vit A syrup",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "rDt4D3YaGqG",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 134,
		"name": "Vit A syrup",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "rDt4D3YaGqG",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 135,
		"name": "ORS packets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 136,
		"name": "ORS packets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "u6bYdNb5UZp",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 137,
		"name": "ORS packets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "u6bYdNb5UZp",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 138,
		"name": "Zinc tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 139,
		"name": "Zinc tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "dTBGqWAKdXQ",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 140,
		"name": "Zinc tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "dTBGqWAKdXQ",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 141,
		"name": "Inj Magnesium Sulphate",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 142,
		"name": "Inj Magnesium Sulphate",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "P9wS8L7Uduz",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 143,
		"name": "Inj Magnesium Sulphate",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "P9wS8L7Uduz",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 144,
		"name": "Inj Oxytocin",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 145,
		"name": "Inj Oxytocin",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "PY2Ae9wfX49",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 146,
		"name": "Inj Oxytocin",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "PY2Ae9wfX49",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 147,
		"name": "Misoprostol tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 148,
		"name": "Misoprostol tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "qcYxuBcdB2b",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 149,
		"name": "Misoprostol tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "qcYxuBcdB2b",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 150,
		"name": "Antibiotics",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 151,
		"name": "Antibiotics",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "roLAMa43Qzh",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 152,
		"name": "Antibiotics",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "roLAMa43Qzh",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 153,
		"name": "Availability of drugs for common ailments e.g PCM, anti- allergic drugs etc.",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 154,
		"name": "Availability of drugs for common ailments e.g PCM, anti- allergic drugs etc.",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "KyoageqQSG2",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 155,
		"name": "Availability of drugs for common ailments e.g PCM, anti- allergic drugs etc.",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "KyoageqQSG2",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 156,
		"name": "IFA tablets (Blue)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 157,
		"name": "IFA tablets (Blue)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "b3V05IhZROZ",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 158,
		"name": "IFA tablets (Blue)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "b3V05IhZROZ",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 159,
		"name": "Tab. Albendazole",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 160,
		"name": "Tab. Albendazole",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "g6MmYxYfXas",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 161,
		"name": "Tab. Albendazole",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "g6MmYxYfXas",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 162,
		"name": "Last Date of Supply of essential contraceptives  (DD/MM/YYYY)",
		"categorycombo_name": "Number reported during the month",
		"id": "tjZbFOIuUOG",
		"categorycombo": "HllvX50cXC0",
		"type": "date"
	},
	{
		"s_no": 163,
		"name": "IUCD",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 164,
		"name": "IUCD",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "nzrnEIXOI89",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 165,
		"name": "IUCD",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "nzrnEIXOI89",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 166,
		"name": "Combined Oral Pills (in cycles)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 167,
		"name": "Combined Oral Pills (in cycles)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "E35QNgvpgs7",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 168,
		"name": "Combined Oral Pills (in cycles)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "E35QNgvpgs7",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 169,
		"name": "Condom (in pieces)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 170,
		"name": "Condom (in pieces)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "oK7oSMHBKbs",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 171,
		"name": "Condom (in pieces)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "oK7oSMHBKbs",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 172,
		"name": "Injectable Contraceptive MPA (vials)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 173,
		"name": "Injectable Contraceptive MPA (vials)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "i2WqPITU2Lt",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 174,
		"name": "Injectable Contraceptive MPA (vials)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "i2WqPITU2Lt",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 175,
		"name": "Number of Adolscent / Adult deaths due to Causes Not known",
		"categorycombo_name": "Number reported during the month",
		"id": "jtMQkcHxfyY",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 176,
		"name": "Number of Adolscent / Adult deaths due to Diarrhoeal diseases",
		"categorycombo_name": "Number reported during the month",
		"id": "lyRZYRPX5hs",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 177,
		"name": "Number of Child Deaths (1 -5 years) due to Pneumonia",
		"categorycombo_name": "Number reported during the month",
		"id": "ic8YepBVMzb",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 178,
		"name": "Number of Child Deaths (1 -5 years) due to Diarrhoea",
		"categorycombo_name": "Number reported during the month",
		"id": "me7P94abvxw",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 179,
		"name": "Infant deaths within 24 hrs(1 to 23 Hrs) of birth",
		"categorycombo_name": "Number reported during the month",
		"id": "aXP1DX7TNYL",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 180,
		"name": "Number of Child Deaths (1 -5 years) due to Fever related",
		"categorycombo_name": "Number reported during the month",
		"id": "JLwJ0Vk1jsH",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 181,
		"name": "Number of Child Deaths (1 -5 years) due to Measles",
		"categorycombo_name": "Number reported during the month",
		"id": "LdGWT2BhuHs",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 182,
		"name": "Infant Deaths up to 4 weeks due to Sepsis",
		"categorycombo_name": "Number reported during the month",
		"id": "zJMpcLIVZ8I",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 183,
		"name": "Infant Deaths up to 4 weeks due to Asphyxia",
		"categorycombo_name": "Number reported during the month",
		"id": "hXiMDuIaXXX",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 184,
		"name": "Infant Deaths up to 4 weeks due to Other causes",
		"categorycombo_name": "Number reported during the month",
		"id": "fuqOFT7sUAd",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 185,
		"name": "Number of Child Deaths (1 -5 years) due to Others",
		"categorycombo_name": "Number reported during the month",
		"id": "Kq3G8w2O81O",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 186,
		"name": "Number of Adolscent / Adult deaths due to Tuberculosis",
		"categorycombo_name": "Number reported during the month",
		"id": "mcC2ZfScAy4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 187,
		"name": "Number of Adolscent / Adult deaths due to Respiratory diseases including infections (other than TB)",
		"categorycombo_name": "Number reported during the month",
		"id": "cXkoMyyoyBC",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 188,
		"name": "Number of Adolscent / Adult deaths due to Other Fever Related",
		"categorycombo_name": "Number reported during the month",
		"id": "YDY2pVfnRen",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 189,
		"name": "Number of Adolscent / Adult deaths due to HIV/AIDS",
		"categorycombo_name": "Number reported during the month",
		"id": "TvncM0z4A4l",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 190,
		"name": "Number of Adolscent / Adult deaths due to Heart disease/Hypertension related",
		"categorycombo_name": "Number reported during the month",
		"id": "pipSWISCaFY",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 191,
		"name": "Number of Adolscent / Adult deaths due to Cancer",
		"categorycombo_name": "Number reported during the month",
		"id": "wiuniSA1kTU",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 192,
		"name": "Number of Maternal Deaths due to Bleeding",
		"categorycombo_name": "Number reported during the month",
		"id": "vQHjE9NTcSo",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 193,
		"name": "Number of Maternal Deaths due to High fever",
		"categorycombo_name": "Number reported during the month",
		"id": "Ylxj65pQVT2",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 194,
		"name": "Number of Infant Deaths (1 -12 months) due to Pneumonia",
		"categorycombo_name": "Number reported during the month",
		"id": "K2OrncOttmx",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 195,
		"name": "Number of Infant Deaths (1 -12 months) due to Diarrhoea",
		"categorycombo_name": "Number reported during the month",
		"id": "TWjXJTMSwKO",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 196,
		"name": "Number of Infant Deaths (1 -12 months) due to Fever related",
		"categorycombo_name": "Number reported during the month",
		"id": "GqeMFwdWOLT",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 197,
		"name": "Number of Infant Deaths (1 -12 months) due to Measles",
		"categorycombo_name": "Number reported during the month",
		"id": "Goslycdlicq",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 198,
		"name": "Number of Infant Deaths (1 -12 months) due to Others",
		"categorycombo_name": "Number reported during the month",
		"id": "IYtzS0InAdw",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 199,
		"name": "Number of Maternal Deaths due to Abortion",
		"categorycombo_name": "Number reported during the month",
		"id": "PKHtGPj1b9f",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 200,
		"name": "Number of Maternal Deaths due to Obstructed/prolonged labour",
		"categorycombo_name": "Number reported during the month",
		"id": "LRaUoYBN2DN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 201,
		"name": "Number of Maternal Deaths due to Severe hypertesnion/fits",
		"categorycombo_name": "Number reported during the month",
		"id": "VZaqaIYBS3V",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 202,
		"name": "Number of Maternal Deaths due to Other Causes (including causes Not known)",
		"categorycombo_name": "Number reported during the month",
		"id": "K9zz6YBWt2I",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 203,
		"name": "Number of Adolscent / Adult deaths due to Neurological disease including strokes",
		"categorycombo_name": "Number reported during the month",
		"id": "lxXe1keSOrN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 204,
		"name": "Number of Adolscent / Adult deaths due to Accidents/Burn cases",
		"categorycombo_name": "Number reported during the month",
		"id": "DKGYwoL6Mso",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 205,
		"name": "Number of Adolscent / Adult deaths due to Suicide",
		"categorycombo_name": "Number reported during the month",
		"id": "QA4cwX5LWTn",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 206,
		"name": "Number of Adolscent / Adult deaths due to Animal bites and stings",
		"categorycombo_name": "Number reported during the month",
		"id": "rssGtcyfUZ4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 207,
		"name": "Number of Adolscent / Adult deaths due to known Acute Disease",
		"categorycombo_name": "Number reported during the month",
		"id": "jMCwWIx0L3H",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 208,
		"name": "Number of Adolscent / Adult deaths due to known Chronic Disease",
		"categorycombo_name": "Number reported during the month",
		"id": "nJKQIj4g3LR",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 209,
		"name": "Number of Deaths due to Malaria- Plasmodium Vivax",
		"categorycombo_name": "Number reported during the month",
		"id": "DCVA54tzZFH",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 210,
		"name": "Number of Deaths due to Malaria- Plasmodium Falciparum",
		"categorycombo_name": "Number reported during the month",
		"id": "vuWdIwbH0tE",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	}
  ];

  $scope.PHCsheetDeJson = [
    {
		"s_no": 0,
		"name": "Total number of pregnant women registered for ANC",
		"categorycombo_name": "Number reported during the month",
		"id": "j1P6jztUAIT",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 1,
		"name": "Out of the total ANC registered, number registered within 1st trimester (within 12 weeks)",
		"categorycombo_name": "Number reported during the month",
		"id": "QfH5oXzdiCo",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 2,
		"name": "Number of PW given TT1",
		"categorycombo_name": "Number reported during the month",
		"id": "vCBYxOzOFFb",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 3,
		"name": "Number of PW given TT2",
		"categorycombo_name": "Number reported during the month",
		"id": "m5ZMShcazP2",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 4,
		"name": "Number of PW given TT Booster",
		"categorycombo_name": "Number reported during the month",
		"id": "zYnye4A85aP",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 5,
		"name": "Number of PW given 180 Iron Folic Acid (IFA) tablets",
		"categorycombo_name": "Number reported during the month",
		"id": "tPP9zJSqREC",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 6,
		"name": "Number of PW given 360 Calcium tablets",
		"categorycombo_name": "Number reported during the month",
		"id": "MMLgkjP6Mm5",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 7,
		"name": "Number of PW given one Albendazole tablet after 1st  trimester",
		"categorycombo_name": "Number reported during the month",
		"id": "EbzRCswFyij",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 8,
		"name": "Number of PW received 4 or more ANC check ups",
		"categorycombo_name": "Number reported during the month",
		"id": "g17APAT44NM",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 9,
		"name": "Number of PW given ANC Corticosteroids in Pre Term Labour",
		"categorycombo_name": "Number reported during the month",
		"id": "ejg9LzUCVGu",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 10,
		"name": "New cases of PW with hypertension detected",
		"categorycombo_name": "Number reported during the month",
		"id": "IVAc1jW3n4W",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 11,
		"name": "Out of the new cases of PW with hypertension detected, cases managed at institution",
		"categorycombo_name": "Number reported during the month",
		"id": "TbWugOgu8zS",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 12,
		"name": "Number of Eclampsia cases managed during delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "w1myO23D9r7",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 13,
		"name": "Number of PW tested for Haemoglobin (Hb ) 4 or more than 4 times for respective ANCs",
		"categorycombo_name": "Number reported during the month",
		"id": "GZBwocz1HkT",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 14,
		"name": "Number of PW having Hb level<11 (tested cases)(7.1 to 10.9)",
		"categorycombo_name": "Number reported during the month",
		"id": "oF1Z2Qilih0",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 15,
		"name": "Number of PW having Hb level<7 (tested cases)",
		"categorycombo_name": "Number reported during the month",
		"id": "tmMbsECywG4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 16,
		"name": "Number of PW having severe anaemia (Hb<7) treated",
		"categorycombo_name": "Number reported during the month",
		"id": "TBExjyWbyBB",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 17,
		"name": "Number of PW tested for blood sugar using OGTT (Oral Glucose Tolerance Test)",
		"categorycombo_name": "Number reported during the month",
		"id": "XykBEa4TQrx",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 18,
		"name": "Number of PW tested positive for GDM",
		"categorycombo_name": "Number reported during the month",
		"id": "u3ugPXnDnU5",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 19,
		"name": "Number of PW given insulin out of total tested positive for GDM",
		"categorycombo_name": "Number reported during the month",
		"id": "BZsgeRgwkkc",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 20,
		"name": "Number of pregnant women tested  for Syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "jJi9qgsKLnI",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 21,
		"name": "Number of pregnant women tested found sero positive for Syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "EXYMLyP0ISO",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 22,
		"name": "Number of syphilis positive pregnant women treated for Syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "d4yTQHt7kpl",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 23,
		"name": "Number of babies diagnosed with  Congenital Syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "V5XHaRJ9uZi",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 24,
		"name": "Number of babies treated for congenital Syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "MQyJKEuExIM",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 25,
		"name": "Number of Home Deliveries attended by Skill Birth Attendant(SBA) (Doctor/Nurse/ANM)",
		"categorycombo_name": "Number reported during the month",
		"id": "NZHCW9PBGi6",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 26,
		"name": "Number of Home Deliveries attended by Non SBA (Trained Birth Attendant(TBA) /Relatives/etc.)",
		"categorycombo_name": "Number reported during the month",
		"id": "EduRa7RewJI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 27,
		"name": "Number of PW given Tablet Misoprostol during home delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "hRpzjMGPEP4",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 28,
		"name": "Number of newborns received 7 Home Based Newborn Care (HBNC) visits in case of Home delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "gTuSGgPD2zI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 29,
		"name": "Number of Institutional Deliveries conducted (Including C-Sections)",
		"categorycombo_name": "Number reported during the month",
		"id": "sL53HjxB5JX",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 30,
		"name": "Out of total institutional deliveries number of women discharged within 48 hours of delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "LZuF5ZBX8RK",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 31,
		"name": "Number of newborns received 6 HBNC  visits after Institutional Delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "edOfyH8vNHP",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 32,
		"name": "Total C -Section deliveries performed",
		"categorycombo_name": "Number reported during the month",
		"id": "LpD1GmX2JWs",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 33,
		"name": "C-sections, performed at night (8 PM- 8 AM)",
		"categorycombo_name": "Number reported during the month",
		"id": "j0RQEKr0Yu6",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 34,
		"name": "Live Birth - Male",
		"categorycombo_name": "Number reported during the month",
		"id": "o9GN9y7BcaC",
		"categorycombo": "RffjraraKhQ",
		"type": "text"
	},
	{
		"s_no": 35,
		"name": "Live Birth - Female",
		"categorycombo_name": "Number reported during the month",
		"id": "o9GN9y7BcaC",
		"categorycombo": "v7RmjKvAUhD",
		"type": "text"
	},
	{
		"s_no": 36,
		"name": "Number of Pre term newborns ( < 37 weeks of pregnancy)",
		"categorycombo_name": "Number reported during the month",
		"id": "qaoi2BwSGNV",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 37,
		"name": "Still Birth",
		"categorycombo_name": "Number reported during the month",
		"id": "abrnI99NELO",
		"categorycombo": "esAoDKkQmWM",
		"type": "text"
	},
	{
		"s_no": 38,
		"name": "Abortion (spontaneous)",
		"categorycombo_name": "Number reported during the month",
		"id": "xY5FBS3CXJS",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 39,
		"name": "MTP up to 12 weeks of pregnancy",
		"categorycombo_name": "Number reported during the month",
		"id": "suLISKTS2VF",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 40,
		"name": "MTP more than 12 weeks of pregnancy",
		"categorycombo_name": "Number reported during the month",
		"id": "KUFVvpFENLW",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 41,
		"name": "Post Abortion/ MTP Complications Identified",
		"categorycombo_name": "Number reported during the month",
		"id": "eQ3Jg0K8iuV",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 42,
		"name": "Post Abortion/ MTP Complications Treated",
		"categorycombo_name": "Number reported during the month",
		"id": "LZNMlkkSQ22",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 43,
		"name": "Number of women provided with post abortion/ MTP contraception",
		"categorycombo_name": "Number reported during the month",
		"id": "mt5NUzqnEu5",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 44,
		"name": "Number of newborns weighed at birth",
		"categorycombo_name": "Number reported during the month",
		"id": "lLqf7P8p6HX",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 45,
		"name": "Number of newborns having weight less than 2.5 kg",
		"categorycombo_name": "Number reported during the month",
		"id": "r17xWSMeuom",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 46,
		"name": "Number of Newborns breast fed within 1 hour of birth",
		"categorycombo_name": "Number reported during the month",
		"id": "tSGWouC1jnJ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 47,
		"name": "Number of cases of pregnant women with Obstetric Complications attended (Antepartum haemorrhage (APH), Post-Partum Hemorrhage (PPH), Sepsis, Eclampsia and others)",
		"categorycombo_name": "Number reported during the month",
		"id": "ZXEAO9cfG7n",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 48,
		"name": "Women receiving 1st  post partum checkup within 48 hours of home delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "REomdLkefbF",
		"categorycombo": "esAoDKkQmWM",
		"type": "text"
	},
	{
		"s_no": 49,
		"name": "Women receiving 1st post partum checkup between 48 hours and 14 days",
		"categorycombo_name": "Number reported during the month",
		"id": "gjOcKKNbXlg",
		"categorycombo": "esAoDKkQmWM",
		"type": "text"
	},
	{
		"s_no": 50,
		"name": "Number of mothers provided full course of 180 IFA tablets after delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "WTvVYBs7TnA",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 51,
		"name": "Number of mothers provided 360 Calcium tablets after delivery",
		"categorycombo_name": "Number reported during the month",
		"id": "S9O1Z1G5pgB",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 52,
		"name": "New RTI/STI  cases  identified - Male",
		"categorycombo_name": "Number reported during the month",
		"id": "EuJ3WN4Yppl",
		"categorycombo": "tY82VK3LTQq",
		"type": "text"
	},
	{
		"s_no": 53,
		"name": "New RTI/STI  cases  identified - Female",
		"categorycombo_name": "Number reported during the month",
		"id": "EuJ3WN4Yppl",
		"categorycombo": "VHbljVQ8REF",
		"type": "text"
	},
	{
		"s_no": 54,
		"name": "RTI/STI for which treatment initiated - Male",
		"categorycombo_name": "Number reported during the month",
		"id": "xEKuRxM0LsF",
		"categorycombo": "tY82VK3LTQq",
		"type": "text"
	},
	{
		"s_no": 55,
		"name": "RTI/STI for which treatment initiated -Female",
		"categorycombo_name": "Number reported during the month",
		"id": "xEKuRxM0LsF",
		"categorycombo": "VHbljVQ8REF",
		"type": "text"
	},
	{
		"s_no": 56,
		"name": "Number of Non Scalpel Vasectomy (NSV) / Conventional Vasectomy conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "eaLr7zvC9dd",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 57,
		"name": "Number of Laparoscopic sterilizations (excluding post abortion) conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "XXiWJ4970ls",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 58,
		"name": "Number of Interval Mini-lap (other than post-partum and post abortion) sterilizations conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "WZeNQsKrELP",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 59,
		"name": "Number of Postpartum sterilizations (within 7 days of delivery by minilap or concurrent with caesarean section) conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "qclIinluelz",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 60,
		"name": "Number of Post Abortion sterilizations (within 7 days of spontaneous or surgical abortion) conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "Cx82VgNu24j",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 61,
		"name": "Number of Interval IUCD Insertions (excluding PPIUCD and PAIUCD)",
		"categorycombo_name": "Number reported during the month",
		"id": "UNVR8Mpb8oG",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 62,
		"name": "Number of Postpartum (within 48 hours of delivery) IUCD insertions",
		"categorycombo_name": "Number reported during the month",
		"id": "jelLfZgCHVg",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 63,
		"name": "Number of Post Abortion (within 12 days of spontaneous or surgical abortion) IUCD insertions",
		"categorycombo_name": "Number reported during the month",
		"id": "By01gsezdie",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 64,
		"name": "Number of IUCD Removals",
		"categorycombo_name": "Number reported during the month",
		"id": "I0Kr9UULvs5",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 65,
		"name": "Number of complications following IUCD Insertion",
		"categorycombo_name": "Number reported during the month",
		"id": "E15hCk6pEpA",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 66,
		"name": "Injectable Contraceptive-Antara Program- First Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "D34X5p8iL1p",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 67,
		"name": "Injectable Contraceptive-Antara Program- Second Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "D3VoU0odfxK",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 68,
		"name": "Injectable Contraceptive-Antara Program- Third Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "UaWPwuSQLdW",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 69,
		"name": "Injectable Contraceptive-Antara Program- Fourth or more than fourth",
		"categorycombo_name": "Number reported during the month",
		"id": "sxNBz0pgh49",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 70,
		"name": "Number of Combined Oral Pill cycles distributed",
		"categorycombo_name": "Number reported during the month",
		"id": "enxCWjlGyAx",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 71,
		"name": "Number of Condom pieces distributed",
		"categorycombo_name": "Number reported during the month",
		"id": "e7emjgYVwG6",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 72,
		"name": "Number of Centchroman (weekly) pill strips distributed",
		"categorycombo_name": "Number reported during the month",
		"id": "QgEajcSQWHH",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 73,
		"name": "Number of Emergency Contraceptive Pills (ECP) given",
		"categorycombo_name": "Number reported during the month",
		"id": "uzc1CoUdbQN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 74,
		"name": "Number of Pregnancy Test Kits (PTK) used",
		"categorycombo_name": "Number reported during the month",
		"id": "EzDEoqYeKOh",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 75,
		"name": "Complications following male sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "uy4Dhct9FuC",
		"categorycombo": "Wqg39HDmVTQ",
		"type": "text"
	},
	{
		"s_no": 76,
		"name": "Complications following female sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "uy4Dhct9FuC",
		"categorycombo": "lQMqxuThJLv",
		"type": "text"
	},
	{
		"s_no": 77,
		"name": "Failures following male sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "vUrIfqCEchm",
		"categorycombo": "Wqg39HDmVTQ",
		"type": "text"
	},
	{
		"s_no": 78,
		"name": "Failures following female sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "vUrIfqCEchm",
		"categorycombo": "lQMqxuThJLv",
		"type": "text"
	},
	{
		"s_no": 79,
		"name": "Deaths following male sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "EoxfTl9qY5t",
		"categorycombo": "Wqg39HDmVTQ",
		"type": "text"
	},
	{
		"s_no": 80,
		"name": "Deaths following female sterilization",
		"categorycombo_name": "Number reported during the month",
		"id": "EoxfTl9qY5t",
		"categorycombo": "lQMqxuThJLv",
		"type": "text"
	},
	{
		"s_no": 81,
		"name": "Child immunisation - Vitamin K1 (Birth Dose)",
		"categorycombo_name": "Number reported during the month",
		"id": "Rf6gaQ5EcZj",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 82,
		"name": "Child immunisation - BCG",
		"categorycombo_name": "Number reported during the month",
		"id": "kawY8POcUfU",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 83,
		"name": "Child immunisation - DPT1",
		"categorycombo_name": "Number reported during the month",
		"id": "ho1FDrYaaM9",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 84,
		"name": "Child immunisation - DPT2",
		"categorycombo_name": "Number reported during the month",
		"id": "ntPRa3iDW7Q",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 85,
		"name": "Child immunisation - DPT3",
		"categorycombo_name": "Number reported during the month",
		"id": "ICeDJudr7G1",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 86,
		"name": "Child immunisation - Pentavalent 1",
		"categorycombo_name": "Number reported during the month",
		"id": "ayY7WpglaXh",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 87,
		"name": "Child immunisation - Pentavalent 2",
		"categorycombo_name": "Number reported during the month",
		"id": "eirObEsJgsO",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 88,
		"name": "Child immunisation - Pentavalent 3",
		"categorycombo_name": "Number reported during the month",
		"id": "osi18eDtDAJ",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 89,
		"name": "Child immunisation - OPV 0 (Birth Dose)",
		"categorycombo_name": "Number reported during the month",
		"id": "czeoaApNx0p",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 90,
		"name": "Child immunisation - OPV1",
		"categorycombo_name": "Number reported during the month",
		"id": "cUU3SoeAvSk",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 91,
		"name": "Child immunisation - OPV2",
		"categorycombo_name": "Number reported during the month",
		"id": "oAo8SwxXF9a",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 92,
		"name": "Child immunisation - OPV3",
		"categorycombo_name": "Number reported during the month",
		"id": "v91ZH4hFQBD",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 93,
		"name": "Child immunisation - Hepatitis-B0 (Birth Dose)",
		"categorycombo_name": "Number reported during the month",
		"id": "arzEsLANFKY",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 94,
		"name": "Child immunisation - Hepatitis-B1",
		"categorycombo_name": "Number reported during the month",
		"id": "LPXJH7vNHLr",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 95,
		"name": "Child immunisation - Hepatitis-B2",
		"categorycombo_name": "Number reported during the month",
		"id": "S4rGboujAtm",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 96,
		"name": "Child immunisation - Hepatitis-B3",
		"categorycombo_name": "Number reported during the month",
		"id": "vsxh072fAXT",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 97,
		"name": "Child immunisation - Inactivated Polio Vaccine 1 (IPV 1)",
		"categorycombo_name": "Number reported during the month",
		"id": "n1gESqJsQuN",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 98,
		"name": "Child immunisation - Inactivated Polio Vaccine 2 (IPV 2)",
		"categorycombo_name": "Number reported during the month",
		"id": "l5PXo0n5h9D",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 99,
		"name": "Child immunisation - Rotavirus 1",
		"categorycombo_name": "Number reported during the month",
		"id": "uvN6TZUMypK",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 100,
		"name": "Child immunisation - Rotavirus 2",
		"categorycombo_name": "Number reported during the month",
		"id": "kpyz1ntf6Ib",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 101,
		"name": "Child immunisation - Rotavirus 3",
		"categorycombo_name": "Number reported during the month",
		"id": "r10PzZRnGSB",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 102,
		"name": "Child immunisation (9-11months) - Measles & Rubella (MR)- 1st Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "ymn50nQYQ7f",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 103,
		"name": "Child immunisation (9-11months) - Measles 1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "hjqgOGnlCH8",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 104,
		"name": "Child immunisation (9-11months) - JE 1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "RQWW5fNZUtP",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 105,
		"name": "Children aged between 9 and 11 months fully immunized- Male",
		"categorycombo_name": "Number reported during the month",
		"id": "WKJl8nPHeuV",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 106,
		"name": "Children aged between 9 and 11 months fully immunized - Female",
		"categorycombo_name": "Number reported during the month",
		"id": "Pndy2RBYPl3",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 107,
		"name": "Child immunisation - Measles & Rubella (MR)- 1st Dose",
		"categorycombo_name": "Number reported during the month",
		"id": "XWKyP7xsqbE",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 108,
		"name": "Child immunisation - Measles-1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "GqEB9p0JiYf",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 109,
		"name": "Child immunisation - JE 1st dose",
		"categorycombo_name": "Number reported during the month",
		"id": "aJ1lAHCMzgn",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 110,
		"name": "Child immunisation - Measles & Rubella (MR)- 2nd Dose (16-24 months)",
		"categorycombo_name": "Number reported during the month",
		"id": "J6Av4IdRS95",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 111,
		"name": "Child immunisation - Measles 2nd dose (More than 16 months)",
		"categorycombo_name": "Number reported during the month",
		"id": "NyjNMWDp6Ti",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 112,
		"name": "Child immunisation - DPT 1st Booster",
		"categorycombo_name": "Number reported during the month",
		"id": "ZpAmeSOSsvZ",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 113,
		"name": "Child immunisation - OPV Booster",
		"categorycombo_name": "Number reported during the month",
		"id": "o4euO5ozONi",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 114,
		"name": "Child immunisation -  Measles, Mumps, Rubella (MMR) Vaccine",
		"categorycombo_name": "Number reported during the month",
		"id": "PDI37AXKaJ3",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 115,
		"name": "Number of children more than 16 months of age who received Japanese Encephalitis (JE) vaccine",
		"categorycombo_name": "Number reported during the month",
		"id": "YG50ejsHSLx",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 116,
		"name": "Child immunisation - Typhoid",
		"categorycombo_name": "Number reported during the month",
		"id": "hDtofneucK0",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 117,
		"name": "Children more than 5 years received DPT5 (2nd Booster)",
		"categorycombo_name": "Number reported during the month",
		"id": "ATMb46hKN8C",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 118,
		"name": "Children more than 10 years received TT10",
		"categorycombo_name": "Number reported during the month",
		"id": "NwAPJDgY8c9",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 119,
		"name": "Children more than 16 years received TT16",
		"categorycombo_name": "Number reported during the month",
		"id": "oUHHEVTneyU",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 120,
		"name": "Number of cases of AEFI - Abscess",
		"categorycombo_name": "Number reported during the month",
		"id": "WdKTDZNz2Ln",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 121,
		"name": "Number of cases of AEFI - Death",
		"categorycombo_name": "Number reported during the month",
		"id": "y8MKkaCkRCR",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 122,
		"name": "Number of cases of AEFI - Others",
		"categorycombo_name": "Number reported during the month",
		"id": "ZyE4kUVWXzY",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 123,
		"name": "Immunisation sessions planned",
		"categorycombo_name": "Number reported during the month",
		"id": "n1tMl06zqcZ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 124,
		"name": "Immunisation sessions held",
		"categorycombo_name": "Number reported during the month",
		"id": "ZzPmFSItHHJ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 125,
		"name": "Number of Immunisation sessions where ASHAs were present",
		"categorycombo_name": "Number reported during the month",
		"id": "FcZZ8wzSgZH",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 126,
		"name": "Child immunisation - Vitamin A Dose - 1",
		"categorycombo_name": "Number reported during the month",
		"id": "mXN8hgjai3x",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 127,
		"name": "Child immunisation - Vitamin A Dose - 5",
		"categorycombo_name": "Number reported during the month",
		"id": "tsAAEGM5GlP",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 128,
		"name": "Child immunisation - Vitamin A Dose - 9",
		"categorycombo_name": "Number reported during the month",
		"id": "LHSyqKWQiPc",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 129,
		"name": "Number of children (6-59 months) provided 8-10 doses (1ml) of IFA syrup (Bi weekly)",
		"categorycombo_name": "Number reported during the month",
		"id": "xYrWuzRAdj8",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 130,
		"name": "Number of children (12-59 months) provided Albendazole",
		"categorycombo_name": "Number reported during the month",
		"id": "YQCRYiOImjt",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 131,
		"name": "Number of severely underweight children provided Health Checkup (0-5 yrs)",
		"categorycombo_name": "Number reported during the month",
		"id": "iQIkvbTPuR3",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 132,
		"name": "Childhood Diseases - Pneumonia",
		"categorycombo_name": "Number reported during the month",
		"id": "JHvVmOypkO7",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 133,
		"name": "Childhood Diseases - Asthma",
		"categorycombo_name": "Number reported during the month",
		"id": "wg99eK8ScE4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 134,
		"name": "Childhood Diseases - Sepsis",
		"categorycombo_name": "Number reported during the month",
		"id": "QynIHwwSz2t",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 135,
		"name": "Childhood Diseases - Diphtheria",
		"categorycombo_name": "Number reported during the month",
		"id": "LlAwDFKuMWj",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 136,
		"name": "Childhood Diseases - Pertussis",
		"categorycombo_name": "Number reported during the month",
		"id": "EbsQtqrCGLQ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 137,
		"name": "Childhood Diseases - Tetanus Neonatorum",
		"categorycombo_name": "Number reported during the month",
		"id": "TTeuUqpdWIN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 138,
		"name": "Childhood Diseases - Tuberculosis (TB)",
		"categorycombo_name": "Number reported during the month",
		"id": "RtYncsAMMwE",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 139,
		"name": "Childhood Diseases - Acute Flaccid Paralysis(AFP)",
		"categorycombo_name": "Number reported during the month",
		"id": "wqGwQIzgZIQ",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 140,
		"name": "Childhood Diseases - Measles",
		"categorycombo_name": "Number reported during the month",
		"id": "ogIlDrxlNzO",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 141,
		"name": "Childhood Diseases - Malaria",
		"categorycombo_name": "Number reported during the month",
		"id": "CR9FVvSNOt8",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 142,
		"name": "Childhood Diseases - Diarrhoea ",
		"categorycombo_name": "Number reported during the month",
		"id": "bsZWbu5ENrh",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 143,
		"name": "Childhood Diseases - Diarrhoea treated in Inpatients",
		"categorycombo_name": "Number reported during the month",
		"id": "TBbmJlD8vKl",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 144,
		"name": "Children admitted with upper Respiratory Infections",
		"categorycombo_name": "Number reported during the month",
		"id": "fUi67XJIp1B",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 145,
		"name": "Childhood Diseases - Severe Acute Malnutrition (SAM)",
		"categorycombo_name": "Number reported during the month",
		"id": "wd5uGn1bRIg",
		"categorycombo": "v5em9rXmyXm",
		"type": "text"
	},
	{
		"s_no": 146,
		"name": "Total Blood Smears Examined for Malaria",
		"categorycombo_name": "Number reported during the month",
		"id": "wyUw6Y54u7r",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 147,
		"name": "Malaria (Microscopy Tests ) - Plasmodium Vivax test positive",
		"categorycombo_name": "Number reported during the month",
		"id": "YYTFUPxkAsS",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 148,
		"name": "Malaria (Microscopy Tests ) - Plasmodium Falciparum test positive",
		"categorycombo_name": "Number reported during the month",
		"id": "GIzCdxJG1zA",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 149,
		"name": "RDT conducted for Malaria",
		"categorycombo_name": "Number reported during the month",
		"id": "td16xdbUTJq",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 150,
		"name": "Malaria (RDT) - Plasmodium Vivax test positive",
		"categorycombo_name": "Number reported during the month",
		"id": "TYtl78N42kp",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 151,
		"name": "Malaria (RDT) - Plamodium Falciparum test positive",
		"categorycombo_name": "Number reported during the month",
		"id": "hjeUdtWTOMz",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 152,
		"name": "Kala Azar (RDT) - Tests Conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "RAxy3ictBPs",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 153,
		"name": "Kala Azar Positive Cases",
		"categorycombo_name": "Number reported during the month",
		"id": "Bvzzv4ocqFG",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 154,
		"name": "Post Kala Azar Dermal Leishmaniasis (PKDL) cases",
		"categorycombo_name": "Number reported during the month",
		"id": "l5lzQYQVaQ7",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 155,
		"name": "Dengue - RDT Test Positive",
		"categorycombo_name": "Number reported during the month",
		"id": "mWH8jVFBWK3",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 156,
		"name": "Girls registered in AFHC",
		"categorycombo_name": "Number reported during the month",
		"id": "G9sXX0pBNhS",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 157,
		"name": "Boys registered in AFHC",
		"categorycombo_name": "Number reported during the month",
		"id": "y47tnHCAAYi",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 158,
		"name": "Out of registered, Girls received clinical services",
		"categorycombo_name": "Number reported during the month",
		"id": "FHQMz4MiVcz",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 159,
		"name": "Out of registered, Boys received clinical services",
		"categorycombo_name": "Number reported during the month",
		"id": "rk7i1mZHh27",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 160,
		"name": "Out of registered, Girls received counselling",
		"categorycombo_name": "Number reported during the month",
		"id": "bSNwf6q8T4v",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 161,
		"name": "Out of registered, Boys received counselling",
		"categorycombo_name": "Number reported during the month",
		"id": "Rjhq4vLgEEI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 162,
		"name": "Number of on-going DOTS patients registered",
		"categorycombo_name": "Number reported during the month",
		"id": "qMQ6nWXSVeT",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 163,
		"name": "Number of DOTS cases completed successfully",
		"categorycombo_name": "Number reported during the month",
		"id": "sCE3K4iOIGH",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 164,
		"name": "Outpatient - Diabetes",
		"categorycombo_name": "Number reported during the month",
		"id": "Zkip12fx9Nr",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 165,
		"name": "Outpatient - Hypertension",
		"categorycombo_name": "Number reported during the month",
		"id": "gvFbN0Qqtyb",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 166,
		"name": "Outpatient - Stroke (Paralysis)",
		"categorycombo_name": "Number reported during the month",
		"id": "BF9dVPk6Zq4",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 167,
		"name": "Outpatient - Acute Heart Diseases",
		"categorycombo_name": "Number reported during the month",
		"id": "jmJ9QtvGTdI",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 168,
		"name": "Outpatient - Mental illness",
		"categorycombo_name": "Number reported during the month",
		"id": "M2F13TlXTsS",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 169,
		"name": "Outpatient - Epilepsy",
		"categorycombo_name": "Number reported during the month",
		"id": "M50BYaFPTNq",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 170,
		"name": "Outpatient - Ophthalmic Related",
		"categorycombo_name": "Number reported during the month",
		"id": "taE2EPSy0oM",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 171,
		"name": "Outpatient - Dental",
		"categorycombo_name": "Number reported during the month",
		"id": "e6lgx28WVEP",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 172,
		"name": "Allopathic- Outpatient attendance",
		"categorycombo_name": "Number reported during the month",
		"id": "aVEFPSzvRPc",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 173,
		"name": "Ayush - Outpatient attendance",
		"categorycombo_name": "Number reported during the month",
		"id": "IBZjh4qzW4d",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 174,
		"name": "Inpatient (Male)- Children<18yrs",
		"categorycombo_name": "Number reported during the month",
		"id": "PQfNx5HggxP",
		"categorycombo": "NkWxiXjFb1B",
		"type": "text"
	},
	{
		"s_no": 175,
		"name": "Inpatient (Male)- Adults",
		"categorycombo_name": "Number reported during the month",
		"id": "PQfNx5HggxP",
		"categorycombo": "yxAVHOSZr86",
		"type": "text"
	},
	{
		"s_no": 176,
		"name": "Inpatient (Female)- Children<18yrs",
		"categorycombo_name": "Number reported during the month",
		"id": "PQfNx5HggxP",
		"categorycombo": "ZZX144sbemo",
		"type": "text"
	},
	{
		"s_no": 177,
		"name": "Inpatient (Female)- Adults",
		"categorycombo_name": "Number reported during the month",
		"id": "PQfNx5HggxP",
		"categorycombo": "y646hblXIbO",
		"type": "text"
	},
	{
		"s_no": 178,
		"name": "Number of Left Against Medical Advice (LAMA) cases",
		"categorycombo_name": "Number reported during the month",
		"id": "qiUrJZQr3ym",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 179,
		"name": "Inpatient - Malaria",
		"categorycombo_name": "Number reported during the month",
		"id": "ux60Ij3OpPj",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 180,
		"name": "Inpatient - Dengue",
		"categorycombo_name": "Number reported during the month",
		"id": "vylSkAmdTok",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 181,
		"name": "Inpatient - Typhoid",
		"categorycombo_name": "Number reported during the month",
		"id": "sKZy5TrKX8S",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 182,
		"name": "Inpatient - Asthma, Chronic Obstructive Pulmonary Disease (COPD), Respiratory infections",
		"categorycombo_name": "Number reported during the month",
		"id": "K19KaU42QaC",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 183,
		"name": "Inpatient - Tuberculosis",
		"categorycombo_name": "Number reported during the month",
		"id": "ro8YdEo2Pru",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 184,
		"name": "Inpatient - Pyrexia of unknown origin (PUO)",
		"categorycombo_name": "Number reported during the month",
		"id": "K5LiBXHlFRi",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 185,
		"name": "Inpatient - Diarrhea with dehydration",
		"categorycombo_name": "Number reported during the month",
		"id": "w92bhFNSJ0M",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 186,
		"name": "Inpatient - Hepatitis",
		"categorycombo_name": "Number reported during the month",
		"id": "RZEKrOo3Xa3",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 187,
		"name": "Operation major (General and spinal anaesthesia)",
		"categorycombo_name": "Number reported during the month",
		"id": "Up7AbonJeYx",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 188,
		"name": "Out of Operation major, Gynecology- Hysterectomy surgeries",
		"categorycombo_name": "Number reported during the month",
		"id": "pYCrZmo01ee",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 189,
		"name": "Operation minor (No or local anaesthesia)",
		"categorycombo_name": "Number reported during the month",
		"id": "VsNFLbTXMg1",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 190,
		"name": "Number of blood units issued",
		"categorycombo_name": "Number reported during the month",
		"id": "Ybyth1YAm6I",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 191,
		"name": "Number of blood transfusions done",
		"categorycombo_name": "Number reported during the month",
		"id": "hAJ0WfUeEj5",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 192,
		"name": "Inpatient Deaths - Male",
		"categorycombo_name": "Number reported during the month",
		"id": "eJDwUZJCcQw",
		"categorycombo": "tY82VK3LTQq",
		"type": "text"
	},
	{
		"s_no": 193,
		"name": "Inpatient Deaths - Female",
		"categorycombo_name": "Number reported during the month",
		"id": "eJDwUZJCcQw",
		"categorycombo": "VHbljVQ8REF",
		"type": "text"
	},
	{
		"s_no": 194,
		"name": "In-Patient Head Count at midnight",
		"categorycombo_name": "Number reported during the month",
		"id": "huq7iUHYtul",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 195,
		"name": "Number of Admission in NBSU ( New Born Stabilisation Unit)",
		"categorycombo_name": "Number reported during the month",
		"id": "mXqmGzTm2yd",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 196,
		"name": "Number of children admitted in NRC",
		"categorycombo_name": "Number reported during the month",
		"id": "HZYqncr1t17",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 197,
		"name": "Number of children discharged with target weight gain from the NRCs",
		"categorycombo_name": "Number reported during the month",
		"id": "S3Tx4gLEzwg",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 198,
		"name": "Number of Rogi Kalyan Samiti (RKS) meetings held",
		"categorycombo_name": "Number reported during the month",
		"id": "yGZ2zusvcbM",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 199,
		"name": "Number of Anganwadi centres/ UPHCs reported to have conducted Village Health & Nutrition Day (VHNDs)/ Urban Health & Nutrition Day (UHNDs)/ Outreach / Special Outreach",
		"categorycombo_name": "Number reported during the month",
		"id": "EsXmR4IsbMN",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 200,
		"name": "Number of Lab Tests done",
		"categorycombo_name": "Number reported during the month",
		"id": "imx3mhljPAL",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 201,
		"name": "Number of Hb tests conducted",
		"categorycombo_name": "Number reported during the month",
		"id": "y34Ph7bt8kz",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 202,
		"name": "Out of the total number of Hb tests done, Number having Hb < 7 mg",
		"categorycombo_name": "Number reported during the month",
		"id": "VO2AFAAsIWk",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 203,
		"name": "Male HIV - Number Tested",
		"categorycombo_name": "Number reported during the month",
		"id": "xJWaQfr5gJd",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 204,
		"name": "Male HIV - Number Positive",
		"categorycombo_name": "Number reported during the month",
		"id": "p3PchGKXZ45",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 205,
		"name": "Female Non ANC HIV - Number Tested",
		"categorycombo_name": "Number reported during the month",
		"id": "s6695T588Ms",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 206,
		"name": "Female Non ANC HIV - Number Positive",
		"categorycombo_name": "Number reported during the month",
		"id": "uZdtq56HGHk",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 207,
		"name": "Number of pregnant women screened for HIV",
		"categorycombo_name": "Number reported during the month",
		"id": "iusJZRuu6fZ",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 208,
		"name": "Out of the above, number screened positive",
		"categorycombo_name": "Number reported during the month",
		"id": "hbPU5uHlDgW",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 209,
		"name": "Out of the above number screened positive, number confirmed with HIV infection at Integrated Counselling and Testing Centre (ICTC)",
		"categorycombo_name": "Number reported during the month",
		"id": "aT5C8yxuxjM",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 210,
		"name": "Number of Male STI/RTI attendees tested for syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "ETF9VUPfrZ8",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 211,
		"name": "Number of Male STI/RTI attendees found sero Positive for syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "JeF7rUbiKMy",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 212,
		"name": "Number of Female (Non ANC)STI/RTI attendees tested for syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "gdWYKXKNlLG",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 213,
		"name": "Number of Female (Non ANC) STI/RTI attendees found sero Positive for syphilis",
		"categorycombo_name": "Number reported during the month",
		"id": "wVCQIgKXeoP",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 214,
		"name": "Widal tests - Number Tested",
		"categorycombo_name": "Number reported during the month",
		"id": "TH3vp3QTHNG",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 215,
		"name": "Widal tests - Number Positive",
		"categorycombo_name": "Number reported during the month",
		"id": "Q2OnNXzrCZh",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 216,
		"name": "Last Date of Supply of essential drugs (DD/MM/YYYY)",
		"categorycombo_name": "Number reported during the month",
		"id": "vm6Il58uYZZ",
		"categorycombo": "HllvX50cXC0",
		"type": "date"
	},
	{
		"s_no": 217,
		"name": "IFA tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 218,
		"name": "IFA tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "nX9BZeOBNjF",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 219,
		"name": "IFA tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "nX9BZeOBNjF",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 220,
		"name": "IFA tablets (blue)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 221,
		"name": "IFA tablets (blue)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "b3V05IhZROZ",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 222,
		"name": "IFA tablets (blue)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "b3V05IhZROZ",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 223,
		"name": "IFA syrup with dispenser",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 224,
		"name": "IFA syrup with dispenser",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "ahH8vdxbQnG",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 225,
		"name": "IFA syrup with dispenser",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "ahH8vdxbQnG",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 226,
		"name": "Vit A syrup",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 227,
		"name": "Vit A syrup",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "rDt4D3YaGqG",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 228,
		"name": "Vit A syrup",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "rDt4D3YaGqG",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 229,
		"name": "ORS packets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 230,
		"name": "ORS packets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "u6bYdNb5UZp",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 231,
		"name": "ORS packets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "u6bYdNb5UZp",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 232,
		"name": "Zinc tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 233,
		"name": "Zinc tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "dTBGqWAKdXQ",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 234,
		"name": "Zinc tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "dTBGqWAKdXQ",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 235,
		"name": "Inj Magnesium Sulphate",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 236,
		"name": "Inj Magnesium Sulphate",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "P9wS8L7Uduz",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 237,
		"name": "Inj Magnesium Sulphate",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "P9wS8L7Uduz",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 238,
		"name": "Inj Oxytocin",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 239,
		"name": "Inj Oxytocin",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "PY2Ae9wfX49",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 240,
		"name": "Inj Oxytocin",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "PY2Ae9wfX49",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 241,
		"name": "Misoprostol tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 242,
		"name": "Misoprostol tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "qcYxuBcdB2b",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 243,
		"name": "Misoprostol tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "qcYxuBcdB2b",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 244,
		"name": "Mifepristone tablets",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 245,
		"name": "Mifepristone tablets",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "tlkLslla04q",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 246,
		"name": "Mifepristone tablets",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "tlkLslla04q",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 247,
		"name": "Antibiotics",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 248,
		"name": "Antibiotics",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "roLAMa43Qzh",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 249,
		"name": "Antibiotics",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "roLAMa43Qzh",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 250,
		"name": "Labelled emergency tray",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 251,
		"name": "Labelled emergency tray",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "yDjOGj6mHLU",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 252,
		"name": "Labelled emergency tray",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "yDjOGj6mHLU",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 253,
		"name": "Drugs for hypertension, Diabetes, common ailments e.g PCM, anti-allergic drugs etc.",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 254,
		"name": "Drugs for hypertension, Diabetes, common ailments e.g PCM, anti-allergic drugs etc.",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "bouEZfLbmUN",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 255,
		"name": "Drugs for hypertension, Diabetes, common ailments e.g PCM, anti-allergic drugs etc.",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "bouEZfLbmUN",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 256,
		"name": "Tab. Albendazole",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 257,
		"name": "Tab. Albendazole",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "g6MmYxYfXas",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 258,
		"name": "Tab. Albendazole",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "g6MmYxYfXas",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 259,
		"name": "Last Date of Supply of essential vaccines  (DD/MM/YYYY)",
		"categorycombo_name": "Number reported during the month",
		"id": "qkGKaJmnROq",
		"categorycombo": "HllvX50cXC0",
		"type": "date"
	},
	{
		"s_no": 260,
		"name": "TT",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 261,
		"name": "TT",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "sAByG7iC6dv",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 262,
		"name": "TT",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "sAByG7iC6dv",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 263,
		"name": "BCG",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 264,
		"name": "BCG",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "zkMz1SEmc7g",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 265,
		"name": "BCG",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "zkMz1SEmc7g",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 266,
		"name": "Hepatitis",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 267,
		"name": "Hepatitis",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "uIBTQW1NXRi",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 268,
		"name": "Hepatitis",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "uIBTQW1NXRi",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 269,
		"name": "OPV",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 270,
		"name": "OPV",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "C8qUcy8BXBn",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 271,
		"name": "OPV",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "C8qUcy8BXBn",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 272,
		"name": "DPT",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 273,
		"name": "DPT",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "sTqvYNRJ27A",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 274,
		"name": "DPT",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "sTqvYNRJ27A",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 275,
		"name": "Measles",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 276,
		"name": "Measles",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "vDuczGd8wfv",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 277,
		"name": "Measles",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "vDuczGd8wfv",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 278,
		"name": "Vitamin A",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 279,
		"name": "Vitamin A",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "Srq1goimPFO",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 280,
		"name": "Vitamin A",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "Srq1goimPFO",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 281,
		"name": "Last Date of Supply of essential contraceptives  (DD/MM/YYYY)",
		"categorycombo_name": "Number reported during the month",
		"id": "tjZbFOIuUOG",
		"categorycombo": "HllvX50cXC0",
		"type": "date"
	},
	{
		"s_no": 282,
		"name": "IUCD",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 283,
		"name": "IUCD",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "nzrnEIXOI89",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 284,
		"name": "IUCD",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "nzrnEIXOI89",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 285,
		"name": "Combined Oral Pills (in cycles)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 286,
		"name": "Combined Oral Pills (in cycles)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "E35QNgvpgs7",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 287,
		"name": "Combined Oral Pills (in cycles)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "E35QNgvpgs7",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 288,
		"name": "Condom (in pieces)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 289,
		"name": "Condom (in pieces)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "oK7oSMHBKbs",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 290,
		"name": "Condom (in pieces)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "oK7oSMHBKbs",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 291,
		"name": "Injectable Contraceptive MPA (vials)",
		"categorycombo_name": "",
		"id": "",
		"categorycombo": "",
		"type": "text"
	},
	{
		"s_no": 292,
		"name": "Injectable Contraceptive MPA (vials)",
		"categorycombo_name": "Dropdown - Adequate",
		"id": "i2WqPITU2Lt",
		"categorycombo": "tlwZy5CYdQU",
		"type": "text"
	},
	{
		"s_no": 293,
		"name": "Injectable Contraceptive MPA (vials)",
		"categorycombo_name": "Dropdown - Inadequate",
		"id": "i2WqPITU2Lt",
		"categorycombo": "sT4N65Nygnr",
		"type": "text"
	},
	{
		"s_no": 294,
		"name": "Infant deaths within 24 hrs(1 to 23 Hrs) of birth",
		"categorycombo_name": "Number reported during the month",
		"id": "aXP1DX7TNYL",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 295,
		"name": "Infant Deaths up to 4 weeks due to Sepsis",
		"categorycombo_name": "Number reported during the month",
		"id": "zJMpcLIVZ8I",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 296,
		"name": "Infant Deaths up to 4 weeks due to Asphyxia",
		"categorycombo_name": "Number reported during the month",
		"id": "hXiMDuIaXXX",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 297,
		"name": "Infant Deaths up to 4 weeks due to Other causes",
		"categorycombo_name": "Number reported during the month",
		"id": "fuqOFT7sUAd",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 298,
		"name": "Number of Infant Deaths (1 -12 months) due to Pneumonia",
		"categorycombo_name": "Number reported during the month",
		"id": "K2OrncOttmx",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 299,
		"name": "Number of Infant Deaths (1 -12 months) due to Diarrhoea",
		"categorycombo_name": "Number reported during the month",
		"id": "TWjXJTMSwKO",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 300,
		"name": "Number of Infant Deaths (1 -12 months) due to Fever related",
		"categorycombo_name": "Number reported during the month",
		"id": "GqeMFwdWOLT",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 301,
		"name": "Number of Infant Deaths (1 -12 months) due to Measles",
		"categorycombo_name": "Number reported during the month",
		"id": "Goslycdlicq",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 302,
		"name": "Number of Infant Deaths (1 -12 months) due to Others",
		"categorycombo_name": "Number reported during the month",
		"id": "IYtzS0InAdw",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 303,
		"name": "Number of Child Deaths (1 -5 years) due to Pneumonia",
		"categorycombo_name": "Number reported during the month",
		"id": "ic8YepBVMzb",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 304,
		"name": "Number of Child Deaths (1 -5 years) due to Diarrhoea",
		"categorycombo_name": "Number reported during the month",
		"id": "me7P94abvxw",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 305,
		"name": "Number of Child Deaths (1 -5 years) due to Fever related",
		"categorycombo_name": "Number reported during the month",
		"id": "JLwJ0Vk1jsH",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 306,
		"name": "Number of Child Deaths (1 -5 years) due to Measles",
		"categorycombo_name": "Number reported during the month",
		"id": "LdGWT2BhuHs",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 307,
		"name": "Number of Child Deaths (1 -5 years) due to Others",
		"categorycombo_name": "Number reported during the month",
		"id": "Kq3G8w2O81O",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 308,
		"name": "Number of Maternal Deaths due to Bleeding",
		"categorycombo_name": "Number reported during the month",
		"id": "vQHjE9NTcSo",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 309,
		"name": "Number of Maternal Deaths due to High fever",
		"categorycombo_name": "Number reported during the month",
		"id": "Ylxj65pQVT2",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 310,
		"name": "Number of Maternal Deaths due to Abortion",
		"categorycombo_name": "Number reported during the month",
		"id": "PKHtGPj1b9f",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 311,
		"name": "Number of Maternal Deaths due to Obstructed/prolonged labour",
		"categorycombo_name": "Number reported during the month",
		"id": "LRaUoYBN2DN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 312,
		"name": "Number of Maternal Deaths due to Severe hypertesnion/fits",
		"categorycombo_name": "Number reported during the month",
		"id": "VZaqaIYBS3V",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 313,
		"name": "Number of Maternal Deaths due to Other Causes (including causes Not Known)",
		"categorycombo_name": "Number reported during the month",
		"id": "K9zz6YBWt2I",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 314,
		"name": "Number of Adolscent / Adult Deaths due to Diarrhoeal diseases",
		"categorycombo_name": "Number reported during the month",
		"id": "lyRZYRPX5hs",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 315,
		"name": "Number of Adolscent / Adult Deaths due to Tuberculosis",
		"categorycombo_name": "Number reported during the month",
		"id": "mcC2ZfScAy4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 316,
		"name": "Number of Adolscent / Adult Deaths due to Respiratory diseases including infections (other than TB)",
		"categorycombo_name": "Number reported during the month",
		"id": "cXkoMyyoyBC",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 317,
		"name": "Number of Adolscent / Adult Deaths due to Other Fever Related",
		"categorycombo_name": "Number reported during the month",
		"id": "YDY2pVfnRen",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 318,
		"name": "Number of Adolscent / Adult Deaths due to HIV/AIDS",
		"categorycombo_name": "Number reported during the month",
		"id": "TvncM0z4A4l",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 319,
		"name": "Number of Adolscent / Adult Deaths due to Heart disease/Hypertension related",
		"categorycombo_name": "Number reported during the month",
		"id": "pipSWISCaFY",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 320,
		"name": "Number of Adolscent / Adult Deaths due to Cancer",
		"categorycombo_name": "Number reported during the month",
		"id": "wiuniSA1kTU",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 321,
		"name": "Number of Adolscent / Adult Deaths due to Neurological disease including strokes",
		"categorycombo_name": "Number reported during the month",
		"id": "lxXe1keSOrN",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 322,
		"name": "Number of Adolscent / Adult Deaths due to Accidents/Burn cases",
		"categorycombo_name": "Number reported during the month",
		"id": "DKGYwoL6Mso",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 323,
		"name": "Number of Adolscent / Adult Deaths due to Suicide",
		"categorycombo_name": "Number reported during the month",
		"id": "QA4cwX5LWTn",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 324,
		"name": "Number of Adolscent / Adult deaths due to Animal bites and stings",
		"categorycombo_name": "Number reported during the month",
		"id": "rssGtcyfUZ4",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 325,
		"name": "Number of Adolscent / Adult deaths due to Known Acute Disease",
		"categorycombo_name": "Number reported during the month",
		"id": "jMCwWIx0L3H",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 326,
		"name": "Number of Adolscent / Adult deaths due to Known Chronic Disease",
		"categorycombo_name": "Number reported during the month",
		"id": "nJKQIj4g3LR",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 327,
		"name": "Number of Adolscent / Adult deaths due to Causes Not Known",
		"categorycombo_name": "Number reported during the month",
		"id": "jtMQkcHxfyY",
		"categorycombo": "ZnztZgggxd6",
		"type": "text"
	},
	{
		"s_no": 328,
		"name": "Number of Deaths due to Malaria- Plasmodium Vivax",
		"categorycombo_name": "Number reported during the month",
		"id": "DCVA54tzZFH",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 329,
		"name": "Number of Deaths due to Malaria- Plasmodium Falciparum",
		"categorycombo_name": "Number reported during the month",
		"id": "vuWdIwbH0tE",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 330,
		"name": "Number of Deaths due to Kala Azar",
		"categorycombo_name": "Number reported during the month",
		"id": "a3pVTTi4LDT",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 331,
		"name": "Number of Deaths due to Dengue",
		"categorycombo_name": "Number reported during the month",
		"id": "oO2QIp59zem",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 332,
		"name": "Number of Deaths due to Acute Encephelitis Syndrome (AES)",
		"categorycombo_name": "Number reported during the month",
		"id": "vYI9gnfq4Ap",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	},
	{
		"s_no": 333,
		"name": "Number of Deaths due to Japanese  Encephalitis (JE)",
		"categorycombo_name": "Number reported during the month",
		"id": "E3PnHZYBDCM",
		"categorycombo": "HllvX50cXC0",
		"type": "text"
	}
];

  $scope.orgUnitGroupSets = function (selectedDistrict) {
    // var url2 = "../../dataSets.json?fields=id,name,code,periodType&paging=false";
    var url2 = "../../organisationUnitGroupSets.json?fields=id,name,code,organisationUnitGroups[id,name,code]&paging=false"
    $.get(url2, function (data2) {
      $scope.groupSets = [];
      for (var a = 0; a < data2.organisationUnitGroupSets.length; a++) {
        for (var b = 0; b < data2.organisationUnitGroupSets[a].organisationUnitGroups.length; b++) {
          $scope.groupSets.push(data2.organisationUnitGroupSets[a].organisationUnitGroups[b]);
        }
      }
    });

    $scope.loadDataSets($scope.selectedOrgUnit.id);
  }

  $scope.loadDataSets = function (selectedDistrict) {

    var url2 = "../../dataSets.json?fields=id,name,code,periodType&paging=false";
    $.get(url2, function (data2) {
      $scope.dataSets = [];

      for (var b = 0; b < data2.dataSets.length; b++) {
        //   if (data2.dataSets[b].id === "mwm9DF8OumI") {
        $scope.dataSets.push(data2.dataSets[b]);
        //    }
      }
      $('#loader').hide();
    });

    /*$scope.basicUrl = "../../sqlViews/";
    $scope.level6SQLid = 'oqBv1SqYitb';

    var url3 = $scope.basicUrl + $scope.level6SQLid + "/data.json?";
    url3 += "var=districtUid:" + selectedDistrict;

    $.get(url3, function (data3) {
        $scope.phcOrgUnits = [];
        $scope.tempAllOrgUnitList = data3;
        for (var i in $scope.tempAllOrgUnitList.rows) {
            $scope.phcOrgUnits.push($scope.tempAllOrgUnitList.rows[i]);
        }
        //   console.log($scope.phcOrgUnits);
    });*/

  }


  $scope.getAllPrograms = function (selectedProgram) {

    if (selectedProgram != undefined || selectedProgram != null) {
      $scope.filteredOrgUnitList = [];
      $scope.DataSet = selectedProgram.id;
      //  var url4 = '../../dataSets.json?filter=id:eq:' + $scope.DataSet + "&fields=id,name,periodType,organisationUnits[id,name,code,attributeValues[attribute[id,name,code],value]&paging=false";
      var url4 = "../../organisationUnitGroups/" + $scope.selectedGroupSet + ".json?fields=id,name,code,organisationUnits[id,name,code,attributeValues[attribute[id,name,code],value]&paging=false";
      $.get(url4, function (data4) {
        $scope.dataSetOrgUnit = data4.organisationUnits;

        var url1 = "../../organisationUnits/" + $scope.selectedOrgUnitUid + ".json?includeDescendants=true&fields=id,name&paging=false";
        $.get(url1, function (data1) {
          $scope.allOrgUnit = data1.organisationUnits;

          angular.forEach($scope.dataSetOrgUnit, function (setOrgUnit) {
            angular.forEach($scope.allOrgUnit, function (all_OrgUnit) {
              if (setOrgUnit.id === all_OrgUnit.id) {
                $scope.filteredOrgUnitList.push(setOrgUnit);
              }
            });
          });
        });
      });
    }
    console.log($scope.filteredOrgUnitList);
    generatePeriods($scope.DataSet);
  }


  $scope.checkFile = function (selectedDataSet, selectedPeriod, selectedSheetType) {
    if (selectedPeriod == undefined) {
      alert("Please select the mandatory fields");
    }
    else if (selectedSheetType == undefined) {
      alert("Please select the mandatory fields");
    }
    else {

      var file = document.getElementById('fileInput').files[0];

      if (!file) {
        alert("Error Cannot find the file!");
        return;
      }

      switch (file.type) {
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        case "application/vnd.ms-excel":
          $timeout(function () {
            $('#loader').show();
            parseExcel(file)
          }, 1000);
          break
        default: alert("Unsupported Format");
          break
      }
    }
  }


  function parseExcel(file) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      var data = e.target.result;
      var wb = XLSX.read(data, { type: 'binary' });
      var sheetName = wb.SheetNames[0];
      var mySheet = wb.Sheets[sheetName];
      var data_sheet = XLSX.utils.sheet_to_json(mySheet, { range: 4 });
      console.log(data_sheet);
      var headersMapGrpByDomain = sheet2arr(data_sheet);
    }
  }

  $scope.getPeriod = function (selectedPeriod) {
    $scope.selectedPeriod = selectedPeriod;
  }

  $scope.getSheetType = function (selectedSheetType) {
    $scope.selectedSheetTypeName = selectedSheetType.name;
    $scope.selectedGroupSet = selectedSheetType.id;
  }

  var sheet2arr = function (sheet) {
    $('#response').empty();
    $('#result').empty();

    var finalOu = [];
    if ($scope.filteredOrgUnitList.length > 0) {
      for (var i = 0; i < $scope.filteredOrgUnitList.length; i++) {
        if ($scope.filteredOrgUnitList[i].attributeValues.length != 0) {
          finalOu.push({ 'id': $scope.filteredOrgUnitList[i].id, 'value': $scope.filteredOrgUnitList[i].attributeValues[0].value })
        }
      }
    }
    console.log(finalOu);

    if ($scope.selectedSheetTypeName == "SC Group") {
      var DEsheet = $scope.SCsheetDeJson;
    }
    else if ($scope.selectedSheetTypeName == "PHC Group") {
      var DEsheet = $scope.PHCsheetDeJson;
    }
    else {
      alert("Selected Group set does not exist!");
      $timeout(function () {
        $('#loader').hide();
      });
    }

    var result = [];
    var resultOu = [];
    for (var i = 0; i < finalOu.length; i++) {
      for (var j = 0; j < DEsheet.length; j++) {
        for (var obj in sheet) {
          if (sheet.hasOwnProperty(obj)) {
            for (var prop in sheet[obj]) {
              if (sheet[obj].hasOwnProperty(prop)) {
                if (obj == j) {
                  if (prop == finalOu[i].value) {
                    //  if (sheet[obj]['name'] == DEsheet[j].name) {
                    //     if (sheet[obj]['categorycombo_name'] == DEsheet[j].categorycombo_name) { 
                    value = sheet[obj][finalOu[i].value];
                    if (DEsheet[j].type == "date") {
                      value = myFunction(value);
                    }
                    if( value != null || value != undefined || value != ""){
                    result.push({ 's.no': DEsheet[j].s_no, 'ou': prop, 'ouId': finalOu[i].id, 'dataElement': DEsheet[j].name, 'catComId': DEsheet[j].categorycombo, 'deId': DEsheet[j].id, 'value': value });
                    resultOu.push(finalOu[i].id);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(result);
    var filteredResultou = resultOu.filter(function(item, pos){
      return resultOu.indexOf(item)== pos; 
    });
    pushDataSetVal(result,filteredResultou);
  };

  var myFunction = function (date) {
    // var str = "2122017"
    if (date.length == 8) {
      var year = date.substring(8, 4);
      var month = date.substring(4, 2);
      var day = date.substring(2, 0);

      date = year + "-" + month + "-" + day;
    }
    else if (date.length == 7) {
      var year = date.substring(7, 3);
      var month = date.substring(3, 1);
      var day = date.substring(1, 0);
      if (day < 10) {
        day = "0" + day;
      }
      date = year + "-" + month + "-" + day;
    }
    return date;
  }

  var pushDataSetVal = function (result,filteredResultou) {

    if (result.length != 0) {

      var dataValueSet = {
        "dataSet": $scope.DataSet,
        "period": $scope.selectedPeriod,
        "dataValues": []
      };

      for (var z in result) {
        dataValueSet.dataValues.push({
          orgUnit: result[z].ouId,
          categoryOptionCombo: result[z].catComId,
          period: $scope.selectedPeriod,
          dataElement: result[z].deId,
          value: result[z].value
        })
      }

      $.ajax({
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        url: '../../dataValueSets',
        data: JSON.stringify(dataValueSet),
        success: function (response) {
          dataSetComplete(filteredResultou);
          var text = "Data imported successfully!";
          $('#result').append(text);
          $('#response').append(JSON.stringify(response.importCount));
        },
        warning: function (response) {
          $timeout(function () {
            $('#loader').hide();
          });
          alert("There is a Warning!");
          $('#response').append(JSON.stringify(response.importCount));
        },
        error: function (response) {
          $timeout(function () {
            $('#loader').hide();
          });
          alert("Data imported failed!");
          $('#response').append(JSON.stringify(response.importCount));
        }
      });

    }
    else {
      $timeout(function () {
        $('#loader').hide();
      });
      alert("No data to import!");
    }
  }

  var dataSetComplete = function(filteredResultou){

  for (var z in filteredResultou) {

    var dataSetCompleteParams = {
      "ds": $scope.DataSet,
      "pe": $scope.selectedPeriod,
      "ou": filteredResultou[z],
      "multiOu": false
    };

    $.ajax({
      async: false,
      type: 'post',
      dataType: 'json',
      url: '../../25/completeDataSetRegistrations',
      data:  dataSetCompleteParams,
      success: function (response) {
        $timeout(function () {
          $('#loader').hide();
        });
          $("#result1").html("Registration Completed!");
          console.log("Registration Completed!");
      },
      error: function (response) {
        $timeout(function () {
          $('#loader').hide();
        });
          $("#result1").html("Registration Ignored!");
          console.log("Registration Ignored!");
      }
  });

  }

  }

  jQuery(document).ready(function () {
    hideLoad();
  })
  $timeout(function () {
    $scope.date = {};
    $scope.date.startDate = new Date();
    $scope.date.endDate = new Date();
  }, 0);

  //initially load tree
  selection.load();

  // Listen for OU changes
  selection.setListenerFunction(function () {
    //getAllPrograms();
    $scope.selectedOrgUnitUid = selection.getSelected();
    loadPrograms();

  }, false);

  loadPrograms = function () {
    MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function (orgUnit) {
      $timeout(function () {
        $scope.selectedOrgUnit = orgUnit;
        $scope.orgUnitGroupSets();
        $scope.programs = [];
        for (var i = 0; i < orgUnit.dataSets.length; i++) {
          $scope.programs.push(orgUnit.dataSets[i]);
        }
      });
    });

    //  generateDataElements();
  }

  /* generateDataElements = function () {
   //$scope.dataSetId = 'mwm9DF8OumI';
       var url4 = '../../dataSets/' + $scope.dataSets + ".json?fields=dataSetElements[dataElement[id,name,code]]";
               $.get(url4, function (data4) {
                   $scope.tempAllDataElements = data4.dataSetElements;
   
                   $scope.dataElements = [];
   
                   for (var i in $scope.tempAllDataElements) {
                       $scope.dataElements.push($scope.tempAllDataElements[i].dataElement);
                   }
               });
       generatePeriods($scope.dataSetId);
       }*/

  generatePeriods = function (DataSet) {

    if (DataSet != "") {
      $.getJSON("../../dataSets/" + DataSet + ".json?fields=periodType", function (d) {
        var periodType = d.periodType;
        var today = new Date();
        var lastyear = today.getFullYear() - 1;
        var stDate = "01/01/" + lastyear;
        var latestMonth1 = today.getMonth() + 1;
        if (latestMonth1 < 10) {
          latestMonth = "0" + latestMonth1;
        }
        else {
          latestMonth = latestMonth1;
        }
        var endDate = latestMonth + "/01/" + (today.getFullYear());
        var periods = "";

        if (periodType == "Daily")
          periods = daily(stDate, endDate);
        else if (periodType == "Weekly")
          periods = weeklynew(stDate, endDate);
        else if (periodType == "Monthly")
          periods = monthly(stDate, endDate);
        else if (periodType == "Yearly")
          periods = yearly(stDate, endDate);
        else if (periodType == "Quarterly")
          periods = quartly();
        else if (periodType == "SixMonthly")
          periods = SixMnthly();
        else if (periodType == "SixMonthlyApril")
          periods = SixMnthlyApril();


        $("#importPeriod").html("");
        periods.split(";").forEach(function (p) {

          if (periodType == 'Monthly') {
            var ps = $scope.monthString(p);
            var h1 = "<option value='" + p + "'>" + ps + "</option>";
            $("#importPeriod").append(h1);
          }
          else if (periodType == "Quarterly") {
            var ps1 = $scope.quater(p);
            var h2 = "<option value='" + p + "'>" + ps1 + "</option>";
            $("#importPeriod").append(h2);
          }
          else if (periodType == "SixMonthly") {
            var ps2 = $scope.SixMonthly(p);
            var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
            $("#importPeriod").append(h4);
          }
          else if (periodType == "SixMonthlyApril") {
            var ps2 = $scope.SixMonthlyApril(p);
            var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
            $("#importPeriod").append(h4);
          }
          else if (periodType == "Daily") {
            var ps2 = $scope.daily(p);
            var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
            $("#importPeriod").append(h4);
          }
          else if (periodType == "Weekly") {
            var ps2 = $scope.weekly(p);
            var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
            $("#importPeriod").append(h4);
          }
          else {
            var h3 = "<option value='" + p + "'>" + p + "</option>";
            $("#importPeriod").append(h3);
          }
        });
      });
    }
  };
  $scope.weekly = function (period) {
    var newp;
    if (period == "Select Period") {
      newp = "Select Period";
    }
    else {

      var week = period.substring(4, 7);
      var prd = period.substring(0, 4);

      if (week == "W1" || week == "W2" || week == "W3" || week == "W4" || week == "W5") {
        newp = week + "-" + "January" + " " + prd;
      }
      else if (week == "W6" || week == "W7" || week == "W8" || week == "W9") {
        newp = week + "-" + "February" + " " + prd;
      }
      else if (week == "W10" || week == "W11" || week == "W12" || week == "W13" || week == "W14") {
        newp = week + "-" + "March" + " " + prd;
      }
      else if (week == "W15" || week == "W16" || week == "W17" || week == "W18") {
        newp = week + "-" + "April" + " " + prd;
      }
      else if (week == "W19" || week == "W20" || week == "W21" || week == "W22") {
        newp = week + "-" + "May" + " " + prd;
      }
      else if (week == "W23" || week == "W24" || week == "W25" || week == "W26" || week == "W27") {
        newp = week + "-" + "June" + " " + prd;
      }
      else if (week == "W28" || week == "W29" || week == "W30" || week == "W31") {
        newp = week + "-" + "July" + " " + prd;
      }
      else if (week == "W32" || week == "W33" || week == "W34" || week == "W35") {
        newp = week + "-" + "August" + " " + prd;
      }
      else if (week == "W36" || week == "W37" || week == "W38" || week == "W39" || week == "W40") {
        newp = week + "-" + "September" + " " + prd;
      }
      else if (week == "W41" || week == "W42" || week == "W43" || week == "W44") {
        newp = week + "-" + "October" + " " + prd;
      }
      else if (week == "W45" || week == "W46" || week == "W47" || week == "W48") {
        newp = week + "-" + "November" + " " + prd;
      }
      else if (week == "W49" || week == "W50" || week == "W51" || week == "W52" || week == "W53") {
        newp = week + "-" + "December" + " " + prd;
      }

    }
    return newp;
  }
  $scope.daily = function (period) {
    var newp;
    if (period == "Select Period") {
      newp = "Select Period";
    } else {
      var d1 = period.substring(0, 4);
      var d2 = period.substring(4, 6);
      var d3 = period.substring(6, 8);

      newp = d3 + "-" + d3 + "-" + d1;
    }
    return newp;
  }

  $scope.SixMonthlyApril = function (period) {
    var ms = [], ms1 = [], ms2 = [], newp;
    if (period == "Select Period") {
      newp = "Select Period";
    } else {
      var month = period.substring(4, 11);

      if (month == "AprilS1") {
        ms = "April - September ";
        newp = ms + " " + period.substring(0, 4);
      }
      else if (month == "AprilS2") {
        ms2 = "October ";
        ms1 = " - March ";
        var m = parseInt(period.substring(0, 4)) + 1;
        newp = ms2 + " " + (period.substring(0, 4)) + ms1 + " " + m;
      }

    }
    return newp;
  }

  $scope.SixMonthly = function (period) {
    var ms = [], newp;
    if (period == "Select Period") {
      newp = "Select Period";
    } else {
      var month = period.substring(4, 6);

      if (month == "S1")
        ms = "January - June";
      else if (month == "S2")
        ms = "July - December";
      newp = ms + " " + period.substring(0, 4);
    }
    return newp;
  }
  $scope.quater = function (period) {
    var ms = [], newp;
    if (period == "Select Period") {
      newp = "Select Period";
    }
    else {
      var month = period.substring(4, 6);

      if (month == "Q1")
        ms = "January - March";
      else if (month == "Q2")
        ms = "April - June ";
      else if (month == "Q3")
        ms = "July - September ";
      else if (month == "Q4")
        ms = "October - December";

      newp = ms + " " + period.substring(0, 4);
    }
    return newp;

  };

  $scope.monthString = function (pst) {
    var newp;
    if (pst == "Select Period") {
      newp = "Select Period";

    }
    else {
      var month = pst.substring(4, 6);
      var ms = [];

      if (month == "01")
        ms = "Jan";
      else if (month == "02")
        ms = "Feb";
      else if (month == "03")
        ms = "Mar";
      else if (month == "04")
        ms = "Apr";
      else if (month == "05")
        ms = "May";
      else if (month == "06")
        ms = "Jun";
      else if (month == "07")
        ms = "Jul";
      else if (month == "08")
        ms = "Aug";
      else if (month == "09")
        ms = "Sep";
      else if (month == "10")
        ms = "Oct";
      else if (month == "11")
        ms = "Nov";
      else if (month == "12")
        ms = "Dec";

      newp = ms + " " + pst.substring(0, 4);
    }
    return newp;
  };

  $.ajaxSetup({
    async: false
  });

  /** $scope.printcontent=function(){
  
  window.print();
  
  };**/
  // $scope.ExportToExcel = function (mydata) {
  //     var htmltable = document.getElementById('tabledata');
  //     var html = htmltable.outerHTML;
  //     window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

  // }

  // $scope.printDiv = function (div) {
  //     var docHead = document.head.outerHTML;
  //     var printContents = document.getElementById("tabledata").outerHTML;
  //     var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no,alig toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

  //     var newWin = window.open("", "_blank", winAttr);
  //     var writeDoc = newWin.document;
  //     writeDoc.open();
  //     writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()"><div style="margin-top:-250px">' + printContents + '</div></body></html>');
  //     writeDoc.close();
  //     newWin.focus();
  // }

  function showLoad() {
    setTimeout(function () {

    }, 1000);
  }
  function hideLoad() {
  }

});
