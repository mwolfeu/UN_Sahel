// TODO
// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

var ds = new dataset;

var ds = {
	obj: new dataset,
	FSIcols: ["Year", "C1: Security Apparatus", "C2: Factionalized Elites", "C3: Group Grievance", 
				"E1: Economy", "E2: Economic Inequality", "E3: Human Flight and Brain Drain", 
				"P1: State Legitimacy", "P2: Public Services", "P3: Human Rights", 
				"S1: Demographic Pressures", "S2: Refugees and IDPs", "X1: External Intervention"],
	// WDIcols: range(1960, 2018),
	ACLEDcols: ["LATITUDE", "LONGITUDE", "FATALITIES", "TIMESTAMP"],
	UNSDGcols: ["TimePeriod", "Value"]
}
// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {				// list of all indicators
  "ACLED/acled_sahel_gt2007.csv":{											
    exceptions:Object.fromEntries(ds.ACLEDcols.map(d => [d, Number])),
    initFcn: ACLED_init
  },
  "FSI/fsi_sahel_allYears.csv":{											
    exceptions:Object.fromEntries(ds.FSIcols.map(d => [d, Number])),
    initFcn: FSI_init
  },
  //~ "UNSDG/UNSDG.csv":{											
    //~ exceptions:Object.fromEntries(ds.UNSDGcols.map(d => [d, Number])),
    //~ initFcn: UNSDG_init
  //~ }
};

//////////
// MAIN //
//////////
$(document).ready(function() {  
  ds.obj.init(dsImportList); // init datasets
});
