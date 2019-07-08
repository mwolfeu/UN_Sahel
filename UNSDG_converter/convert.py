import pandas as pd
import numpy as np
import glob
 
areas = ['Burkina Faso', 'Cameroon', 'Chad', 'Gambia', 'Guinea', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal'] 

borkedIndicators = [
  "EN_ATM_PM25",
  "SI_POV_EMP1",
  "SI_COV_PENSN",
  "SG_DSR_LEGREG",
  "VC_DSR_AFFCT",
  "VC_DSR_AGLH",
  "VC_DSR_AGLN",
  "VC_DSR_CHLN",
  "VC_DSR_CILN",
  "VC_DSR_DADN",
  "VC_DSR_DAFF",
  "VC_DSR_DDHN",
  "VC_DSR_DYDN",
  "VC_DSR_DYHN",
  "VC_DSR_GDPLS",
  "VC_DSR_HOLH",
  "VC_DSR_HOLN",
  "VC_DSR_IJILN",
  "VC_DSR_LSGP",
  "VC_DSR_MISS",
  "VC_DSR_MMHN",
  "VC_DSR_MORT",
  "VC_DSR_MTMN",
  "VC_DSR_MTMP",
  "VC_DSR_PDAN",
  "VC_DSR_PDLN",
  "VC_DSR_PDYN",
  "AG_PRD_FIESSI",
  "AG_PRD_FIESSIN",
  "AG_FPA_COMM",
  "SH_STA_MMR",
  "SH_DYN_IMRT",
  "SH_DYN_IMRTN",
  "SH_DYN_MORT",
  "SH_DYN_MORTN",
  "SH_HAP_HBSAG",
  "SH_HIV_INCD",
  "SH_TBS_INCID",
  "SH_DTH_NCOM",
  "SH_DTH_RNCOM",
  "SH_STA_SCIDE",
  "SH_STA_SCIDEN",
  "SH_STA_POISN",
  "SH_PRV_SMOK",
  "SH_MED_HEAWOR",
  "SH_IHR_CAPS",
  "SE_MAT_PROF",
  "SE_REA_PROF",
  "SE_PRE_PARTN",
  "SE_GPI_MATACH",
  "SE_GPI_REAACH",
  "SE_GPI_TRATEA",
  "SE_LGP_ACHIMA",
  "SE_LGP_ACHIRE",
  "SE_SEP_MATACH",
  "SE_SEP_REAACH",
  "SE_URP_MATACH",
  "SE_URP_REAACH",
  "SE_ACC_COMP",
  "SE_ACC_DWAT",
  "SE_ACC_ELEC",
  "SE_ACC_HNWA",
  "SE_ACC_INTN",
  "SE_ACC_SANI",
  "SE_INF_DSBL",
  "SE_TRA_GRDL",
  "VC_VAW_MARR",
  "SH_SAN_DEFECT",
  "SH_SAN_HNDWSH",
  "EG_ELC_ACCS",
  "FB_BNK_ACCSS",
  "EN_MAT_DOMCMPC",
  "EN_MAT_DOMCMPG",
  "EN_MAT_DOMCMPT",
  "SL_TLF_UEM",
  "SL_TLF_CHLDEA",
  "SL_TLF_CHLDEC",
  "IS_RDP_FRGVOL",
  "IS_RDP_PFVOL",
  "IT_MOB_NTWK",
  "SG_INT_MBRDEV",
  "SG_INT_VRTDEV",
  "EN_ATM_PM2",
  "ER_PTD_FRWRT",
  "ER_PTD_TERRS",
  "ER_PTD_MOTN",
  "ER_RSK_LSTI",
  "DC_ODA_BDVL",
  "IT_NET_BBN",
  "IT_NET_BBP",
  "SL_DOM_TSPD",
  "SL_DOM_TSPDCW",
  "SL_DOM_TSPDDC",
  "IT_MOB_OWN",
  "SL_ISV_IFRM",
  "SL_TLF_UEMDIS",
  "SL_TLF_NEET",
  "VC_VAW_SXVLN",
  "ER_MRN_MPA",
  "VC_VAW_DIST",
  "SH_SAN_SAFE"
]


li = []
for tok in glob.glob('in/*.csv'):
  df = pd.read_csv(tok, index_col=None, header=0)

  # Change their non-exclusive poorly chosen names
  # Add all the extra qualifiers.  Some Will be "_nan".
  df['SeriesCode'] = pd.DataFrame(np.where(df['SeriesCode'].isin(borkedIndicators), 
    df['SeriesCode']
    + "_" + df["Age"].map(str) + "_" + df["Freq"].map(str) + "_" + df["Location"].map(str)
    + "_" + df["Nature"].map(str) + "_" + df["Sex"].map(str) + "_" + df["Bounds"].map(str)
    + "_" + df["Name of international agreement"].map(str)+ "_" + df["Education level"].map(str)+ "_" + df["Type of product"].map(str)
    + "_" + df["Type of facilities"].map(str)+ "_" + df["Name of international institution"].map(str) + "_" + df["Type of occupation"].map(str)
    + "_" + df["Tariff regime (status)"].map(str)+ "_" + df["Type of skill"].map(str)+ "_" + df["Mode of transportation"].map(str)
    + "_" + df["Type of mobile technology"].map(str) + "_" + df["Name of non-communicable disease"].map(str) + "_" + df["Type of speed"].map(str) 
    + "_" + df["Migratory status"].map(str) + "_" + df["Disability status"].map(str) + "_" + df["Hazard type"].map(str) + "_" + df["IHR Capacity"].map(str) 
    + "_" + df["Cities"].map(str), # + "-" + df["Indicator"].map(str),
    df['SeriesCode']))
    
  

  li.append(df[["Indicator", "Target", 'GeoAreaName', "SeriesCode", "SeriesDescription", "TimePeriod", "Value"]])

df = pd.concat(li, axis=0, ignore_index=True)

# ~ dfP = df;
# ~ import code
# ~ code.interact(local=dict(globals(), **locals()))YYYY

# remove "_nan"s.
df['SeriesCode'] = df['SeriesCode'].str.replace('_nan', '')
df['SeriesCode'] = df['SeriesCode'] + "-" + df["Indicator"].map(str)

li = []
for tok in areas:
   sub_df = df[(df['GeoAreaName'] == tok)]
   li.append(sub_df)

df = pd.concat(li, axis=0, ignore_index=True)

df.to_csv("out/unsdg.csv")
