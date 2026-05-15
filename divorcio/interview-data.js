/**
 * Cleaned A2J interview data for Brodsky Law Divorce Form
 * Generated from a2j.json. Page text comes from interview-titles-text.json
 */
import titlesText from './interview-titles-text.js';

// Interview metadata
export const INTERVIEW_META = {
  title: "Brodsky Law PLLC — Divorce Questionnaire",
  description: "Order form for Brodsky Law PLLC. Provide your information for your divorce case.",
  firstPage: "BL-00-Disclaimer",
  exitPage: "01-Save & Exit",
  steps: [
  {
    "number": "0",
    "text": "Introduction"
  },
  {
    "number": "1",
    "text": "Your Divorce"
  },
  {
    "number": "2",
    "text": "You and Your Spouse"
  },
  {
    "number": "4",
    "text": "Finished"
  }
]
};

// Variable definitions
export const VARIABLES = {
  "plaintiff gender": {
    "name": "Plaintiff gender",
    "type": "MC",
    "repeating": false,
    "comment": "User's gender will be used to display appopriate avatar."
  },
  "user avatar": {
    "name": "User Avatar",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff name first te": {
    "name": "Plaintiff name first TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff name middle te": {
    "name": "Plaintiff name middle TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff name last te": {
    "name": "Plaintiff name last TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff suffix mc": {
    "name": "Plaintiff suffix MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant name first te": {
    "name": "Defendant name first TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant name middle te": {
    "name": "Defendant name middle TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant name last te": {
    "name": "Defendant name last TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant suffix mc": {
    "name": "Defendant suffix MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant gender": {
    "name": "Defendant gender",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "expenses utilities nu": {
    "name": "Expenses utilities NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "defendant address line1 te": {
    "name": "Defendant address line1 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant address line2 te": {
    "name": "Defendant address line2 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant city te": {
    "name": "Defendant city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant state mc": {
    "name": "Defendant state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant postal code te": {
    "name": "Defendant postal code TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff postal code te": {
    "name": "Plaintiff postal code TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff state mc": {
    "name": "Plaintiff state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff city te": {
    "name": "Plaintiff city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "marriage date da": {
    "name": "Marriage date DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "plaintiff ssn te": {
    "name": "Plaintiff SSN TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff address line1 te": {
    "name": "Plaintiff address line1 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff address line2 te": {
    "name": "Plaintiff address line2 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "jurisdiction county mc": {
    "name": "Jurisdiction county MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "jurisdiction cplr 509 tf": {
    "name": "Jurisdiction CPLR 509 TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "venue basis mc": {
    "name": "Venue basis MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff phone te": {
    "name": "Plaintiff phone TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant phone te": {
    "name": "Defendant phone TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "married abroad tf": {
    "name": "Married abroad TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "marriage county te": {
    "name": "Marriage county TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "marriage state mc": {
    "name": "Marriage state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "marriage city te": {
    "name": "Marriage city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "marriage country te": {
    "name": "Marriage country TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "married by clergy tf": {
    "name": "Married by clergy TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "residency requirement mc": {
    "name": "Residency requirement MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "residency based on mc": {
    "name": "Residency based on MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "step 1 completed tf": {
    "name": "Step 1 completed TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "summons served da": {
    "name": "Summons served DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "summons filed da": {
    "name": "Summons filed DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "initiating papers mc": {
    "name": "Initiating papers MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "initiating papers te": {
    "name": "Initiating papers TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "index number te": {
    "name": "Index number TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "service with photo tf": {
    "name": "Service with photo TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff has prior surname tf": {
    "name": "Plaintiff has prior surname TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant has prior surname tf": {
    "name": "Defendant has prior surname TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant in military tf": {
    "name": "Defendant in military TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "summons served by mc": {
    "name": "Summons served by MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "service location mc": {
    "name": "Service location MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "20/30 days te": {
    "name": "20/30 days TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant in default tf": {
    "name": "Defendant in default TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant signed affidavit tf": {
    "name": "Defendant signed affidavit TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant appearance mc": {
    "name": "Defendant appearance MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "grounds for divorce mc": {
    "name": "Grounds for divorce MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant ssn is unknown mc": {
    "name": "Defendant SSN is unknown MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant ssn known tf": {
    "name": "Defendant SSN known TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant not in military mc": {
    "name": "Defendant not in military MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "agreement signed da": {
    "name": "Agreement signed DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "maintenance amount nu": {
    "name": "Maintenance amount NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "maintenance frequency mc": {
    "name": "Maintenance frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "spousal support court mc": {
    "name": "Spousal support court MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "spousal support county mc": {
    "name": "Spousal support county MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "parties have property tf": {
    "name": "Parties have property TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "parties have agreement tf": {
    "name": "Parties have agreement TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "print step 1 tf": {
    "name": "Print Step 1 TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "print step 2 tf": {
    "name": "Print Step 2 TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "print affidavit of service tf": {
    "name": "Print affidavit of service TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "summons served by da": {
    "name": "Summons served by DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "step 2 file date te": {
    "name": "Step 2 file date TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "step 2 completed tf": {
    "name": "Step 2 completed TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "print fee waiver tf": {
    "name": "Print fee waiver TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant answer by da": {
    "name": "Defendant answer by DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "a2j interview name te": {
    "name": "A2J interview name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "from date filed te": {
    "name": "From date filed TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant ssn te": {
    "name": "Defendant SSN TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant military branch te": {
    "name": "Defendant military branch TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "index purchase da": {
    "name": "Index purchase DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "bought and filed same day tf": {
    "name": "Bought and filed same day TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "maintenance payor mc": {
    "name": "Maintenance payor MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "spousal support state mc": {
    "name": "Spousal support state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "spousal support court te": {
    "name": "Spousal support court TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "spousal support continue tf": {
    "name": "Spousal support continue TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant not military da": {
    "name": "Defendant not military DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "plaintiff has ssn tf": {
    "name": "Plaintiff has SSN TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income from unemployment tf": {
    "name": "Income from unemployment TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income from workers tf": {
    "name": "Income from workers TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income from family tf": {
    "name": "Income from family TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income from other tf": {
    "name": "Income from other TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income from none tf": {
    "name": "Income from none TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "prior waiver approved tf": {
    "name": "Prior waiver approved TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income unemployment nu": {
    "name": "Income unemployment NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income unemployment frequency mc": {
    "name": "Income unemployment frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income disability nu": {
    "name": "Income disability NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income disability frequency mc": {
    "name": "Income disability frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income workers frequency mc": {
    "name": "Income workers frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income workers nu": {
    "name": "Income workers NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income family nu": {
    "name": "Income family NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income family details te": {
    "name": "Income family details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income other nu": {
    "name": "Income other NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income other details te": {
    "name": "Income other details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "prior waiver application tf": {
    "name": "Prior waiver application TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "prior waiver details te": {
    "name": "Prior waiver details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income from disability tf": {
    "name": "Income from disability TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "maintenance frequency te": {
    "name": "Maintenance frequency TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income job type mc": {
    "name": "Income job type MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income job employer te": {
    "name": "Income job employer TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income job nu": {
    "name": "Income job NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income job frequency mc": {
    "name": "Income job frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income from job tf": {
    "name": "Income from job TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff income nu": {
    "name": "Plaintiff income NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "spousal support docket te": {
    "name": "Spousal support docket TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "maintenance period mc": {
    "name": "Maintenance period MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff gets public assistance tf": {
    "name": "Plaintiff gets public assistance TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant gets public assistance tf": {
    "name": "Defendant gets public assistance TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "part a filed tf": {
    "name": "Part A filed TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "ancillary relief1 te": {
    "name": "Ancillary relief1 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "ancillary relief2 te": {
    "name": "Ancillary relief2 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "ancillary relief3 te": {
    "name": "Ancillary relief3 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "ancillary relief4 te": {
    "name": "Ancillary relief4 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "ancillary relief5 te": {
    "name": "Ancillary relief5 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "maintenance period other te": {
    "name": "Maintenance period other TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "agreement drafter mc": {
    "name": "Agreement drafter MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "ancillary relief sought tf": {
    "name": "Ancillary relief sought TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff prior surname2 te": {
    "name": "Plaintiff prior surname2 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff prior surname1 te": {
    "name": "Plaintiff prior surname1 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff prior surname3 te": {
    "name": "Plaintiff prior surname3 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant prior surname1 te": {
    "name": "Defendant prior surname1 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant prior surname2 te": {
    "name": "Defendant prior surname2 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant prior surname3 te": {
    "name": "Defendant prior surname3 TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income family frequency mc": {
    "name": "Income family frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income other frequency te": {
    "name": "Income other frequency TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "expenses housing nu": {
    "name": "Expenses housing NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "additional financial details tf": {
    "name": "Additional financial details TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "additional financial details te": {
    "name": "Additional financial details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "other court order nu": {
    "name": "Other court order NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "order1 details te": {
    "name": "Order1 details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order1 county te": {
    "name": "Order1 county TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order1 court te": {
    "name": "Order1 court TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order1 date da": {
    "name": "Order1 date DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "order1 index te": {
    "name": "Order1 index TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order2 details te": {
    "name": "Order2 details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order2 court te": {
    "name": "Order2 court TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order2 county te": {
    "name": "Order2 county TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order2 date da": {
    "name": "Order2 date DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "order2 index te": {
    "name": "Order2 index TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order3 details te": {
    "name": "Order3 details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order3 court te": {
    "name": "Order3 court TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order3 county te": {
    "name": "Order3 county TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order3 date da": {
    "name": "Order3 date DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "order3 index te": {
    "name": "Order3 index TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "marital property none mc": {
    "name": "Marital property none MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff income source te": {
    "name": "Plaintiff income source TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "spousal support order da": {
    "name": "Spousal support order DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "relief other orders tf": {
    "name": "Relief other orders TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "order1 state mc": {
    "name": "Order1 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "relief other tf": {
    "name": "Relief other TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant in prison tf": {
    "name": "Defendant in prison TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "party with pension mc": {
    "name": "Party with pension MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "pension rights waived tf": {
    "name": "Pension rights waived TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant prison name te": {
    "name": "Defendant prison name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant prison id te": {
    "name": "Defendant prison ID TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "parties have dro tf": {
    "name": "Parties have DRO TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "parties have pension stip tf": {
    "name": "Parties have pension stip TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff in prison tf": {
    "name": "Plaintiff in prison TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff prison id te": {
    "name": "Plaintiff prison ID TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff has phone tf": {
    "name": "Plaintiff has phone TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff prison type mc": {
    "name": "Plaintiff prison type MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff prison name te": {
    "name": "Plaintiff prison name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "spousal support payor mc": {
    "name": "Spousal support payor MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "spousal support frequency te": {
    "name": "Spousal support frequency TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "spousal support amount nu": {
    "name": "Spousal support amount NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "spousal support frequency mc": {
    "name": "Spousal support frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "exit address abroad tf": {
    "name": "Exit address abroad TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit children tf": {
    "name": "Exit children TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit age tf": {
    "name": "Exit age TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit op needed tf": {
    "name": "Exit OP needed TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit pending case tf": {
    "name": "Exit pending case TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit dv issue tf": {
    "name": "Exit DV issue TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit address unknown tf": {
    "name": "Exit address unknown TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit pension unresolved tf": {
    "name": "Exit pension unresolved TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit military tf": {
    "name": "Exit military TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit marital property tf": {
    "name": "Exit marital property TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit residency tf": {
    "name": "Exit residency TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit 6 months tf": {
    "name": "Exit 6 months TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "print exit sheet tf": {
    "name": "Print exit sheet TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "agreement insurance clause tf": {
    "name": "Agreement insurance clause TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant has phone tf": {
    "name": "Defendant has phone TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "married 6 months da": {
    "name": "Married 6 months DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "print date warning tf": {
    "name": "Print date warning TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "relief op against defendant tf": {
    "name": "Relief OP against defendant TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "relief op against plaintiff tf": {
    "name": "Relief OP against plaintiff TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "op defendant county mc": {
    "name": "OP defendant county MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "op defendant court mc": {
    "name": "OP defendant court MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "op defendant date da": {
    "name": "OP defendant date DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "op defendant docket te": {
    "name": "OP defendant docket TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "op plaintiff county mc": {
    "name": "OP plaintiff county MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "op plaintiff court mc": {
    "name": "OP plaintiff court MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "op plaintiff date da": {
    "name": "OP plaintiff date DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "op plaintiff docket te": {
    "name": "OP plaintiff docket TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "order2 state mc": {
    "name": "Order2 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "order3 state mc": {
    "name": "Order3 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "property checking tf": {
    "name": "Property checking TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property savings tf": {
    "name": "Property savings TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property none tf": {
    "name": "Property none TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property other tf": {
    "name": "Property other TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property vehicle tf": {
    "name": "Property vehicle TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property checking nu": {
    "name": "Property checking NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property vehicle nu": {
    "name": "Property vehicle NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property vehicle1 nu": {
    "name": "Property vehicle1 NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property vehicle1 year te": {
    "name": "Property vehicle1 year TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle1 model te": {
    "name": "Property vehicle1 model TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle1 make te": {
    "name": "Property vehicle1 make TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle2 make te": {
    "name": "Property vehicle2 make TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle2 model te": {
    "name": "Property vehicle2 model TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle2 year te": {
    "name": "Property vehicle2 year TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle2 nu": {
    "name": "Property vehicle2 NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property vehicle3 make te": {
    "name": "Property vehicle3 make TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle3 model te": {
    "name": "Property vehicle3 model TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle3 year te": {
    "name": "Property vehicle3 year TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle3 nu": {
    "name": "Property vehicle3 NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property vehicle4 make te": {
    "name": "Property vehicle4 make TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle4 model te": {
    "name": "Property vehicle4 model TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle4 year te": {
    "name": "Property vehicle4 year TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle4 nu": {
    "name": "Property vehicle4 NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property vehicle5 make te": {
    "name": "Property vehicle5 make TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle5 model te": {
    "name": "Property vehicle5 model TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle5 year te": {
    "name": "Property vehicle5 year TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property vehicle5 nu": {
    "name": "Property vehicle5 NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real nu": {
    "name": "Property real NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real1 address te": {
    "name": "Property real1 address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real1 value nu": {
    "name": "Property real1 value NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real1 state mc": {
    "name": "Property real1 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "property real1 city te": {
    "name": "Property real1 city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real2 address te": {
    "name": "Property real2 address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real2 city te": {
    "name": "Property real2 city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real2 state mc": {
    "name": "Property real2 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "property real2 value nu": {
    "name": "Property real2 value NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real3 address te": {
    "name": "Property real3 address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real3 city te": {
    "name": "Property real3 city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real3 state mc": {
    "name": "Property real3 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "property real3 value nu": {
    "name": "Property real3 value NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real4 address te": {
    "name": "Property real4 address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real4 city te": {
    "name": "Property real4 city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real4 state mc": {
    "name": "Property real4 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "property real4 value nu": {
    "name": "Property real4 value NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real5 address te": {
    "name": "Property real5 address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real5 city te": {
    "name": "Property real5 city TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property real5 state mc": {
    "name": "Property real5 state MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "property real5 value nu": {
    "name": "Property real5 value NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property real property tf": {
    "name": "Property real property TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property phone tf": {
    "name": "Property phone TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property computer tf": {
    "name": "Property computer TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property furniture tf": {
    "name": "Property furniture TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property audio tf": {
    "name": "Property audio TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property jewelry tf": {
    "name": "Property jewelry TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property clothing tf": {
    "name": "Property clothing TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property none2 tf": {
    "name": "Property none2 TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property phone nu": {
    "name": "Property phone NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property computer nu": {
    "name": "Property computer NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property furniture nu": {
    "name": "Property furniture NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property television nu": {
    "name": "Property television NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property audio nu": {
    "name": "Property audio NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property other nu": {
    "name": "Property other NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property other te": {
    "name": "Property other TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "property savings nu": {
    "name": "Property savings NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property investments tf": {
    "name": "Property investments TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income from ssi tf": {
    "name": "Income from SSI TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "income ssi nu": {
    "name": "Income SSI NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "income ssi frequency mc": {
    "name": "Income SSI frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income public assistance nu": {
    "name": "Income public assistance NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property television tf": {
    "name": "Property television TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "property jewelry nu": {
    "name": "Property jewelry NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property clothing nu": {
    "name": "Property clothing NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "property investments nu": {
    "name": "Property investments NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "piece/s te": {
    "name": "piece/s TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "vehicle/s te": {
    "name": "vehicle/s TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "ny resident years mc": {
    "name": "NY resident years MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff has dependents tf": {
    "name": "Plaintiff has dependents TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "dependents details te": {
    "name": "Dependents details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income public assistance frequency mc": {
    "name": "Income public assistance frequency MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "income none details te": {
    "name": "Income none details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "expenses housing details te": {
    "name": "Expenses housing details TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "expenses housing none tf": {
    "name": "Expenses housing none TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "paid for index te": {
    "name": "paid for index TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "print 255 addendum tf": {
    "name": "Print 255 addendum TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "in/out of nys te": {
    "name": "in/out of NYS TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "him/her defendant te": {
    "name": "him/her Defendant TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "relief marital home tf": {
    "name": "Relief marital home TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "marital home party mc": {
    "name": "Marital home party MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "parties have pension mc": {
    "name": "Parties have pension MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "case calendaring da": {
    "name": "Case calendaring DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "exit common law tf": {
    "name": "Exit common law TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "exit plaintiff in prison tf": {
    "name": "Exit plaintiff in prison TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "children nu": {
    "name": "Children NU",
    "type": "Number",
    "repeating": false,
    "comment": ""
  },
  "exit maintenance tf": {
    "name": "Exit maintenance TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant email address te": {
    "name": "Defendant email address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff email address te": {
    "name": "Plaintiff email address TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "is your child/ren te": {
    "name": "Is your child/ren TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "all child/ren te": {
    "name": "all child/ren TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "child/ren te": {
    "name": "child/ren TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "print complaint tf": {
    "name": "Print complaint TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "pp approved tf": {
    "name": "PP approved TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "child/ren is/are te": {
    "name": "child/ren is/are TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "children of marriage tf": {
    "name": "Children of marriage TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "summons extended da": {
    "name": "Summons extended DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "summons extended tf": {
    "name": "Summons extended TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "affidavit signed da": {
    "name": "Affidavit signed DA",
    "type": "Date",
    "repeating": false,
    "comment": ""
  },
  "print spanish tf": {
    "name": "Print Spanish TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "guideline maintenance tf": {
    "name": "Guideline maintenance TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "jurisdiction county te": {
    "name": "Jurisdiction county TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant gender sp": {
    "name": "Defendant gender SP",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "a2j version": {
    "name": "A2J Version",
    "type": "Text",
    "repeating": false,
    "comment": "A2J Author Version"
  },
  "a2j interview id": {
    "name": "A2J Interview ID",
    "type": "Text",
    "repeating": false,
    "comment": "Guide ID"
  },
  "el/la sp": {
    "name": "el/la SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "o/a plaintiff sp": {
    "name": "o/a plaintiff SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "o/a defendant sp": {
    "name": "o/a defendant SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "in/out of nys sp te": {
    "name": "in/out of NYS SP TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "este/a sp": {
    "name": "este/a SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "20/30 days sp te": {
    "name": "20/30 days SP TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "from date filed sp te": {
    "name": "From date filed SP TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "el/la article sp": {
    "name": "el/la article SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "el/la plaintiff article sp": {
    "name": "el/la plaintiff article SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income public assistance frequency sp": {
    "name": "Income public assistance frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income job type sp": {
    "name": "Income job type SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income job frequency sp": {
    "name": "Income job frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "vehicle/s sp": {
    "name": "vehicle/s SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "piece/s sp": {
    "name": "piece/s SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "ny resident years sp": {
    "name": "NY resident years SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income unemployment frequency sp": {
    "name": "Income unemployment frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income disability frequency sp": {
    "name": "Income disability frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income ssi frequency sp": {
    "name": "Income SSI frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income workers frequency sp": {
    "name": "Income workers frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income family frequency sp": {
    "name": "Income family frequency SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "child/ren sp": {
    "name": "child/ren SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "is your child/ren sp": {
    "name": "Is your child/ren SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "child/ren is/are sp": {
    "name": "child/ren is/are SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff gender sp": {
    "name": "Plaintiff gender SP",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "paid for index sp": {
    "name": "paid for index SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "filed/will file sp": {
    "name": "filed/will file SP",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "logged in options mc": {
    "name": "Logged in options MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "user gender": {
    "name": "User Gender",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff has new name tf": {
    "name": "Plaintiff has new name TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff new name first te": {
    "name": "Plaintiff new name first TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff new name middle te": {
    "name": "Plaintiff new name middle TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff new name last te": {
    "name": "Plaintiff new name last TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff new suffix mc": {
    "name": "Plaintiff new suffix MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant has new name tf": {
    "name": "Defendant has new name TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "defendant new name first te": {
    "name": "Defendant new name first TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant new name middle te": {
    "name": "Defendant new name middle TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant new name last te": {
    "name": "Defendant new name last TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant new suffix mc": {
    "name": "Defendant new suffix MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "plaintiff current name te": {
    "name": "Plaintiff current name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant current name te": {
    "name": "Defendant current name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant full name te": {
    "name": "Defendant full name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff full name te": {
    "name": "Plaintiff full name TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "plaintiff has alias tf": {
    "name": "Plaintiff has alias TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "plaintiff name alias te": {
    "name": "Plaintiff name alias TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant has alias tf": {
    "name": "Defendant has alias TF",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "defendant name alias te": {
    "name": "Defendant name alias TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "income from nota tf": {
    "name": "Income from NOTA TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "guideline maintenance da": {
    "name": "Guideline maintenance DA",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "user gender sp": {
    "name": "User Gender SP",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "defendant prison type mc": {
    "name": "Defendant prison type MC",
    "type": "MC",
    "repeating": false,
    "comment": ""
  },
  "a2j visited pages": {
    "name": "a2j visited pages",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j bookmark": {
    "name": "A2J Bookmark",
    "type": "Text",
    "repeating": false,
    "comment": "Current Page"
  },
  "a2j history": {
    "name": "A2J History",
    "type": "Text",
    "repeating": false,
    "comment": "Progress History List (XML)"
  },
  "a2j interview incomplete tf": {
    "name": "A2J Interview Incomplete TF",
    "type": "TF",
    "repeating": false,
    "comment": "Reached Successful Exit?"
  },
  "a2j step 0": {
    "name": "A2J Step 0",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 1": {
    "name": "A2J Step 1",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 2": {
    "name": "A2J Step 2",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 3": {
    "name": "A2J Step 3",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 4": {
    "name": "A2J Step 4",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 5": {
    "name": "A2J Step 5",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 6": {
    "name": "A2J Step 6",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 7": {
    "name": "A2J Step 7",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 8": {
    "name": "A2J Step 8",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 9": {
    "name": "A2J Step 9",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 10": {
    "name": "A2J Step 10",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 11": {
    "name": "A2J Step 11",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "a2j step 12": {
    "name": "A2J Step 12",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "brodsky client first name te": {
    "name": "Brodsky client first name TE",
    "type": "Text",
    "repeating": false,
    "comment": "Brodsky intake — first screen (before introduction)"
  },
  "brodsky client last name te": {
    "name": "Brodsky client last name TE",
    "type": "Text",
    "repeating": false,
    "comment": "Brodsky intake — first screen (before introduction)"
  },
  "brodsky minor children mc": {
    "name": "Brodsky minor children MC",
    "type": "MC",
    "repeating": false,
    "comment": "Brodsky intake — children"
  },
  "brodsky children json te": {
    "name": "Brodsky children JSON TE",
    "type": "Text",
    "repeating": false,
    "comment": "JSON array: [{name,dob,address}, ...]"
  },
  "brodsky plaintiff military tf": {
    "name": "Brodsky plaintiff military TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "brodsky defendant military tf": {
    "name": "Brodsky defendant military TF",
    "type": "TF",
    "repeating": false,
    "comment": ""
  },
  "brodsky plaintiff employer te": {
    "name": "Brodsky plaintiff employer TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "brodsky plaintiff annual income te": {
    "name": "Brodsky plaintiff annual income TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "brodsky defendant employer te": {
    "name": "Brodsky defendant employer TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "brodsky defendant annual income te": {
    "name": "Brodsky defendant annual income TE",
    "type": "Text",
    "repeating": false,
    "comment": ""
  },
  "brodsky plaintiff race mc": {
    "name": "Brodsky plaintiff race MC",
    "type": "MC",
    "repeating": false,
    "comment": "Brodsky intake — race"
  },
  "brodsky defendant race mc": {
    "name": "Brodsky defendant race MC",
    "type": "MC",
    "repeating": false,
    "comment": "Brodsky intake — race"
  },
  "brodsky after children route mc": {
    "name": "Brodsky after children route MC",
    "type": "MC",
    "repeating": false,
    "comment": "settlement → 04e.1; about → 01-About Plaintiff (internal router)"
  },
  "brodsky plaintiff dob da": {
    "name": "Brodsky plaintiff DOB DA",
    "type": "Date",
    "repeating": false,
    "comment": "Brodsky intake — date of birth (plaintiff)"
  },
  "brodsky defendant dob da": {
    "name": "Brodsky defendant DOB DA",
    "type": "Date",
    "repeating": false,
    "comment": "Brodsky intake — date of birth (defendant)"
  },
  "brodsky plaintiff state of birth te": {
    "name": "Brodsky plaintiff state of birth TE",
    "type": "Text",
    "repeating": false,
    "comment": "State or country of birth (plaintiff)"
  },
  "brodsky defendant state of birth te": {
    "name": "Brodsky defendant state of birth TE",
    "type": "Text",
    "repeating": false,
    "comment": "State or country of birth (defendant)"
  },
  "brodsky plaintiff education mc": {
    "name": "Brodsky plaintiff education MC",
    "type": "MC",
    "repeating": false,
    "comment": "Highest education level (plaintiff)"
  },
  "brodsky defendant education mc": {
    "name": "Brodsky defendant education MC",
    "type": "MC",
    "repeating": false,
    "comment": "Highest education level (defendant)"
  },
  "brodsky plaintiff prior marriages mc": {
    "name": "Brodsky plaintiff prior marriages MC",
    "type": "MC",
    "repeating": false,
    "comment": "Count of prior marriages (plaintiff)"
  },
  "brodsky defendant prior marriages mc": {
    "name": "Brodsky defendant prior marriages MC",
    "type": "MC",
    "repeating": false,
    "comment": "Count of prior marriages (defendant)"
  },
  "brodsky plaintiff prior marriages ended mc": {
    "name": "Brodsky plaintiff prior marriages ended MC",
    "type": "MC",
    "repeating": false,
    "comment": "How prior marriages ended (plaintiff)"
  },
  "brodsky defendant prior marriages ended mc": {
    "name": "Brodsky defendant prior marriages ended MC",
    "type": "MC",
    "repeating": false,
    "comment": "How prior marriages ended (defendant)"
  },
  "brodsky group health plan name te": {
    "name": "Brodsky group health plan name TE",
    "type": "Text",
    "repeating": false,
    "comment": "Employer/group health plan name"
  },
  "brodsky health plan address te": {
    "name": "Brodsky health plan address TE",
    "type": "Text",
    "repeating": false,
    "comment": "Health plan mailing address"
  },
  "brodsky health plan member id te": {
    "name": "Brodsky health plan member id TE",
    "type": "Text",
    "repeating": false,
    "comment": "Member / identification number"
  },
  "brodsky health plan group number te": {
    "name": "Brodsky health plan group number TE",
    "type": "Text",
    "repeating": false,
    "comment": "Group number"
  },
  "brodsky health plan administrator te": {
    "name": "Brodsky health plan administrator TE",
    "type": "Text",
    "repeating": false,
    "comment": "Plan administrator"
  },
  "brodsky health plan coverage type te": {
    "name": "Brodsky health plan coverage type TE",
    "type": "Text",
    "repeating": false,
    "comment": "Type of coverage (e.g. medical, dental)"
  },
  "brodsky children other residence 5y tf": {
    "name": "Brodsky children other residence 5y TF",
    "type": "TF",
    "repeating": false,
    "comment": "Marital children lived at another address in last 5 years"
  },
  "brodsky children other residence detail te": {
    "name": "Brodsky children other residence detail TE",
    "type": "Text",
    "repeating": false,
    "comment": "Other addresses / details (last 5 years)"
  },
  "brodsky plaintiff physical custody minor tf": {
    "name": "Brodsky plaintiff physical custody minor TF",
    "type": "TF",
    "repeating": false,
    "comment": "Plaintiff has physical custody of any minor under 18"
  },
  "brodsky plaintiff legal custody minor tf": {
    "name": "Brodsky plaintiff legal custody minor TF",
    "type": "TF",
    "repeating": false,
    "comment": "Plaintiff has legal custody of any minor under 18"
  },
  "brodsky defendant physical custody minor tf": {
    "name": "Brodsky defendant physical custody minor TF",
    "type": "TF",
    "repeating": false,
    "comment": "Defendant has physical custody of any minor under 18"
  },
  "brodsky defendant legal custody minor tf": {
    "name": "Brodsky defendant legal custody minor TF",
    "type": "TF",
    "repeating": false,
    "comment": "Defendant has legal custody of any minor under 18"
  },
  "brodsky child support either pays tf": {
    "name": "Brodsky child support either pays TF",
    "type": "TF",
    "repeating": false,
    "comment": "Either party pays child support (child under 21)"
  },
  "brodsky child support court order tf": {
    "name": "Brodsky child support court order TF",
    "type": "TF",
    "repeating": false,
    "comment": "Court order re child support"
  },
  "brodsky children covered by health plan tf": {
    "name": "Brodsky children covered by health plan TF",
    "type": "TF",
    "repeating": false,
    "comment": "Children covered by employer/group health plan"
  },
  "brodsky children group health plan name te": {
    "name": "Brodsky children group health plan name TE",
    "type": "Text",
    "repeating": false,
    "comment": "Children coverage — plan name"
  },
  "brodsky children health plan address te": {
    "name": "Brodsky children health plan address TE",
    "type": "Text",
    "repeating": false,
    "comment": "Children coverage — plan address"
  },
  "brodsky children health plan member id te": {
    "name": "Brodsky children health plan member id TE",
    "type": "Text",
    "repeating": false,
    "comment": "Children coverage — member ID"
  },
  "brodsky children health plan group number te": {
    "name": "Brodsky children health plan group number TE",
    "type": "Text",
    "repeating": false,
    "comment": "Children coverage — group number"
  },
  "brodsky children health plan administrator te": {
    "name": "Brodsky children health plan administrator TE",
    "type": "Text",
    "repeating": false,
    "comment": "Children coverage — plan administrator"
  },
  "brodsky children health plan coverage type te": {
    "name": "Brodsky children health plan coverage type TE",
    "type": "Text",
    "repeating": false,
    "comment": "Children coverage — type"
  },
  "brodsky children other residence which child te": {
    "name": "Brodsky children other residence which child TE",
    "type": "Text",
    "repeating": false,
    "comment": "Which child lived at other address(es) — from child picker"
  },
  "brodsky plaintiff physical custody which children te": {
    "name": "Brodsky plaintiff physical custody which children TE",
    "type": "Text",
    "repeating": false,
    "comment": "Names of minors — plaintiff physical custody"
  },
  "brodsky plaintiff legal custody which children te": {
    "name": "Brodsky plaintiff legal custody which children TE",
    "type": "Text",
    "repeating": false,
    "comment": "Names of minors — plaintiff legal custody"
  },
  "brodsky defendant physical custody which children te": {
    "name": "Brodsky defendant physical custody which children TE",
    "type": "Text",
    "repeating": false,
    "comment": "Names of minors — defendant physical custody"
  },
  "brodsky defendant legal custody which children te": {
    "name": "Brodsky defendant legal custody which children TE",
    "type": "Text",
    "repeating": false,
    "comment": "Names of minors — defendant legal custody"
  }
};

// Page definitions (text merged from interview-titles-text.js)
const textById = Object.fromEntries((titlesText.pages || []).map(p => [p.id, p.text]));
const PAGES_RAW = {
  "00-Introduction": {
    "step": 0,
    "fields": [
      {
        "name": "Intro marital issues agree TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Do you and your spouse agree on all marital issues, including but not limited to child custody, divisions of assets/property, and spousal support?"
      },
      {
        "name": "Intro marital issues agree TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false"
      },
      {
        "name": "Intro spouse will sign papers TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "To the best of your knowledge, is your spouse willing to sign and return divorce papers served upon them?"
      },
      {
        "name": "Intro spouse will sign papers TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "00a-Firefox warning"
      }
    ]
  },
  "07a.1-Parties names": {
    "learn": "Why is this important?",
    "help": "When you got married, your last name or the Defendant's last name may have changed.\nOn recent New York State marriage certificates, look in the section with your information, under \"Surname after marriage\" or \"New Surname\" - if there is a new surname in that space, it means that last name was legally changed when you got married.\nRead the document carefully to find this information.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07b.1-Plaintiff name"
      }
    ]
  },
  "08a.1-Defendant name": {
    "learn": "How is the Defendant's gender used?",
    "help": "The gender is used during the form to refer to the Defendant. It is not used in the generated forms but it is used in the printed instructions.",
    "step": 0,
    "fields": [
      {
        "name": "Defendant name first TE",
        "type": "text",
        "label": "First:",
        "required": true
      },
      {
        "name": "Defendant name middle TE",
        "type": "text",
        "label": "Middle:",
        "required": false
      },
      {
        "name": "Defendant name last TE",
        "type": "text",
        "label": "Last:",
        "required": true
      },
      {
        "name": "Defendant suffix MC",
        "type": "textpick",
        "label": "Suffix",
        "required": false
      },
      {
        "name": "Defendant gender",
        "type": "gender",
        "label": "Pick one:",
        "required": true,
        "listData": "<OPTION VALUE=\"Jr.\">Jr.</OPTION><OPTION VALUE=\"Sr.\">Sr.</OPTION><OPTION VALUE=\"II\">II</OPTION><OPTION VALUE=\"III\">III</OPTION><OPTION VALUE=\"IV\">IV</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "08b.1-Defendant name change"
      }
    ],
    "codeAfter": "IF NOT (HASANSWERED([Defendant name middle TE])) \n SET [Defendant name middle TE] TO NULL\nEND IF\n\nIF  [Defendant gender] = \"Male\" \nELSE\nEND IF"
  },
  "02a-Plaintiff 2 years residency": {
    "learn": "What do you mean?",
    "help": "This means that you are living in New York State right now and have lived in New York State and in no other state or country for at least two years.\nFor example, if the papers were filed with the court on %%DATE(TODAY)%%, you have lived in New York State since %%DATE(TODAY-730)%%.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06a-Grounds for divorce",
        "name": "Residency based on MC",
        "value": "plaintiff"
      },
      {
        "label": "No",
        "next": "02b-Defendant 2 years residency"
      }
    ],
    "codeBefore": "IF  [Part A filed TF] = true \n SET [From date filed TE] TO \"As of \" + %%DATE([Summons filed DA])%% + \", when your papers were filed with the court,\"\nELSE\n SET [From date filed TE] TO \"\"\nEND IF\n\nIF [Part A filed TF] = true AND [Initiating papers MC] = \"complaint\" \n GOTO \"A02-Residency with Complaint\"\nEND IF\n\nSET [Residency requirement MC] TO \"2 years\""
  },
  "03a-Plaintiff 1 year residency": {
    "learn": "What do you mean?",
    "help": "This means that you are living in New York State right now and have lived in New York State for at least 1 year and in not other state or country during that year.\nFor example, if the papers were filed with the court on %%DATE(TODAY)%%, you have lived in New York State since %%DATE(TODAY-365)%%.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04a-Married in NY",
        "name": "Residency based on MC",
        "value": "plaintiff"
      },
      {
        "label": "No",
        "next": "03b-Defendant 1 year residency"
      }
    ]
  },
  "04a-Married in NY": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06a-Grounds for divorce"
      },
      {
        "label": "No",
        "next": "04b-Lived in NY as married couple"
      }
    ],
    "codeBefore": "SET [Residency requirement MC] TO \"married in NY\""
  },
  "04b-Lived in NY as married couple": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06a-Grounds for divorce"
      },
      {
        "label": "No",
        "next": "05a-Cause of action in NY"
      }
    ],
    "codeBefore": "SET [Residency requirement MC] TO \"resided as married\""
  },
  "05a-Cause of action in NY": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "05b-Current residents"
      },
      {
        "label": "No",
        "next": "05c-Residency exit"
      }
    ],
    "codeBefore": "SET [Residency requirement MC] TO \"grounds\""
  },
  "02c-Program instructions": {
    "learn": "What do you mean?",
    "help": "If you click on \"Learn More\" you get information that helps you answer the question.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "02d-Disclaimer"
      }
    ]
  },
  "02d-Disclaimer": {
    "learn": "What can the court clerk do?",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "02e-Warning"
      }
    ]
  },
  "04f.10-ADR exit": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit marital property TF] TO true"
  },
  "A01a-Part A Finished": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "SUCCESS"
      }
    ],
    "codeAfter": "SET [Step 1 completed TF] TO true\nSET [Print Step 1 TF] TO true\nSET [Print Step 2 TF] TO false\nSET [Print exit sheet TF] TO false\nSET [A2J interview name TE] TO \"Divorce Part A: Starting\""
  },
  "02b-Introduction": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "02c-Program instructions"
      }
    ],
    "codeAfter": "SET [Step 1 completed TF] TO false"
  },
  "A04b-Waiver signed": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04d.1-Where given",
        "name": "Defendant signed affidavit TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "A05a.1-Service",
        "name": "Defendant signed affidavit TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF  [Defendant signed affidavit TF] = true \n SET [Defendant appearance MC] TO \"affidavit\"\n SET [Defendant not in military MC] TO \"affidavit\"\n SET [Print affidavit of service TF] TO false\n SET [Service with photo TF] TO false\nELSE\n SET [Defendant appearance MC] TO \"default\"\nEND IF"
  },
  "A05a.2i-Date of service": {
    "learn": "What do you mean by \"served\"?",
    "help": "In a divorce case, you must have someone personally deliver the %%[Initiating papers TE]%% to %%[Defendant current name TE]%%. You can't personally deliver these papers to %%[Defendant current name TE]%%",
    "step": 0,
    "fields": [
      {
        "name": "Summons served DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A05a.3i-Service after filing"
      }
    ]
  },
  "A07c-After 20 or 30 days": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A08a-Affirmation of service"
      }
    ],
    "codeBefore": "SET [Case calendaring DA] TO DATE([Summons served DA]+40)\n\nIF  ([Case calendaring DA])&gt;=(TODAY) \n SET [Step 2 file date TE] TO \"You can file these papers with the court after \" + %%DATE([Case calendaring DA])%% + \".\"\nELSE\n SET [Step 2 file date TE] TO \"You can file these papers with the court at any time.\"\nEND IF"
  },
  "A03c-Filing date": {
    "step": 0,
    "fields": [
      {
        "name": "Summons filed DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A03d-Filing date and purchase date"
      }
    ],
    "codeAfter": "SET [Summons served by DA] TO DATE([Summons filed DA]+120)"
  },
  "01c-Previous user": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "01d-Saved answers"
      },
      {
        "label": "No",
        "next": "02a.1-Instructions for filing"
      }
    ],
    "codeBefore": "IF [Part A filed TF] = false \n GOTO \"02a.1-Instructions for filing\"\nEND IF"
  },
  "05a-Three steps": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "05b-Part A"
      }
    ]
  },
  "05d-Part B": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "05e-Part B continue"
      }
    ]
  },
  "05f-Part B continue": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "06a-Court fees"
      }
    ]
  },
  "01d-Saved answers": {
    "learn": "What do you mean?",
    "help": "When you used this form before to make your papers, you had the option to \"Create an Account\". If you remember doing this and click \"Yes\", you will exit this form so that you can log on and use the answers from the last time you were here. If you did not sign up or don't remember, click \"No / Don't know\".",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "01e-Exit for saved answers"
      },
      {
        "label": "No / Don't know",
        "next": "02a.1-Instructions for filing"
      }
    ]
  },
  "01e-Exit for saved answers": {
    "learn": "How do I find my saved answers?",
    "help": "After logging in, scroll down to your \"Saved Answers\" and click on the file name from your last visit.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      },
      {
        "label": "Continue",
        "next": "02a.1-Instructions for filing"
      }
    ]
  },
  "A05b.1-More than 120 days": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A05b.2-More than 120 days"
      }
    ],
    "codeBefore": "IF [Summons served by DA]&gt;[Summons served DA] \n SET [Summons extended TF] TO false\n GOTO \"A06a-Personally delivery\"\nEND IF",
    "codeAfter": "IF [Step 1 completed TF] = true \n GOTO \"A05b.2-More than 120 days\"\nEND IF"
  },
  "A09a-Index number": {
    "learn": "What is an index number?",
    "help": "The index number is the number used to identify your divorce case in court. An index number was obtained from the court when filing the %%[Initiating papers TE]%%.",
    "step": 0,
    "fields": [
      {
        "name": "Index number TE",
        "type": "text",
        "label": "Index #:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A10-FORWARDING STEP"
      }
    ]
  },
  "01b-Case started": {
    "learn": "What do you mean?",
    "help": "This means an index number was already obtained from the court ($210), or a fee waiver was approved, and a Summons With Notice or a Summons and Verified Complaint.",
    "step": 0,
    "fields": [
      {
        "name": "Part A filed TF",
        "type": "radio",
        "label": "Yes, I have an index number.",
        "required": true,
        "value": "true"
      },
      {
        "name": "Part A filed TF",
        "type": "radio",
        "label": "No, I don't have an index number.",
        "required": true,
        "value": "false"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "01c-Previous user"
      }
    ],
    "codeBefore": "IF [Step 1 completed TF] = true \n SET [Part A filed TF] TO NULL\nEND IF",
    "codeAfter": "IF [Part A filed TF] = true AND [Step 1 completed TF] = true \n GOTO \"A03c-Filing date\"\nEND IF"
  },
  "07b.1-Plaintiff name": {
    "learn": "How is my gender used?",
    "help": "Your gender is not used in the generated forms, but it is used in the printed instructions.",
    "step": 0,
    "fields": [
      {
        "name": "Plaintiff name first TE",
        "type": "text",
        "label": "First:",
        "required": true
      },
      {
        "name": "Plaintiff name middle TE",
        "type": "text",
        "label": "Middle:",
        "required": false
      },
      {
        "name": "Plaintiff name last TE",
        "type": "text",
        "label": "Last:",
        "required": true
      },
      {
        "name": "Plaintiff suffix MC",
        "type": "textpick",
        "label": "Suffix:",
        "required": false
      },
      {
        "name": "Plaintiff gender",
        "type": "gender",
        "label": "Pick one:",
        "required": true,
        "listData": "<OPTION VALUE=\"Jr.\">Jr.</OPTION><OPTION VALUE=\"Sr.\">Sr.</OPTION><OPTION VALUE=\"II\">II</OPTION><OPTION VALUE=\"III\">III</OPTION><OPTION VALUE=\"IV\">IV</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07c.1-Plaintiff name change"
      }
    ],
    "codeBefore": "IF NOT (HASANSWERED([Plaintiff name first TE]))\nIF HASANSWERED([Brodsky client first name TE])\nSET [Plaintiff name first TE] TO [Brodsky client first name TE]\nEND IF\nEND IF\nIF NOT (HASANSWERED([Plaintiff name last TE]))\nIF HASANSWERED([Brodsky client last name TE])\nSET [Plaintiff name last TE] TO [Brodsky client last name TE]\nEND IF\nEND IF",
    "codeAfter": "IF NOT (HASANSWERED([Plaintiff name middle TE])) \n SET [Plaintiff name middle TE] TO NULL\nEND IF\n\nIF  [Plaintiff gender] = \"Male\" \nELSE\nEND IF"
  },
  "06b-Useful information": {
    "learn": "What if I don't have a copy of my marriage certificate?",
    "help": "You do not need a copy of your marriage certificate to answer the questions in this form or when you file for a divorce with the court. But, there is information in the certificate that can help when you answer the following questions.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a.1-Parties names"
      }
    ]
  },
  "12a.1-Ancillary relief": {
    "step": 1,
    "fields": [],
    "buttons": [],
    "codeBefore": "IF [Part A filed TF] = true \n GOTO \"12a.3-Other relief\"\nELSE\n GOTO \"12c.1-Plaintiff prior surnames\"\nEND IF"
  },
  "04c.2-Previous application": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit pending case TF] TO true"
  },
  "02b-Defendant 2 years residency": {
    "learn": "What do you mean?",
    "help": "This means that %%[Defendant current name TE]%% is living in New York State right now and has lived in New York State and in no other state or country for at least two years.\nFor example, if the papers were filed with the court on %%DATE(TODAY)%%, %%[Defendant current name TE]%% has lived in New York State since %%DATE(TODAY-730)%%.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06a-Grounds for divorce",
        "name": "Residency based on MC",
        "value": "defendant"
      },
      {
        "label": "No",
        "next": "03a-Plaintiff 1 year residency"
      }
    ]
  },
  "03b-Defendant 1 year residency": {
    "learn": "What do you mean?",
    "help": "This means that %%[Defendant current name TE]%% is living in New York State right now and has lived in New York State for at least 1 year and in no other state or country during that year.\nFor example, if the papers were filed with the court on %%DATE(TODAY)%%, %%[Defendant current name TE]%% has lived in New York State since %%DATE(TODAY-365)%%.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04a-Married in NY",
        "name": "Residency based on MC",
        "value": "defendant"
      },
      {
        "label": "No",
        "next": "05a-Cause of action in NY"
      }
    ]
  },
  "05b-Current residents": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06a-Grounds for divorce",
        "name": "Residency based on MC",
        "value": "both"
      },
      {
        "label": "No",
        "next": "05c-Residency exit"
      }
    ]
  },
  "01-About Plaintiff and Defendant": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a.1-Parties names"
      }
    ]
  },
  "12a-Marriage date": {
    "step": 2,
    "fields": [
      {
        "name": "Marriage date DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13a-Marriage place"
      }
    ],
    "codeAfter": "IF [Part A filed TF] = true \n SET [Print date warning TF] TO false\n GOTO \"13a-Marriage place\"\nEND IF\n\nIF (TODAY - [Marriage date DA]) > 180 \n SET [Print date warning TF] TO false\n GOTO \"13a-Marriage place\"\nELSE\n SET [Print date warning TF] TO true\n SET [Married 6 months DA] TO DATE([Marriage date DA] + 180)\n GOTO \"13a-Marriage place\"\nEND IF"
  },
  "13a-Marriage place": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "13b-Married in US",
        "name": "Married abroad TF",
        "value": "false"
      },
      {
        "label": "No",
        "next": "13c-Married abroad",
        "name": "Married abroad TF",
        "value": "true"
      }
    ]
  },
  "13b-Married in US": {
    "step": 2,
    "fields": [
      {
        "name": "Marriage city TE",
        "type": "text",
        "label": "City/Town:",
        "required": true
      },
      {
        "name": "Marriage county TE",
        "type": "text",
        "label": "County:",
        "required": false
      },
      {
        "name": "Marriage state MC",
        "type": "textpick",
        "label": "State:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "14a-Married by clergy"
      }
    ]
  },
  "13c-Married abroad": {
    "step": 2,
    "fields": [
      {
        "name": "Marriage city TE",
        "type": "text",
        "label": "City/Town:",
        "required": true
      },
      {
        "name": "Marriage country TE",
        "type": "text",
        "label": "Country:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "14a-Married by clergy"
      }
    ]
  },
  "14a-Married by clergy": {
    "learn": "What do you mean?",
    "help": "A civil marriage ceremony is performed by a government official or a person who is not associated with a religion.\nA religious marriage ceremony is performed by a member of the clergy. Clergy refers to persons ordained in a religion. For example, priests, ministers, rabbis, imams, or a leader of the Society for Ethical Culture.\nIf you are not sure, click 'Yes.'",
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "14b-Defendant's remarriage",
        "name": "Married by clergy TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "15-FORWARDING STEP",
        "name": "Married by clergy TF",
        "value": "false"
      }
    ]
  },
  "14b-Defendant's remarriage": {
    "learn": "Why do I have to do this?",
    "help": "In New York State, this rule protects the person you're divorcing in case their religion requires any extra, non-legal steps to end the marriage in the eyes of that religion.",
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "I agree",
        "next": "15-FORWARDING STEP"
      }
    ],
    "codeAfter": "IF  [Part A filed TF] = true \n GOTO \"B01a.1-Part B Finished\"\nELSE\n GOTO \"A01a-Part A Finished\"\nEND IF"
  },
  "02a-Plaintiff's address": {
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff address line1 TE",
        "type": "text",
        "label": "Street:",
        "required": true
      },
      {
        "name": "Plaintiff address line2 TE",
        "type": "text",
        "label": "Apt.:",
        "required": false
      },
      {
        "name": "Plaintiff city TE",
        "type": "text",
        "label": "City:",
        "required": true
      },
      {
        "name": "Plaintiff state MC",
        "type": "textpick",
        "label": "State:",
        "required": true,
        "value": "NY"
      },
      {
        "name": "Plaintiff postal code TE",
        "type": "text",
        "label": "Zip code:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "02h.1-Marital home"
      }
    ],
    "codeBefore": "IF [Plaintiff in prison TF] = true \n GOTO \"02c-Plaintiff's prison address\"\nEND IF",
    "codeAfter": "IF NOT (HASANSWERED([Plaintiff address line2 TE])) \n SET [Plaintiff address line2 TE] TO NULL\nEND IF"
  },
  "06a-Defendant's address": {
    "step": 2,
    "fields": [
      {
        "name": "Defendant address line1 TE",
        "type": "text",
        "label": "Street:",
        "required": true
      },
      {
        "name": "Defendant address line2 TE",
        "type": "text",
        "label": "Apt:",
        "required": false
      },
      {
        "name": "Defendant city TE",
        "type": "text",
        "label": "City:",
        "required": true
      },
      {
        "name": "Defendant state MC",
        "type": "textpick",
        "label": "State:",
        "required": true,
        "value": "NY"
      },
      {
        "name": "Defendant postal code TE",
        "type": "numberzip",
        "label": "Zip code:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "06h.1-Marital home"
      }
    ],
    "codeBefore": "IF [Defendant in prison TF] = true \n GOTO \"06c-Defendant's prison address\"\nEND IF",
    "codeAfter": "IF NOT (HASANSWERED([Defendant address line2 TE])) \n SET [Defendant address line2 TE] TO NULL\nEND IF"
  },
  "03a-Domestic violence": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "03b-Order of protection"
      },
      {
        "label": "Exit",
        "next": "C00-EXIT forwardingstep",
        "name": "Exit DV issue TF",
        "value": "true"
      }
    ]
  },
  "04b-Plaintiff SSN": {
    "learn": "Why do you need this?",
    "help": "Your social security number is required for the Findings and Conclusions form of your divorce papers. Depending on the county, the full social security number is printed on the form or the last four digits are printed on the form. For more information, go to https://www.nycourts.gov/courthelp/GoingToCourt/redaction.shtml",
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff SSN TE",
        "type": "numberssn",
        "label": "SSN:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "05-Public assistance"
      }
    ]
  },
  "07b.1-Defendant's SSN": {
    "learn": "Why do you need this?",
    "help": "The social security number is required for the Findings and Conclusions form of your divorce papers. Depending on the county, the full social security number is printed on the form or the last four digits are printed on the form. For more information, go to https://www.nycourts.gov/courthelp/GoingToCourt/redaction.shtml",
    "step": 2,
    "fields": [
      {
        "name": "Defendant SSN TE",
        "type": "numberssn",
        "label": "SSN:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "06a-Defendant's address"
      }
    ]
  },
  "06a-Grounds for divorce": {
    "learn": "Are there other \"grounds\" for divorce?",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "06b-Define no fault"
      }
    ],
    "codeBefore": "SET [Grounds for divorce MC] TO \"no fault\""
  },
  "06c-Six months' breakdown": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06e-Must agree"
      },
      {
        "label": "No",
        "next": "06d-Not six months"
      }
    ]
  },
  "06b-Define no fault": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "06c-Six months' breakdown"
      }
    ]
  },
  "15-FORWARDING STEP": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "IF  [Part A filed TF] = true \n GOTO \"B01a.1-Part B Finished\"\nELSE\n GOTO \"A01a-Part A Finished\"\nEND IF",
    "codeAfter": "IF  [Part A filed TF] = true \n GOTO \"B01a.1-Part B Finished\"\nELSE\n GOTO \"A01a-Part A Finished\"\nEND IF"
  },
  "05c-Residency exit": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit residency TF] TO true"
  },
  "08e.1-Defendant military": {
    "learn": "What do you mean by \"active duty\"?",
    "help": "The term “active duty” means full-time duty in the active military service of the United States (Army, Navy, Air Force, Marine Corps or Coast Guard) or the state of New York or any other state.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "08e.3-Defendant military",
        "name": "Defendant in military TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "08f.1-Defendant in prison",
        "name": "Defendant in military TF",
        "value": "false"
      }
    ]
  },
  "08e.3-Defendant military": {
    "learn": "What is the Affirmation of Defendant?",
    "help": "This is a sworn statement where the Defendant agrees to the divorce and does not contest (argue) anything you are asking for.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "08f.1-Defendant in prison"
      },
      {
        "label": "No / Not sure",
        "next": "08e.4-Defendant military exit"
      }
    ],
    "codeBefore": "IF [Part A filed TF] = true \n GOTO \"08f.1-Defendant in prison\"\nEND IF"
  },
  "12c.1-Plaintiff prior surnames": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "12c.2-Plaintiff prior surname",
        "name": "Plaintiff has prior surname TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "12d.1-Defendant prior surnames",
        "name": "Plaintiff has prior surname TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Plaintiff has prior surname TF] = true \n SET [Ancillary relief sought TF] TO true\nEND IF"
  },
  "12d.1-Defendant prior surnames": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "12d.2-Defendant prior surnames",
        "name": "Defendant has prior surname TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "13a-HIDDEN SECTION: Spousal support  - IGNORE 13",
        "name": "Defendant has prior surname TF",
        "value": "false"
      }
    ]
  },
  "12d.2-Defendant prior surnames": {
    "help": "Tell the clerk when you file your papers.",
    "step": 1,
    "fields": [
      {
        "name": "Defendant prior surname1 TE",
        "type": "text",
        "label": "1.",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13a-HIDDEN SECTION: Spousal support  - IGNORE 13"
      }
    ]
  },
  "12c.2-Plaintiff prior surname": {
    "help": "Tell the clerk when you file your papers.",
    "step": 1,
    "fields": [
      {
        "name": "Plaintiff prior surname1 TE",
        "type": "text",
        "label": "1.",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "12d.1-Defendant prior surnames"
      }
    ]
  },
  "06a-Court fees": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "06b-Useful information"
      }
    ],
    "codeBefore": "IF [Part A filed TF] = true \n GOTO \"06c-Useful information returning\"\nEND IF"
  },
  "04a.2-Age of parties exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit age TF] TO true"
  },
  "18a-Jurisdiction": {
    "learn": "Where can I file for divorce?",
    "help": "You have 2 choices:\n1. the county where you live\n2. the county where %%[Defendant current name TE]%% lives",
    "step": 1,
    "fields": [
      {
        "name": "Jurisdiction county MC",
        "type": "textpick",
        "label": "County:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "18b-Jurisdiction"
      }
    ]
  },
  "18b-Jurisdiction": {
    "step": 1,
    "fields": [
      {
        "name": "Venue basis MC",
        "type": "radio",
        "label": "I live in %%[Jurisdiction county MC]%% County.",
        "required": true,
        "value": "plaintiff",
        "groupLabel": ""
      },
      {
        "name": "Venue basis MC",
        "type": "radio",
        "label": "Only %%[Defendant current name TE]%% lives in %%[Jurisdiction county MC]%% County.",
        "required": true,
        "value": "defendant"
      },
      {
        "name": "Venue basis MC",
        "type": "radio",
        "label": "We both live in %%[Jurisdiction county MC]%% County.",
        "required": true,
        "value": "both"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "19a-Initiating papers",
        "name": "Jurisdiction CPLR 509 TF",
        "value": "false"
      }
    ],
    "codeBefore": "SET [Jurisdiction county TE] TO %%[Jurisdiction county MC]%%"
  },
  "03a-Plaintiff's phone": {
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff phone TE",
        "type": "numberphone",
        "label": "Phone:",
        "required": true
      },
      {
        "name": "Plaintiff email address TE",
        "type": "text",
        "label": "Email:",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "04a-Plaintiff's SSN"
      }
    ],
    "codeAfter": "SET [Plaintiff has phone TF] TO true"
  },
  "08b-Defendant's phone": {
    "learn": "Email address",
    "help": "Leave your spouse's email address blank if you do not know it.",
    "step": 2,
    "fields": [
      {
        "name": "Defendant phone TE",
        "type": "numberphone",
        "label": "Phone:",
        "required": true
      },
      {
        "name": "Defendant email address TE",
        "type": "text",
        "label": "Email:",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-02-Employment military"
      }
    ]
  },
  "05b-Part A": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "05c.1-Part A continue"
      }
    ]
  },
  "A06a-Personally delivery": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A06c-Who served"
      },
      {
        "label": "No",
        "next": "A06b-Not personally served"
      }
    ]
  },
  "A06c-Who served": {
    "step": 0,
    "fields": [
      {
        "name": "Summons served by MC",
        "type": "radio",
        "label": "I personally delivered the papers",
        "required": true,
        "value": "plaintiff"
      },
      {
        "name": "Summons served by MC",
        "type": "radio",
        "label": "Someone else personally delivered the papers",
        "required": true,
        "value": "third party"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A06d-Service error"
      }
    ]
  },
  "A06d-Service error": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ],
    "codeBefore": "IF NOT ([Summons served by MC] = \"plaintiff\") \n GOTO \"A06e.1-Photo attached\"\nEND IF"
  },
  "05c.1-Part A continue": {
    "learn": "What do you mean by \"properly delivered\"?",
    "help": "The court papers must be properly delivered to or \"served on\" the Defendant. The Summons With Notice or the Summons and Complaint must be personally delivered to the Defendant by someone, but not you.\nThe person who personally delivered the papers to the Defendant must be at least 18 years old. This person must fill out an Affirmation of Service which is written proof that the papers were delivered to the Defendant.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "05c.2-Part A continue"
      }
    ]
  },
  "05e-Part B continue": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "05f-Part B continue"
      }
    ]
  },
  "19a-Initiating papers": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "19b-Initiating papers"
      }
    ],
    "codeBefore": "IF  [Jurisdiction county MC] = \"Bronx\" or [Jurisdiction county MC] = \"Clinton\" or [Jurisdiction county MC] = \"Delaware\" or [Jurisdiction county MC] = \"New York\" or [Jurisdiction county MC] = \"Suffolk\" \n SET [Initiating papers MC] TO \"notice\"\n SET [Initiating papers TE] TO \"Summons With Notice\"\nELSE\n SET [Initiating papers MC] TO \"complaint\"\n SET [Initiating papers TE] TO \"Summons and Complaint\"\nEND IF\n\nSET [Brodsky after children route MC] TO \"about\"\n GOTO \"BL-01-Children information\""
  },
  "19b-Initiating papers": {
    "step": 1,
    "fields": [
      {
        "name": "Initiating papers MC",
        "type": "radio",
        "label": "Summons and Verified Complaint",
        "required": true,
        "value": "complaint"
      },
      {
        "name": "Initiating papers MC",
        "type": "radio",
        "label": "Summons With Notice",
        "required": true,
        "value": "notice"
      },
      {
        "name": "Initiating papers MC",
        "type": "radio",
        "label": "I'm not sure.",
        "required": true,
        "value": "complaint"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-01-Children information"
      }
    ],
    "codeAfter": "SET [Brodsky after children route MC] TO \"about\"\nIF [Initiating papers MC] = \"notice\" \n SET [Initiating papers TE] TO \"Summons With Notice\"\nEND IF\n\nIF [Initiating papers MC] = \"complaint\" \n SET [Initiating papers TE] TO \"Summons and Complaint\"\nEND IF"
  },
  "07a-Defendant's SSN": {
    "learn": "Why do you need this?",
    "help": "The social security number is required for the Findings and Conclusions form of your divorce papers. Depending on the county, the full social security number is printed on the form or the last four digits are printed on the form. For more information, go to https://www.nycourts.gov/courthelp/GoingToCourt/redaction.shtml",
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "07b.1-Defendant's SSN",
        "name": "Defendant SSN known TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "07c-Defendant's SSN unknown",
        "name": "Defendant SSN known TF",
        "value": "false"
      }
    ]
  },
  "07c-Defendant's SSN unknown": {
    "step": 2,
    "fields": [
      {
        "name": "Defendant SSN is unknown MC",
        "type": "radio",
        "label": "I don't know where my spouse is",
        "required": true,
        "value": "unlocatable",
        "groupLabel": ""
      },
      {
        "name": "Defendant SSN is unknown MC",
        "type": "radio",
        "label": "I asked my spouse for his or her social security number, but he or she refused.",
        "required": true,
        "value": "refused"
      },
      {
        "name": "Defendant SSN is unknown MC",
        "type": "radio",
        "label": "My spouse does not have a social security number.",
        "required": true,
        "value": "none"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "06a-Defendant's address"
      }
    ]
  },
  "08a-Defendant's phone number": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "08b-Defendant's phone",
        "name": "Defendant has phone TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "BL-02-Employment military",
        "name": "Defendant has phone TF",
        "value": "false"
      }
    ]
  },
  "09-FORWARDING STEP": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "IF  [Part A filed TF] = true \n GOTO \"A02-Initiating papers user\"\nEND IF\n\nIF HASANSWERED([Residency based on MC])\n GOTO \"02a-Plaintiff's address\"\nEND IF\n\nGOTO \"02a-Plaintiff 2 years residency\""
  },
  "A02-Initiating papers user": {
    "learn": "How can I tell what I filed?",
    "help": "Summons With Notice says \"SUMMONS WITH NOTICE\" at the top of the page.\nSummons and Complaint are two separate documents. The summons has \"SUMMONS\" at the top of the page and is usually one page long. The complaint has \"VERIFIED COMPLAINT\" at the top of the page and can be several pages long.",
    "step": 0,
    "fields": [
      {
        "name": "Initiating papers MC",
        "type": "radio",
        "label": "Summons With Notice",
        "required": true,
        "value": "notice"
      },
      {
        "name": "Initiating papers MC",
        "type": "radio",
        "label": "Summons and Complaint",
        "required": true,
        "value": "complaint"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A03a-Has index number"
      }
    ],
    "codeBefore": "IF NOT ([Initiating papers MC] = NULL) \n GOTO \"A03a-Has index number\"\nEND IF",
    "codeAfter": "IF [Initiating papers MC] = \"notice\" \n SET [Initiating papers TE] TO \"Summons With Notice\"\nEND IF\n\nIF [Initiating papers MC] = \"complaint\" \n SET [Initiating papers TE] TO \"Summons and Complaint\"\nEND IF"
  },
  "A06e.1-Photo attached": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A06e.2-Photo attached",
        "name": "Service with photo TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "A06f-LOGIC WINDOW",
        "name": "Service with photo TF",
        "value": "false"
      }
    ],
    "codeBefore": "IF  [Defendant gender] = \"Male\" \nELSE\nEND IF"
  },
  "A06e.2-Photo attached": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A06f-LOGIC WINDOW"
      }
    ]
  },
  "02g-No fault divorce": {
    "learn": "What happens if the Defendant does not agree to the divorce?",
    "help": "If the Defendant does not agree to the divorce it is a contested divorce and this form is not for you. this form may not be for you.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "03-LOGIC EXIT TF"
      }
    ]
  },
  "A07a-Service in New York": {
    "learn": "Why does this matter?",
    "help": "If %%[Defendant current name TE]%% was served in New York State, %%HESHE([Defendant gender])%% has 20 days to respond to the %%[Initiating papers TE]%%. If %%[Defendant current name TE]%% was served outside of New York State, then %%HESHE([Defendant gender])%% has 30 days to respond to the %%[Initiating papers TE]%%.",
    "step": 0,
    "fields": [
      {
        "name": "Service location MC",
        "type": "radio",
        "label": "In New York State",
        "required": true,
        "value": "within"
      },
      {
        "name": "Service location MC",
        "type": "radio",
        "label": "Outside of New York State",
        "required": true,
        "value": "outside"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A07b.1-Before 20 or 30 days"
      }
    ],
    "codeBefore": "IF  [Defendant gender] = \"Male\" \n SET [him/her Defendant TE] TO \"him\"\nELSE\n SET [him/her Defendant TE] TO \"her\"\nEND IF",
    "codeAfter": "IF  [Service location MC] = \"within\" \n SET [20/30 days TE] TO \"20 days\"\n SET [Defendant answer by DA] TO DATE([Summons served DA]+20)\nELSE\n SET [20/30 days TE] TO \"30 days\"\n SET [Defendant answer by DA] TO DATE([Summons served DA]+30)\nEND IF"
  },
  "A07b.1-Before 20 or 30 days": {
    "learn": "What is a notice of appearance?",
    "help": "If %%[Defendant current name TE]%% doesn't want a divorce or does not agree to something that you asked for, %%HESHE([Defendant gender])%% or %%HISHER([Defendant gender])%% lawyer will file a notice of appearance with the Court. This is a paper that tells the Court that %%[Defendant current name TE]%% wants to speak up about the divorce case.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A07d-Contested divorce",
        "name": "Defendant in default TF",
        "value": "false"
      },
      {
        "label": "No",
        "next": "A07b.2-Before 20 or 30 days",
        "name": "Defendant in default TF",
        "value": "true"
      }
    ],
    "codeBefore": "IF ([Defendant answer by DA])&lt;(TODAY) \n GOTO \"A07c-After 20 or 30 days\"\nEND IF",
    "codeAfter": "IF [Defendant in default TF] = true \n SET [Defendant appearance MC] TO \"default\"\nEND IF"
  },
  "06e-Must agree": {
    "learn": "How are these issues \"settled\"?",
    "help": "These issues can be settled by you and your spouse in the standard divorce papers filed with the court, in a separate written Settlement Agreement or Stipulation, or by the judge assigned to your case.\nThese issues can also be settled by \"waiver.\" This means that neither you nor your spouse are contesting (arguing) these issues.\nWaiver is done by (1) your spouse signing and returning the Affirmation of Defendant to you or (2) your spouse defaulting by not timely answering the Summons.\n\nMarital property is anything earned or acquired during your marriage (pension, real estate, bank accounts, retirement accounts, cars, debt, etc.). It does not matter if you own it together or alone.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a-Written agreement"
      }
    ]
  },
  "13a-HIDDEN SECTION: Spousal support  - IGNORE 13": {
    "learn": "What is spousal support?",
    "help": "Spousal support is money that one spouse must pay to the other spouse while they are married. A spousal support order ends when you get divorced.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "13b-Continue order"
      },
      {
        "label": "No",
        "next": "14a-Order of protection",
        "name": "Spousal support continue TF",
        "value": "false"
      }
    ],
    "codeBefore": "SET [Spousal support continue TF] TO false\nGOTO \"14a-Order of protection\""
  },
  "04f.7-ADR exit": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04f.8-ADR exit"
      }
    ]
  },
  "04a-Plaintiff's SSN": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04b-Plaintiff SSN",
        "name": "Plaintiff has SSN TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "05-Public assistance",
        "name": "Plaintiff has SSN TF",
        "value": "false"
      }
    ]
  },
  "10b-Defendant not in military": {
    "learn": "What is the SCRA website?",
    "help": "The Department of Defense's Servicemembers Civil Relief Act (SCRA) website lets you search if someone is serving in the military. If you know %%[Defendant current name TE]%%'s social security number or birth date, you can use this website.\n1. Go to the SCRA website, https://www.dmdc.osd.mil/appj/scra/scraHome.do\n2. Select \"Single Record Request\"\n3. Enter %%[Defendant current name TE]%%'s last name and social security or %%HISHER([Defendant gender])%% last name and date of birth.\n4. A \"Status Report\" will open or download onto your computer. Open the pdf file and print.\n5. Include the \"Status Report\" with your papers when you file.",
    "step": 2,
    "fields": [
      {
        "name": "Defendant not in military MC",
        "type": "radio",
        "label": "I looked up %%[Defendant current name TE]%% on the SCRA website.",
        "required": true,
        "value": "SCRA"
      },
      {
        "name": "Defendant not in military MC",
        "type": "radio",
        "label": "%%[Defendant current name TE]%% told me so within the past 30 days (must give the date %%HESHE([Defendant gender])%% told you).",
        "required": true,
        "value": "asked"
      },
      {
        "name": "Defendant not in military MC",
        "type": "radio",
        "label": "I never asked but the person who personally delivered the papers to %%[Defendant current name TE]%% asked.",
        "required": true,
        "value": "service"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "10c-Defendant non-military"
      }
    ],
    "codeBefore": "IF [Defendant signed affidavit TF] = true \n SET [Defendant not in military MC] TO \"affidavit\"\n GOTO \"12a-Marriage date\"\nEND IF\n\nIF [Part A filed TF] = false \n GOTO \"12a-Marriage date\"\nEND IF"
  },
  "08e.4-Defendant military exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit military TF] TO true"
  },
  "10c-Defendant non-military": {
    "step": 2,
    "fields": [
      {
        "name": "Defendant not military DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "12a-Marriage date"
      }
    ],
    "codeBefore": "IF NOT ([Defendant not in military MC] = \"asked\") \n GOTO \"12a-Marriage date\"\nEND IF"
  },
  "04f.8-ADR exit": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04f.9-ADR exit"
      }
    ]
  },
  "04f.9-ADR exit": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04f.10-ADR exit"
      }
    ]
  },
  "04f.3-Any marital property": {
    "learn": "What is marital property?",
    "help": "Marital property is anything that was earned or acquired during your marriage. It does not matter if you own it together or alone. This includes physical property such as furniture and property such as bank accounts and credit cards.\nExamples of marital property: pension, annuity, real estate like a house, condo or co-op, retirement account, joint bank account, car, boat, etc.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04f.4-Have marital property",
        "name": "Parties have property TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04g.1-Retirement accounts",
        "name": "Parties have property TF",
        "value": "false"
      }
    ]
  },
  "04a.1-Age of parties": {
    "learn": "What if one or both of us are under 18 years old?",
    "help": "If either or both of you are under 18 years old, this form is not for you. Contact the Supreme Court Clerk's Office for more information.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04a.3-How many children"
      },
      {
        "label": "No",
        "next": "04a.2-Age of parties exit"
      }
    ]
  },
  "09a-Explain no marital property": {
    "learn": "What is marital property?",
    "help": "Marital property is anything earned or acquired during your marriage. Examples: pension, real estate, bank accounts, retirement accounts, cars, debt, etc.",
    "step": 1,
    "fields": [
      {
        "name": "Marital property none MC",
        "type": "radio",
        "label": "No marital property to include in divorce.",
        "required": true,
        "value": "none",
        "groupLabel": ""
      },
      {
        "name": "Marital property none MC",
        "type": "radio",
        "label": "We have marital property that needs to be divided in a writing. (This will add a cost for a property settlement agreement.)",
        "required": true,
        "value": "have_property"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "12a.1-Ancillary relief"
      }
    ],
    "codeBefore": "IF [Parties have agreement TF] = true \n GOTO \"12a.1-Ancillary relief\"\nEND IF\n\nIF [Parties have property TF] = true \n GOTO \"12a.1-Ancillary relief\"\nEND IF",
    "codeAfter": "IF [Marital property none MC] = \"have_property\" \n GOTO \"12a.1-Ancillary relief\"\nEND IF"
  },
  "07c-Date of written agreement": {
    "learn": "Which date do you mean?",
    "help": "Type in the date it was notarized.",
    "step": 1,
    "fields": [
      {
        "name": "Agreement signed DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07d-Drafter"
      }
    ]
  },
  "06d-Not six months": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "06e-Must agree"
      },
      {
        "label": "Exit",
        "next": "C00-EXIT forwardingstep",
        "name": "Exit 6 months TF",
        "value": "true"
      }
    ]
  },
  "04c.1-Previous application": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04c.2-Previous application"
      },
      {
        "label": "No",
        "next": "04d.1-Defendant's whereabouts"
      }
    ]
  },
  "A07d-Contested divorce": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ]
  },
  "07b-Get agreement.": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07c-Date of written agreement"
      }
    ]
  },
  "A08a-Affirmation of service": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A08b-Verified Complaint",
        "name": "Print affidavit of service TF",
        "value": "false"
      },
      {
        "label": "No",
        "next": "A09a-Index number",
        "name": "Print affidavit of service TF",
        "value": "true"
      }
    ]
  },
  "A07b.2-Before 20 or 30 days": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A07b.3-Before 20 or 30 days"
      }
    ]
  },
  "A07b.3-Before 20 or 30 days": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      },
      {
        "label": "Continue",
        "next": "A08a-Affirmation of service"
      }
    ],
    "codeAfter": "SET [Case calendaring DA] TO DATE([Summons served DA]+40)"
  },
  "A10-FORWARDING STEP": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "IF [Step 1 completed TF] = true \n GOTO \"B01a.1-Part B Finished\"\nEND IF\n\nGOTO \"A11a-Jurisdiction\""
  },
  "B01a.1-Part B Finished": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.2-Contempt of Court"
      }
    ],
    "codeAfter": "SET [Print Step 1 TF] TO false\nSET [Print Step 2 TF] TO true\nSET [Print exit sheet TF] TO false\nSET [Step 2 completed TF] TO true\nSET [Step 1 completed TF] TO true\nSET [A2J interview name TE] TO \"Divorce Part B: Calendaring\""
  },
  "01a-Two-part program": {
    "learn": "Who is this form for?",
    "help": "If your case is too complicated, this form may not be for you.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "01b-Case started"
      }
    ]
  },
  "A06b-Not personally served": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ]
  },
  "A05b.2-More than 120 days": {
    "learn": "What do you mean?",
    "help": "You have 120 days to serve %%[Defendant current name TE]%% with the papers. If you need more time, you can get an \"Ex-Parte Order to Extend Time to Serve\".",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A05b.4-Extend time to serve"
      },
      {
        "label": "No",
        "next": "A05b.7-More than 120 days Exit"
      }
    ]
  },
  "A04a-Affirmation of defendant": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04b-Waiver signed"
      },
      {
        "label": "No",
        "next": "A05a.1-Service",
        "name": "Defendant signed affidavit TF",
        "value": "false"
      }
    ],
    "codeBefore": "IF [Defendant has new name TF] \n SET [Defendant current name TE] TO [Defendant new name first TE]\nEND IF\n\nIF [Defendant has new name TF] = false or [Defendant has new name TF] = NULL \n SET [Defendant current name TE] TO [Defendant name first TE]\nEND IF",
    "codeAfter": "IF  [Defendant signed affidavit TF] = false \n SET [Defendant appearance MC] TO \"default\"\nELSE\n SET [Summons extended TF] TO false\nEND IF"
  },
  "A05a.1-Service": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A05a.2i-Date of service"
      },
      {
        "label": "No",
        "next": "A05a.5-Not yet served"
      }
    ]
  },
  "A04c-Affirmation of Defendant": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A05a.5-Not yet served"
      }
    ],
    "codeBefore": "IF [Summons served by DA]&lt;TODAY \n GOTO \"A05a.1-Service\"\nEND IF"
  },
  "A05a.5-Not yet served": {
    "learn": "What do you mean by \"served on\"?",
    "help": "In a divorce case, you must have someone else personally deliver (\"serve on\") the %%[Initiating papers TE]%% to %%[Defendant current name TE]%%. You can't personally deliver these papers to %%[Defendant current name TE]%% yourself. If %%[Defendant current name TE]%% is served in New York, then the person who serves the papers must be a resident of New York State and over 18 years old.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ]
  },
  "A03a-Has index number": {
    "learn": "What do you mean?",
    "help": "This means an index number was already obtained from the court ($210), or a fee waiver was approved, and a Summons With Notice or a Summons and Verified Complaint.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A03c-Filing date"
      },
      {
        "label": "No",
        "next": "A03b.1-Part A but no index number"
      }
    ]
  },
  "A03b.1-Part A but no index number": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A01b-Print Part A again"
      },
      {
        "label": "No / Exit",
        "next": "FAIL"
      }
    ],
    "codeBefore": "IF [Step 1 completed TF] = false \n GOTO \"A03b.2-No index number\"\nEND IF"
  },
  "A03d-Filing date and purchase date": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A03f.1-Filed with fee waiver",
        "name": "Bought and filed same day TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "A03e.1-Purchase date"
      }
    ],
    "codeAfter": "IF [Bought and filed same day TF] = true \n SET [Index purchase DA] TO DATE([Summons filed DA])\nEND IF"
  },
  "A03e.1-Purchase date": {
    "step": 0,
    "fields": [
      {
        "name": "Index purchase DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A03f.1-Filed with fee waiver"
      }
    ]
  },
  "10a-Defendant in military": {
    "learn": "What do you mean by \"service branch\"?",
    "help": "There are five military branches of the United States: Army, Air Force, Navy, Marine Corps and Coast Guard.\nReservists and members of the National Guard are also included when in active federal service.",
    "step": 2,
    "fields": [
      {
        "name": "Defendant military branch TE",
        "type": "text",
        "label": "Branch:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "12a-Marriage date"
      }
    ],
    "codeBefore": "IF HASANSWERED([Brodsky defendant military TF])\n SET [Defendant in military TF] TO [Brodsky defendant military TF]\nEND IF\nIF [Brodsky defendant military TF] = false \n GOTO \"10b-Defendant not in military\"\nEND IF\nIF [Brodsky defendant military TF] = \"false\" \n GOTO \"10b-Defendant not in military\"\nEND IF\nIF [Defendant in military TF] = false \n GOTO \"10b-Defendant not in military\"\nEND IF\nIF [Defendant in military TF] = \"false\" \n GOTO \"10b-Defendant not in military\"\nEND IF"
  },
  "04f.4-Have marital property": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04g.1-Retirement accounts"
      },
      {
        "label": "No",
        "next": "04f.5-Plaintiff contest"
      }
    ]
  },
  "13d.1-Support payor": {
    "step": 1,
    "fields": [
      {
        "name": "Spousal support payor MC",
        "type": "radio",
        "label": "I pay support to %%[Defendant current name TE]%%",
        "required": true,
        "value": "plaintiff"
      },
      {
        "name": "Spousal support payor MC",
        "type": "radio",
        "label": "%%[Defendant current name TE]%% pays support to me",
        "required": true,
        "value": "defendant"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13d.2-Support amount"
      }
    ]
  },
  "13d.2-Support amount": {
    "step": 1,
    "fields": [
      {
        "name": "Spousal support amount NU",
        "type": "numberdollar",
        "label": "How much? $",
        "required": true
      },
      {
        "name": "Spousal support frequency MC",
        "type": "textpick",
        "label": "How often?",
        "required": true,
        "listData": "<OPTION VALUE=\"every week\">every week</OPTION><OPTION VALUE=\"every two weeks\">every two weeks</OPTION><OPTION VALUE=\"every month\">every month</OPTION><OPTION VALUE=\"other\">other</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13d.3-Support frequency"
      }
    ]
  },
  "13g.1-Income levels": {
    "step": 1,
    "fields": [
      {
        "name": "Plaintiff income NU",
        "type": "numberdollar",
        "label": "Income: $",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13g.2-Income levels"
      }
    ],
    "codeBefore": "GOTO \"14a-Order of protection\""
  },
  "13c.1-Support order court": {
    "step": 1,
    "fields": [
      {
        "name": "Spousal support court MC",
        "type": "radio",
        "label": "Family Court in New York State",
        "required": true,
        "value": "Family"
      },
      {
        "name": "Spousal support court MC",
        "type": "radio",
        "label": "A court from another state",
        "required": true,
        "value": "other"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13c.2-Support order court"
      }
    ]
  },
  "13c.2-Support order court": {
    "learn": "What do you mean?",
    "help": "Give the state where the spousal support order is from, the name of the court, the date of the order and the docket/index/case number.",
    "step": 1,
    "fields": [
      {
        "name": "Spousal support state MC",
        "type": "textpick",
        "label": "State:",
        "required": true
      },
      {
        "name": "Spousal support court TE",
        "type": "text",
        "label": "Court:",
        "required": true
      },
      {
        "name": "Spousal support order DA",
        "type": "datemdy",
        "label": "Order date:",
        "required": true
      },
      {
        "name": "Spousal support docket TE",
        "type": "text",
        "label": "Case #:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13d.1-Support payor"
      }
    ],
    "codeBefore": "IF NOT ([Spousal support court MC] = \"other\") \n GOTO \"13c.3-NY court order\"\nEND IF"
  },
  "13c.3-NY court order": {
    "step": 1,
    "fields": [
      {
        "name": "Spousal support county MC",
        "type": "textpick",
        "label": "County:",
        "required": true
      },
      {
        "name": "Spousal support order DA",
        "type": "datemdy",
        "label": "Order Date:",
        "required": true
      },
      {
        "name": "Spousal support docket TE",
        "type": "text",
        "label": "Docket#:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13d.1-Support payor"
      }
    ]
  },
  "13b-Continue order": {
    "learn": "How does the Judge decide if support is paid after the divorce?",
    "help": "The Judge will look at your and %%[Defendant current name TE]%%'s current and future finances.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "13c.1-Support order court",
        "name": "Spousal support continue TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "14a-Order of protection",
        "name": "Spousal support continue TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Spousal support continue TF] = true \n SET [Ancillary relief sought TF] TO true\nEND IF"
  },
  "17-FORWARDING STEP": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "IF  [Part A filed TF] = true \n SET [Brodsky after children route MC] TO \"about\"\n GOTO \"BL-01-Children information\"\nELSE\n GOTO \"18a-Jurisdiction\"\nEND IF"
  },
  "16b-Other relief": {
    "step": 1,
    "fields": [
      {
        "name": "Ancillary relief1 TE",
        "type": "text",
        "label": "1.",
        "required": true
      },
      {
        "name": "Ancillary relief2 TE",
        "type": "text",
        "label": "2.",
        "required": false
      },
      {
        "name": "Ancillary relief3 TE",
        "type": "text",
        "label": "3.",
        "required": false
      },
      {
        "name": "Ancillary relief4 TE",
        "type": "text",
        "label": "4.",
        "required": false
      },
      {
        "name": "Ancillary relief5 TE",
        "type": "text",
        "label": "5.",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "17-FORWARDING STEP"
      }
    ]
  },
  "04g.2-New York law": {
    "learn": "Is my retirement account considered \"marital property\"?",
    "help": "Contact your plan administrator for more information about the plan and the plan's requirements. If you and the Defendant want to divide the retirement account, contact the plan administrator for more information.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04g.3-DRO"
      }
    ]
  },
  "04g.3-DRO": {
    "learn": "What is a DRO or QDRO?",
    "help": "Depending on your own situation and circumstances, a Domestic Relations Order (\"DRO\") or Qualified Domestic Relations Order (\"QDRO\") may be right for you. This is a legal document that gives specific instructions on how the benefits should be divided which will be based on your written agreement. Contact your plan administrator for information on where to get a sample order. It is signed by the Judge and filed with the plan.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04g.5-Submit DRO",
        "name": "Parties have DRO TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04g.4-Written stipulation",
        "name": "Parties have DRO TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Parties have DRO TF] = true \n SET [Parties have pension stip TF] TO false\nEND IF"
  },
  "B01a.10-Health insurance": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.9-Guideline maintenance step"
      }
    ]
  },
  "B01a.2-Contempt of Court": {
    "learn": "What does this mean?",
    "help": "If you or %%[Defendant current name TE]%% do not follow the court order, you or %%[Defendant current name TE]%% can be held in contempt of court. This means that you or %%[Defendant current name TE]%% can be punished by the court.",
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.3-Contempt of Court"
      }
    ]
  },
  "B01a.3-Contempt of Court": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.4-Contempt of Court"
      }
    ]
  },
  "B01a.4-Contempt of Court": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.5-Contempt of Court"
      }
    ]
  },
  "B01a.5-Contempt of Court": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.6-Contempt of Court"
      }
    ]
  },
  "B01a.6-Contempt of Court": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.7-Contempt of Court"
      }
    ]
  },
  "B01a.7-Contempt of Court": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.8-Contempt of Court"
      }
    ]
  },
  "04g.5-Submit DRO": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04h.1-Maintenance"
      }
    ]
  },
  "13f.1-Maintenance termination": {
    "learn": "For how long can maintenance be paid?",
    "help": "The Judge will decide the length of time maintenance is to be paid. It can be for a short period of time or for life.\nMaintenance stops if the person who gets the maintenance marries again or if either person dies unless there is a court order or written agreement that says it continues.",
    "step": 1,
    "fields": [
      {
        "name": "Maintenance period MC",
        "type": "radio",
        "label": "3 months from the date of divorce",
        "required": true,
        "value": "3 months"
      },
      {
        "name": "Maintenance period MC",
        "type": "radio",
        "label": "6 months from the date of divorce",
        "required": true,
        "value": "6 months"
      },
      {
        "name": "Maintenance period MC",
        "type": "radio",
        "label": "1 year from the date of divorce",
        "required": true,
        "value": "1 year"
      },
      {
        "name": "Maintenance period MC",
        "type": "radio",
        "label": "Another date",
        "required": true,
        "value": "other"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13f.3-Maintenance period"
      }
    ]
  },
  "13e.1-Maintenance amount": {
    "step": 1,
    "fields": [
      {
        "name": "Maintenance amount NU",
        "type": "numberdollar",
        "label": "How much? $",
        "required": true
      },
      {
        "name": "Maintenance frequency MC",
        "type": "textpick",
        "label": "How often?",
        "required": true,
        "listData": "<OPTION VALUE=\"every week\">every week</OPTION><OPTION VALUE=\"every two weeks\">every two weeks</OPTION><OPTION VALUE=\"every month\">every month</OPTION><OPTION VALUE=\"other\">other</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13e.2-Maintenance frequency"
      }
    ]
  },
  "07f.1-Maintenance in agreement": {
    "learn": "What is \"maintenance\"?",
    "help": "Maintenance (also called spousal support or alimony) is financial support that one ex-spouse give to another after they get divorce.",
    "step": 1,
    "fields": [
      {
        "name": "Maintenance payor MC",
        "type": "radio",
        "label": "Both %%[Defendant current name TE]%% and I will waive maintenance. This means that we have agreed not to ask each other for support now or in the future.",
        "required": true,
        "value": "waived"
      },
      {
        "name": "Maintenance payor MC",
        "type": "radio",
        "label": "%%[Defendant current name TE]%% will pay me maintenance.",
        "required": true,
        "value": "defendant"
      },
      {
        "name": "Maintenance payor MC",
        "type": "radio",
        "label": "I will pay %%[Defendant current name TE]%% maintenance.",
        "required": true,
        "value": "plaintiff"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07f.2-Maintenance amount"
      }
    ],
    "codeAfter": "IF [Maintenance payor MC] = \"waived\" \n GOTO \"09a-Explain no marital property\"\nEND IF"
  },
  "07f.2-Maintenance amount": {
    "step": 1,
    "fields": [
      {
        "name": "Maintenance amount NU",
        "type": "numberdollar",
        "label": "How much? $",
        "required": true
      },
      {
        "name": "Maintenance frequency MC",
        "type": "textpick",
        "label": "How often?",
        "required": true,
        "listData": "<OPTION VALUE=\"every week\">every week</OPTION><OPTION VALUE=\"every two weeks\">every two weeks</OPTION><OPTION VALUE=\"every month\">every month</OPTION><OPTION VALUE=\"lump sum\">lump sum</OPTION><OPTION VALUE=\"other\">other</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07f.3-Maintenance frequency"
      }
    ]
  },
  "07f.3-Maintenance frequency": {
    "step": 1,
    "fields": [
      {
        "name": "Maintenance frequency TE",
        "type": "text",
        "label": "How often?:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "09a-Explain no marital property"
      }
    ],
    "codeBefore": "IF NOT ([Maintenance frequency MC] = \"other\") \n GOTO \"09a-Explain no marital property\"\nEND IF"
  },
  "09-Public assistance": {
    "learn": "What do you mean by \"public assistance\"?",
    "help": "Public assistance are government benefits that help pay for food and shelter. In New York State, this could be programs such as SNAP and TANF.",
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "10a-Defendant in military",
        "name": "Defendant gets public assistance TF",
        "value": "true"
      },
      {
        "label": "No / Not Sure",
        "next": "10a-Defendant in military",
        "name": "Defendant gets public assistance TF",
        "value": "false"
      }
    ]
  },
  "05-Public assistance": {
    "learn": "What do you mean by \"public assistance\"?",
    "help": "Public assistance are government benefits that help pay for food and shelter. In New York State, this could be programs such as SNAP and TANF.",
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "07a-Defendant's SSN",
        "name": "Plaintiff gets public assistance TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "07a-Defendant's SSN",
        "name": "Plaintiff gets public assistance TF",
        "value": "false"
      }
    ]
  },
  "07d-Drafter": {
    "step": 1,
    "fields": [
      {
        "name": "Agreement drafter MC",
        "type": "radio",
        "label": "Divorce mediator",
        "required": true,
        "value": "mediator"
      },
      {
        "name": "Agreement drafter MC",
        "type": "radio",
        "label": "Lawyer",
        "required": true,
        "value": "lawyer"
      },
      {
        "name": "Agreement drafter MC",
        "type": "radio",
        "label": "Someone else",
        "required": true,
        "value": "someone else"
      },
      {
        "name": "Agreement drafter MC",
        "type": "radio",
        "label": "No one",
        "required": true,
        "value": "no one"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07e.1-Health Insurance"
      }
    ]
  },
  "13f.3-Maintenance period": {
    "step": 1,
    "fields": [
      {
        "name": "Maintenance period other TE",
        "type": "text",
        "label": "For",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13g.1-Income levels"
      }
    ],
    "codeBefore": "IF NOT ([Maintenance period MC] = \"other\") \n GOTO \"13g.1-Income levels\"\nEND IF"
  },
  "07e.1-Health Insurance": {
    "learn": "What do you mean?",
    "help": "There is a legal requirement that the written Settlement Agreement states an arrangement for future health care coverage for you and %%[Defendant current name TE]%%.\nFor example, there could be a statement that says you and %%[Defendant current name TE]%% are aware that you will no longer be covered by the other's health care coverage after the divorce.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "07f.1-Maintenance in agreement",
        "name": "Agreement insurance clause TF",
        "value": "true"
      },
      {
        "label": "No / Not sure",
        "next": "07e.2-Health Insurance",
        "name": "Agreement insurance clause TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF  [Agreement insurance clause TF] = false \n SET [Print 255 addendum TF] TO true\nELSE\n SET [Print 255 addendum TF] TO false\nEND IF"
  },
  "07e.2-Health Insurance": {
    "learn": "Where can I get more information about this requirement?",
    "help": "For more information, go to New York State's Domestic Relations Law section 255.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07f.1-Maintenance in agreement"
      }
    ]
  },
  "04d.1-Defendant's whereabouts": {
    "learn": "Why do I need to know this?",
    "help": "The papers must be personally delivered to the Defendant. If you do not know where the Defendant lives, contact the Supreme Court Clerk's Office in your county for help.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "BL-01-Children information",
        "name": "Brodsky after children route MC",
        "value": "settlement"
      },
      {
        "label": "No",
        "next": "04d.2-Unknown whereabouts"
      }
    ]
  },
  "04d.2-Unknown whereabouts": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit address unknown TF] TO true"
  },
  "04f.2-Marital property explained": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04f.3-Any marital property"
      }
    ]
  },
  "04f.1-Marital property": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04f.2-Marital property explained"
      }
    ]
  },
  "07a-Written agreement": {
    "learn": "What do you mean?",
    "help": "Also called a Marital Settlement Agreement, Stipulation of Settlement or Property Settlement and Separation Agreement, this is a written contract that you and %%[Defendant current name TE]%% both signed that settles issues like division of property, debt, insurance, taxes, etc. once you are divorced. Each agreement is special and can address other issues such as custody of the pets. It is not the same thing as a prenuptial agreement.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07b-Get agreement."
      }
    ],
    "codeBefore": "IF [Parties have agreement TF] = false \n GOTO \"09a-Explain no marital property\"\nEND IF"
  },
  "14a-Order of protection": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "14b-About the OP",
        "name": "Relief OP against defendant TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "14c-OP against plaintiff",
        "name": "Relief OP against defendant TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Relief OP against defendant TF] = true \n SET [Ancillary relief sought TF] TO true\nEND IF"
  },
  "15a-Other court orders": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "15b-How many court orders?",
        "name": "Relief other orders TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "16a-Other relief",
        "name": "Relief other orders TF",
        "value": "false"
      }
    ],
    "codeBefore": "SET [Relief other orders TF] TO false\nGOTO \"16a-Other relief\"",
    "codeAfter": "IF [Relief other orders TF] = true \n SET [Ancillary relief sought TF] TO true\nEND IF"
  },
  "14b-About the OP": {
    "step": 1,
    "fields": [
      {
        "name": "OP defendant county MC",
        "type": "textpick",
        "label": "County:",
        "required": true
      },
      {
        "name": "OP defendant court MC",
        "type": "textpick",
        "label": "Court:",
        "required": true,
        "listData": "<OPTION VALUE=\"Family Court\">Family Court</OPTION><OPTION VALUE=\"Criminal Court\">Criminal Court</OPTION>"
      },
      {
        "name": "OP defendant date DA",
        "type": "datemdy",
        "label": "Order date:",
        "required": true,
        "listData": "<OPTION VALUE=\"Family Court\">Family Court</OPTION><OPTION VALUE=\"Criminal Court\">Criminal Court</OPTION>"
      },
      {
        "name": "OP defendant docket TE",
        "type": "text",
        "label": "File #:",
        "required": true,
        "listData": "<OPTION VALUE=\"Family Court\">Family Court</OPTION><OPTION VALUE=\"Criminal Court\">Criminal Court</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "14c-OP against plaintiff"
      }
    ]
  },
  "16a-Other relief": {
    "step": 1,
    "fields": [],
    "buttons": [],
    "codeBefore": "IF [Part A filed TF] = true \n GOTO \"16c-Other relief RETURNING\"\nELSE\n SET [Relief other TF] TO false\n GOTO \"17-FORWARDING STEP\"\nEND IF"
  },
  "15b-How many court orders?": {
    "learn": "What if I have more than 3 other court orders?",
    "help": "If you have more than 3, tell the Supreme Court Clerk when you file your papers.",
    "step": 1,
    "fields": [
      {
        "name": "Other court order NU",
        "type": "numberpick",
        "label": "Select:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "15c-Court order 1"
      }
    ]
  },
  "15c-Court order 1": {
    "step": 1,
    "fields": [
      {
        "name": "Order1 details TE",
        "type": "text",
        "label": "For:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION>"
      },
      {
        "name": "Order1 state MC",
        "type": "textpick",
        "label": "State:",
        "required": true,
        "value": "New York"
      },
      {
        "name": "Order1 court TE",
        "type": "text",
        "label": "Court:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION>"
      },
      {
        "name": "Order1 county TE",
        "type": "text",
        "label": "County:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      },
      {
        "name": "Order1 date DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      },
      {
        "name": "Order1 index TE",
        "type": "text",
        "label": "File #:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "15d-Court order 2"
      }
    ]
  },
  "15d-Court order 2": {
    "step": 1,
    "fields": [
      {
        "name": "Order2 details TE",
        "type": "text",
        "label": "For:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION>"
      },
      {
        "name": "Order2 state MC",
        "type": "textpick",
        "label": "State:",
        "required": true,
        "value": "New York"
      },
      {
        "name": "Order2 court TE",
        "type": "text",
        "label": "Court:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION>"
      },
      {
        "name": "Order2 county TE",
        "type": "text",
        "label": "County:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      },
      {
        "name": "Order2 date DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      },
      {
        "name": "Order2 index TE",
        "type": "text",
        "label": "File #:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "15e-Court order 3"
      }
    ],
    "codeBefore": "IF [Other court order NU] = 1 \n GOTO \"16a-Other relief\"\nEND IF"
  },
  "15e-Court order 3": {
    "step": 1,
    "fields": [
      {
        "name": "Order3 details TE",
        "type": "text",
        "label": "For:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION>"
      },
      {
        "name": "Order3 state MC",
        "type": "textpick",
        "label": "State:",
        "required": true,
        "value": "New York"
      },
      {
        "name": "Order3 court TE",
        "type": "text",
        "label": "Court:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION>"
      },
      {
        "name": "Order3 county TE",
        "type": "text",
        "label": "County:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      },
      {
        "name": "Order3 date DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      },
      {
        "name": "Order3 index TE",
        "type": "text",
        "label": "File #:",
        "required": true,
        "listData": "<OPTION VALUE=\"NYS Family Court\">NYS Family Court</OPTION><OPTION VALUE=\"NYS Criminal Court\">NYS Criminal Court</OPTION><OPTION VALUE=\"Other\">Other</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "16a-Other relief"
      }
    ],
    "codeBefore": "IF [Other court order NU] = 2 \n GOTO \"16a-Other relief\"\nEND IF"
  },
  "04e.1-Written agreement": {
    "learn": "What is a Settlement Agreement?",
    "help": "Also called a Marital Settlement Agreement, Stipulation of Settlement or Property Settlement and Separation Agreement, this is a written contract that you and the Defendant both signed that settles issues such as division of property, debt, insurance, taxes, etc. when you are divorced. Each agreement is special and can apply to many other issues that are personal to both of you. It is not the same thing as a prenuptial agreement.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04e.3-File agreement",
        "name": "Parties have agreement TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04f.1-Marital property",
        "name": "Parties have agreement TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF  [Parties have agreement TF] = true \n SET [Ancillary relief sought TF] TO true\nELSE\n SET [Ancillary relief sought TF] TO false\n SET [Print 255 addendum TF] TO false\nEND IF"
  },
  "13d.3-Support frequency": {
    "step": 1,
    "fields": [
      {
        "name": "Spousal support frequency TE",
        "type": "text",
        "label": "Frequency:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13e.1-Maintenance amount"
      }
    ],
    "codeBefore": "IF NOT ([Spousal support frequency MC] = \"other\") \n GOTO \"13e.1-Maintenance amount\"\nEND IF"
  },
  "13e.2-Maintenance frequency": {
    "step": 1,
    "fields": [
      {
        "name": "Maintenance frequency TE",
        "type": "text",
        "label": "Frequency:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "13f.1-Maintenance termination"
      }
    ],
    "codeBefore": "IF NOT ([Maintenance frequency MC] = \"other\") \n GOTO \"13f.1-Maintenance termination\"\nEND IF"
  },
  "13g.2-Income levels": {
    "step": 1,
    "fields": [
      {
        "name": "Plaintiff income source TE",
        "type": "textlong",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "14a-Order of protection"
      }
    ]
  },
  "08f.1-Defendant in prison": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "08f.3-Defendant in prison service",
        "name": "Defendant in prison TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "BL-03-Party history",
        "name": "Defendant in prison TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Defendant in prison TF] = true \n SET [Defendant not in military MC] TO \"prison\"\nEND IF"
  },
  "03b-Order of protection": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "03c-Common law marriage"
      },
      {
        "label": "Exit",
        "next": "C00-EXIT forwardingstep",
        "name": "Exit OP needed TF",
        "value": "true"
      }
    ]
  },
  "04g.6-Party with pension": {
    "step": 1,
    "fields": [
      {
        "name": "Party with pension MC",
        "type": "radio",
        "label": "Me",
        "required": true,
        "value": "plaintiff"
      },
      {
        "name": "Party with pension MC",
        "type": "radio",
        "label": "The Defendant, the person I want to divorce",
        "required": true,
        "value": "defendant"
      },
      {
        "name": "Party with pension MC",
        "type": "radio",
        "label": "Both me and the Defendant, the person I want to divorce",
        "required": true,
        "value": "both"
      },
      {
        "name": "Party with pension MC",
        "type": "radio",
        "label": "I'm not sure",
        "required": true,
        "value": "unsure"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "04g.7-Defendant has pension"
      }
    ]
  },
  "04g.7-Defendant has pension": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04g.8-Plaintiff has pension",
        "name": "Pension rights waived TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04g.9-Pension exit",
        "name": "Pension rights waived TF",
        "value": "false"
      }
    ],
    "codeBefore": "IF [Party with pension MC] = \"plaintiff\" \n GOTO \"04g.8-Plaintiff has pension\"\nEND IF"
  },
  "04g.1-Retirement accounts": {
    "learn": "What is a \"defined contribution plan\"?",
    "help": "A defined contribution plan is a pension plan where an employee, employer or both contributes a defined amount of money to an account. Examples of this type of plan are 401(k) plans, 403(b) plans, 457 plans, Thrift Savings Plans, employee stock ownership plans, and profit-sharing plans.\nFor more information, contact your plan administrator.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04g.2-New York law",
        "name": "Parties have pension MC",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04h.1-Maintenance",
        "name": "Parties have pension MC",
        "value": "false"
      },
      {
        "label": "Not sure",
        "next": "04g.6-Party with pension",
        "name": "Parties have pension MC",
        "value": "unsure"
      }
    ],
    "codeAfter": "IF [Parties have pension MC] = \"false\" or [Parties have pension MC] = \"unsure\" \n SET [Parties have DRO TF] TO false\n SET [Parties have pension stip TF] TO false\nEND IF"
  },
  "04g.8-Plaintiff has pension": {
    "learn": "How does the Defendant \"waive\" his rights to my retirement account?",
    "help": "The Defendant must sign and return the Affirmation of Defendant to you. This is a sworn statement where the Defendant agrees to the divorce and does not contest (argue) anything you are asking for. In this case, the Defendant will agree not to ask for any part of your retirement account in the future.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04g.10-Default continue"
      },
      {
        "label": "No",
        "next": "04g.9-Pension exit"
      },
      {
        "label": "Don't Know",
        "next": "04g.11-Default continue"
      }
    ]
  },
  "04g.4-Written stipulation": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04g.5-Submit DRO",
        "name": "Parties have pension stip TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04g.6-Party with pension",
        "name": "Parties have pension stip TF",
        "value": "false"
      }
    ]
  },
  "04g.9-Pension exit": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit pension unresolved TF] TO true"
  },
  "04g.11-Default continue": {
    "learn": "How does the Defendant \"default\"?",
    "help": "The Defendant defaults if he or she does not sign the Affirmation of Defendant to you and there is no answer of any kind from him or her.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04h.1-Maintenance"
      }
    ]
  },
  "08f.2-Defendant in prison SKIP": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "08f.3-Defendant in prison service"
      }
    ]
  },
  "C00-EXIT forwardingstep": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "SET [Print Step 1 TF] TO false\nSET [Print Step 2 TF] TO false\nSET [Print exit sheet TF] TO true\nGOTO \"C01-EXIT screen\""
  },
  "04g.10-Default continue": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04h.1-Maintenance"
      }
    ]
  },
  "06c-Defendant's prison address": {
    "learn": "Where can I find the address for the prison?",
    "help": "To find the address for a federal prison, go to the Federal Bureau of Prisons website at http://www.bop.gov/locations/\nTo find the address for a NYS Correctional Facility, go to the Department of Corrections website at http://www.doccs.ny.gov/faclist.html\nTo find the address for a local jail or correctional facility, contact the location where %%[Defendant current name TE]%% is incarcerated.",
    "step": 2,
    "fields": [
      {
        "name": "Defendant prison name TE",
        "type": "text",
        "label": "Facility:",
        "required": true
      },
      {
        "name": "Defendant address line1 TE",
        "type": "text",
        "label": "Street 1:",
        "required": true
      },
      {
        "name": "Defendant address line2 TE",
        "type": "text",
        "label": "Street 2:",
        "required": false
      },
      {
        "name": "Defendant city TE",
        "type": "text",
        "label": "City:",
        "required": true
      },
      {
        "name": "Defendant state MC",
        "type": "textpick",
        "label": "State:",
        "required": true
      },
      {
        "name": "Defendant postal code TE",
        "type": "numberzip",
        "label": "Zip code:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a-Defendant's SSN"
      }
    ],
    "codeAfter": "IF NOT (HASANSWERED([Defendant address line2 TE])) \n SET [Defendant address line2 TE] TO NULL\nEND IF"
  },
  "06f.1-NYS prison": {
    "learn": "What do you mean?",
    "help": "The DIN is the Department ID Number that is assigned to each inmate in a NYS Correctional Facility. It has a format of 99-A-9999.",
    "step": 2,
    "fields": [
      {
        "name": "Defendant prison ID TE",
        "type": "text",
        "label": "DIN:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a-Defendant's SSN"
      }
    ],
    "codeBefore": "IF NOT ([Defendant prison type MC] = \"NYS\") \n GOTO \"06g.1-Local facility\"\nEND IF"
  },
  "06e.1-Federal prison": {
    "step": 2,
    "fields": [
      {
        "name": "Defendant prison ID TE",
        "type": "text",
        "label": "BOP:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a-Defendant's SSN"
      }
    ],
    "codeBefore": "IF NOT ([Defendant prison type MC] = \"federal\") \n GOTO \"06f.1-NYS prison\"\nEND IF"
  },
  "06g.1-Local facility": {
    "step": 2,
    "fields": [
      {
        "name": "Defendant prison ID TE",
        "type": "text",
        "label": "ID #:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a-Defendant's SSN"
      }
    ]
  },
  "07e.1-Plaintiff in prison": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "07e.2-Plaintiff in prison",
        "name": "Plaintiff in prison TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "08a.1-Defendant name",
        "name": "Plaintiff in prison TF",
        "value": "false"
      }
    ],
    "codeBefore": "SET [Plaintiff in prison TF] TO false\nGOTO \"08a.1-Defendant name\""
  },
  "07e.2-Plaintiff in prison": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "08a.1-Defendant name"
      }
    ]
  },
  "02g.1-Local facility": {
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff prison ID TE",
        "type": "text",
        "label": "ID #:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "04a-Plaintiff's SSN"
      }
    ]
  },
  "02f.1-NYS prison": {
    "learn": "What do you mean?",
    "help": "The DIN is the Department ID Number that is assigned to each inmate in a NYS Correctional Facility. It has a format of 99-A-9999.",
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff prison ID TE",
        "type": "text",
        "label": "DIN:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "04a-Plaintiff's SSN"
      }
    ],
    "codeBefore": "IF NOT ([Defendant prison type MC] = \"NYS\") \n GOTO \"02g.1-Local facility\"\nEND IF"
  },
  "02e.1-Federal prison": {
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff prison ID TE",
        "type": "text",
        "label": "BOP:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "04a-Plaintiff's SSN"
      }
    ],
    "codeBefore": "IF NOT ([Defendant prison type MC] = \"federal\") \n GOTO \"02f.1-NYS prison\"\nEND IF"
  },
  "02c-Plaintiff's prison address": {
    "step": 2,
    "fields": [
      {
        "name": "Plaintiff prison type MC",
        "type": "radio",
        "label": "Federal location",
        "required": true,
        "value": "federal"
      },
      {
        "name": "Plaintiff prison type MC",
        "type": "radio",
        "label": "NYS Correctional Facility",
        "required": true,
        "value": "NYS"
      },
      {
        "name": "Plaintiff prison type MC",
        "type": "radio",
        "label": "Local location",
        "required": true,
        "value": "local"
      },
      {
        "name": "Plaintiff prison name TE",
        "type": "text",
        "label": "Facility:",
        "required": true
      },
      {
        "name": "Plaintiff address line1 TE",
        "type": "text",
        "label": "Street 1:",
        "required": true
      },
      {
        "name": "Plaintiff address line2 TE",
        "type": "text",
        "label": "Street 2:",
        "required": false
      },
      {
        "name": "Plaintiff city TE",
        "type": "text",
        "label": "City:",
        "required": true
      },
      {
        "name": "Plaintiff state MC",
        "type": "textpick",
        "label": "State:",
        "required": true
      },
      {
        "name": "Plaintiff postal code TE",
        "type": "numberzip",
        "label": "Zip code:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "02e.1-Federal prison"
      }
    ],
    "codeAfter": "IF NOT (HASANSWERED([Plaintiff address line2 TE])) \n SET [Plaintiff address line2 TE] TO NULL\n SET [Plaintiff has phone TF] TO false\nEND IF"
  },
  "06c-Useful information returning": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07a.2-Parties names already filed"
      }
    ]
  },
  "07a.2-Parties names already filed": {
    "learn": "Where can I find this information?",
    "help": "Look at the top of the Summons With Notice or the Summons. In this case, the Plaintiff is Jane Smith and the Defendant is John Smith.\nSUPREME COURT OF THE STATE OF NEW YORK\nCOUNTY OF [ NEW YORK ]\n------------------------------------------------------------------\n[ Jane Smith ]\nPlaintiff,\n-against-\n[John Smith ]\nDefendant.\n------------------------------------------------------------------",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07b.1-Plaintiff name"
      }
    ]
  },
  "08f.3-Defendant in prison service": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-03-Party history"
      }
    ],
    "codeBefore": "IF [Part A filed TF] = true \n GOTO \"BL-03-Party history\"\nEND IF"
  },
  "12a.3-Other relief": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "12c.1-Plaintiff prior surnames"
      }
    ]
  },
  "A11a-Jurisdiction": {
    "step": 0,
    "fields": [
      {
        "name": "Jurisdiction county MC",
        "type": "textpick",
        "label": "County:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A11b-Jurisdiction"
      }
    ]
  },
  "A11b-Jurisdiction": {
    "step": 0,
    "fields": [
      {
        "name": "Venue basis MC",
        "type": "radio",
        "label": "Plaintiff's residence",
        "required": true,
        "value": "plaintiff"
      },
      {
        "name": "Venue basis MC",
        "type": "radio",
        "label": "Defendant's residence",
        "required": true,
        "value": "defendant"
      },
      {
        "name": "Venue basis MC",
        "type": "radio",
        "label": "CPLR 509",
        "required": true,
        "value": "CPLR 509"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "02a-Plaintiff 2 years residency",
        "name": "Jurisdiction CPLR 509 TF",
        "value": "false"
      }
    ]
  },
  "A12-FORWARDING STEP": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "GOTO \"02a-Plaintiff 2 years residency\""
  },
  "A04d.1-Where given": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04e.1-When given",
        "name": "Service location MC",
        "value": "within"
      },
      {
        "label": "No",
        "next": "A04e.1-When given",
        "name": "Service location MC",
        "value": "outside"
      }
    ]
  },
  "04b.1-Address abroad": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04c.1-Previous application"
      },
      {
        "label": "No",
        "next": "04b.2-Address abroad exit"
      }
    ]
  },
  "04b.2-Address abroad exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit address abroad TF] TO true"
  },
  "C01-EXIT screen": {
    "learn": "What's on the information sheet?",
    "help": "The information sheet will have contact information for the Supreme Court and court clerk in your county and additional information.",
    "step": 4,
    "fields": [
      {
        "name": "Jurisdiction county MC",
        "type": "textpick",
        "label": "County:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "C03-Submit Exit sheet"
      }
    ]
  },
  "03-LOGIC EXIT TF": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "SET [Exit 6 months TF] TO false\nSET [Exit address abroad TF] TO false\nSET [Exit address unknown TF] TO false\nSET [Exit age TF] TO false\nSET [Exit children TF] TO false\nSET [Exit common law TF] TO false\nSET [Exit DV issue TF] TO false\nSET [Exit maintenance TF] TO false\nSET [Exit marital property TF] TO false\nSET [Exit military TF] TO false\nSET [Exit OP needed TF] TO false\nSET [Exit pending case TF] TO false\nSET [Exit pension unresolved TF] TO false\nSET [Exit plaintiff in prison TF] TO false\nSET [Exit residency TF] TO false\n\nGOTO \"03a-Domestic violence\""
  },
  "16c-Other relief RETURNING": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "16d-Other relief",
        "name": "Relief other TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "17-FORWARDING STEP",
        "name": "Relief other TF",
        "value": "false"
      }
    ]
  },
  "16d-Other relief": {
    "step": 1,
    "fields": [
      {
        "name": "Ancillary relief1 TE",
        "type": "text",
        "label": "1.",
        "required": true
      },
      {
        "name": "Ancillary relief2 TE",
        "type": "text",
        "label": "2.",
        "required": false
      },
      {
        "name": "Ancillary relief3 TE",
        "type": "text",
        "label": "3.",
        "required": false
      },
      {
        "name": "Ancillary relief4 TE",
        "type": "text",
        "label": "4.",
        "required": false
      },
      {
        "name": "Ancillary relief5 TE",
        "type": "text",
        "label": "5.",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "17-FORWARDING STEP"
      }
    ]
  },
  "04f.5-Plaintiff contest": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04f.7-ADR exit"
      },
      {
        "label": "No",
        "next": "04f.6-Defendant contest"
      }
    ]
  },
  "04f.6-Defendant contest": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04f.7-ADR exit"
      },
      {
        "label": "No",
        "next": "04g.1-Retirement accounts"
      }
    ]
  },
  "A02-Residency with Complaint": {
    "learn": "Where can I find this?",
    "help": "Look at the Verified Complaint in the paragraph that starts with \"SECOND\".",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A03a.1-Residency for 2 years"
      }
    ]
  },
  "A03a.1-Residency for 2 years": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03a.2-Residency for 2 years"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"2 years\"\nSET [Residency based on MC] TO \"plaintiff\""
  },
  "A03a.2-Residency for 2 years": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03b.1-Residency married in NY"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"2 years\"\nSET [Residency based on MC] TO \"defendant\""
  },
  "A03b.1-Residency married in NY": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03b.2-Residency married in NY"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"married in NY\"\nSET [Residency based on MC] TO \"plaintiff\""
  },
  "A03b.2-Residency married in NY": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03c.1-Residency married people"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"married in NY\"\nSET [Residency based on MC] TO \"defendant\""
  },
  "A03c.1-Residency married people": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03c.2-Residency married people"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"resided as married\"\nSET [Residency based on MC] TO \"plaintiff\""
  },
  "A03c.2-Residency married people": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03d.1-Residency grounds"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"resided as married\"\nSET [Residency based on MC] TO \"defendant\""
  },
  "A03d.1-Residency grounds": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03d.2-Residency grounds"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"grounds\"\nSET [Residency based on MC] TO \"both\""
  },
  "A03d.2-Residency grounds": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03d.3-Residency grounds"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"grounds\"\nSET [Residency based on MC] TO \"plaintiff\""
  },
  "A03d.3-Residency grounds": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A04-FORWARDING STEP"
      },
      {
        "label": "No",
        "next": "A03e-Residency restart"
      }
    ],
    "codeAfter": "SET [Residency requirement MC] TO \"grounds\"\nSET [Residency based on MC] TO \"defendant\""
  },
  "A04-FORWARDING STEP": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "GOTO \"06a-Grounds for divorce\""
  },
  "A03e-Residency restart": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A03a.1-Residency for 2 years"
      }
    ]
  },
  "14d-About the OP": {
    "step": 1,
    "fields": [
      {
        "name": "OP plaintiff county MC",
        "type": "textpick",
        "label": "County:",
        "required": true
      },
      {
        "name": "OP plaintiff court MC",
        "type": "textpick",
        "label": "Court:",
        "required": true,
        "listData": "<OPTION VALUE=\"Family Court\">Family Court</OPTION><OPTION VALUE=\"Criminal Court\">Criminal Court</OPTION>"
      },
      {
        "name": "OP plaintiff date DA",
        "type": "datemdy",
        "label": "Order date:",
        "required": true,
        "listData": "<OPTION VALUE=\"Family Court\">Family Court</OPTION><OPTION VALUE=\"Criminal Court\">Criminal Court</OPTION>"
      },
      {
        "name": "OP plaintiff docket TE",
        "type": "text",
        "label": "File #:",
        "required": true,
        "listData": "<OPTION VALUE=\"Family Court\">Family Court</OPTION><OPTION VALUE=\"Criminal Court\">Criminal Court</OPTION>"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "15a-Other court orders"
      }
    ]
  },
  "14c-OP against plaintiff": {
    "learn": "How can I tell?",
    "help": "If there is an Order of Protection, look at the top. One person is called the Petitioner and the other person is called the Respondent.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "14d-About the OP",
        "name": "Relief OP against plaintiff TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "15a-Other court orders",
        "name": "Relief OP against plaintiff TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Relief OP against plaintiff TF] = true \n SET [Ancillary relief sought TF] TO true\nEND IF"
  },
  "A04f.1-When signed": {
    "learn": "Where can I find this information?",
    "help": "Look at the first page of the Affirmation of Defendant in the paragraph that starts with \"2.\" %%[Defendant current name TE]%% should have filled in the date.",
    "step": 0,
    "fields": [
      {
        "name": "Affidavit signed DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A04g.1-Affirmation signed before"
      }
    ]
  },
  "04e.3-File agreement": {
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04g.1-Retirement accounts"
      }
    ]
  },
  "02h.1-Marital home": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "02h.2-Own or rent"
      },
      {
        "label": "No",
        "next": "03a-Plaintiff's phone",
        "name": "Relief marital home TF",
        "value": "false"
      }
    ],
    "codeBefore": "GOTO \"03a-Plaintiff's phone\""
  },
  "02h.3-Marital home": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "03a-Plaintiff's phone",
        "name": "Relief marital home TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "03a-Plaintiff's phone",
        "name": "Relief marital home TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Relief marital home TF] = true \n SET [Marital home party MC] TO \"plaintiff\"\nEND IF"
  },
  "02h.2-Own or rent": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "02h.3-Marital home"
      },
      {
        "label": "No",
        "next": "03a-Plaintiff's phone"
      }
    ]
  },
  "06h.1-Marital home": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06h.2-Own or rent"
      },
      {
        "label": "No",
        "next": "08a-Defendant's phone number",
        "name": "Relief marital home TF",
        "value": "false"
      }
    ],
    "codeBefore": "GOTO \"08a-Defendant's phone number\"\n\nIF [Relief marital home TF] = true \n GOTO \"08a-Defendant's phone number\"\nEND IF"
  },
  "06h.2-Own or rent": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "06h.3-Marital home"
      },
      {
        "label": "No",
        "next": "08a-Defendant's phone number"
      }
    ]
  },
  "06h.3-Marital home": {
    "step": 2,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "08a-Defendant's phone number",
        "name": "Relief marital home TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "08a-Defendant's phone number",
        "name": "Relief marital home TF",
        "value": "false"
      }
    ],
    "codeAfter": "IF [Relief marital home TF] = true \n SET [Marital home party MC] TO \"defendant\"\nEND IF"
  },
  "02e-Warning": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "02f-Warning"
      }
    ]
  },
  "02f-Warning": {
    "learn": "What do you mean?",
    "help": "This means that you can be charged with a second degree Class A misdemeanor if you sign a statement knowing that the information in the document is not true. [ New York Penal Law Article 210 ]",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "02g-No fault divorce"
      }
    ]
  },
  "A06f-LOGIC WINDOW": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A07a-Service in New York"
      }
    ],
    "codeBefore": "IF  [Defendant in military TF] = false \n SET [Defendant not in military MC] TO \"service\"\n GOTO \"A07a-Service in New York\"\nELSE\n GOTO \"A07a-Service in New York\"\nEND IF"
  },
  "A05a.3i-Service after filing": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A05a.3ii-Service after filing exit"
      }
    ],
    "codeBefore": "IF [Summons filed DA]&lt;=[Summons served DA] \n GOTO \"A05b.1-More than 120 days\"\nEND IF"
  },
  "A05a.3ii-Service after filing exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ]
  },
  "03c-Common law marriage": {
    "learn": "What if I'm not sure?",
    "help": "If you're not sure, Exit the form. A sheet will print for you with more information.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "03d-Plaintiff in prison"
      },
      {
        "label": "Exit",
        "next": "C00-EXIT forwardingstep",
        "name": "Exit common law TF",
        "value": "true"
      }
    ]
  },
  "03d-Plaintiff in prison": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "C00-EXIT forwardingstep",
        "name": "Exit plaintiff in prison TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "04a.1-Age of parties"
      }
    ]
  },
  "04a.3-How many children": {
    "learn": "Why is this important?",
    "help": "This form makes papers for divorces where there are no children. If you have children, this form is not for you.",
    "step": 0,
    "fields": [
      {
        "name": "Children NU",
        "type": "numberpick",
        "label": "Select:",
        "required": true,
        "value": "0"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "04a.5-Children age"
      }
    ],
    "codeAfter": "IF  [Children NU] = 0 \n SET [Children of marriage TF] TO false\nELSE\n SET [Children of marriage TF] TO true\nEND IF"
  },
  "04a.7-Children exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ],
    "codeAfter": "SET [Exit children TF] TO true"
  },
  "02a.2-Backspace issue": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "02b-Introduction"
      }
    ]
  },
  "04h.1-Maintenance": {
    "learn": "What is maintenance?",
    "help": "Maintenance (also called spousal support or alimony) is financial support that one ex-spouse gives to another after they get divorced.\nYou have a right to ask for maintenance. Also, the person you married has a right to ask for maintenance from you. In most cases, when maintenance is an issue, the case will no longer be considered an uncontested divorce and",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04h.2-Maintenance exit"
      },
      {
        "label": "No",
        "next": "05a-Three steps"
      }
    ],
    "codeBefore": "IF [Parties have agreement TF] = true \n GOTO \"05a-Three steps\"\nEND IF"
  },
  "04h.2-Maintenance exit": {
    "learn": "What if I have a spousal support order from Family Court?",
    "help": "I'm sorry. Even if you have a spousal support order from Family Court, this form will not work for you.\nIf you want to ask for maintenance after your divorce, use the court forms available on the NY Courts website.",
    "step": 1,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "C00-EXIT forwardingstep"
      }
    ]
  },
  "04a.5-Children age": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04a.6-Emancipated children"
      },
      {
        "label": "No",
        "next": "04a.8-No minor children"
      }
    ],
    "codeBefore": "IF [Children NU] = \"0\" \n GOTO \"04b.1-Address abroad\"\nEND IF\n\nIF  [Children NU] = \"1\" \n SET [Is your child/ren TE] TO \"Is your child\"\n SET [child/ren TE] TO \"the child is not\"\nELSE\n SET [Is your child/ren TE] TO \"Are any of your children\"\n SET [child/ren TE] TO \"none of them are\"\nEND IF"
  },
  "04a.6-Emancipated children": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "04a.8-No minor children"
      },
      {
        "label": "No",
        "next": "04a.7-Children exit"
      }
    ],
    "codeBefore": "IF  [Children NU] = \"1\" \n SET [Is your child/ren TE] TO \"Is your child\"\n SET [all child/ren TE] TO \"your child is\"\nELSE\n SET [all child/ren TE] TO \"all of your children are\"\n SET [Is your child/ren TE] TO \"Are all of your children\"\nEND IF"
  },
  "A08b-Verified Complaint": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "A09a-Index number",
        "name": "Print complaint TF",
        "value": "false"
      },
      {
        "label": "No",
        "next": "A09a-Index number",
        "name": "Print complaint TF",
        "value": "true"
      }
    ],
    "codeBefore": "IF [Initiating papers MC] = \"complaint\" \n SET [Print complaint TF] TO false\n GOTO \"A09a-Index number\"\nEND IF"
  },
  "A04g.1-Affirmation signed before": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A04g.2-Affirmation signed before exit"
      },
      {
        "label": "Back",
        "next": "A04f.1-When signed"
      }
    ],
    "codeBefore": "IF [Summons filed DA]&lt;=[Affidavit signed DA] \n GOTO \"A08b-Verified Complaint\"\nEND IF"
  },
  "A04g.2-Affirmation signed before exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ]
  },
  "05c.2-Part A continue": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "05d-Part B"
      }
    ]
  },
  "04a.8-No minor children": {
    "learn": "What do you mean by \"children of the marriage\"?",
    "help": "\"Children of the marriage\" are children who are 20 years old or younger and were born or adopted by both you and the Defendant before or during the marriage. These children have a right to get child support.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "04b.1-Address abroad"
      }
    ],
    "codeBefore": "IF  [Children NU] = 1 \n SET [child/ren TE] TO \"child\"\n SET [child/ren is/are TE] TO \"is\"\nELSE\n SET [child/ren TE] TO \"children\"\n SET [child/ren is/are TE] TO \"are\"\nEND IF"
  },
  "A05b.7-More than 120 days Exit": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Exit",
        "next": "FAIL"
      }
    ]
  },
  "A05b.4-Extend time to serve": {
    "step": 0,
    "fields": [
      {
        "name": "Summons extended DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A05b.6-Extend time to serve"
      }
    ]
  },
  "A05b.6-Extend time to serve": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "A06a-Personally delivery"
      }
    ],
    "codeBefore": "SET [Summons served by DA] TO DATE([Summons extended DA]+120)\n\nIF NOT ([Summons served by DA]&gt;=[Summons served DA]) \n GOTO \"A05b.7-More than 120 days Exit\"\nEND IF"
  },
  "A04e.1-When given": {
    "step": 0,
    "fields": [
      {
        "name": "Summons served DA",
        "type": "datemdy",
        "label": "Date:",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "A04f.1-When signed"
      }
    ]
  },
  "02a.1-Instructions for filing": {
    "learn": "How much does it cost?",
    "help": "Using this form to make your papers is free.\nThe total court filing fees are about $335 (Part A fee is $210 and Part B fee is $125). If you do not have the money to pay the court fees, you can apply for a fee waiver during the form.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "02b-Introduction"
      }
    ]
  },
  "B01a.9-Guideline maintenance step": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeBefore": "SET [Guideline maintenance TF] TO true\n\nGOTO \"B02-Public computer\""
  },
  "A01a.2-Edit A or go to B": {
    "step": 0,
    "fields": [
      {
        "name": "Logged in options MC",
        "type": "radio",
        "label": "Change my answers in Part A: Starting the Divorce Case",
        "required": true,
        "value": "edit A"
      },
      {
        "name": "Logged in options MC",
        "type": "radio",
        "label": "Print my documents again from Part A",
        "required": true,
        "value": "print A"
      },
      {
        "name": "Logged in options MC",
        "type": "radio",
        "label": "Go to Part B: Getting Your Divorce Case on the Court Calendar",
        "required": true,
        "value": "continue"
      }
    ],
    "buttons": [
      {
        "label": "Continue"
      }
    ],
    "codeAfter": "IF [Logged in options MC] = \"edit A\" \n GOTO \"07a.1-Parties names\"\nEND IF\n\nIF [Logged in options MC] = \"print A\" \n GOTO \"A01b-Print Part A again\"\nEND IF\n\nIF [Logged in options MC] = \"continue\" \n GOTO \"A02-Initiating papers user\"\nEND IF"
  },
  "07c.1-Plaintiff name change": {
    "learn": "What do you mean by \"legal name change\"?",
    "help": "This means that you asked the court for a name change and you got a signed Name Change Order or you changed your name when you became a U.S. citizen.\nInclude a copy of the court order granting the name change or a certificate of naturalization or citizenship that has the new name with your papers.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "07c.2-Plaintiff new name",
        "name": "Plaintiff has new name TF",
        "value": "true"
      },
      {
        "label": "No",
        "next": "07d-Photo ID",
        "name": "Plaintiff has new name TF",
        "value": "false"
      }
    ],
    "codeAfter": "SET [Plaintiff full name TE] TO [Plaintiff name first TE] + \" \" + [Plaintiff name middle TE] + \" \" + [Plaintiff name last TE] + \" \" + [Plaintiff suffix MC]\nSET [Plaintiff current name TE] TO [Plaintiff name first TE]\nSET [Plaintiff new name first TE] TO NULL\nSET [Plaintiff new name middle TE] TO NULL\nSET [Plaintiff new name last TE] TO NULL\nSET [Plaintiff new suffix MC] TO NULL"
  },
  "07c.2-Plaintiff new name": {
    "step": 0,
    "fields": [
      {
        "name": "Plaintiff new name first TE",
        "type": "text",
        "label": "First:",
        "required": true
      },
      {
        "name": "Plaintiff new name middle TE",
        "type": "text",
        "label": "Middle:",
        "required": false
      },
      {
        "name": "Plaintiff new name last TE",
        "type": "text",
        "label": "Last:",
        "required": true
      },
      {
        "name": "Plaintiff new suffix MC",
        "type": "textpick",
        "label": "Suffix:",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "07c.4-Proof of new name"
      }
    ]
  },
  "08b.1-Defendant name change": {
    "learn": "What do you mean by \"legal name change\"?",
    "help": "This means that %%[Defendant current name TE]%% asked the court for a name change and got a signed Name Change Order or %%[Defendant current name TE]%% changed their name when they became a U.S. citizen.\nYou will have to prove that %%[Defendant current name TE]%% legally changed their name during the marriage. Include a copy of the signed Name Change Order or your Naturalization Certificate with your papers.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "08b.2-Defendant new name",
        "name": "Defendant has new name TF",
        "value": "true"
      },
      {
        "label": "No / Not sure",
        "next": "08e.1-Defendant military",
        "name": "Defendant has new name TF",
        "value": "false"
      }
    ],
    "codeAfter": "SET [Defendant current name TE] TO [Defendant name first TE]\nSET [Defendant full name TE] TO [Defendant name first TE] + \" \" + [Defendant name middle TE] + \" \" + [Defendant name last TE] + \" \" + [Defendant suffix MC]\nSET [Defendant new name first TE] TO NULL\nSET [Defendant new name middle TE] TO NULL\nSET [Defendant new name last TE] TO NULL\nSET [Defendant new suffix MC] TO NULL"
  },
  "08b.2-Defendant new name": {
    "step": 0,
    "fields": [
      {
        "name": "Defendant new name first TE",
        "type": "text",
        "label": "First:",
        "required": true
      },
      {
        "name": "Defendant new name middle TE",
        "type": "text",
        "label": "Middle:",
        "required": false
      },
      {
        "name": "Defendant new name last TE",
        "type": "text",
        "label": "Last:",
        "required": true
      },
      {
        "name": "Defendant new suffix MC",
        "type": "textpick",
        "label": "Suffix:",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "08b.4-Proof of new name"
      }
    ]
  },
  "07c.4-Proof of new name": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07d-Photo ID"
      }
    ]
  },
  "08b.4-Proof of new name": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "08e.1-Defendant military"
      }
    ]
  },
  "07d-Photo ID": {
    "learn": "What is a notary public?",
    "help": "A notary public is someone who is legally authorized to witness signatures on legal documents. The notary public usually charges a small fee.\nThe notary will check your identity and you may need to show a government-issued photo ID to show that you are who you say you are.",
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "07e.1-Plaintiff in prison"
      }
    ]
  },
  "B05-Submit Part B": {
    "learn": "What does the \"Download Your Form\" button look like?",
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Get Document",
        "next": "SUCCESS"
      },
      {
        "label": "Start again",
        "next": "A01b-Welcome back - Print A and B done"
      }
    ]
  },
  "C03-Submit Exit sheet": {
    "learn": "What does the \"Download Your Form\" button look like?",
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Get Document",
        "next": "SUCCESS"
      }
    ]
  },
  "B02-Public computer": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B03-One side"
      }
    ]
  },
  "B03-One side": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B04-Spanish instructions"
      }
    ]
  },
  "B04-Spanish instructions": {
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Yes / Sí",
        "next": "B05-Submit Part B",
        "name": "Print Spanish TF",
        "value": "true"
      },
      {
        "label": "No / No",
        "next": "B05-Submit Part B",
        "name": "Print Spanish TF",
        "value": "false"
      }
    ]
  },
  "A03b.2-No index number": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Yes",
        "next": "02a-Plaintiff 2 years residency"
      },
      {
        "label": "No / Exit",
        "next": "FAIL"
      }
    ],
    "codeAfter": "SET [Part A filed TF] TO false"
  },
  "B01a.8-Contempt of Court": {
    "learn": "What do you mean?",
    "help": "This means that if you or %%[Defendant current name TE]%% learns about a legal or financial issue that could affect the marital property, the other person must be notified within 10 days in writing.",
    "step": 4,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "B01a.10-Health insurance"
      }
    ]
  },
  "BL-00-Disclaimer": {
    "step": 0,
    "fields": [],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-00-Your name"
      }
    ]
  },
  "BL-00-Your name": {
    "step": 0,
    "fields": [
      {
        "name": "Brodsky client first name TE",
        "type": "text",
        "label": "First name",
        "required": true
      },
      {
        "name": "Brodsky client last name TE",
        "type": "text",
        "label": "Last name",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "00-Introduction"
      }
    ]
  },
  "BL-01-Children information": {
    "step": 1,
    "fields": [
      {
        "name": "Brodsky minor children MC",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "yes",
        "groupLabel": "Do you have children from this marriage?"
      },
      {
        "name": "Brodsky minor children MC",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "no",
        "groupLabel": ""
      },
      {
        "name": "Brodsky children JSON TE",
        "type": "childrenrepeat",
        "required": false
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-01a-Children health plan"
      }
    ]
  },
  "BL-01a-Children health plan": {
    "step": 1,
    "fields": [
      {
        "name": "Brodsky children covered by health plan TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Are your children covered by a health care plan?"
      },
      {
        "name": "Brodsky children covered by health plan TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky children group health plan name TE",
        "type": "text",
        "label": "Children's plan — Group health plan (name)",
        "required": false,
        "dependsTf": "Brodsky children covered by health plan TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky children health plan address TE",
        "type": "text",
        "label": "Children's plan — Address (plan or administrator)",
        "required": false,
        "dependsTf": "Brodsky children covered by health plan TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky children health plan member id TE",
        "type": "text",
        "label": "Children's plan — Identification / member number",
        "required": false,
        "dependsTf": "Brodsky children covered by health plan TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky children health plan group number TE",
        "type": "text",
        "label": "Children's plan — Group number",
        "required": false,
        "dependsTf": "Brodsky children covered by health plan TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky children health plan administrator TE",
        "type": "text",
        "label": "Children's plan — Plan administrator",
        "required": false,
        "dependsTf": "Brodsky children covered by health plan TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky children health plan coverage type TE",
        "type": "text",
        "label": "Children's plan — Type of coverage (medical, dental, vision)",
        "required": false,
        "dependsTf": "Brodsky children covered by health plan TF",
        "dependsTfExpected": "true"
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-01b-Group health plan"
      }
    ],
    "codeBefore": "IF [Brodsky minor children MC] = \"no\"\n GOTO \"BL-01b-Group health plan\"\nEND IF"
  },
  "BL-01b-Group health plan": {
    "step": 1,
    "fields": [
      {
        "name": "Brodsky group health plan name TE",
        "type": "text",
        "label": "Group health plan (name)",
        "required": true
      },
      {
        "name": "Brodsky health plan address TE",
        "type": "text",
        "label": "Address (for the plan or administrator)",
        "required": true
      },
      {
        "name": "Brodsky health plan member id TE",
        "type": "text",
        "label": "Identification / member number",
        "required": true
      },
      {
        "name": "Brodsky health plan group number TE",
        "type": "text",
        "label": "Group number",
        "required": true
      },
      {
        "name": "Brodsky health plan administrator TE",
        "type": "text",
        "label": "Plan administrator",
        "required": true
      },
      {
        "name": "Brodsky health plan coverage type TE",
        "type": "text",
        "label": "Type of coverage (e.g. medical, dental, vision)",
        "required": true
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "BL-01c-Children custody and support"
      }
    ]
  },
  "BL-01c-Children custody and support": {
    "step": 1,
    "fields": [
      {
        "name": "Brodsky children other residence 5y TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "In the last five years, have any marital children lived at any address other than the home address(es) you listed?"
      },
      {
        "name": "Brodsky children other residence 5y TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky children other residence which child TE",
        "type": "childselect",
        "label": "Which child (or indicate multiple)? Use the dropdown, or choose \"Multiple children\" and explain below.",
        "required": false,
        "dependsTf": "Brodsky children other residence 5y TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky children other residence detail TE",
        "type": "text",
        "label": "Other address(es): street, city, state, ZIP, and approximate dates lived there (repeat in this box if multiple)",
        "required": false,
        "dependsTf": "Brodsky children other residence 5y TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky plaintiff physical custody minor TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Do you have physical custody of any minor child from this marriage (under age 18)?"
      },
      {
        "name": "Brodsky plaintiff physical custody minor TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky plaintiff physical custody which children TE",
        "type": "text",
        "label": "If Yes: list the full name of each minor child who lives with you (physical custody)",
        "required": false,
        "dependsTf": "Brodsky plaintiff physical custody minor TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky plaintiff legal custody minor TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Do you have legal custody of any minor child from this marriage (under age 18)?"
      },
      {
        "name": "Brodsky plaintiff legal custody minor TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky plaintiff legal custody which children TE",
        "type": "text",
        "label": "If Yes: list the full name of each minor child over whom you have legal custody",
        "required": false,
        "dependsTf": "Brodsky plaintiff legal custody minor TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky defendant physical custody minor TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Does your spouse have physical custody of any minor child from this marriage (under age 18)?"
      },
      {
        "name": "Brodsky defendant physical custody minor TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky defendant physical custody which children TE",
        "type": "text",
        "label": "If Yes: list the full name of each minor child who lives primarily with your spouse (physical custody)",
        "required": false,
        "dependsTf": "Brodsky defendant physical custody minor TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky defendant legal custody minor TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Does your spouse have legal custody of any minor child from this marriage (under age 18)?"
      },
      {
        "name": "Brodsky defendant legal custody minor TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky defendant legal custody which children TE",
        "type": "text",
        "label": "If Yes: list the full name of each minor child over whom your spouse has legal custody",
        "required": false,
        "dependsTf": "Brodsky defendant legal custody minor TF",
        "dependsTfExpected": "true"
      },
      {
        "name": "Brodsky child support either pays TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Is either you or your spouse paying child support for any unemancipated child (under 21)?"
      },
      {
        "name": "Brodsky child support either pays TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky child support court order TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Is there a court order about child support (existing order to pay or receive)?"
      },
      {
        "name": "Brodsky child support court order TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "01-About Plaintiff and Defendant"
      }
    ],
    "codeBefore": "IF [Brodsky minor children MC] = \"no\"\nIF [Brodsky after children route MC] = \"settlement\"\nGOTO \"04e.1-Written agreement\"\nELSE\nGOTO \"01-About Plaintiff and Defendant\"\nEND IF\nEND IF",
    "codeAfter": "IF [Brodsky after children route MC] = \"settlement\"\n GOTO \"04e.1-Written agreement\"\nELSE\n GOTO \"01-About Plaintiff and Defendant\"\nEND IF"
  },
  "BL-02-Employment military": {
    "step": 2,
    "fields": [
      {
        "name": "Brodsky plaintiff military TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Are you currently serving in the U.S. military?"
      },
      {
        "name": "Brodsky plaintiff military TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky defendant military TF",
        "type": "radio",
        "label": "Yes",
        "required": true,
        "value": "true",
        "groupLabel": "Is %%[Defendant current name TE]%% currently serving in the U.S. military?"
      },
      {
        "name": "Brodsky defendant military TF",
        "type": "radio",
        "label": "No",
        "required": true,
        "value": "false",
        "groupLabel": ""
      },
      {
        "name": "Brodsky plaintiff employer TE",
        "type": "text",
        "label": "Your employer (or Self-employed / unemployed)",
        "required": false
      },
      {
        "name": "Brodsky plaintiff annual income TE",
        "type": "text",
        "label": "Your approximate annual income",
        "required": true
      },
      {
        "name": "Brodsky defendant employer TE",
        "type": "text",
        "label": "%%[Defendant current name TE]%%'s employer (or Self-employed / unemployed)",
        "required": false
      },
      {
        "name": "Brodsky defendant annual income TE",
        "type": "text",
        "label": "%%[Defendant current name TE]%%'s approximate annual income",
        "required": true
      },
      {
        "name": "Brodsky plaintiff race MC",
        "type": "textpick",
        "label": "Your race",
        "required": true,
        "listData": "<OPTION VALUE=\"White\">White</OPTION><OPTION VALUE=\"Black or African American\">Black or African American</OPTION><OPTION VALUE=\"American Indian or Alaska Native\">American Indian or Alaska Native</OPTION><OPTION VALUE=\"Asian\">Asian</OPTION><OPTION VALUE=\"Native Hawaiian or Other Pacific Islander\">Native Hawaiian or Other Pacific Islander</OPTION><OPTION VALUE=\"Two or more races\">Two or more races</OPTION><OPTION VALUE=\"Some other race\">Some other race</OPTION>",
        "learn": "Why do you need this?",
        "help": "Information about a spouse's race in a New York divorce is generally collected for administrative, statistical, and data-gathering purposes on court forms, such as the Note of Issue or summons. It is not a factor used to determine grounds for divorce, divide property, or decide child custody."
      },
      {
        "name": "Brodsky defendant race MC",
        "type": "textpick",
        "label": "%%[Defendant current name TE]%%'s race",
        "required": true,
        "listData": "<OPTION VALUE=\"White\">White</OPTION><OPTION VALUE=\"Black or African American\">Black or African American</OPTION><OPTION VALUE=\"American Indian or Alaska Native\">American Indian or Alaska Native</OPTION><OPTION VALUE=\"Asian\">Asian</OPTION><OPTION VALUE=\"Native Hawaiian or Other Pacific Islander\">Native Hawaiian or Other Pacific Islander</OPTION><OPTION VALUE=\"Two or more races\">Two or more races</OPTION><OPTION VALUE=\"Some other race\">Some other race</OPTION>",
        "learn": "Why do you need this?",
        "help": "Information about a spouse's race in a New York divorce is generally collected for administrative, statistical, and data-gathering purposes on court forms, such as the Note of Issue or summons. It is not a factor used to determine grounds for divorce, divide property, or decide child custody."
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "09-Public assistance"
      }
    ],
    "codeAfter": "SET [Defendant in military TF] TO [Brodsky defendant military TF]"
  },
  "BL-03-Party history": {
    "step": 2,
    "fields": [
      {
        "name": "Brodsky plaintiff DOB DA",
        "type": "datemdy",
        "label": "Your date of birth",
        "required": true
      },
      {
        "name": "Brodsky defendant DOB DA",
        "type": "datemdy",
        "label": "%%[Defendant current name TE]%%'s date of birth",
        "required": true
      },
      {
        "name": "Brodsky plaintiff state of birth TE",
        "type": "text",
        "label": "Your state or country of birth",
        "required": true
      },
      {
        "name": "Brodsky defendant state of birth TE",
        "type": "text",
        "label": "%%[Defendant current name TE]%%'s state or country of birth",
        "required": true
      },
      {
        "name": "Brodsky plaintiff education MC",
        "type": "textpick",
        "label": "Your highest level of education completed",
        "required": true,
        "listData": "<OPTION VALUE=\"0\">Prefer not to say</OPTION><OPTION VALUE=\"1\">Grade school or less</OPTION><OPTION VALUE=\"2\">Some high school, no diploma</OPTION><OPTION VALUE=\"3\">High school graduate or GED</OPTION><OPTION VALUE=\"4\">Some college or associate degree</OPTION><OPTION VALUE=\"5\">Bachelor's degree</OPTION><OPTION VALUE=\"6\">Graduate or professional degree</OPTION>"
      },
      {
        "name": "Brodsky defendant education MC",
        "type": "textpick",
        "label": "%%[Defendant current name TE]%%'s highest level of education completed",
        "required": true,
        "listData": "<OPTION VALUE=\"0\">Prefer not to say</OPTION><OPTION VALUE=\"1\">Grade school or less</OPTION><OPTION VALUE=\"2\">Some high school, no diploma</OPTION><OPTION VALUE=\"3\">High school graduate or GED</OPTION><OPTION VALUE=\"4\">Some college or associate degree</OPTION><OPTION VALUE=\"5\">Bachelor's degree</OPTION><OPTION VALUE=\"6\">Graduate or professional degree</OPTION>"
      },
      {
        "name": "Brodsky plaintiff prior marriages MC",
        "type": "radio",
        "label": "None",
        "required": true,
        "value": "0",
        "groupLabel": "How many previous marriages have you had (before this one)?"
      },
      {
        "name": "Brodsky plaintiff prior marriages MC",
        "type": "radio",
        "label": "One",
        "required": true,
        "value": "1",
        "groupLabel": ""
      },
      {
        "name": "Brodsky plaintiff prior marriages MC",
        "type": "radio",
        "label": "Two",
        "required": true,
        "value": "2",
        "groupLabel": ""
      },
      {
        "name": "Brodsky plaintiff prior marriages MC",
        "type": "radio",
        "label": "Three or more",
        "required": true,
        "value": "3",
        "groupLabel": ""
      },
      {
        "name": "Brodsky defendant prior marriages MC",
        "type": "radio",
        "label": "None",
        "required": true,
        "value": "0",
        "groupLabel": "How many previous marriages has %%[Defendant current name TE]%% had (before this one)?"
      },
      {
        "name": "Brodsky defendant prior marriages MC",
        "type": "radio",
        "label": "One",
        "required": true,
        "value": "1",
        "groupLabel": ""
      },
      {
        "name": "Brodsky defendant prior marriages MC",
        "type": "radio",
        "label": "Two",
        "required": true,
        "value": "2",
        "groupLabel": ""
      },
      {
        "name": "Brodsky defendant prior marriages MC",
        "type": "radio",
        "label": "Three or more",
        "required": true,
        "value": "3",
        "groupLabel": ""
      },
      {
        "name": "Brodsky plaintiff prior marriages ended MC",
        "type": "textpick",
        "label": "How did your prior marriage(s) end (before this marriage)?",
        "required": true,
        "listData": "<OPTION VALUE=\"none\">Not applicable (no prior marriages)</OPTION><OPTION VALUE=\"divorce\">Divorce</OPTION><OPTION VALUE=\"death\">Death of spouse</OPTION><OPTION VALUE=\"annulment\">Annulment</OPTION><OPTION VALUE=\"other\">Other</OPTION>",
        "help": "Choose “Not applicable” if you had no prior marriages."
      },
      {
        "name": "Brodsky defendant prior marriages ended MC",
        "type": "textpick",
        "label": "How did %%[Defendant current name TE]%%'s prior marriage(s) end (before this marriage)?",
        "required": true,
        "listData": "<OPTION VALUE=\"none\">Not applicable (no prior marriages)</OPTION><OPTION VALUE=\"divorce\">Divorce</OPTION><OPTION VALUE=\"death\">Death of spouse</OPTION><OPTION VALUE=\"annulment\">Annulment</OPTION><OPTION VALUE=\"other\">Other</OPTION>",
        "help": "Choose “Not applicable” if your spouse had no prior marriages."
      }
    ],
    "buttons": [
      {
        "label": "Continue",
        "next": "09-FORWARDING STEP"
      }
    ],
    "codeAfter": "IF [Brodsky plaintiff prior marriages MC] = \"0\"\n SET [Brodsky plaintiff prior marriages ended MC] TO \"none\"\nEND IF\n\nIF [Brodsky defendant prior marriages MC] = \"0\"\n SET [Brodsky defendant prior marriages ended MC] TO \"none\"\nEND IF"
  }
};
const PAGES = {};
for (const [id, page] of Object.entries(PAGES_RAW)) {
  PAGES[id] = { ...page, text: textById[id] ?? page.text ?? '' };
}

// Complete interview data
export const INTERVIEW_DATA = {
  meta: INTERVIEW_META,
  variables: VARIABLES,
  pages: PAGES
};

export default INTERVIEW_DATA;
