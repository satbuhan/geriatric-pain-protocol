// content.js — Pharmacological pain management in elderly patients: a
// stepwise analgesic decision algorithm (assessment -> severity-tiered
// drug selection -> ADR monitoring -> organ/cognitive-specific caveats ->
// core prescribing principles). Data only. Rendering logic lives in app.js.
// Co-authored by Dr. Özgür Karcıoğlu and Dr. Satuk Buğra Han Bozatlı.
// Source: Figure 1 ("Pharmacological decision tree with specific agents,
// routes, and dose ranges...") of an unpublished, blinded manuscript
// submission formatted for BMJ, "Use of analgesics in older individuals:
// Pitfalls and caveats" (2026) — a systematic literature search (2015-2026,
// RCTs, six databases) on analgesic efficacy/safety in elderly patients in
// the acute setting. See METHODOLOGY.md for the fidelity rules this file
// follows: label/sub text is byte-for-byte as authored (figure boxes);
// meaning/rationale/cautions/refs are added research drawn from the
// manuscript's own text and tables.
//
// WORKFLOW NOTE: the source document handed to this session was itself a
// Gemini-condensed, box-by-box breakdown of the manuscript (the same kind
// of structured condensation used for cwa-blood-gas-protocol,
// ccb-toxicity-protocol and haloperidol-adjunct-protocol), already
// annotated throughout with its own "[DISCREPANCY / AMBIGUITY NOTE]" and
// "[EXTERNAL GUIDELINE FLAG]" tags documenting every tension between the
// figure's exact box text and the manuscript's own prose/tables. Those
// tensions are preserved below in each affected node's `cautions`, not
// silently resolved — including a direct self-contradiction the source
// material itself flags: Box 3C.2 (morphine) says "reduce dose if eGFR
// <30" while Box 6.1 (renal impairment) says "Avoid morphine" at the same
// threshold, in the same figure.
//
// REFERENCES — verification policy for this tool (a deliberate,
// author-directed exception, not an oversight — the FOURTH tool in this
// atlas to carry this exception, after epinephrine-revisited-protocol,
// ketamine-indications-protocol and haloperidol-adjunct-protocol): by
// explicit author instruction for this build — "yıne kendıne yuk etme.
// gemoınının dogrulamalarını kabul et. gucumuzu ıdarelı kullanalım" (don't
// overload yourself; accept Gemini's own verification pass; use effort
// economically) — this 52-entry bibliography is transcribed directly from
// the manuscript's own reference list (via the Gemini condensation) and
// was NOT independently re-verified against primary sources for this
// build. Every entry's kind field states this plainly: "As cited in the
// manuscript; not independently re-verified." DOIs/PMIDs/URLs are
// reproduced exactly as given in the manuscript's reference list. See
// METHODOLOGY.md's "Citation verification" section for the full precedent
// record.

// Date this tool's content and citations were last built/checked
// together (see assets/app.js's References summary).
const VERIFIED = "2026-11-10";

const REFERENCES = [
  { id: 1, kind: "As cited in the manuscript; not independently re-verified.", text: "Pickering G, Kotlinska-Lemieszek A, Krcevski Skvarc N, et al. Pharmacological pain treatment in older persons. Drugs Aging. 2024;41(12):959–976.", url: "https://doi.org/10.1007/s40266-024-01151-8" },
  { id: 2, kind: "As cited in the manuscript; not independently re-verified.", text: "Smolka V, Olotu C, Modreker M, Drebenstedt C, Ardeleanu P, Gehrke I. Pain management in the perioperative orthogeriatric setting: Recommendations of the special interest group Orthogeriatrics of the German Geriatrics Society. Z Gerontol Geriatr. 2026;59(2):99–104.", url: "https://doi.org/10.1007/s00391-026-02556-3" },
  { id: 3, kind: "As cited in the manuscript; not independently re-verified.", text: "Halaszynski T. Must-Known Special Considerations for Acute Pain Management in Geriatric Patient Population. In: Li J, Jiang W, Vadivelu N (eds) First Aid Perioperative Ultrasound. Springer, Cham. 2023.", url: "https://doi.org/10.1007/978-3-031-21291-8_36" },
  { id: 4, kind: "As cited in the manuscript; not independently re-verified.", text: "Hwang U, Platts-Mills TF. Acute pain management in older adults in the emergency department. Clin Geriatr Med. 2013;29(1):151–64.", url: "https://doi.org/10.1016/j.cger.2012.10.006" },
  { id: 5, kind: "As cited in the manuscript; not independently re-verified.", text: "Faria CMS, Fonseca LMB, Fonseca JMB, et al. Management of chronic pain in elderly patients: the central role of nurses in multidisciplinary care. Geriatrics. 2025;10(4):110.", url: "https://doi.org/10.3390/geriatrics10040110" },
  { id: 6, kind: "As cited in the manuscript; not independently re-verified.", text: "Sunwoo Y, Eom SH, Yun JS, et al. Real-World Data-Derived Pharmacovigilance on Drug-Induced Cognitive Impairment Utilizing a Nationwide Spontaneous Adverse Reporting System. Medicina (Kaunas). 2024;60(7):1028.", url: "https://doi.org/10.3390/medicina60071028" },
  { id: 7, kind: "As cited in the manuscript; not independently re-verified.", text: "Szymanski D, Pinto-Coelho D, Pinto-Coelho C, et al. Influence of ageing on the pharmacodynamics and pharmacokinetics of chronically administered medicines in geriatric patients: a review. Clin Pharmacokinet. 2025;64:289–305.", url: "https://doi.org/10.1007/s40262-024-01466-0" },
  { id: 8, kind: "As cited in the manuscript; not independently re-verified.", text: "Leung DKY, Fong APC, Wong FHC, Liu T, Wong GHY, Lum TYS. Nonpharmacological interventions for chronic pain management in older adults: a systematic review and meta-analysis. The Gerontologist. 2024;64(6):gnae010.", url: "https://doi.org/10.1093/geront/gnae010" },
  { id: 9, kind: "As cited in the manuscript; not independently re-verified.", text: "Baria AT, Morvant A, Mikulics J, McCormick ZL. Pain control in the older person. In: Tan KY, Lee DJK, Ng P (eds) Mastering Geriatric Surgery. Springer, Singapore. 2025.", url: "https://doi.org/10.1007/978-981-95-0665-1_8" },
  { id: 10, kind: "As cited in the manuscript; not independently re-verified.", text: "Nakao M, Okamura A. An update on non-pharmacological interventions for pain relief. Cell Reports Medicine. 2025;6:101943.", url: "https://doi.org/10.1016/j.xcrm.2025.101943" },
  { id: 11, kind: "As cited in the manuscript; not independently re-verified.", text: "American Psychological Association (APA). APA Clinical Practice Guideline for Psychological and Other Nonpharmacological Treatment of Chronic Musculoskeletal Pain in Adults. Washington, DC: APA; 2024.", url: "https://www.apa.org/practice/guidelines/nonpharmacological-treatment-chronic-musculoskeletal-pain.pdf" },
  { id: 12, kind: "As cited in the manuscript; not independently re-verified.", text: "Vlasica K, Hall A, Rehman MA, Notas G, Shenvi C, Motov S. Emergency department pain management in special populations. Turk J Emerg Med. 2025;25(3):159–77.", url: "https://doi.org/10.4103/tjem.tjem_141_25" },
  { id: 13, kind: "As cited in the manuscript; not independently re-verified.", text: "Krajewska A, Tlustochowicz K, Kowalik A, Malecka-Wojciesko E. Comparison of the Clinical Course, Management and Outcomes of Acute Pancreatitis in Aged and Young Patients. Biomedicines. 2026;14(1):139.", url: "https://doi.org/10.3390/biomedicines14010139" },
  { id: 14, kind: "As cited in the manuscript; not independently re-verified.", text: "American Geriatrics Society Panel on Pharmacological Management of Persistent Pain in Older Persons. Pharmacological management of persistent pain in older persons. J Am Geriatr Soc. 2009;57(8):1331–46.", url: "https://doi.org/10.1111/j.1532-5415.2009.02376.x" },
  { id: 15, kind: "As cited in the manuscript; not independently re-verified.", text: "Schaffer DH, Murray BP, Khazaeni B. Acetaminophen Toxicity. 2026 Mar 26. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 Jan–. PMID: 28722946.", url: "https://pubmed.ncbi.nlm.nih.gov/28722946/" },
  { id: 16, kind: "As cited in the manuscript; not independently re-verified.", text: "Conaghan PG, Arden N, Avouac B, Migliore A, Rizzoli R. Safety of Paracetamol in Osteoarthritis: What Does the Literature Say? Drugs Aging. 2019;36(Suppl 1):7-14.", url: "https://doi.org/10.1007/s40266-019-00658-9" },
  { id: 17, kind: "As cited in the manuscript; not independently re-verified.", text: "2023 American Geriatrics Society Beers Criteria Update Expert Panel. American Geriatrics Society 2023 updated AGS Beers Criteria for potentially inappropriate medication use in older adults. J Am Geriatr Soc. 2023;71(7):2052–2081.", url: "https://doi.org/10.1111/jgs.18372" },
  { id: 18, kind: "As cited in the manuscript; not independently re-verified.", text: "García-Poza P, de Abajo FJ, Gil MJ, Chacón A, Bryant V, García-Rodríguez LA. Risk of ischemic stroke associated with non-steroidal anti-inflammatory drugs and paracetamol: a population-based case-control study. J Thromb Haemost. 2015;13(5):708-18.", url: "https://doi.org/10.1111/jth.12855" },
  { id: 19, kind: "As cited in the manuscript; not independently re-verified.", text: "Rahme E, Barkun A, Nedjar H, Gaugris S, Watson D. Hospitalizations for upper and lower GI events associated with traditional NSAIDs and acetaminophen among the elderly in Quebec, Canada. Am J Gastroenterol. 2008;103(4):872-82.", url: "https://doi.org/10.1111/j.1572-0241.2008.01811.x" },
  { id: 20, kind: "As cited in the manuscript; not independently re-verified.", text: "Wongrakpanich S, Wongrakpanich A, Melhado K, Rangaswami J. A Comprehensive Review of Non-Steroidal Anti-Inflammatory Drug Use in The Elderly. Aging Dis. 2018;9(1):143–150.", url: "https://doi.org/10.14336/AD.2017.0306" },
  { id: 21, kind: "As cited in the manuscript; not independently re-verified.", text: "Emergency Triage Education Kit Triage Workbook. Commonwealth of Australia; 2009.", url: "https://www.health.gov.au/sites/default/files/2022-12/triage-workbook-emergency-triage-education-kit.pdf" },
  { id: 22, kind: "As cited in the manuscript; not independently re-verified.", text: "Yanaizumi R, Nagamine Y, Harada S, et al. Opioid use in patients aged 90 years or older with terminal cancer in a palliative care unit: a single-center retrospective observational study. Support Care Cancer. 2025;33(12):1018.", url: "https://doi.org/10.1007/s00520-025-10122-7" },
  { id: 23, kind: "As cited in the manuscript; not independently re-verified.", text: "Motilall H, Maberry K, Quinter C. A review of medications listed in the 2023 Beers Criteria. Transformative Medicine. 2025;4(2):32–37.", url: "https://doi.org/10.54299/tmed/zwnc6661" },
  { id: 24, kind: "As cited in the manuscript; not independently re-verified.", text: "Warner NS, Mielke MM, Verdoorn BP, Knopman DS, Hooten WM, Habermann EB, Warner DO. Pain, Opioid Analgesics, and Cognition: A Conceptual Framework in Older Adults. Pain Med. 2023;24(2):171–181.", url: "https://doi.org/10.1093/pm/pnac113" },
  { id: 25, kind: "As cited in the manuscript; not independently re-verified.", text: "Calsina-Berna A, Gonzalez-Barboteo J, Esteve A, et al. Opioid-induced neurotoxicity after opioid conversion to methadone in patients with cancer pain using the stop-and-go method: A multicenter retrospective cohort study. Support Care Cancer. 2026;34(2):83.", url: "https://doi.org/10.1007/s00520-025-10311-4" },
  { id: 26, kind: "As cited in the manuscript; not independently re-verified.", text: "Dayer LE, Peng C, Williams AJ, et al. Factors Contributing to Opioid Overprescribing at Surgical Discharge. J Surg Res. 2025;306:224–229.", url: "https://doi.org/10.1016/j.jss.2024.11.034" },
  { id: 27, kind: "As cited in the manuscript; not independently re-verified.", text: "Schwenk ES, Pradhan B, Nalamasu R, Stolle L, Wainer IW, Cirullo M, et al. Ketamine in the past, present, and future: mechanisms, metabolites, and toxicity. Curr Pain Headache Rep. 2021;25(9):57.", url: "https://doi.org/10.1007/s11916-021-00977-w" },
  { id: 28, kind: "As cited in the manuscript; not independently re-verified.", text: "Fallon M, Giusti R, Aielli F, Hoskin P, Rolke R, Sharma M, et al; ESMO Guidelines Committee. Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines. Ann Oncol. 2018;29(Suppl 4):iv166–iv191.", url: "https://doi.org/10.1093/annonc/mdy152" },
  { id: 29, kind: "As cited in the manuscript; not independently re-verified.", text: "Owsiany MT, Hawley CE, Triantafylidis LK, Paik JM. Opioid management in older adults with chronic kidney disease: a review. Am J Med. 2019;132(12):1386–1393.e4.", url: "https://doi.org/10.1016/j.amjmed.2019.06.013" },
  { id: 30, kind: "As cited in the manuscript; not independently re-verified.", text: "Palliative Care Network of Wisconsin (PCNOW). Opioid use in renal failure. Fast Facts and Concepts, 5th edn. 2024.", url: "https://www.mypcnow.org/fast-fact/opioid-use-in-renal-failure/" },
  { id: 31, kind: "As cited in the manuscript; not independently re-verified.", text: "Wissa S, Puzantian T. Pain and opioid use in older adults. The Carlat Geriatric Psychiatry Report. 2025. Carlat Publishing. (Accessed 22 March 2026)", url: "https://www.thecarlatreport.com/articles/5503-pain-and-opioid-use-in-older-adults" },
  { id: 32, kind: "As cited in the manuscript; not independently re-verified.", text: "Odoma VA, Senter K, Ukor I, Okoye E, Maher D, Ashraf A. Opioid prescription in patients with chronic kidney disease: a systematic review. Cureus. 2023;15(9):e45485.", url: "https://doi.org/10.7759/cureus.45485" },
  { id: 33, kind: "As cited in the manuscript; not independently re-verified.", text: "Kasirer Y, Shah V, Yoon EW, Bromiker R, Mcnair C, Taddio A. Safety of fentanyl for peripherally inserted central catheter in non-intubated infants in the neonatal intensive care unit. J Perinatol. 2018;38(5):526–529.", url: "https://doi.org/10.1038/s41372-018-0101-3" },
  { id: 34, kind: "As cited in the manuscript; not independently re-verified.", text: "Burns G, DeRienz RT, Baker DD, Casavant M, Spiller HA. Could chest wall rigidity be a factor in rapid death from illicit fentanyl abuse? Clin Toxicol (Phila). 2016;54(5):420–3.", url: "https://doi.org/10.3109/15563650.2016.1157722" },
  { id: 35, kind: "As cited in the manuscript; not independently re-verified.", text: "Miner NB, Schutzer WE, Zarnegarnia Y, Janowsky A, Torralva R. Fentanyl causes naloxone-resistant vocal cord closure: A platform for testing opioid overdose treatments. Drug Alcohol Depend. 2021;227:108974.", url: "https://doi.org/10.1016/j.drugalcdep.2021.108974" },
  { id: 36, kind: "As cited in the manuscript; not independently re-verified.", text: "Pergolizzi JV Jr, Webster LR, Vortsman E, Ann LeQuang J, Raffa RB. Wooden Chest syndrome: The atypical pharmacology of fentanyl overdose. J Clin Pharm Ther. 2021;46(6):1505–1508.", url: "https://doi.org/10.1111/jcpt.13484" },
  { id: 37, kind: "As cited in the manuscript; not independently re-verified.", text: "Palliative Care Network of Wisconsin (PCNOW). Opioid use in liver failure. Fast Facts and Concepts. 2020.", url: "https://www.mypcnow.org/fast-fact/opioid-use-in-liver-failure/" },
  { id: 38, kind: "As cited in the manuscript; not independently re-verified.", text: "O'Mahony D, Cherubini A, Guiteras AR, et al. STOPP/START criteria for potentially inappropriate prescribing in older people: version 3. Eur Geriatr Med. 2023;14(4):625–632.", url: "https://doi.org/10.1007/s41999-023-00777-y" },
  { id: 39, kind: "As cited in the manuscript; not independently re-verified.", text: "Lawson E, Singla P, Adler J, Argoff CE, Bettinger JJ, Bhaskar A, Clarke H, Eidelman A, Hirani S, Hooten WM, Tishler J, Wallace MS, Barreveld AM. Topical analgesics for neuropathic pain: an evidence-informed guide for the practicing clinician. Pain Med. 2026;27(3):279–316.", url: "https://doi.org/10.1093/pm/pnaf130" },
  { id: 40, kind: "As cited in the manuscript; not independently re-verified.", text: "Terolli D, Stanzione C. Optimizing neuropathic pain treatment in older adults. US Pharm. 2026;51(3):33-37. (Accessed 22 March 2026)", url: "https://www.uspharmacist.com/article/optimizing-neuropathic-pain-treatment-in-older-adults" },
  { id: 41, kind: "As cited in the manuscript; not independently re-verified.", text: "Jung H, Liu SH, Hume AL, Dosa D, Nunes AP, Baek J, Lapane KL. The Prevalence of Central Nervous System-Active Polypharmacy in US Nursing Homes. J Am Med Dir Assoc. 2026 Mar 24:106178.", url: "https://doi.org/10.1016/j.jamda.2026.106178" },
  { id: 42, kind: "As cited in the manuscript; not independently re-verified.", text: "Semel D, Murphy TK, Zlateva G, Cheung R, Emir B. Evaluation of the safety and efficacy of pregabalin in older patients with neuropathic pain: results from a pooled analysis of 11 clinical studies. BMC Fam Pract. 2010;11:85.", url: "https://doi.org/10.1186/1471-2296-11-85" },
  { id: 43, kind: "As cited in the manuscript; not independently re-verified.", text: "Odutola O, Mahfouda S, Tran P, Wood K. IV ketamine infusion therapy for chronic pain: a systematic review and meta-analysis. Medicine Advances. 2023;1(2):95–107.", url: "https://doi.org/10.1002/med4.45" },
  { id: 44, kind: "As cited in the manuscript; not independently re-verified.", text: "Motov S, Mann S, Drapkin J, Butt M, Likourezos A, Yetter E, et al. Intravenous subdissociative-dose ketamine versus morphine for acute geriatric pain in the Emergency Department: A randomized controlled trial. Am J Emerg Med. 2019;37(2):220-227.", url: "https://doi.org/10.1016/j.ajem.2018.05.030" },
  { id: 45, kind: "As cited in the manuscript; not independently re-verified.", text: "Park K, Kim JJ, Oh SB, Oh SY, Hong YJ, Kim SJ, Park EJ, Choi N, Shin SH, Kim S, Ko H. A phase II study on efficacy and safety of continuous intravenous infusion of ketamine as adjuvant to opioids in terminally ill cancer patients with refractory cancer pain (CIVIK trial). Palliat Med. 2025;42(3):244–252.", url: "https://doi.org/10.1177/10499091241252977" },
  { id: 46, kind: "As cited in the manuscript; not independently re-verified.", text: "Lozano-Ortega MC, Salvador-Rosa A, Bravo-Jose P, Palacios-Ortega F, Perez-Molto I, Ruiz-Ramos J. Clinical management of polypharmacy in the elderly population. J Am Osteopath Assoc. 2023;15(3).", url: "https://acofp.org/news-and-publications/journal/article-detail/vol-15-no-3-(2023)-summer-2023/clinical-management-polypharmacy-elderly-population" },
  { id: 47, kind: "As cited in the manuscript; not independently re-verified.", text: "Tesfaye ZT, Horsa BA, Yismaw MB. Impact of pharmacist-led deprescribing interventions on medication related outcomes among older adults: a systematic review and meta-analysis. BMC Geriatr. 2026 Jan 10.", url: "https://doi.org/10.1186/s12877-025-06964-9" },
  { id: 48, kind: "As cited in the manuscript; not independently re-verified.", text: "Erdal A, Flo E, Aarsland D, Ballard C, Slettebo DD, Husebo BS. Efficacy and Safety of Analgesic Treatment for Depression in People with Advanced Dementia: Randomised, Multicentre, Double-Blind, Placebo-Controlled Trial (DEP.PAIN.DEM). Drugs Aging. 2018;35(6):545-558.", url: "https://doi.org/10.1007/s40266-018-0546-2" },
  { id: 49, kind: "As cited in the manuscript; not independently re-verified.", text: "Chronic pain (primary and secondary) in over 16s: assessment of all chronic pain and management of chronic primary pain. London: National Institute for Health and Care Excellence (NICE); 2021 Apr 7. PMID: 33939353.", url: null },
  { id: 50, kind: "As cited in the manuscript; not independently re-verified.", text: "Schofield P, Dunham M, Martin D, et al. Evidence-based clinical practice guidelines on the management of pain in older people - a summary report. Br J Pain. 2022;16(1):6-13. Erratum in: Br J Pain. 2022;16(1):NP1.", url: "https://doi.org/10.1177/2049463720976155" },
  { id: 51, kind: "As cited in the manuscript; not independently re-verified.", text: "Brannigan R, Hughes JE, Moriarty F, et al. Potentially Inappropriate Prescribing and Potential Prescribing Omissions and Their Association with Adverse Drug Reaction-Related Hospital Admissions. J Clin Med. 2024;13(2):323.", url: "https://doi.org/10.3390/jcm13020323" },
  { id: 52, kind: "As cited in the manuscript; not independently re-verified.", text: "Busse JW, Wang L, Kamaleldin M, et al. Opioids for Chronic Noncancer Pain: A Systematic Review and Meta-analysis. JAMA. 2018;320(23):2448-2460.", url: "https://doi.org/10.1001/jama.2018.18472" }
];

const NODES = [
  {
    id: "step1",
    type: "terminal",
    label: "Step 1 - Assess pain",
    sub: "NRS / VRS / PAINAD (if cognitive impairment)",
    meaning: "Entry point: before any analgesic is started, characterise the pain (etiology, severity, quality, temporal pattern) with a validated self-report scale, or a behavioural pain scale in patients with dementia/cognitive impairment, alongside a full geriatric assessment (function, cognition, medication burden, hepatic/renal status, nutrition, psychosocial context).",
    rationale: "Persistent pain affects more than half of community-dwelling older adults and more than 80% of institutionalised older adults, yet is routinely under-recognised and undertreated (oligoanalgesia) because of cognitive impairment, communication difficulties, underreporting in dementia, and atypical presentations.",
    cautions: [
      "The figure's VRS (Verbal Rating Scale) is never mentioned anywhere in the manuscript's prose or tables. Conversely, the manuscript text and Key Practice Point 1 list VAS (Visual Analogue Scale) and the Abbey Pain Scale, both of which are absent from the figure — the two sources name different, non-overlapping scales."
    ],
    refs: [1, 4, 5, 17, 48, 49, 50, 51, 52]
  },
  {
    id: "step2",
    type: "process",
    label: "Step 2 - Exclude red flags / acute emergency",
    sub: "Fracture - infection - malignancy - acute abdomen",
    meaning: "Assess pain etiology and identify acute medical emergencies that need immediate intervention alongside prompt analgesia.",
    rationale: "Uncontrolled severe acute pain is itself treated as a medical emergency in the manuscript's cited triage framework, where physiological and humanitarian imperatives mandate acting without delay.",
    cautions: [
      "The manuscript's own prose does not contain a dedicated red-flag screening step, and never names 'fracture', 'infection', or 'acute abdomen' anywhere in the text or tables — only malignancy/cancer pain and acute pancreatitis are discussed as clinical scenarios.",
      "Prompt treatment of severe acute pain is linked in the text to the Australian Emergency Triage framework, which classifies uncontrolled severe pain at the highest urgency levels."
    ],
    refs: [1, 13, 21, 22, 28, 17, 48, 49, 50, 51, 52]
  },
  {
    id: "step3",
    type: "branch",
    label: "Step 3 - Classify pain severity",
    sub: "NRS 1–3 mild - 4–6 moderate - 7–10 severe",
    meaning: "Medication selection is stratified by patient-reported severity into mild, moderate, or severe tiers, adapting the WHO analgesic ladder (non-opioids for mild pain, weak opioids for moderate pain, strong opioids for severe pain, with adjuvants and non-pharmacological strategies integrated).",
    rationale: "Preferences on medication in the elderly depend on self-reported severity balanced against organ failure, comorbidities, polypharmacy, and age-related pharmacokinetic/pharmacodynamic vulnerability.",
    cautions: [
      "Table 1 gives the same NRS cut-offs, but as table/figure data, not running prose — the manuscript's own narrative text never restates these numeric ranges.",
      "The foundational severity ladder (mild → non-opioid; moderate-to-severe → weak then strong opioids plus adjuvants) is attributed to the WHO analgesic ladder, which the manuscript's introduction does not itself cite with a reference number."
    ],
    refs: [1, 3, 12, 17, 48, 49, 50, 51, 52]
  },
  {
    id: "mild-header",
    type: "process",
    label: "Non-opioid first-line",
    sub: "Paracetamol PO preferred",
    meaning: "Non-opioid analgesics are prioritised first-line for mild (and mild-to-moderate nociceptive) pain in older adults, with oral paracetamol as first choice.",
    rationale: "Paracetamol provides central COX inhibition and serotonergic modulation without the gastrointestinal, renal, cardiovascular, or respiratory-depressant hazards of NSAIDs and opioids — endorsed as first-line for mild-to-moderate nociceptive pain by both the AGS and WHO.",
    cautions: [
      "Non-pharmacological interventions are described in the manuscript as first-line for chronic pain, but are entirely absent from Figure 1."
    ],
    refs: [12, 14]
  },
  {
    id: "paracetamol",
    type: "process",
    tone: "key",
    label: "Paracetamol",
    sub: "PO: 500–1000 mg q6–8h\nMax 3 g/day (↓ if hepatic risk)\nIV: same dose if NPO",
    meaning: "Oral and intravenous paracetamol dosing and daily ceiling, with dose reduction when hepatic risk factors exist and IV use when the oral route is unavailable (NPO).",
    rationale: "Age-related decline in hepatic mass/clearance, low body weight, malnutrition, hepatic impairment, or chronic alcohol use raise the risk of paracetamol hepatotoxicity; inadvertent supratherapeutic dosing also occurs via combination products. IV paracetamol gives equivalent analgesia when oral intake is contraindicated.",
    dose: [
      ["PO (Table 1)", "500–1000 mg q6–8h; max 3 g/day (reduce if hepatic impairment)"],
      ["PO, AGS Panel wording (Section 5.A)", "Max generally 4 g/day; 2000–3000 mg/day if low body weight, malnutrition, liver failure or alcoholism"],
      ["PO, Section 5.A paragraph 3 & Table 2", "325–650 mg q4–6h; max 3 g/day (2 g/day if hepatic impairment; Child-Pugh C contraindicated)"],
      ["IV (Table 1 vs Table 2/3)", "Figure: same dose if NPO. Text/Table 2–3: 1 g over 15 min, q6h (q6–8h in Table 1); <50 kg: 650 mg (Section 5.A) or 15 mg/kg (Table 3)"],
      ["Renal adjustment (Section 5.A, not in this box)", "Extend interval to every 8 hours if eGFR <30 mL/min"]
    ],
    cautions: [
      "The figure's single oral dose/max (500–1000 mg q6–8h; max 3 g/day) does not match the manuscript's own two internally different statements of the daily maximum (4 g/day generally, 2–3 g/day if hepatic risk, in Section 5.A paragraph 2, versus 3 g/day generally, 2 g/day if hepatic impairment, in paragraph 3 and Table 2) — the manuscript itself is not fully self-consistent here.",
      "The figure's 'IV: same dose if NPO' (implying 500–1000 mg q6–8h) does not match the manuscript's and Tables 2–3's IV dose of 1 g over 15 minutes.",
      "Uncertain analgesic benefit and potential safety concerns in osteoarthritis specifically are also noted in the manuscript's own text."
    ],
    refs: [14, 15, 16]
  },
  {
    id: "nsaids",
    type: "process",
    tone: "alarm",
    label: "⚠ NSAIDs — use with caution",
    sub: "Ibuprofen PO: 200–400 mg q8h\nAvoid if eGFR <30, HF, or PUD\nAdd PPI if GI risk; short course only",
    meaning: "Oral NSAIDs (exemplified by low-dose, short-course ibuprofen) may be used for inflammatory/arthritic pain where paracetamol is insufficient, but require strict avoidance in severe renal impairment, heart failure, or peptic ulcer disease, plus PPI gastroprotection and minimal duration.",
    rationale: "Competitive COX-1/COX-2 inhibition disrupts prostaglandin synthesis, causing age-enhanced gastrointestinal ulceration/perforation/haemorrhage, disruption of renal prostaglandin autoregulation (acute kidney injury, fluid retention), and cardiovascular events. Reduced albumin in frail/malnourished elderly also increases the free fraction of highly protein-bound NSAIDs.",
    dose: [
      ["Oral (Section 5.B & Table 2)", "Ibuprofen 200–400 mg PO q8h, max 1200 mg/day; or celecoxib 100 mg once or twice daily"],
      ["Short-course limit (text)", "Not exceeding 10 days"],
      ["Renal threshold", "Avoid if eGFR <30 mL/min; extreme caution/dose reduction if eGFR 30–60 mL/min (2023 AGS Beers Criteria)"]
    ],
    cautions: [
      "The manuscript's own text, Key Practice Point 4 and Table 1 emphasise avoiding systemic NSAIDs wherever possible and preferring topical NSAIDs (diclofenac gel 1% TID–QID) over oral formulations for localised osteoarthritis — this box omits the topical option entirely and lists only oral ibuprofen.",
      "This box says 'Add PPI if GI risk', whereas the manuscript's own text states that concurrent PPI gastroprotection is mandatory whenever a systemic NSAID cannot be avoided, not conditional on an identified GI risk factor."
    ],
    refs: [1, 17, 18, 19, 20]
  },
  {
    id: "mod-header",
    type: "process",
    label: "Step-up: weak opioid ±",
    sub: "non-opioid combination",
    meaning: "Escalation to a weak opioid alone or combined with a non-opioid analgesic (multimodal analgesia) for moderate pain (NRS 4–6).",
    rationale: "Follows the second step of the WHO analgesic ladder and multimodal opioid-sparing principles when non-opioid monotherapy is insufficient — though the manuscript warns that fixed-dose opioid/paracetamol combination products (co-codamol, tramadol/paracetamol) frequently cause inadvertent supratherapeutic paracetamol dosing.",
    cautions: [
      "Table 1 lists transdermal buprenorphine patch (5 µg/h, titrate every 7 days) as the 'preferred opioid' for moderate pain — this is omitted from both the figure and the rest of the manuscript's prose."
    ],
    refs: [2, 12, 13]
  },
  {
    id: "tramadol",
    type: "process",
    tone: "alarm",
    label: "⚠ Tramadol PO",
    sub: "25–50 mg q6–8h; max 200 mg/day\nSeizure risk; avoid MAOIs, CYP2D6",
    meaning: "Oral tramadol — a dual weak mu-opioid agonist and serotonin-norepinephrine reuptake inhibitor — used cautiously for moderate pain, watching for seizure threshold reduction and drug-drug interactions.",
    rationale: "Tramadol lowers the seizure threshold, can precipitate potentially fatal serotonin syndrome with other serotonergic agents (MAOIs, SSRIs, SNRIs, triptans, linezolid), prolongs QTc, can cause hyponatremia/SIADH and delirium, and accumulates its active metabolite O-desmethyltramadol in renal impairment.",
    dose: [
      ["Figure & Table 1", "25–50 mg q6–8h; max 200 mg/day"],
      ["Section 5.C.7 & Table 2", "25–50 mg twice daily (bd); max 100–200 mg/day"],
      ["Renal/other thresholds (text, not in this box)", "Avoid if eGFR <30 mL/min, epilepsy, or severe hepatic failure; extend interval if eGFR 30–60 mL/min"]
    ],
    cautions: [
      "Tramadol is explicitly listed as potentially inappropriate in older adults in both the 2023 AGS Beers Criteria and STOPP/START criteria v3 — flagged in the manuscript's own Key Practice Point 7 — even though Figure 1 presents it as the main weak-opioid option.",
      "This box's dosing interval ('q6–8h') does not match Section 5.C.7 and Table 2's 'twice daily (bd)' interval for the same drug."
    ],
    refs: [17, 38]
  },
  {
    id: "codeine",
    type: "process",
    tone: "alarm",
    label: "Codeine PO (if tolerated)",
    sub: "15–30 mg q4–6h; max 120 mg/day\n⚠ poor metabolisers; constipation",
    meaning: "Oral codeine as a weak-opioid prodrug subject to genetic CYP2D6 metabolic variability and opioid-induced constipation.",
    rationale: "Codeine requires hepatic CYP2D6 activation to morphine; poor metabolisers get inadequate analgesia, while ultra-rapid metabolisers risk morphine toxicity, and all opioids cause constipation.",
    cautions: [
      "In the manuscript's own prose, codeine is placed under 'Opioid agents to avoid in the elderly', with no recommended dosing regimen given there at all, and the text separately states it should be avoided entirely in hepatic failure — the figure instead presents it as a usable 'if tolerated' option with a dosing ceiling.",
      "The ceiling 'max 120 mg/day' shown in this box never appears anywhere in the manuscript's prose or tables.",
      "No reference is specifically cited for this box in the source material beyond the figure's own overall citations."
    ],
    refs: [17, 48, 49, 50, 51, 52]
  },
  {
    id: "adjuvant-neuro",
    type: "process",
    label: "± Adjuvant (neuropathic)",
    sub: "Gabapentin 100 mg nocte → titrate\nDuloxetine 30 mg/day → 60 mg/day",
    meaning: "Addition of a neuropathic adjuvant — a gabapentinoid (gabapentin) or an SNRI (duloxetine) — when neuropathic pain (e.g. postherpetic neuralgia, diabetic peripheral neuropathy, fibromyalgia, or mixed musculoskeletal pain) is present.",
    rationale: "Gabapentin and duloxetine are preferred over tricyclic antidepressants in older adults because they lack potent anticholinergic effects (tertiary TCAs are flagged as potentially inappropriate for age ≥75 years in the 2023 AGS Beers Criteria). Slow nocturnal initiation and gradual titration reduce dizziness, somnolence, cognitive impairment, and fall risk.",
    dose: [
      ["Gabapentin titration (Section 5.D.1)", "Start 100 mg nocte, titrate by 100 mg every 3–7 days to 300–1200 mg/day divided (max 2700 mg/day if renally tolerated)"],
      ["Gabapentin renal caps (Table 2)", "eGFR 30–60: max 600–1200 mg/day; eGFR 15–30: max 300 mg/day; eGFR <15: max 150 mg/day; haemodialysis: 200–300 mg post-dialysis"],
      ["Duloxetine (Section 5.D.2 & Table 2)", "30 mg/day for 2 weeks, then 60 mg/day (30–60 mg/day); avoid if eGFR <30, ESRD, or severe hepatic failure; ECG monitoring if >60 mg/day"]
    ],
    cautions: [
      "Placing this adjuvant only at the bottom of the Moderate column conflicts with the manuscript's own WHO-ladder description of integrating adjuvant therapies throughout, and with Clinical Case 1, which considers duloxetine/gabapentinoids without a weak opioid at all.",
      "Pregabalin (25–50 mg nocte) and topical lidocaine/capsaicin are detailed in the manuscript as neuropathic options but are omitted from the figure entirely.",
      "The manuscript separately reports CNS-active polypharmacy at 23% in nursing homes, with gabapentin the most frequent culprit, and the 2023 Beers Criteria caution against combining gabapentinoids with opioids."
    ],
    refs: [1, 17, 30, 39, 40, 41]
  },
  {
    id: "severe-header",
    type: "process",
    label: "Strong opioid required",
    sub: "Start low - titrate slow",
    meaning: "Uncontrolled severe pain (NRS 7–10) requires prompt strong-opioid therapy, started at conservative geriatric doses with immediate-release formulations and titrated upward slowly based on response and tolerability.",
    rationale: "Opioids are unmatched in efficacy for intense pain, but age-related reductions in hepatic clearance, renal excretion and respiratory reserve, plus heightened CNS opioid sensitivity, expose older adults to respiratory depression, sedation, delirium, falls, and opioid-induced neurotoxicity (reported in roughly 1 in 5 cancer patients) — demanding individualised conservative initiation rather than adult weight- or age-based formulae alone.",
    dose: [
      ["Starting dose rule (Section 5.C.1 & Key Practice Point 5)", "For age ≥70 years: 25–50% of the standard adult dose, immediate-release, titrated every 4–6 hours initially"]
    ],
    cautions: [
      "The manuscript also reports a real-world median morphine-equivalent daily dose of 19.6 mg/day (with a subgroup above 120 mg/day) in terminal cancer patients aged ≥90 years — a very different population from the general geriatric acute-pain patient this box addresses."
    ],
    refs: [1, 3, 17, 21, 22, 24, 25, 28, 29]
  },
  {
    id: "morphine",
    type: "process",
    tone: "alarm",
    label: "Morphine",
    sub: "PO IR: 1–2.5 mg q4h (opioid-naive)\nIV/SC: 1–2 mg q4h; titrate PRN\n⚠ reduce dose if eGFR <30",
    meaning: "Immediate-release oral or parenteral morphine titration for severe pain in opioid-naive older adults, with strong renal precautions.",
    rationale: "Morphine undergoes hepatic glucuronidation to morphine-3-glucuronide (M3G, inactive/neuroexcitatory, causing myoclonus and hyperalgesia) and morphine-6-glucuronide (M6G, a potent active analgesite). In renal impairment, M6G and M3G accumulate, causing prolonged sedation, neurotoxicity, and respiratory depression.",
    dose: [
      ["Figure", "PO IR: 1–2.5 mg q4h (opioid-naive); IV/SC: 1–2 mg q4h, titrate PRN"],
      ["Section 5.C.3, Table 1 & Table 2", "PO: 2.5–5 mg (q4–6h in Section 5.C.3/Table 2; q4h in Table 1); IV: 1–2 mg titrated (Table 1: 1–2.5 mg q4h titrated); Table 3 IV-PCA: bolus 1 mg, lockout 8 min, no basal"]
    ],
    cautions: [
      "This box's own instruction — 'reduce dose if eGFR <30' — directly contradicts Box 6.1 (Renal impairment) in the SAME figure, which says 'Avoid morphine (M6G accumulation)' at the same threshold, and also contradicts Section 6.A, Table 1 and Table 2, which all state avoid/contraindicated below eGFR 30 mL/min (Table 2 places only 'reduce dose & extend interval' at eGFR 30–60).",
      "The subcutaneous (SC) route for morphine is never mentioned anywhere in the manuscript's own text or tables — only subcutaneous hydromorphone is mentioned there.",
      "This box's oral starting dose (1–2.5 mg) is lower than the 2.5–5 mg the manuscript's own Section 5.C.3, Table 1 and Table 2 all state."
    ],
    refs: [25, 31, 32]
  },
  {
    id: "oxycodone",
    type: "process",
    label: "Oxycodone PO",
    sub: "IR: 2.5–5 mg q4–6h (opioid-naive)\nCR: 5–10 mg q12h when stable\nPreferred if renal impairment",
    meaning: "Oral immediate-release oxycodone initiation for severe pain in opioid-naive older adults, transitioning to controlled-release once analgesic requirements are stable.",
    rationale: "Extended-release preparations provide more stable plasma concentrations and reduce peak toxicity once requirements are established. Oxycodone is metabolised via hepatic CYP2D6 and CYP3A4.",
    dose: [
      ["IR", "2.5–5 mg q4–6h in opioid-naive elderly (Table 1 adds: titrate in 25–33% increments)"],
      ["Hepatic adjustment (Section 5.C.6, Table 2)", "In advanced hepatic failure, half-life extends to ~24 hours; reduce initial dose by 30–50%"]
    ],
    cautions: [
      "The controlled-release dose shown here (5–10 mg q12h) appears only in Figure 1 — the manuscript's own Section 5.C.1 discusses extended-release formulations only conceptually, and Table 2 gives no milligram dose for the controlled-release step at all.",
      "'Preferred if renal impairment' is qualified in Table 1 as 'preferred if renal impairment moderate' specifically, while Table 2 instead warns 'reduce dose and extend interval if eGFR <30 mL/min — active metabolite oxymorphone accumulates — monitor closely in moderate-severe CKD', and Section 6.A omits oxycodone from its renal-impairment discussion entirely, naming fentanyl as the preferred opioid there instead (with hydromorphone preferred over morphine in moderate renal impairment)."
    ],
    refs: [1, 37, 17, 48, 49, 50, 51, 52]
  },
  {
    id: "fentanyl",
    type: "process",
    label: "Fentanyl (transdermal)",
    sub: "12–25 mcg/h patch q72h\nFor stable opioid-tolerant patients\nIV: 12.5–25 mcg q30min PRN",
    meaning: "Sustained-release transdermal fentanyl every 72 hours, restricted to stable opioid-tolerant elderly patients (including those with dysphagia or renal failure), or titrated IV fentanyl for rapid-onset acute pain control.",
    rationale: "Fentanyl is metabolised hepatically via CYP3A4 to inactive norfentanyl (roughly 90% inactive metabolites), making it safer in renal impairment. High lipophilicity prolongs its elimination half-life in elderly patients with increased adipose tissue, and starting transdermal fentanyl in an opioid-naive older adult is hazardous because of unpredictable absorption (especially with cachexia/fever) and life-threatening respiratory depression.",
    cautions: [
      "The manuscript's own text, Table 1, Table 2 and Clinical Case 2 specify only a 12 mcg/h starting patch dose every 72 hours — this box's upper bound of 25 mcg/h as a STARTING dose is never mentioned in the manuscript text or tables.",
      "The manuscript and Table 2 state IV fentanyl as 25–50 mcg titrated, and Table 1 states 0.5–1 µg/kg bolus — neither the figure's '12.5–25 mcg' dose nor its 'q30min PRN' interval appears anywhere in the manuscript's text or tables.",
      "The manuscript also notes non-opioid-mediated chest wall rigidity/vocal cord closure at non-routine or illicit fentanyl doses — a mechanism distinct from ordinary opioid overdose."
    ],
    refs: [32, 33, 34, 35, 36]
  },
  {
    id: "step4",
    type: "process",
    label: "Step 4 - Reassess at 24–72 h",
    sub: "Efficacy - ADRs - functional improvement",
    meaning: "All three severity branches converge into mandatory follow-up to evaluate analgesic efficacy, adverse drug reactions, and functional recovery, guiding further titration, rotation, or deprescribing.",
    rationale: "Pharmacokinetic variability, narrow therapeutic windows, heightened CNS/organ vulnerability, and oligoanalgesia in older adults require frequent clinical reassessment and retreatment adjustment rather than static prescribing.",
    cautions: [
      "While the manuscript repeatedly mandates 'frequent reassessments', 'frequent clinical review', and 'regular reassessment' of pain, ADRs, and function, the specific timeframe '24–72 h' shown in this box does not appear anywhere in the manuscript's own text or tables — it appears solely in the figure."
    ],
    refs: [4, 17, 48, 49, 50, 51, 52]
  },
  {
    id: "step5",
    type: "process",
    label: "Step 5 - Monitor for opioid-specific ADRs",
    sub: "Constipation (prophylactic laxative from day 1) - Sedation - Respiratory depression\nNausea (ondansetron 4 mg IV/PO PRN) - Falls risk - Delirium - Urinary retention",
    meaning: "Proactive prophylaxis and clinical surveillance for known opioid-induced adverse effects, including day-1 laxative co-prescription, antiemetic rescue, and monitoring of CNS, respiratory, fall, and urological complications.",
    rationale: "Constipation is universally expected with opioids; mu-receptor suppression of hypercapnic ventilatory drive causes dose-dependent respiratory depression (compounded by COPD, sleep apnoea, benzodiazepines, or gabapentinoids); opioids impair balance/reaction time (raising fall risk), can precipitate or worsen delirium, and cause urinary retention (especially in older men with benign prostatic hypertrophy).",
    dose: [
      ["Constipation prophylaxis (text)", "Prophylactic osmotic laxative — polyethylene glycol/macrogol or lactulose — from day 1 of any opioid"],
      ["Respiratory depression rescue (text, not in this box)", "Naloxone 0.04–0.1 mg IV, titrated cautiously to avoid acute withdrawal and sympathetic surge"]
    ],
    cautions: [
      "This box's 'ondansetron 4 mg IV/PO PRN' does not match the manuscript's own Section 5.C.9, which specifies 'low-dose haloperidol (0.5 mg) or ondansetron (4 to 8 mg IV/SL)' — a different route (SL, not PO), a wider dose range, and an alternative drug (haloperidol) the figure omits. The manuscript separately cautions that both ondansetron and haloperidol prolong QTc.",
      "This step sits on the single main trunk below Step 4, meaning even the Mild (non-opioid) pathway visually passes through 'Monitor for opioid-specific ADRs' even when no opioid was actually prescribed.",
      "The 2023 AGS Beers Criteria formally added opioids to the drugs that precipitate or exacerbate delirium in older adults, and caution against concurrent opioid plus benzodiazepine/gabapentinoid respiratory depression."
    ],
    refs: [6, 17, 23, 24, 30, 48, 49, 50, 51, 52]
  },
  {
    id: "step6",
    type: "branch",
    label: "Step 6 - Special considerations in the elderly",
    meaning: "Tailoring analgesic agent choice, dose, and dosing interval to major geriatric comorbidities — renal impairment, hepatic impairment, and cognitive impairment.",
    rationale: "Organ failure and cognitive impairment profoundly alter metabolite accumulation, drug clearance, CNS vulnerability, and pain reporting in elderly patients.",
    cautions: [
      "Visually, Step 6 appears after drug selection, reassessment, and ADR monitoring — but the manuscript's own text states renal, hepatic, and cognitive status must be assessed BEFORE selecting an analgesic, and a single patient may have multiple concurrent impairments (Clinical Case 2 combines hepatic and renal impairment).",
      "The manuscript also discusses cardiac failure and respiratory failure/COPD as organ-based prescribing categories, both of which are omitted from Step 6 in the figure."
    ],
    refs: [1, 5, 17, 32, 37, 38]
  },
  {
    id: "renal",
    type: "process",
    tone: "alarm",
    label: "Renal impairment",
    sub: "Avoid morphine (M6G accumulation)\nPrefer fentanyl or oxycodone\nParacetamol safe; avoid NSAIDs",
    meaning: "Renal-specific drug-selection rules to prevent toxic metabolite accumulation and nephrotoxicity.",
    rationale: "GFR declines by roughly 1 mL/min/year after age 40 (requiring Cockcroft-Gault or CKD-EPI estimation rather than serum creatinine alone, given low muscle mass). Renal impairment causes accumulation of M6G and M3G with morphine, whereas fentanyl is hepatically metabolised to inactive norfentanyl. NSAIDs block prostaglandin-mediated renal autoregulation, risking acute kidney injury and fluid retention.",
    cautions: [
      "This box's 'Avoid morphine' directly contradicts Box 3C.2 (morphine) in the SAME figure, which instead says 'reduce dose if eGFR <30'.",
      "This box pairs oxycodone with fentanyl as preferred in renal failure, but the manuscript's own text names fentanyl alone as consistently preferred, restricts oxycodone's preference to MODERATE renal impairment only (Table 1), and states for oxycodone that dose should be reduced and the interval extended below eGFR 30 with its active metabolite oxymorphone accumulating (Table 2) — the text instead names hydromorphone for moderate renal impairment and specialist-supervised methadone as renally unaffected.",
      "This box says 'Paracetamol safe', but the manuscript's own text and Table 2 specify that below eGFR 30 mL/min, paracetamol's dosing interval must be extended to every 8 hours because of accumulation risk in ESRD — not simply 'safe' without qualification.",
      "The manuscript also mandates avoiding meperidine, tramadol (eGFR <30), and duloxetine (eGFR <30), and reducing gabapentinoid doses in renal impairment — all omitted from this box."
    ],
    refs: [17, 29, 30, 31, 32]
  },
  {
    id: "hepatic",
    type: "process",
    label: "Hepatic impairment",
    sub: "Paracetamol max 2 g/day (Child-Pugh)\nUse opioids with extended intervals\nAvoid codeine / tramadol",
    meaning: "Hepatic-specific dose ceilings, interval extensions, and drug exclusions in patients with liver disease/cirrhosis.",
    rationale: "Hepatic blood flow, hepatocyte mass (declining up to 40% with age), CYP450 oxidative activity, first-pass metabolism, and albumin binding are all impaired in liver disease, reducing clearance and increasing the bioavailability and half-life of hepatically metabolised analgesics; prodrugs (codeine) and extensively metabolised drugs (tramadol) carry unpredictable efficacy or toxicity/encephalopathy risk.",
    dose: [
      ["Paracetamol", "Max 2 g/day in hepatic impairment; Child-Pugh C contraindicated (Table 2); Clinical Case 2 illustrates Child-Pugh B"],
      ["Opioids", "30–50% dose reduction for morphine in Child-Pugh B/C and for oxycodone in severe hepatic failure (where its half-life reaches ~24 hours), plus extended dosing intervals"]
    ],
    cautions: [
      "Section 5.A paragraph 2 also mentions 2000–3000 mg/day for liver failure/malnutrition/alcoholism before paragraph 3 separately specifies 2 g/day — the same internal inconsistency already flagged under the Paracetamol box.",
      "The manuscript also advises avoiding meperidine and NSAIDs in cirrhosis, and avoiding duloxetine in severe hepatic failure — none of which appear in this box."
    ],
    refs: [7, 14, 37]
  },
  {
    id: "cognitive",
    type: "process",
    tone: "alarm",
    label: "Cognitive impairment",
    sub: "Avoid tramadol (lowers seizure threshold)\nUse PAINAD for pain scoring\nLowest effective opioid dose",
    meaning: "Specific assessment and prescribing safeguards for older adults with dementia or cognitive impairment.",
    rationale: "Pain is underreported in dementia, requiring behavioural observation scales (PAINAD or the Abbey Pain Scale). Analgesics are also the leading medication class implicated in drug-induced cognitive-impairment adverse events; CNS-active analgesics (opioids, tramadol, gabapentinoids, TCAs) can precipitate or worsen delirium and dementia symptoms, and tramadol additionally lowers the seizure threshold.",
    dose: [
      ["Starting dose", "Lowest effective dose — 25–50% of the standard adult opioid dose for age ≥70 years"]
    ],
    cautions: [
      "Avoidance of tramadol in older adults is linked in the manuscript to both the 2023 AGS Beers Criteria and STOPP/START criteria v3, and opioid-induced delirium exacerbation is separately linked to the 2023 AGS Beers Criteria."
    ],
    refs: [5, 6, 12, 17, 24, 29, 38, 48]
  },
  {
    id: "core-principles",
    type: "terminal",
    tone: "key",
    label: "Core prescribing principles for the elderly",
    sub: "\"Start low, go slow\" - Regular rather than PRN dosing for chronic pain - Schedule bowel regimen with opioids\nReview polypharmacy (anticholinergics, benzodiazepines, SNRIs) - Renal/hepatic dose adjustment mandatory\nReassess goal (comfort vs. function) - Deprescribe opioids when acute pain resolves",
    meaning: "Overarching summary of safe geriatric analgesic prescribing, medication review, bowel prophylaxis, organ-based dosing, goal alignment, and opioid stewardship/deprescribing across all patients exiting the algorithm.",
    rationale: "Physiological heterogeneity, reduced homeostatic reserve, high prevalence of polypharmacy (five or more concurrent medications, affecting up to 62.5% of elderly patients), synergistic fatal respiratory depression or anticholinergic/serotonergic toxicity from drug-drug interactions, universal opioid constipation, and community diversion/misuse risk from leftover acute opioid prescriptions all necessitate systematic prescribing and deprescribing safeguards.",
    cautions: [
      "'Regular rather than PRN dosing for chronic pain' is never explicitly stated in the manuscript's own prose — Section 5.C.1 only mentions introducing extended-release opioids once requirements are established, and this phrase appears to derive from the figure's own cited external guidelines rather than the review's own text.",
      "The explicit contrast 'comfort vs. function' in 'Reassess goal' appears only in the figure — the manuscript discusses functional assessment and end-of-life palliative comfort care separately, but never frames them as this explicit pair.",
      "This box's 'Review polypharmacy' list omits gabapentinoids, even though the manuscript's own Abstract, Section 5.C.2, Section 8, and Table 2 repeatedly emphasise gabapentinoids alongside benzodiazepines as a high-risk fatal combination with opioids."
    ],
    refs: [1, 3, 7, 17, 23, 26, 30, 32, 37, 38, 46, 47, 48, 49, 50, 51, 52]
  }
];

const GLOSSARY = [
  { match: "NRS", full: "Numeric(al) Rating Scale", def: "A 0–10 (or here, 1–10) self-reported pain-intensity scale; this algorithm uses it to stratify patients into Mild (1–3), Moderate (4–6), and Severe (7–10) tiers at Step 3." },
  { match: "VRS", full: "Verbal Rating Scale", def: "A pain-scoring scale named only in the figure's own footer legend — it does not appear anywhere in the manuscript's prose or tables, which instead describe VAS and the Abbey Pain Scale." },
  { match: "VAS", full: "Visual Analogue Scale", def: "A validated self-report pain scale named in the manuscript's own text and Key Practice Point 1, but omitted from the figure, which lists VRS instead." },
  { match: "PAINAD", full: "Pain Assessment in Advanced Dementia", def: "A behavioural observation scale for scoring pain in patients with dementia/cognitive impairment who cannot reliably self-report, used at Step 1 and again at the Cognitive impairment box." },
  { match: "Abbey Pain Scale", def: "A behavioural pain-observation scale for patients with dementia, named in the manuscript's own text but omitted from the figure." },
  { match: "eGFR", full: "estimated glomerular filtration rate", def: "The lab-estimated kidney-function value this algorithm uses repeatedly (most often the <30 mL/min threshold) to decide which opioids, NSAIDs, or adjuvants are safe to use or must be avoided or dose-reduced." },
  { match: "M6G", full: "morphine-6-glucuronide", def: "Morphine's potent active glucuronide metabolite, which accumulates in renal impairment and drives prolonged sedation, neurotoxicity, and respiratory depression — the stated reason both for reducing morphine's dose and, elsewhere in the same figure, for avoiding it altogether below eGFR 30." },
  { match: "M3G", full: "morphine-3-glucuronide", def: "Morphine's inactive but neuroexcitatory glucuronide metabolite (implicated in myoclonus and hyperalgesia), which — like M6G — accumulates when renal clearance is reduced." },
  { match: "CYP2D6", full: "cytochrome P450 2D6", def: "The hepatic enzyme that activates codeine to morphine and metabolises oxycodone and tramadol; genetic variability in its activity produces poor, normal, or ultra-rapid metabolisers, with correspondingly inadequate analgesia or toxicity risk." },
  { match: "MAOIs", full: "monoamine oxidase inhibitors", def: "A drug class that, combined with tramadol, raises the risk of serotonin syndrome — one of the named reasons for tramadol's caution in this algorithm." },
  { match: "PPI", full: "proton pump inhibitor", def: "Gastroprotective co-therapy this algorithm calls for alongside systemic NSAID use in older adults — conditional on identified GI risk in the figure's own wording, but stated as mandatory whenever a systemic NSAID cannot be avoided in the manuscript's own text." },
  { match: "PUD", full: "peptic ulcer disease", def: "One of the figure's stated contraindications to oral NSAID use, alongside heart failure and eGFR <30." },
  { match: "HF", full: "heart failure", def: "One of the figure's stated contraindications to oral NSAID use — NSAIDs can cause fluid retention and exacerbate heart failure." },
  { match: "NPO", full: "nil per os (nothing by mouth)", def: "The condition under which this algorithm switches paracetamol from the oral to the intravenous route." },
  { match: "AGS Beers Criteria", full: "American Geriatrics Society Beers Criteria", def: "The 2023 updated expert-panel list of potentially inappropriate medications for older adults, cited repeatedly in this manuscript as the external source for renal-dosing thresholds, tramadol's and tertiary TCAs' inappropriateness, and opioid-associated delirium risk." },
  { match: "STOPP/START", def: "A separate, explicit set of criteria (version 3, 2023) for potentially inappropriate prescribing and prescribing omissions in older people, cited alongside the AGS Beers Criteria for tramadol's and gabapentinoid/opioid combinations' inappropriateness." },
  { match: "WHO analgesic ladder", full: "World Health Organization analgesic ladder", def: "The foundational three-step severity-based framework (non-opioid → weak opioid → strong opioid, with adjuvants integrated throughout) this algorithm's Step 3 branch structure is adapted from." },
  { match: "Child-Pugh", def: "A clinical scoring system (A/B/C) for the severity of liver disease, used in this algorithm to set paracetamol's maximum dose and to flag Child-Pugh C as a contraindication to paracetamol." },
  { match: "QTc", def: "The corrected QT interval on an ECG; this algorithm flags both tramadol and the antiemetics used for opioid-induced nausea (ondansetron, haloperidol) as QTc-prolonging." },
  { match: "ESRD", full: "end-stage renal disease", def: "The most severe stage of chronic kidney disease, used in this algorithm's renal-dosing caveats for paracetamol, gabapentin, and duloxetine." }
];

const AGENTS = [
  "Paracetamol",
  "Ibuprofen",
  "Celecoxib",
  "Diclofenac",
  "Tramadol",
  "Codeine",
  "Gabapentin",
  "Pregabalin",
  "Duloxetine",
  "Morphine",
  "Oxycodone",
  "Fentanyl",
  "Hydromorphone",
  "Methadone",
  "Naloxone",
  "Ondansetron",
  "Haloperidol"
];
