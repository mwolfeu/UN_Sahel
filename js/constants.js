
var sahelNames = ["Burkina Faso", "Cameroon", "Chad", "Gambia", "Guinea", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal"];

var colorRanges = [Chart.colorschemes.brewer.OrRd4, Chart.colorschemes.brewer.RdPu4, Chart.colorschemes.brewer.PuBuGn4, Chart.colorschemes.brewer.BuGn4, Chart.colorschemes.office.Berlin6];

var sdgCopy = [
		{title:`Goal 1: No Poverty`,
			targets:`
				By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.
				By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions.
				Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable.
				By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of 13 property, inheritance, natural resources, appropriate new technology and financial services, including micro-finance.
				By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters.
				Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions.
				Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions
			`},
		{title:`Goal 2: Zero Hunger`,
			targets:`
			By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round.
By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women and older persons
By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists and fishers, including through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets and opportunities for value addition and non-farm employment
By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters and that progressively improve land and soil quality
By 2020, maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed
Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development and plant and livestock gene banks 
Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility
			`},
		{title:`Goal 3: Good Health and Well-being`,
			targets:`
			By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births
By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births and under-5 mortality to at least as low as 25 per 1,000 live births
By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases
By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being
Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol
By 2020, halve the number of global deaths and injuries from road traffic accidents 3.7
By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes
Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines for all
By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination
Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate
Support the research and development of vaccines and medicines for the communicable and noncommunicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the provisions in the Agreement on Trade Related Aspects of Intellectual Property Rights
Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States
Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks
			`},
		{title:`Goal 4: Quality Education`,
			targets:`
			By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and Goal-4 effective learning outcomes
By 2030, ensure that all girls and boys have access to quality early childhood development, care and preprimary education so that they are ready for primary education
By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university
By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship
By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations
By 2030, ensure that all youth and a substantial proportion of adults, both men and women, achieve literacy and numeracy
By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture’s contribution to sustainable development
Build and upgrade education facilities that are child, disability and gender sensitive and provide safe, nonviolent, inclusive and effective learning environments for all
By 2020, substantially expand globally the number of scholarships available to developing countries, in particular least developed countries, small island developing States and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering and scientific programmes, in developed countries and other developing countries
By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing states
			`},
		{title:`Goal 5: Gender Equality`,
			targets:`
			End all forms of discrimination against all women and girls everywhere
Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation
Eliminate all harmful practices, such as child, early and forced marriage and female genital mutilation
Recognize and value unpaid care and domestic work through the provision of public services, infrastructure and social protection policies and the promotion of shared responsibility within the household and the family as nationally appropriate
Ensure women’s full and effective participation and equal opportunities for leadership at all levels of decision making in political, economic and public life
Ensure universal access to sexual and reproductive health and reproductive rights as agreed in accordance with the Programme of Action of the International Conference on Population and Development and the Beijing Platform for Action and the outcome documents of their review conferences
Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property, financial services, inheritance and natural resources, in accordance with national laws
Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women
Adopt and strengthen sound policies and enforceable legislation for the promotion of gender equality and the empowerment of all women and girls at all levels
			`},
		{title:`Goal 6: Clean Water and Sanitation`,
			targets:`
			By 2030, achieve universal and equitable access to safe and affordable drinking water for all
By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations
By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally
By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity
By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate
By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes
By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies
Support and strengthen the participation of local communities in improving water and sanitation management
			`},
		{title:`Goal 7: Affordable and Clean Energy`,
			targets:`
			By 2030, ensure universal access to affordable, reliable and modern energy services
By 2030, increase substantially the share of renewable energy in the global energy mix
By 2030, double the global rate of improvement in energy efficiency
By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology
By 2030, expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, in particular least developed countries, small island developing States, and land-locked developing countries, in accordance with their respective programmes of support
			`},
		{title:`Goal 8: Decent Work and Economic Growth`,
			targets:`
			Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries
Achieve higher levels of economic productivity through diversification, technological upgrading and innovation, including through a focus on high-value added and labour-intensive sectors
Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation, and encourage the formalization and growth of micro-, small- and medium-sized enterprises, including through access to financial services
Improve progressively, through 2030, global resource efficiency in consumption and production and endeavour to decouple economic growth from environmental degradation, in accordance with the 10-year framework of programmes on sustainable consumption and production, with developed countries taking the lead
By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value
By 2020, substantially reduce the proportion of youth not in employment, education or training
Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking and secure the prohibition and elimination of the worst forms of child labour, including recruitment and use of child soldiers, and by 2025 end child labour in all its forms
Protect labour rights and promote safe and secure working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment
By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products
Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all
Increase Aid for Trade support for developing countries, in particular least developed countries, including through the Enhanced Integrated Framework for Trade-Related Technical Assistance to Least Developed Countries
By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization
			`},
		{title:`Goal 9: Industry, Innovation and Infrastructure`,
			targets:`
			Develop quality, reliable, sustainable and resilient infrastructure, including regional and transborder infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all
Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry’s share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries
Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets
By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes, with all countries taking action in accordance with their respective capabilities
Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers per 1 million people and public and private research and development spending
Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States 18
Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities
Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020
			`},
		{title:`Goal 10: Reduce Inequalities`,
			targets:`
			By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average
By 2030, empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status
Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard
Adopt policies, especially fiscal, wage and social protection policies, and progressively achieve greater equality
Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations
Ensure enhanced representation and voice for developing countries in decision-making in global international economic and financial institutions in order to deliver more effective, credible, accountable and legitimate institutions
Facilitate orderly, safe, regular and responsible migration and mobility of people, including through the implementation of planned and well-managed migration policies
Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements
Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States and landlocked developing countries, in accordance with their national plans and programmes
By 2030, reduce to less than 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent
			`},
		{title:`Goal 11: Sustainable Cities and Communities`,
			targets:`
			By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums
By 2030, provide access to safe, affordable, accessible and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations, women, children, persons with disabilities and older persons
By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries
Strengthen efforts to protect and safeguard the world’s cultural and natural heritage
By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations
By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management
By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities
Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening national and regional development planning
By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency, mitigation and adaptation to climate change, resilience to disasters, and develop and implement, in line with the Sendai Framework for Disaster Risk Reduction 2015-2030, holistic disaster risk management at all levels
Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials
			`},
		{title:`Goal 12: Responsible Consumption and Production`,
			targets:`
			Implement the 10-year framework of programmes on sustainable consumption and production, all countries taking action, with developed countries taking the lead, taking into account the development and capabilities of developing countries
By 2030, achieve the sustainable management and efficient use of natural resources
By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses
By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment
By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse
Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle
Promote public procurement practices that are sustainable, in accordance with national policies and priorities
By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature
Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production
Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products
Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies, where they exist, to reflect their environmental impacts, taking fully into account the specific needs and conditions of developing countries and minimizing the possible adverse impacts on their development in a manner that protects the poor and the affected communities
			`},
		{title:`Goal 13: Climate Action`,
			targets:`
			Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries
Integrate climate change measures into national policies, strategies and planning
Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning
Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible
Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities
			`},
		{title:`Goal 14: Life Below Water`,
			targets:`
			By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution
By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience, and take action for their restoration in order to achieve healthy and productive oceans
Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels
By 2020, effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans, in order to restore fish stocks in the shortest time feasible, at least to levels that can produce maximum sustainable yield as determined by their biological characteristics
By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information
By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies, recognizing that appropriate and effective special and differential treatment for developing and least developed countries should be an integral part of the World Trade Organization fisheries subsidies negotiation
By 2030, increase the economic benefits to Small Island developing States and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture and tourism
Increase scientific knowledge, develop research capacity and transfer marine technology, taking into account the Intergovernmental Oceanographic Commission Criteria and Guidelines on the Transfer of Marine Technology, in order to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries
Provide access for small-scale artisanal fishers to marine resources and markets
Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in UNCLOS, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158 of The Future We Want
			`},
		{title:`Goal 15: Life On Land`,
			targets:`
			By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international agreements
By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests and substantially increase afforestation and reforestation globally
By 2030, combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world
By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, in order to enhance their capacity to provide benefits that are essential for sustainable development
Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity and, by 2020, protect and prevent the extinction of threatened species
Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to such resources, as internationally agreed
Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products
By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive alien species on land and water ecosystems and control or eradicate the priority species
By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies and accounts
Mobilize and significantly increase financial resources from all sources to conserve and sustainably use biodiversity and ecosystems
Mobilize significant resources from all sources and at all levels to finance sustainable forest management and provide adequate incentives to developing countries to advance such management, including for conservation and reforestation
Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities
			`},
		{title:`Goal 16: Peace, Justice and Strong Institutions`,
			targets:`
			Significantly reduce all forms of violence and related death rates everywhere.
End abuse, exploitation, trafficking and all forms of violence against and torture of children.
Promote the rule of law at the national and international levels and ensure equal access to justice for all.
By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets and combat all forms of organised crime.
Substantially reduce corruption and bribery in all their forms.
Develop effective, accountable and transparent institutions at all levels.
Ensure responsive, inclusive, participatory and representative decision-making at all levels.
Broaden and strengthen the participation of developing countries in the institutions of global governance.
By 2030, provide legal identity for all, including birth registration.
Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements.
Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime.
Promote and enforce non-discriminatory laws and policies for sustainable development.
			`},
		{title:`Goal 17: Partnerships for the Goals`,
			targets:`



Finance: Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection
Finance: Developed countries to implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of ODA/GNI to developing countries and 0.15 to 0.20 per cent of ODA/GNI to least developed countries ODA providers are encouraged to consider setting a target to provide at least 0.20 per cent of ODA/GNI to least developed countries
Finance: Mobilize additional financial resources for developing countries from multiple sources
Finance: Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief and debt restructuring, as appropriate, and address the external debt of highly indebted poor countries to reduce debt distress
Finance: Adopt and implement investment promotion regimes for least developed countries

Technology: Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism
Technology: Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries on favourable terms, including on concessional and preferential terms, as mutually agreed
Technology: Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology

Capacity building: Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the sustainable development goals, including through North-South, South-South and triangular cooperation

Trade: Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, including through the conclusion of negotiations under its Doha Development Agenda
Trade: Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries’ share of global exports by 2020
Trade: Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries, consistent with World Trade Organization decisions, including by ensuring that preferential rules of origin applicable to imports from least developed countries are transparent and simple, and contribute to facilitating market access

Policy and institutional coherence: Enhance global macroeconomic stability, including through policy coordination and policy coherence
Policy and institutional coherence: Enhance policy coherence for sustainable development
Policy and institutional coherence: Respect each country’s policy space and leadership to establish and implement policies for poverty eradication and sustainable development


Multi-stakeholder partnerships: Enhance the global partnership for sustainable development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources, to support the achievement of the sustainable development goals in all countries, in particular developing countries
Multi-stakeholder partnerships: Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships


Data, monitoring and accountability: By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data disaggregated by income, gender, age, race, ethnicity, migratory status, disability, geographic location and other characteristics relevant in national contexts
Data, monitoring and accountability: By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product, and support statistical capacity-building in developing countries
			`}	
];

// UNSDG Indicator names
UNSDG_indLabels = {
	"SI_POV_DAY1":"Proportion of population below international poverty line (%)",
	"SI_POV_EMP1":"Employed population below international poverty line, by sex and age (%)",
	"SI_POV_NAHC":"Proportion of population living below the national poverty line (%)",
	"SI_COV_BENFTS":"[ILO] Proportion of population covered by at least one social protection benefit (%)",
	"SI_COV_CHLD":"[ILO] Children/households receiving child/family cash benefit (%)",
	"SI_COV_DISAB":"[ILO] Proportion of population with severe disabilities receiving disability cash benefit (%)",
	"SI_COV_LMKT":"[World Bank] Proportion of population covered by labour market programs (%)",
	"SI_COV_LMKTPQ":"[World Bank] Poorest quintile covered by labour market programs (%) ",
	"SI_COV_MATNL":"[ILO] Proportion of mothers with newborns receiving maternity cash benefit (%)",
	"SI_COV_PENSN":"[ILO] Proportion of population above statutory pensionable age receiving a pension, by sex (%)",
	"SI_COV_POOR":"[ILO] Proportion of poor population receiving social assistance cash benefit (%)",
	"SI_COV_SOCAST":"[World Bank] Proportion of population covered by social assistance programs (%)",
	"SI_COV_SOCASTPQ":"[World Bank] Poorest quintile covered by social assistance programs (%)",
	"SI_COV_SOCINS":"[World Bank] Proportion of population covered by social insurance programs (%)",
	"SI_COV_SOCINSPQ":"[World Bank] Poorest quintile covered by social insurance programs (%)",
	"SI_COV_UEMP":"[ILO] Proportion of unemployed persons receiving unemployment cash benefit, by sex (%)",
	"SI_COV_VULN":"[ILO] Proportion of vulnerable population receiving social assistance cash benefit (%)",
	"SI_COV_WKINJRY":"[ILO] Proportion of employed population covered in the event of work injury (%)",
	"SG_DSR_LEGREG":"Countries with legislative and/or regulatory provisions been made for managing disaster risk (1 = YES; 0 = NO)",
	"VC_DSR_AFFCT":"Number of people affected by disaster (number)",
	"VC_DSR_AGLH":"Direct agriculture loss attributed to disasters, by hazard type (Mil USD)",
	"VC_DSR_AGLN":"Direct agriculture loss attributed to disasters (Mil USD)",
	"VC_DSR_CHLN":"Direct economic loss to cultural heritage damaged or destroyed attributed to disasters (Mil USD)",
	"VC_DSR_CILN":"Direct economic loss resulting from damaged or destroyed critical infrastructure attributed to disasters (Mil USD)",
	"VC_DSR_DADN":"Number damaged dwellings attributed to disasters (number)",
	"VC_DSR_DAFF":"Number of directly affected persons attributed to disasters per 100,000 population (number)",
	"VC_DSR_DDHN":"Number damaged dwellings attributed to disasters, by hazard type (number)",
	"VC_DSR_DYDN":"Number destroyed dwellings attributed to disasters (number)",
	"VC_DSR_DYHN":"Number destroyed dwellings attributed to disasters, by hazard type (number)",
	"VC_DSR_GDPLS":"Direct economic loss attributed to disasters (Mil USD)",
	"VC_DSR_HOLH":"Direct economic loss in the housing sector attributed to disasters, by hazard type (Mil USD)",
	"VC_DSR_HOLN":"Direct economic loss in the housing sector attributed to disasters (Mil USD)",
	"VC_DSR_IJILN":"Number of injured or ill people attributed to disasters (number)",
	"VC_DSR_LSGP":"Direct economic loss attributed to disasters relative to GDP (%)",
	"VC_DSR_MISS":"Number of missing persons due to disaster (number)",
	"VC_DSR_MMHN":"Number of deaths and missing persons attributed to disasters, by hazard type (number)",
	"VC_DSR_MORT":"Number of deaths due to disaster (number)",
	"VC_DSR_MTMN":"Number of deaths and missing persons attributed to disasters (number)",
	"VC_DSR_MTMP":"Number of deaths and missing persons attributed to disasters per 100,000 population (number)",
	"VC_DSR_PDAN":"Number of people whose damaged dwellings were attributed to disasters (number)",
	"VC_DSR_PDLN":"Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)",
	"VC_DSR_PDYN":"Number of people whose destroyed dwellings were attributed to disasters (number)",
	"SD_XPD_ESED":"Proportion of total government spending on essential services, education (%)",
	"AG_PRD_FIESSI":"Prevalence of severe food insecurity in the adult population (%)",
	"AG_PRD_FIESSIN":"Total population in severe food insecurity (thousands of people)",
	"SN_ITK_DEFC":"Prevalence of undernourishment (%)",
	"SN_ITK_DEFCN":"Number of undernourish people (millions)",
	"SH_STA_OVRWGT":"Children moderately or severely overweight (%)",
	"SH_STA_STUNT":"Children moderately or severely stunted (%)",
	"SH_STA_WASTE":"Children moderately or severely wasted (%)",
	"ER_GRF_ANIMKPT":"Number of local breeds kept in the country",
	"ER_GRF_ANIMRCNT":"Proportion of local breeds for which sufficient genetic resources are stored for reconstitution (%)",
	"ER_GRF_ANIMRCNTN":"Number of local breeds for which sufficient genetic resources are stored for reconstitution",
	"ER_GRF_ANIMSTOR":"Proportion of local breeds with genetic material stored (%)",
	"ER_GRF_ANIMSTORN":"Number of local breeds with genetic material stored",
	"ER_GRF_PLNTSTOR":"Plant breeds for which sufficient genetic resources are stored (number)",
	"ER_NRK_LBRED":"Proportion of local breeds classified as known being at risk (%)",
	"ER_NRK_LBREDN":"Local breeds classified as known being at risk (number)",
	"ER_RSK_LBRED":"Proportion of local breeds classified as known being not at risk (%)",
	"ER_RSK_LBREDN":"Local breeds classified as known being not at risk (number)",
	"ER_UNK_LBRED":"Proportion of local breeds classified as being at unknown level of risk of extinction (%)",
	"ER_UNK_LBREDN":"Local breeds classified as being at unknown level of risk of extinction (number)",
	"AG_PRD_AGVAS":"Agriculture value added share of GDP (%)",
	"AG_PRD_ORTIND":"Agriculture orientation index for government expenditures",
	"AG_XPD_AGSGB":"Agriculture share of Government Expenditure (%)",
	"DC_TOF_AGRL":"Total monies (disbursements) for agriculture. (Mil USD)",
	"AG_FPA_CFPI":"Consumer Food Price Index",
	"AG_FPA_COMM":"Indicator of Food Price Anomalies (IFPA), by type of product",
	"SH_STA_BRTC":"Proportion of births attended by skilled health personnel (%)",
	"SH_STA_MMR":"Maternal mortality ratio",
	"SH_DYN_IMRT":"Infant mortality rate (deaths per 1,000 live births)",
	"SH_DYN_IMRTN":"Infant deaths (number)",
	"SH_DYN_MORT":"Under-five mortality rate, by sex (deaths per 1,000 live births)",
	"SH_DYN_MORTN":"Under-five deaths (number)",
	"SH_DYN_NMRT":"Neonatal mortality rate (deaths per 1,000 live births)",
	"SH_DYN_NMRTN":"Neonatal deaths (number)",
	"SH_HAP_HBSAG":"Prevalence of hepatitis B surface antigen (HBsAg) (%)",
	"SH_HIV_INCD":"Number of new HIV infections per 1,000 uninfected population, by sex and age (per 1,000 uninfected population)",
	"SH_STA_MALR":"Malaria incidence per 1,000 population at risk (per 1,000 population)",
	"SH_TBS_INCID":"Tuberculosis incidence (per 100,000 population)",
	"SH_TRP_INTVN":"Number of people requiring interventions against neglected tropical diseases (number)",
	"SH_DTH_NCOM":"Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease (probability)",
	"SH_DTH_RNCOM":"Number of deaths attributed to non-communicable diseases, by type of disease and sex (number)",
	"SH_STA_SCIDE":"Suicide mortality rate, by sex (deaths per 100,000 population)",
	"SH_STA_SCIDEN":"Number of deaths attributed to suicide, by sex (number)",
	"SH_ALC_CONSPT":"Alcohol consumption per capita (aged 15 years and older) within a calendar year (litres of pure alcohol)",
	"SH_STA_TRAF":"Death rate due to road traffic injuries (per 100,000 population)",
	"SH_FPL_MTMM":"Proportion of women married or in a union of reproductive age (aged 15-49 years) who have their need for family planning satisfied with modern methods (%)",
	"SP_DYN_ADKL":"Adolescent birth rate (per 1,000 women aged 15-19 years)",
	"SH_ACS_UNHC":"Universal health coverage (UHC) service coverage index",
	"SH_XPD_EARN10":"Proportion of population with large household expenditures on health (greater than 10%) as a share of total household expenditure or income (%)",
	"SH_XPD_EARN25":"Proportion of population with large household expenditures on health (greater than 25%) as a share of total household expenditure or income (%)",
	"SH_AAP_ASMORT":"Age-standardized mortality rate attributed to ambient air pollution (deaths per 100,000 population)",
	"SH_AAP_MORT":"Crude death rate attributed to ambient air pollution (deaths per 100,000 population)",
	"SH_HAP_ASMORT":"Age-standardized mortality rate attributed to household air pollution (deaths per 100,000 population)",
	"SH_HAP_MORT":"Crude death rate attributed to household air pollution (deaths per 100,000 population)",
	"SH_STA_AIRP":"Crude death rate attributed to household and ambient air pollution (deaths per 100,000 population)",
	"SH_STA_ASAIRP":"Age-standardized mortality rate attributed to household and ambient air pollution (deaths per 100,000 population)",
	"SH_STA_POISN":"Mortality rate attributed to unintentional poisonings, by sex (deaths per 100,000 population)",
	"SH_STA_WASH":"Mortality rate attributed to unsafe water, unsafe sanitation and lack of hygiene (deaths per 100,000 population)",
	"SH_PRV_SMOK":"Age-standardized prevalence of current tobacco use among persons aged 15 years and older, by sex (%)",
	"DC_TOF_HLTHL":"Total development monies to medical research and basic heath sectors, gross disbursement. (Mil USD)",
	"DC_TOF_HLTHNT":"Total development monies to medical research and basic heath sectors, net disbursement. (Mil USD)",
	"SH_ACS_DTP3":"Proportion of the target population with access to 3 doses of diphtheria-tetanus-pertussis (DTP3) (%)",
	"SH_ACS_MCV2":"Proportion of the target population with access to measles-containing-vaccine second-dose (MCV2) (%)",
	"SH_ACS_PCV3":"Proportion of the target population with access to pneumococcal conjugate 3rd dose (PCV3) (%)",
	"SH_MED_HEAWOR":"Health worker density, by type of occupation (per 10,000 population)",
	"SH_IHR_CAPPRD":"Average of 13 International Health Regulations (IHR) core capacities",
	"SH_IHR_CAPS":"International Health Regulations (IHR) capacity, by type of IHR capacity (%)",
	"SE_MAT_PROF":"Minimum proficiency in mathematics, by education level and sex (%)",
	"SE_REA_PROF":"Minimum proficiency in reading, by education level and sex (%)",
	"SE_DEV_ONTRK":"Children 36−59 months developmentally on track in at least three of the following: literacy-numeracy, physical development, social-emotional development, and learning (%)",
	"SE_PRE_PARTN":"Participation rate in organized learning (one year before the official primary entry age), by sex (%)",
	"SE_GPI_MATACH":"Gender parity index for achievement in mathematics, by education level (ratio)",
	"SE_GPI_REAACH":"Gender parity index for achievement in reading, by education level (ratio)",
	"SE_GPI_TRATEA":"Gender parity index of trained teachers, by education level (ratio)",
	"SE_LGP_ACHIMA":"Language test parity index for achievement in mathematics, by education level (ratio)",
	"SE_LGP_ACHIRE":"Language test parity index for achievement in reading, by education level (ratio)",
	"SE_PRE_GPIPARTN":"Gender parity index for participation rate in organized learning (one year before the official primary entry age), (ratio)",
	"SE_SEP_MATACH":"Low to high socio-economic parity status index for achievement in mathematics, by education level (ratio)",
	"SE_SEP_REAACH":"Low to high socio-economic parity status index for achievement in reading, by education level (ratio)",
	"SE_URP_MATACH":"Rural to urban parity index for achievement in mathematics, by education level (ratio)",
	"SE_URP_REAACH":"Rural to urban parity index for achievement in reading, by education level (ratio)",
	"SE_ACC_COMP":"Schools with access to computers for pedagogical purposes, by education level (%)",
	"SE_ACC_DWAT":"Schools with access to basic drinking water, by education level (%)",
	"SE_ACC_ELEC":"Schools with access to electricity, by education level (%)",
	"SE_ACC_HNWA":"Schools with basic handwashing facilities, by education level (%)",
	"SE_ACC_INTN":"Schools with access to the internet for pedagogical purposes, by education level (%)",
	"SE_ACC_SANI":"Schools with access to access to single-sex basic sanitation, by education level (%)",
	"SE_INF_DSBL":"Proportion of schools with access to adapted infrastructure and materials for students with disabilities, by education level (%)",
	"DC_TOF_SCHIPSL":"Total monies for scholarships. (Mil USD)",
	"SE_TRA_GRDL":"Proportion of teachers who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level in a given country, by education level (%)",
	"VC_VAW_MARR":"Proportion of ever-partnered women and girls subjected to physical and/or sexual violence by a current or former intimate partner in the previous 12 months, by age (%)",
	"SH_STA_FGMS":"Proportion of girls and women aged 15-49 years who have undergone female genital mutilation/cutting, by age (%)",
	"SP_DYN_MRBF15":"Proportion of women aged 20-24 years who were married or in a union before age 15 (%)",
	"SP_DYN_MRBF18":"Proportion of women aged 20-24 years who were married or in a union before age 18 (%)",
	"SL_DOM_TSPD":"Proportion of time spent on unpaid domestic chores and care work, by sex, age and location (%)",
	"SL_DOM_TSPDCW":"Proportion of time spent on unpaid care work, by sex, age and location (%)",
	"SL_DOM_TSPDDC":"Proportion of time spent on unpaid domestic chores, by sex, age and location (%)",
	"IC_GEN_MGTL":"Proportion of women in managerial positions (%)",
	"IC_GEN_MGTN":"Proportion of women in senior and middle management positions (%)",
	"SG_GEN_PARL":"Proportion of seats held by women in national parliaments (%)",
	"SG_GEN_PARLN":"Number of seats held by women in national parliaments (number)",
	"SG_GEN_PARLNT":"Number of seats in national parliaments (number)",
	"SH_FPL_INFM":"Proportion of women who make their own informed decisions regarding sexual relations, contraceptive use and reproductive health care (%)",
	"SH_FPL_INFMCU":"Proportion of women who make their own informed decisions regarding contraceptive use (%)",
	"SH_FPL_INFMRH":"Proportion of women who make their own informed decisions regarding reproductive health care (%)",
	"SH_FPL_INFMSR":"Proportion of women who make their own informed decisions regarding sexual relations (%)",
	"IT_MOB_OWN":"Proportion of individuals who own a mobile telephone, by sex (%)",
	"SH_H2O_SAFE":"Proportion of population using safely managed drinking water services, by urban/rural (%)",
	"SH_SAN_DEFECT":"Proportion of population practicing open defecation, by urban/rural (%)",
	"SH_SAN_HNDWSH":"Proportion of population with basic handwashing facilities on premises, by urban/rural (%)",
	"SH_SAN_SAFE":"Proportion of population using safely managed sanitation services, by urban/rural (%)",
	"EN_H2O_OPAMBQ":"Proportion of open water bodies with good ambient water quality (%)",
	"EN_H2O_RVAMBQ":"Proportion of river water bodies with good ambient water quality (%)",
	"EN_H2O_WBAMBQ":"Proportion of bodies of water with good ambient water quality (%)",
	"EN_WWT_WWDS":"Proportion of safely treated domestic wastewater flows (%)",
	"ER_H2O_STRESS":"Level of water stress: freshwater withdrawal as a proportion of available freshwater resources (%)",
	"ER_H2O_WUEYST":"Water Use Efficiency (United States dollars per cubic meter)",
	"EG_TBA_H2CO":"Proportion of transboundary basins (river and lake basins and aquifers) with an operational arrangement for water cooperation (%)",
	"EG_TBA_H2COAQ":"Proportion of transboundary aquifers with an operational arrangement for water cooperation (%)",
	"EG_TBA_H2CORL":"Proportion of transboundary river and lake basins with an operational arrangement for water cooperation (%)",
	"ER_H2O_IWRMD":"Degree of integrated water resources management implementation (%)",
	"EN_WBE_PMNR":"Water body extent (permanent) (square kilometres)",
	"EN_WBE_PMPN":"Water body extent (permanent and maybe permanent) (square kilometres)",
	"EN_WBE_PMPP":"Water body extent (permanent and maybe permanent) (% of total land area)",
	"EN_WBE_PMPR":"Water body extent (permanent) (% of total land area)",
	"DC_TOF_WASHL":"Total development monies (gross disbursement) for water supply and sanitation. (Mil USD)",
	"ER_H2O_PRDU":"Countries with procedures in law or policy for participation by service users/communities in planning program in rural drinking-water supply, by level of definition in procedures (10 = Clearly defined; 5 = Not clearly defined ; 0 = NA)",
	"ER_H2O_RURP":"Countries with users/communities participating in planning programs in rural drinking-water supply, by level of participation (3 = High; 2 = Moderate; 1 = Low; 0 = NA)",
	"ER_WAT_PART":"Countries with users/communities participating in planning programs in water resources planning and management, by level of participation (3 = High; 2 = Moderate; 1 = Low; 0 = NA)",
	"ER_WAT_PRDU":"Countries with procedures in law or policy for participation by service users/communities in planning program in water resources planning and management, by level of definition in procedures (10 = Clearly defined; 5 = Not clearly defined ; 0 = NA)",
	"EG_EGY_CLEAN":"Proportion of population with primary reliance on clean fuels and technology (%)",
	"EG_ELC_ACCS":"Proportion of population with access to electricity, by urban/rural (%)",
	"EG_FEC_RNEW":"Renewable energy share in the total final energy consumption (%)",
	"EG_EGY_PRIM":"Energy intensity level of primary energy (megajoules)",
	"NY_GDP_PCAP":"Annual growth rate of real GDP per capita (%)",
	"FB_ATM_TOTL":"Number of automated teller machines (ATMs) per 100,000 adults",
	"FB_BNK_ACCSS":"Adults (>=15 years) with an account at a financial institution or mobile-money-service provider (%)",
	"FB_CBK_BRCH":"Number of commercial bank branches per 100,000 adults",
	"SL_EMP_PCAP":"Annual growth rate of real GDP per employed person (%)",
	"SL_ISV_IFRM":"Proportion of informal employment in non-agriculture employment, by sex (ILO harmonized estimates) (%)",
	"EN_MAT_DOMCMPC":"Domestic material consumption per capita, by type of raw material (tonnes)",
	"EN_MAT_DOMCMPG":"Domestic material consumption per unit of GDP, by type of raw material (kg)",
	"EN_MAT_DOMCMPT":"Domestic material consumption, by type of raw material (tonnes)",
	"SL_TLF_UEM":"Unemployment rate, by sex and age (%)",
	"SL_TLF_UEMDIS":"Unemployment rate, by sex and disability (%)",
	"SL_TLF_NEET":"Proportion of youth not in education, employment or training, by sex and age (%)",
	"SL_TLF_CHLDEA":"Children engaged in economic activity, by sex and age  (%)",
	"SL_TLF_CHLDEC":"Children engaged in economic activity and household chores, by sex and age (%)",
	"SL_EMP_FTLINJUR":"Fatal occupational injuries among employees, by sex and migrant status (per 100,000 employees)",
	"SL_EMP_INJUR":"Non-fatal occupational injuries among employees, by sex and migrant status (per 100,000 employees)",
	"DC_TOF_TRDCML":"Total monies (commitments) for Aid for Trade. (Mil USD)",
	"DC_TOF_TRDDBML":"Total monies (disbursement) for Aid for Trade. (Mil USD)",
	"IS_RDP_FRGVOL":"Freight volume, by mode of transport (tonne kilometres)",
	"IS_RDP_PFVOL":"Passenger volume (passenger kilometres), by mode of transport",
	"IS_TRP_MAILTKM":"Mail volume, by mode of transport (tonne kilometres)",
	"NV_IND_MANF":"Manufacturing value added as a proportion of GDP (%)",
	"NV_IND_MANFPC":"Manufacturing value added per capita (constant 2010 United States dollars)",
	"SL_TLF_MANF":"Manufacturing employment as a proportion of total employment (%)",
	"FC_ACC_SSID":"Proportion of small-scale industries with a loan or line of credit (%)",
	"EN_ATM_CO2":"Carbon dioxide emissions from fuel combustion (millions of tonnes)",
	"EN_ATM_CO2GDP":"Carbon dioxide emissions per unit of GDP (kilogrammes of CO2 per constant 2010 United States dollars)",
	"EN_ATM_CO2MVA":"Carbon dioxide emissions per unit of manufacturing value added (kg)",
	"GB_POP_SCIERD":"Researchers (in full-time equivalent) per million inhabitants (per 1,000,000 population)",
	"GB_XPD_RSDV":"Research and development expenditure as a proportion of GDP (%)",
	"DC_TOF_INFRAL":"Total monies for infrastructure. (Mil USD)",
	"NV_IND_TECH":"Proportion of medium and high-tech industry value added in total value added (%)",
	"IT_MOB_NTWK":"Proportion of population covered by a mobile network, by technology (%)",
	"SI_HEI_BTN40":"Growth rates of household expenditure or income per capita among the bottom 40 per cent of the population (%)",
	"SI_HEI_TOTL":"Growth rates of household expenditure or income per capita (%)",
	"SL_EMP_GTOTL":"Labour share of GDP, comprising wages and social protection transfers (%)",
	"FI_FSI_FSANL":"Non-performing loans to total gross loans (%)",
	"FI_FSI_FSERA":"Return on assets (%)",
	"FI_FSI_FSKA":"Regulatory capital to assets (%)",
	"FI_FSI_FSKNL":"Non-performing loans net of provisions to capital (%)",
	"FI_FSI_FSKRTC":"Regulatory Tier 1 capital to risk-weighted assets (%)",
	"FI_FSI_FSLS":"Liquid assets to short term liabilities (%)",
	"FI_FSI_FSSNO":"Net open position in foreign exchange to capital (%)",
	"SG_INT_MBRDEV":"Proportion of members of developing countries in international organizations, by organization (%)",
	"SG_INT_VRTDEV":"Proportion of voting rights of developing countries in international organizations, by organization (%)",
	"DC_TRF_TOTL":"Total assistance for development, by recipient countries (Mil USD)",
	"SI_RMT_COST":"Remittance costs as a proportion of the amount remitted (%)",
	"EN_LND_SLUM":"Proportion of urban population living in slums (%)",
	"VC_DSR_AFFCT":"Number of people affected by disaster (number)",
	"VC_DSR_AGLH":"Direct agriculture loss attributed to disasters, by hazard type (Mil USD)",
	"VC_DSR_AGLN":"Direct agriculture loss attributed to disasters (Mil USD)",
	"VC_DSR_BSDN":"Number of disruptions to basic services attributed to disasters (number)",
	"VC_DSR_CDAN":"Number of damaged critical infrastructure attributed to disasters (number)",
	"VC_DSR_CDYN":"Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters (number)",
	"VC_DSR_CHLN":"Direct economic loss to cultural heritage damaged or destroyed attributed to disasters (Mil USD)",
	"VC_DSR_CILN":"Direct economic loss resulting from damaged or destroyed critical infrastructure attributed to disasters (Mil USD)",
	"VC_DSR_DADN":"Number damaged dwellings attributed to disasters (number)",
	"VC_DSR_DAFF":"Number of directly affected persons attributed to disasters per 100,000 population (number)",
	"VC_DSR_DDHN":"Number damaged dwellings attributed to disasters, by hazard type (number)",
	"VC_DSR_DYDN":"Number destroyed dwellings attributed to disasters (number)",
	"VC_DSR_DYHN":"Number destroyed dwellings attributed to disasters, by hazard type (number)",
	"VC_DSR_EFDN":"Number of destroyed or damaged educational facilities attributed to disasters (number)",
	"VC_DSR_ESDN":"Number of disruptions to educational services attributed to disasters (number)",
	"VC_DSR_GDPLS":"Direct economic loss attributed to disasters (Mil USD)",
	"VC_DSR_HFDN":"Number of destroyed or damaged health facilities attributed to disasters (number)",
	"VC_DSR_HOLH":"Direct economic loss in the housing sector attributed to disasters, by hazard type (Mil USD)",
	"VC_DSR_HOLN":"Direct economic loss in the housing sector attributed to disasters (Mil USD)",
	"VC_DSR_HSDN":"Number of disruptions to health services attributed to disasters (number)",
	"VC_DSR_IJILN":"Number of injured or ill people attributed to disasters (number)",
	"VC_DSR_LSGP":"Direct economic loss attributed to disasters relative to GDP (%)",
	"VC_DSR_MISS":"Number of missing persons due to disaster (number)",
	"VC_DSR_MMHN":"Number of deaths and missing persons attributed to disasters, by hazard type (number)",
	"VC_DSR_MORT":"Number of deaths due to disaster (number)",
	"VC_DSR_MTMN":"Number of deaths and missing persons attributed to disasters (number)",
	"VC_DSR_MTMP":"Number of deaths and missing persons attributed to disasters per 100,000 population (number)",
	"VC_DSR_OBDN":"Number of disruptions to other basic services attributed to disasters (number)",
	"VC_DSR_PDAN":"Number of people whose damaged dwellings were attributed to disasters (number)",
	"VC_DSR_PDLN":"Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)",
	"VC_DSR_PDYN":"Number of people whose destroyed dwellings were attributed to disasters (number)",
	"EN_ATM_PM25":"Annual mean levels of fine particulate matter in cities, urban population (micrograms per cubic meter)",
	"EN_REF_WASCOL":"Municipal Solid Waste collection coverage, by cities (%)",
	"SG_DSR_LEGREG":"Countries with legislative and/or regulatory provisions been made for managing disaster risk (1 = YES; 0 = NO)",
	"SG_SCP_CNTRY":"Countries with sustainable consumption and production (SCP) national action plans or SCP mainstreamed as a priority or target into national policies (1 = YES; 0 = NO)",
	"SG_SCP_CORMEC":"Countries with coordination mechanism for sustainable consumption and production (1 = YES; 0 = NO)",
	"SG_SCP_MACPOL":"Countries with macro policy for sustainable consumption and production (1 = YES; 0 = NO)",
	"EN_MAT_DOMCMPC":"Domestic material consumption per capita, by type of raw material (tonnes)",
	"EN_MAT_DOMCMPG":"Domestic material consumption per unit of GDP, by type of raw material (kg)",
	"EN_MAT_DOMCMPT":"Domestic material consumption, by type of raw material (tonnes)",
	"SG_HAZ_CMRBASEL":"Compliance with the Basel Convention on hazardous waste and other chemicals",
	"SG_HAZ_CMRMNTRL":"Compliance with the Montreal Protocol on hazardous waste and other chemicals",
	"SG_HAZ_CMRROTDAM":"Compliance with the Rotterdam Convention on hazardous waste and other chemicals",
	"SG_HAZ_CMRSTHOLM":"Compliance with the Stockholm Convention on hazardous waste and other chemicals",
	"ER_FFS_PRTSPC":"Fossil-fuel pre-tax subsidies (consumption and production) per capita (USD)",
	"ER_FFS_PRTSPR":"Fossil-fuel pre-tax subsidies (consumption and production) as a proportion of total GDP (%)",
	"ER_FFS_PRTSST":"Fossil-fuel pre-tax subsidies (consumption and production) (billions USD)",
	"SG_DSR_LEGREG":"Countries with legislative and/or regulatory provisions been made for managing disaster risk (1 = YES; 0 = NO)",
	"VC_DSR_AFFCT":"Number of people affected by disaster (number)",
	"VC_DSR_DADN":"Number damaged dwellings attributed to disasters (number)",
	"VC_DSR_DAFF":"Number of directly affected persons attributed to disasters per 100,000 population (number)",
	"VC_DSR_DDHN":"Number damaged dwellings attributed to disasters, by hazard type (number)",
	"VC_DSR_DYDN":"Number destroyed dwellings attributed to disasters (number)",
	"VC_DSR_DYHN":"Number destroyed dwellings attributed to disasters, by hazard type (number)",
	"VC_DSR_IJILN":"Number of injured or ill people attributed to disasters (number)",
	"VC_DSR_MISS":"Number of missing persons due to disaster (number)",
	"VC_DSR_MMHN":"Number of deaths and missing persons attributed to disasters, by hazard type (number)",
	"VC_DSR_MORT":"Number of deaths due to disaster (number)",
	"VC_DSR_MTMN":"Number of deaths and missing persons attributed to disasters (number)",
	"VC_DSR_MTMP":"Number of deaths and missing persons attributed to disasters per 100,000 population (number)",
	"VC_DSR_PDAN":"Number of people whose damaged dwellings were attributed to disasters (number)",
	"VC_DSR_PDLN":"Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)",
	"VC_DSR_PDYN":"Number of people whose destroyed dwellings were attributed to disasters (number)",
	"ER_MRN_MARIN":"Coverage of protected areas in relation to marine areas (Exclusive Economic Zones) (%)",
	"ER_MRN_MARINT":"Protected marine area (Exclusive Economic Zones) (square kilometres)",
	"ER_MRN_MPA":"Average proportion of Marine Key Biodiversity Areas (KBAs) covered by protected areas (%)",
	"ER_REG_UNFCIM":"Progress by countries in the degree of implementation of international instruments aiming to combat illegal, unreported and unregulated fishing (level of implementation: 1 lowest to 5 highest)",
	"ER_REG_SSFRAR":"Degree of application of a legal/regulatory/policy/institutional framework which recognizes and protects access rights for small-scale fisheries (level of implementation: 1 lowest to 5 highest)",
	"AG_LND_FRST":"Forest area as a proportion of total land area (%)",
	"AG_LND_FRSTN":"Forest area (thousands of hectares)",
	"AG_LND_TOTL":"Land area (thousands of hectares)",
	"ER_PTD_FRWRT":"Average proportion of Freshwater Key Biodiversity Areas (KBAs) covered by protected areas (%)",
	"ER_PTD_TERRS":"Average proportion of Terrestrial Key Biodiversity Areas (KBAs) covered by protected areas (%)",
	"AG_LND_FRSTBIOPHA":"Above-ground biomass in forest per hectare (tonnes per hectare)",
	"AG_LND_FRSTCERT":"Forest area certified under an independently verified certification scheme (thousands of hectares)",
	"AG_LND_FRSTCHG":"Forest area net change rate (%)",
	"AG_LND_FRSTMGT":"Proportion of forest area with a long-term management plan (%)",
	"AG_LND_FRSTPRCT":"Proportion of forest area within legally established protected areas (%)",
	"ER_MTN_GRNCOV":"Mountain green cover area (square kilometres)",
	"ER_MTN_GRNCVI":"Mountain Green Cover Index",
	"ER_MTN_TOTL":"Mountain area (square kilometres)",
	"ER_PTD_MOTN":"Average proportion of Mountain Key Biodiversity Areas (KBAs) covered by protected areas (%)",
	"ER_RSK_LSTI":"Red List Index",
	"ER_CBD_ABSCLRHS":"Countries that have legislative, administrative and policy framework or measures reported to the Access and Benefit-Sharing Clearing-House (1 = YES; 0 = NO)",
	"ER_CBD_NAGOYA":"Countries that are parties to the Nagoya Protocol (1 = YES; 0 = NO)",
	"ER_CBD_ORSPGRFA":"Countries that have legislative, administrative and policy framework or measures reported through the Online Reporting System on Compliance  of the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) (1 = YES; 0 = NO)",
	"ER_CBD_PTYPGRFA":"Countries that are contracting Parties to the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) (1 = YES; 0 = NO)",
	"DC_ODA_BDVL":"Total development monies for biodiversity. (Mil USD)",
	"VC_IHR_PSRC":"Number of victims of intentional homicide per 100,000 population, by sex (victims per 100,000 population)",
	"VC_IHR_PSRCN":"Number of victims of intentional homicide, by sex (number)",
	"SG_INF_ACCSS":"Countries that adopt and implement constitutional, statutory and/or policy guarantees for public access to information",
	"VC_VAW_DIST":"Age and sex distribution of detected victims of trafficking in persons (%)",
	"VC_VAW_PHYPYV":"Children aged 1-14 years who experienced physical punishment and/or psychological aggression by caregivers in last month (%)",
	"VC_VAW_SXVLN":"Proportion of population aged 18-29 years who experienced sexual violence by age 18, by sex (%)",
	"VC_PRS_UNSEC":"Unsentenced detainees as a proportion of overall prison population (%)",
	"IC_FRM_BRIB":"Bribery incidence (% of firms experiencing at least one bribe payment request)",
	"GF_XPD_GBPC":"Primary government expenditures as a proportion of original approved budget (%)",
	"SG_INT_MBRDEV":"Proportion of members of developing countries in international organizations, by organization (%)",
	"SG_INT_VRTDEV":"Proportion of voting rights of developing countries in international organizations, by organization (%)",
	"SG_REG_BRTH":"Children under 5 years of age whose births have been registered with a civil authority (%)",
	"SG_NHR_IMPLN":"Countries with National Human Rights Institutions in compliance with the Paris Principles, A status (1 = YES; 0 = NO)",
	"SG_NHR_INTEXSTN":"Countries with National Human Rights Institutions not fully compliant with the Paris Principles, B status (1 = YES; 0 = NO)",
	"SG_NHR_NOAPPLN":"Countries with no application for accreditation with the Paris Principles, D status  (1 = YES; 0 = NO)",
	"SG_PLN_RECNDI":"Proportion of new development interventions drawn from country-led result frameworks - data by recipient (%)",
	"SG_PLN_RECRICTRY":"Proportion of results indicators drawn from country-led results frameworks - data by recipient (%)",
	"SG_PLN_RECRIMON":"Proportion of results indicators which will be monitored using government sources and monitoring systems - data by recipient (%)",
	"SG_PLN_REPOLRES":"Extent of use of country-owned results frameworks and planning tools by providers of development cooperation - data by recipient (%) ",
	"SG_PLN_MSTKSDG":"Progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals (1 = YES; 0 = NO)",
	"SG_STT_FPOS":"Countries with national statistical legislation exists that complies with the Fundamental Principles of Official Statistics (1 = YES; 0 = NO)",
	"SG_STT_NSDSFDDNR":"Countries with national statistical plans with funding from donors (1 = YES; 0 = NO)",
	"SG_STT_NSDSFDGVT":"Countries with national statistical plans with funding from Government (1 = YES; 0 = NO)",
	"SG_STT_NSDSFDOTHR":"Countries with national statistical plans with funding from others (1 = YES; 0 = NO)",
	"SG_STT_NSDSFND":"Countries with national statistical plans that are fully funded (1 = YES; 0 = NO)",
	"SG_STT_NSDSIMPL":"Countries with national statistical plans that are under implementation (1 = YES; 0 = NO)",
	"SG_REG_BRTH90N":"Countries with birth registration data that are at least 90 percent complete (1 = YES; 0 = NO)",
	"SG_REG_CENSUSN":"Countries that have conducted at least one population and housing census in the last 10 years (1 = YES; 0 = NO)",
	"SG_REG_DETH75N":"Countries with death registration data that are at least 75 percent complete (1 = YES; 0 = NO)",
	"SG_STT_CAPTY":"Value of resources made available to strengthen statistical capacity in developing countries (USD)",
	"BX_TRF_PWKR":"Volume of remittances (in United States dollars) as a proportion of total GDP (%)",
	"DT_TDS_DECT":"Debt service as a proportion of exports of goods and services (%)",
	"IT_NET_BBN":"Number of fixed Internet broadband subscriptions, by speed (number)",
	"IT_NET_BBP":"Fixed Internet broadband subscriptions per 100 inhabitants, by speed (per 100 inhabitants)",
	"IT_USE_ii99":"Internet users per 100 inhabitants",
	"DC_FTA_TOTAL":"Total development monies disbursed for technical cooperation (millions of 2016 United States dollars)"
};




Chart.defaults.global.tooltips.mode = 'nearest';
Chart.defaults.global.defaultFontFamily = "Open Sans";
Chart.defaults.global.animation.animationDuration = 500;
Chart.defaults.global.animation.easing = "linear";
Chart.defaults.global.elements.point.pointStyle = "cross";
Chart.defaults.global.elements.point.radius = 6;
Chart.defaults.global.legend.labels.boxWidth = 20;

defCfgLineGraph = {	
	type: 'line',
	data: {
		//labels: range(FSI.yearMin, FSI.yearMax),
		//datasets: setChartData(),
	},
	options: {
    spanGaps: true,
		legend: {
			 onClick: (e) => e.stopPropagation()
		},
		//~ plugins: {
			//~ colorschemes: {
				//~ scheme: 'brewer.Blues4'
			//~ }
		//~ },  
		annotation: {
			annotations: [
				{
					type: "line",
					mode: "vertical",
					scaleID: "x-axis-0",
					// value: FSI.yearCur,
					borderColor: 'rgba(0, 0, 0, 0.5)',
					borderWidth: 3
				}
			]
		},     
		tooltips: {
			mode: "x-axis",
		},
		animation: {
			duration: 200// general animation time
		},
		hover: {
			animationDuration: 0 // duration of animations when hovering an item
		}, 
		elements: {
			line: {
				tension: 0 // disables bezier curves
			}
		}
	}
}

defCfgLineGraph.options.tooltips.callbacks = {
            label: function(tooltipItem, data) {
								return maxSign(parseFloat(tooltipItem.yLabel), 2);
								}
        };

// Deep copy
var defCfgStackedLineGraph = jQuery.extend(true, {}, defCfgLineGraph);
defCfgStackedLineGraph.options.scales = {yAxes: [{stacked: true,
																									ticks: {
																											beginAtZero:true,
																											ccallback: function(value, index, values) {
																												return '$' + (value / 1000000) + 'M'
																													//~ if(parseInt(value) >= 1000){
																														 //~ return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
																													//~ } else {
																														 //~ return '$' + value;
																													//~ }
																											},
																											min: 0,
																											display: true, 
																											userCallback: function (tick) {																												
																												var value = parseInt(tick) / 1000000;
																												if(value >= 1000){
																													 return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
																												} else {
																													 return '$' + value + 'M';
																												}
																											},
																									 }
																								 }]};
																								
defCfgStackedLineGraph.options.tooltips.callbacks = {
            label: function(tooltipItem, data) {
								var value = parseInt(tooltipItem.yLabel) / 1000000;
								if(value >= 1000){
									 return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
								} else {
									 return '$' + value + 'M';
								}
            }
        };
    
defCfgStackedLineGraph.options.annotation = {
			annotations: [{
					type: "box",
					xScaleID: 'x-axis-0',
					borderColor: 'transparent',
					borderWidth: 2,
					backgroundColor: '#0001'
				}]
			};
			
			
// defCfgStackedLineGraph.scaleStartValue = 2000000;
// defCfgStackedLineGraph.scaleOverride = true;
defCfgStackedLineGraph.aspectRatio = 3.33;
defCfgStackedLineGraph.maintainAspectRatio = false;

VIS0indicators = [
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"EN.POP.DNST",
		label:"Pop density",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.POP.GROW",
		label:"Population Growth",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: ["Nigeria"],
		dset:"WDI",
		name:"SM.POP.REFG.OR",
		keyName:"nigeria:SM.POP.REFG.OR",
		label:"Nigerian Refugees",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Mali"],
		dset:"WDI",
		name:"SM.POP.REFG.OR",
		keyName:"mali:SM.POP.REFG.OR",
		label:"Malian Refugees",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Chad"],
		dset:"WDI",
		name:"SM.POP.REFG",
		keyName:"chad:SM.POP.REFG",
		label:"Chad Asylum Granted",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Cameroon"],
		dset:"WDI",
		name:"SM.POP.REFG",
		keyName:"cameroon:SM.POP.REFG",
		label:"Cameroon Asylum Granted",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.STA.BASS.RU.ZS",
		label:"rural sanit svc",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.STA.BASS.ZS",
		label:"All Sanitation Svc",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"MS.MIL.XPND.CD",
		label:"military expenditure",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Nigeria"],
		dset:"WDI",
		name:"VC.IDP.NWDS",
		label:"IDPs Fleeing Disasters",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Nigeria"],
		dset:"WDI",
		name:"VC.IDP.NWCV",
		label:"IDPs Fleeing Violence",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.XPD.CHEX.PC.CD",
		label:"per capita health expend",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.DYN.TFRT.IN",
		label:"Per Woman Births",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.PRD.FOOD.XD",
		label:"Food Production",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"FP.CPI.TOTL.ZG",
		label:"Percent Inflation",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.ADO.TFRT",
		label:"ado fertility rate",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.LND.ARBL.HA.PC",
		label:"ariable land",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.PRD.CREL.MT",
		label:"Cerial Yield",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.YLD.CREL.KG",
		label:"cerial yield kg",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"FreeFairElecVDEM",
		label:"Free/Fair Elections",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"AbsLegCorrVDEM",
		label:"Lack of Legislative Corruption",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"ConsGovPowerVDEM",
		label:"Constraints on Government Power",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"RiotsProtestsACLED",
		label:"Lack of Riots/Protests",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"PrimScholCompWB",
		label:"Primary Edu. Completion",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"SecEducEnroUNESCO",
		label:"Secondary Edu Enrollment",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"TertEducEnroUNESCO",
		label:"Tertiary Edu. Enrollment",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"RoadNetWEF",
		label:"Road Quality",
		func:"relAgg",
		fArgs:{relYear:2009}
	}
	
]

VIS0sections = [
	{
		title: "Food & Population [1/7]",
		inds: ["WDI:SP.POP.GROW", "WDI:AG.PRD.FOOD.XD", "WDI:AG.PRD.CREL.MT"],
		infoText: "Following the 2010 drought food production in general and cereal yields in specific across the Sahel in 2012 dropped more than 10%, the population continued to grow. (Sahel Average, 2009=100%)",
		colors: Chart.colorschemes.brewer.YlGnBu4.slice(1)
	},
	{
		title: "Inflation Spike [2/7]",
		inds: ["WDI:FP.CPI.TOTL.ZG"],
		infoText: "At this time commodities inflation worldwide contributed to an already difficult situation. Unfortunately, after the world markets recovered, Sahel did not until mid 2014.  (Sahel Average)",
		colors: Chart.colorschemes.brewer.Reds3.slice(2)
	},
	{
		title: "Birth Rate [3/7]",
		inds: ["WDI:SP.DYN.TFRT.IN"],
		infoText: "While fertility metrics across the Sahel have reduced in the last decade, in 2016 they still hover at over 5 children per woman. (Sahel Average)",
		colors: Chart.colorschemes.brewer.Reds3.slice(1)
	},
	{
		title: "Government Legitimacy [4/7]",
		inds: ['IIAG:FreeFairElecVDEM', 'IIAG:AbsLegCorrVDEM', 'IIAG:ConsGovPowerVDEM', 'IIAG:RiotsProtestsACLED'],
		infoText: "During this period, trust in the the electoral process declined due to corruption, and abuses of power while protests and riots surged. (Sahel Average, 2009=100%)",
		colors: Chart.colorschemes.brewer.YlOrBr5.slice(1)
	},
	{
		title: "Government Services [5/7]",
		inds: ['IIAG:PrimScholCompWB', 'IIAG:SecEducEnroUNESCO', 'IIAG:TertEducEnroUNESCO', 'WDI:SH.STA.BASS.ZS', 'IIAG:RoadNetWEF'],
		infoText: "The growing electorate distrust was only amplified by a degredation in government services such as education, roads and sanitation. (Sahel Average, 2009=100%)",
		colors: Chart.colorschemes.brewer.Blues7.slice(1)
	},
	{
		title: "The Refugees Crisis [6/7]",
		inds: ["WDI:nigeria:SM.POP.REFG.OR", "WDI:mali:SM.POP.REFG.OR", "WDI:cameroon:SM.POP.REFG", "WDI:chad:SM.POP.REFG"],
		infoText: "The resulting destabilization created a regional refugee crisis.  Most came from Mali and Nigeria.  Most found asylum from the already stressed governments of Chad and Cameroon. (Reported Numbers)",
		colors: Chart.colorschemes.brewer.RdYlGn6.slice(1)
	},
	{
		title: "Nigerian Internally Displaced Peoples [7/7]",
		inds: ["WDI:VC.IDP.NWDS", "WDI:VC.IDP.NWCV"],
		infoText: "These numbers, while staggering, pale in comparison to the millions who fled their homes during this period due to state and climate destabilizations in Nigeria alone. (Reported Numbers)",
		colors: Chart.colorschemes.brewer.BuPu5.slice(2)
	}	
];

UNSDG_VIS0indicators = [
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.ODA.ALLD.CD",
		label:"UN Development and Aid Funds Total",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.FAOG.CD",
		label:"UN Food and Agriculture",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.IAEA.CD",
		label:"IAEA",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.IFAD.CD",
		label:"Intl. Fund for Agricultural Development",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.ILOG.CD",
		label:"ILOG",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNAI.CD",
		label:"UNAI",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNDP.CD",
		label:"UN Development Program",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNEC.CD",
		label:"UNEC",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNFP.CD",
		label:"UN Population Fund",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNCR.CD",
		label:"UN Commission for Refugees",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNCF.CD",
		label:"UN Cooperation Framework",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNPB.CD",
		label:"UN Aids Working Group",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNRW.CD",
		label:"UNRW",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNTA.CD", 
		label:"UN Transitional Authority",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNWT.CD",
		label:"UNWT",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.WFPG.CD",
		label:"UN Women's Foreign Policy Group",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.WHOL.CD",
		label:"UN World Health Organization",
		func:"getSum"
	}
];
// GrayWarm20.slice(2)
UNSDG_VIS0sections = [
	{
		title: "Total Sahel Funding",
		inds: ["WDI:DT.ODA.ALLD.CD"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	},
		//~ {
			//~ title: "Funding By Agency",
			//~ inds: ["WDI:DT.NFL.UNPB.CD", "WDI:DT.NFL.UNTA.CD","WDI:DT.NFL.FAOG.CD"],
			//~ colors: Chart.colorschemes.tableau.ClassicGray5
		//~ },
		//~ {
			//~ title: "Funding By Agency",
			//~ inds: ["WDI:DT.NFL.IFAD.CD", "WDI:DT.NFL.UNDP.CD", "WDI:DT.NFL.UNFP.CD"],
			//~ colors: Chart.colorschemes.tableau.ClassicGray5
		//~ },
		//~ {
			//~ title: "Funding By Agency",
			//~ inds: ["WDI:DT.NFL.UNCF.CD"],
			//~ colors: Chart.colorschemes.tableau.ClassicGray5
		//~ },
		//~ {
			//~ title: "Funding By Agency",
			//~ inds: ["WDI:DT.NFL.UNCR.CD", "WDI:DT.NFL.WFPG.CD", "WDI:DT.NFL.WHOL.CD"],
			//~ colors: Chart.colorschemes.tableau.ClassicGray5
		//~ }
];

UNSDG_VIS1indicators = [
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"UNSDG",
		name:"SH_DTH_RNCOM",
		label:"No idea",
		func:"getRaw"
	}
]

UNSDG_VIS1sections = [ // results
	{
		title: "Test Data",
		inds: ["UNSDG:SH_DTH_RNCOM"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	}
]
