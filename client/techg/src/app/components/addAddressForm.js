'use client'

import { useContext, useState, useEffect } from "react"
import { StoreContext } from "../store/StoreProvider"
import { createAddress, fetchUserAddresses } from "../http/AddressAPI"

const AddAddressForm = ({isShown, onHide}) => {

    const {address, user} = useContext(StoreContext)
    const userId = user.user.id

    const euCountries = [
        { id: 1, name: "Austria" },
        { id: 2, name: "Belgium" },
        { id: 3, name: "Bulgaria" },
        { id: 4, name: "Croatia" },
        { id: 5, name: "Cyprus" },
        { id: 6, name: "Czech Republic" },
        { id: 7, name: "Denmark" },
        { id: 8, name: "Estonia" },
        { id: 9, name: "Finland" },
        { id: 10, name: "France" },
        { id: 11, name: "Germany" },
        { id: 12, name: "Greece" },
        { id: 13, name: "Hungary" },
        { id: 14, name: "Ireland" },
        { id: 15, name: "Italy" },
        { id: 16, name: "Latvia" },
        { id: 17, name: "Lithuania" },
        { id: 18, name: "Luxembourg" },
        { id: 19, name: "Malta" },
        { id: 20, name: "Netherlands" },
        { id: 21, name: "Poland" },
        { id: 22, name: "Portugal" },
        { id: 23, name: "Romania" },
        { id: 24, name: "Slovakia" },
        { id: 25, name: "Slovenia" },
        { id: 26, name: "Spain" },
        { id: 27, name: "Sweden" }
    ];

    const regions = [
        {country: 'Austria', regions: [
            { id: 1, name: "Burgenland" },
            { id: 2, name: "Carinthia" },
            { id: 3, name: "Lower Austria" },
            { id: 4, name: "Upper Austria" },
            { id: 5, name: "Salzburg" },
            { id: 6, name: "Styria" },
            { id: 7, name: "Tyrol" },
            { id: 8, name: "Vorarlberg" },
            { id: 9, name: "Vienna" }
        ]},
        {country: 'Belgium', regions: [
            { id: 1, name: "Antwerp" },
            { id: 2, name: "Flemish Brabant" },
            { id: 3, name: "Limburg" },
            { id: 4, name: "East Flanders" },
            { id: 5, name: "West Flanders" },
            { id: 6, name: "Walloon Brabant" },
            { id: 7, name: "Hainaut" },
            { id: 8, name: "Liège" },
            { id: 9, name: "Luxembourg" },
            { id: 10, name: "Namur" }
        ]},
        {country: 'Bulgaria', regions: [
            { id: 1, name: "Blagoevgrad" },
            { id: 2, name: "Burgas" },
            { id: 3, name: "Dobrich" },
            { id: 4, name: "Gabrovo" },
            { id: 5, name: "Haskovo" },
            { id: 6, name: "Kardzhali" },
            { id: 7, name: "Kyustendil" },
            { id: 8, name: "Lovech" },
            { id: 9, name: "Montana" },
            { id: 10, name: "Pazardzhik" },
            { id: 11, name: "Pernik" },
            { id: 12, name: "Pleven" },
            { id: 13, name: "Plovdiv" },
            { id: 14, name: "Razgrad" },
            { id: 15, name: "Ruse" },
            { id: 16, name: "Shumen" },
            { id: 17, name: "Silistra" },
            { id: 18, name: "Sliven" },
            { id: 19, name: "Smolyan" },
            { id: 20, name: "Sofia City" },
            { id: 21, name: "Sofia Province" },
            { id: 22, name: "Stara Zagora" },
            { id: 23, name: "Targovishte" },
            { id: 24, name: "Varna" },
            { id: 25, name: "Veliko Tarnovo" },
            { id: 26, name: "Vidin" },
            { id: 27, name: "Vratsa" },
            { id: 28, name: "Yambol" }
        ]},
        {country: 'Croatia', regions: [
            { id: 1, name: "Zagreb County" },
            { id: 2, name: "Krapina-Zagorje County" },
            { id: 3, name: "Sisak-Moslavina County" },
            { id: 4, name: "Karlovac County" },
            { id: 5, name: "Varaždin County" },
            { id: 6, name: "Koprivnica-Križevci County" },
            { id: 7, name: "Bjelovar-Bilogora County" },
            { id: 8, name: "Primorje-Gorski Kotar County" },
            { id: 9, name: "Lika-Senj County" },
            { id: 10, name: "Virovitica-Podravina County" },
            { id: 11, name: "Požega-Slavonia County" },
            { id: 12, name: "Brod-Posavina County" },
            { id: 13, name: "Zadar County" },
            { id: 14, name: "Osijek-Baranja County" },
            { id: 15, name: "Šibenik-Knin County" },
            { id: 16, name: "Vukovar-Srijem County" },
            { id: 17, name: "Split-Dalmatia County" },
            { id: 18, name: "Istria County" },
            { id: 19, name: "Dubrovnik-Neretva County" },
            { id: 20, name: "Međimurje County" },
            { id: 21, name: "City of Zagreb" }
        ]},
        {country: 'Cyprus', regions: [
            { id: 1, name: "Nicosia" },
            { id: 2, name: "Limassol" },
            { id: 3, name: "Larnaca" },
            { id: 4, name: "Famagusta" },
            { id: 5, name: "Paphos" },
            { id: 6, name: "Kyrenia" }
        ]},
        {country: 'Czech Republic', regions: [
            { id: 1, name: "Central Bohemian Region" },
            { id: 2, name: "South Bohemian Region" },
            { id: 3, name: "Plzeň Region" },
            { id: 4, name: "Karlovy Vary Region" },
            { id: 5, name: "Ústí nad Labem Region" },
            { id: 6, name: "Liberec Region" },
            { id: 7, name: "Hradec Králové Region" },
            { id: 8, name: "Pardubice Region" },
            { id: 9, name: "Vysočina Region" },
            { id: 10, name: "South Moravian Region" },
            { id: 11, name: "Olomouc Region" },
            { id: 12, name: "Zlín Region" },
            { id: 13, name: "Moravian-Silesian Region" },
            { id: 14, name: "Prague" }
        ]},
        {country: 'Denmark', regions: [
            { id: 1, name: "Capital Region of Denmark" },
            { id: 2, name: "Central Denmark Region" },
            { id: 3, name: "North Denmark Region" },
            { id: 4, name: "Region Zealand" },
            { id: 5, name: "Region of Southern Denmark" }
        ]},
        {country: 'Estonia', regions: [
            { id: 1, name: "Harju County" },
            { id: 2, name: "Hiiu County" },
            { id: 3, name: "Ida-Viru County" },
            { id: 4, name: "Järva County" },
            { id: 5, name: "Jõgeva County" },
            { id: 6, name: "Lääne County" },
            { id: 7, name: "Lääne-Viru County" },
            { id: 8, name: "Põlva County" },
            { id: 9, name: "Pärnu County" },
            { id: 10, name: "Rapla County" },
            { id: 11, name: "Saare County" },
            { id: 12, name: "Tartu County" },
            { id: 13, name: "Valga County" },
            { id: 14, name: "Viljandi County" },
            { id: 15, name: "Võru County" }
        ]},
        {country: 'Finland', regions: [
            { id: 1, name: "Åland" },
            { id: 2, name: "South Karelia" },
            { id: 3, name: "South Ostrobothnia" },
            { id: 4, name: "Southern Savonia" },
            { id: 5, name: "Kainuu" },
            { id: 6, name: "Tavastia Proper" },
            { id: 7, name: "Central Ostrobothnia" },
            { id: 8, name: "Central Finland" },
            { id: 9, name: "Kymenlaakso" },
            { id: 10, name: "Lapland" },
            { id: 11, name: "Pirkanmaa" },
            { id: 12, name: "Ostrobothnia" },
            { id: 13, name: "North Karelia" },
            { id: 14, name: "Northern Ostrobothnia" },
            { id: 15, name: "Northern Savonia" },
            { id: 16, name: "Päijänne Tavastia" },
            { id: 17, name: "Satakunta" },
            { id: 18, name: "Uusimaa" },
            { id: 19, name: "Southwest Finland" }
        ]},
        {country: 'France', regions: [
            { id: 1, name: "Auvergne-Rhône-Alpes" },
            { id: 2, name: "Bourgogne-Franche-Comté" },
            { id: 3, name: "Brittany" },
            { id: 4, name: "Centre-Val de Loire" },
            { id: 5, name: "Corsica" },
            { id: 6, name: "Grand Est" },
            { id: 7, name: "Hauts-de-France" },
            { id: 8, name: "Île-de-France" },
            { id: 9, name: "Normandy" },
            { id: 10, name: "Nouvelle-Aquitaine" },
            { id: 11, name: "Occitanie" },
            { id: 12, name: "Pays de la Loire" },
            { id: 13, name: "Provence-Alpes-Côte d'Azur" }
        ]},
        {country: 'Germany', regions: [
            { id: 1, name: "Baden-Württemberg" },
            { id: 2, name: "Bavaria" },
            { id: 3, name: "Berlin" },
            { id: 4, name: "Brandenburg" },
            { id: 5, name: "Bremen" },
            { id: 6, name: "Hamburg" },
            { id: 7, name: "Hesse" },
            { id: 8, name: "Lower Saxony" },
            { id: 9, name: "Mecklenburg-Vorpommern" },
            { id: 10, name: "North Rhine-Westphalia" },
            { id: 11, name: "Rhineland-Palatinate" },
            { id: 12, name: "Saarland" },
            { id: 13, name: "Saxony" },
            { id: 14, name: "Saxony-Anhalt" },
            { id: 15, name: "Schleswig-Holstein" },
            { id: 16, name: "Thuringia" }
        ]},
        {country: 'Greece', regions: [
            { id: 1, name: "Attica" },
            { id: 2, name: "Central Greece" },
            { id: 3, name: "Central Macedonia" },
            { id: 4, name: "Crete" },
            { id: 5, name: "East Macedonia and Thrace" },
            { id: 6, name: "Epirus" },
            { id: 7, name: "Ionian Islands" },
            { id: 8, name: "North Aegean" },
            { id: 9, name: "Peloponnese" },
            { id: 10, name: "South Aegean" },
            { id: 11, name: "Thessaly" },
            { id: 12, name: "Western Greece" },
            { id: 13, name: "Western Macedonia" }
        ]},
        {country: 'Hungary', regions: [
            { id: 1, name: "Bács-Kiskun" },
            { id: 2, name: "Baranya" },
            { id: 3, name: "Békés" },
            { id: 4, name: "Borsod-Abaúj-Zemplén" },
            { id: 5, name: "Csongrád-Csanád" },
            { id: 6, name: "Fejér" },
            { id: 7, name: "Győr-Moson-Sopron" },
            { id: 8, name: "Hajdú-Bihar" },
            { id: 9, name: "Heves" },
            { id: 10, name: "Jász-Nagykun-Szolnok" },
            { id: 11, name: "Komárom-Esztergom" },
            { id: 12, name: "Nógrád" },
            { id: 13, name: "Pest" },
            { id: 14, name: "Somogy" },
            { id: 15, name: "Szabolcs-Szatmár-Bereg" },
            { id: 16, name: "Tolna" },
            { id: 17, name: "Vas" },
            { id: 18, name: "Veszprém" },
            { id: 19, name: "Zala" },
            { id: 20, name: "Budapest" }
        ]},
        {country: 'Ireland', regions: [
            { id: 1, name: "Carlow" },
            { id: 2, name: "Cavan" },
            { id: 3, name: "Clare" },
            { id: 4, name: "Cork" },
            { id: 5, name: "Donegal" },
            { id: 6, name: "Dublin" },
            { id: 7, name: "Galway" },
            { id: 8, name: "Kerry" },
            { id: 9, name: "Kildare" },
            { id: 10, name: "Kilkenny" },
            { id: 11, name: "Laois" },
            { id: 12, name: "Leitrim" },
            { id: 13, name: "Limerick" },
            { id: 14, name: "Longford" },
            { id: 15, name: "Louth" },
            { id: 16, name: "Mayo" },
            { id: 17, name: "Meath" },
            { id: 18, name: "Monaghan" },
            { id: 19, name: "Offaly" },
            { id: 20, name: "Roscommon" },
            { id: 21, name: "Sligo" },
            { id: 22, name: "Tipperary" },
            { id: 23, name: "Waterford" },
            { id: 24, name: "Westmeath" },
            { id: 25, name: "Wexford" },
            { id: 26, name: "Wicklow" }
        ]},
        {country: 'Italy', regions: [
            { id: 1, name: "Abruzzo" },
            { id: 2, name: "Aosta Valley" },
            { id: 3, name: "Apulia" },
            { id: 4, name: "Basilicata" },
            { id: 5, name: "Calabria" },
            { id: 6, name: "Campania" },
            { id: 7, name: "Emilia-Romagna" },
            { id: 8, name: "Friuli Venezia Giulia" },
            { id: 9, name: "Lazio" },
            { id: 10, name: "Liguria" },
            { id: 11, name: "Lombardy" },
            { id: 12, name: "Marche" },
            { id: 13, name: "Molise" },
            { id: 14, name: "Piedmont" },
            { id: 15, name: "Sardinia" },
            { id: 16, name: "Sicily" },
            { id: 17, name: "Trentino-Alto Adige/South Tyrol" },
            { id: 18, name: "Tuscany" },
            { id: 19, name: "Umbria" },
            { id: 20, name: "Veneto" }
        ]},
        {country: 'Latvia', regions: [
            { id: 1, name: "Kurzeme" },
            { id: 2, name: "Latgale" },
            { id: 3, name: "Vidzeme" },
            { id: 4, name: "Zemgale" }
        ]},
        {country: 'Lithuania', regions: [
            { id: 1, name: "Alytus County" },
            { id: 2, name: "Kaunas County" },
            { id: 3, name: "Klaipėda County" },
            { id: 4, name: "Marijampolė County" },
            { id: 5, name: "Panevėžys County" },
            { id: 6, name: "Šiauliai County" },
            { id: 7, name: "Tauragė County" },
            { id: 8, name: "Telšiai County" },
            { id: 9, name: "Utena County" },
            { id: 10, name: "Vilnius County" }
        ]},
        {country: 'Luxembourg', regions: [
            { id: 1, name: "Capellen" },
            { id: 2, name: "Clervaux" },
            { id: 3, name: "Diekirch" },
            { id: 4, name: "Echternach" },
            { id: 5, name: "Esch-sur-Alzette" },
            { id: 6, name: "Grevenmacher" },
            { id: 7, name: "Luxembourg" },
            { id: 8, name: "Mersch" },
            { id: 9, name: "Redange" },
            { id: 10, name: "Remich" },
            { id: 11, name: "Vianden" },
            { id: 12, name: "Wiltz" }
        ]},
        {country: 'Malta', regions: [
            { id: 1, name: "Central Region" },
            { id: 2, name: "Gozo Region" },
            { id: 3, name: "Northern Region" },
            { id: 4, name: "South Eastern Region" },
            { id: 5, name: "Southern Region" },
            { id: 6, name: "Western Region" }
        ]},
        {country: 'Netherlands', regions: [
            { id: 1, name: "Drenthe" },
            { id: 2, name: "Flevoland" },
            { id: 3, name: "Friesland" },
            { id: 4, name: "Gelderland" },
            { id: 5, name: "Groningen" },
            { id: 6, name: "Limburg" },
            { id: 7, name: "North Brabant" },
            { id: 8, name: "North Holland" },
            { id: 9, name: "Overijssel" },
            { id: 10, name: "South Holland" },
            { id: 11, name: "Utrecht" },
            { id: 12, name: "Zeeland" }
        ]},
        {country: 'Poland', regions: [
            { id: 1, name: "Greater Poland" },
            { id: 2, name: "Kuyavian-Pomeranian" },
            { id: 3, name: "Lesser Poland" },
            { id: 4, name: "Łódź" },
            { id: 5, name: "Lower Silesian" },
            { id: 6, name: "Lublin" },
            { id: 7, name: "Lubusz" },
            { id: 8, name: "Masovian" },
            { id: 9, name: "Opole" },
            { id: 10, name: "Podlaskie" },
            { id: 11, name: "Pomeranian" },
            { id: 12, name: "Silesian" },
            { id: 13, name: "Subcarpathian" },
            { id: 14, name: "Świętokrzyskie" },
            { id: 15, name: "Warmian-Masurian" },
            { id: 16, name: "West Pomeranian" }
        ]},
        {country: 'Portugal', regions: [
            { id: 1, name: "Aveiro" },
            { id: 2, name: "Beja" },
            { id: 3, name: "Braga" },
            { id: 4, name: "Bragança" },
            { id: 5, name: "Castelo Branco" },
            { id: 6, name: "Coimbra" },
            { id: 7, name: "Évora" },
            { id: 8, name: "Faro" },
            { id: 9, name: "Guarda" },
            { id: 10, name: "Leiria" },
            { id: 11, name: "Lisbon" },
            { id: 12, name: "Portalegre" },
            { id: 13, name: "Porto" },
            { id: 14, name: "Santarém" },
            { id: 15, name: "Setúbal" },
            { id: 16, name: "Viana do Castelo" },
            { id: 17, name: "Vila Real" },
            { id: 18, name: "Viseu" },
            { id: 19, name: "Azores" },
            { id: 20, name: "Madeira" }
        ]},
        {country: 'Romania', regions: [
            { id: 1, name: "Alba" },
            { id: 2, name: "Arad" },
            { id: 3, name: "Argeș" },
            { id: 4, name: "Bacău" },
            { id: 5, name: "Bihor" },
            { id: 6, name: "Bistrița-Năsăud" },
            { id: 7, name: "Botoșani" },
            { id: 8, name: "Brașov" },
            { id: 9, name: "Brăila" },
            { id: 10, name: "Buzău" },
            { id: 11, name: "Călărași" },
            { id: 12, name: "Caraș-Severin" },
            { id: 13, name: "Cluj" },
            { id: 14, name: "Constanța" },
            { id: 15, name: "Covasna" },
            { id: 16, name: "Dâmbovița" },
            { id: 17, name: "Dolj" },
            { id: 18, name: "Galați" },
            { id: 19, name: "Giurgiu" },
            { id: 20, name: "Gorj" },
            { id: 21, name: "Harghita" },
            { id: 22, name: "Hunedoara" },
            { id: 23, name: "Ialomița" },
            { id: 24, name: "Iași" },
            { id: 25, name: "Ilfov" },
            { id: 26, name: "Maramureș" },
            { id: 27, name: "Mehedinți" },
            { id: 28, name: "Mureș" },
            { id: 29, name: "Neamț" },
            { id: 30, name: "Olt" },
            { id: 31, name: "Prahova" },
            { id: 32, name: "Satu Mare" },
            { id: 33, name: "Sălaj" },
            { id: 34, name: "Sibiu" },
            { id: 35, name: "Suceava" },
            { id: 36, name: "Teleorman" },
            { id: 37, name: "Timiș" },
            { id: 38, name: "Tulcea" },
            { id: 39, name: "Vaslui" },
            { id: 40, name: "Vâlcea" },
            { id: 41, name: "Vrancea" },
            { id: 42, name: "Bucharest" }
        ]},
        {country: 'Slovakia', regions: [
            { id: 1, name: "Bratislava" },
            { id: 2, name: "Trnava" },
            { id: 3, name: "Trenčín" },
            { id: 4, name: "Nitra" },
            { id: 5, name: "Žilina" },
            { id: 6, name: "Banská Bystrica" },
            { id: 7, name: "Prešov" },
            { id: 8, name: "Košice" }
        ]},
        {country: 'Slovenia', regions: [
            { id: 1, name: "Pomurska" },
            { id: 2, name: "Podravska" },
            { id: 3, name: "Koroška" },
            { id: 4, name: "Savinjska" },
            { id: 5, name: "Zasavska" },
            { id: 6, name: "Posavska" },
            { id: 7, name: "Jugovzhodna Slovenija" },
            { id: 8, name: "Osrednjeslovenska" },
            { id: 9, name: "Gorenjska" },
            { id: 10, name: "Primorsko-notranjska" },
            { id: 11, name: "Goriška" },
            { id: 12, name: "Obalno-kraška" }
        ]},
        {country: 'Spain', regions: [
            { id: 1, name: "Andalusia" },
            { id: 2, name: "Aragon" },
            { id: 3, name: "Asturias" },
            { id: 4, name: "Balearic Islands" },
            { id: 5, name: "Basque Country" },
            { id: 6, name: "Canary Islands" },
            { id: 7, name: "Cantabria" },
            { id: 8, name: "Castile and León" },
            { id: 9, name: "Castile-La Mancha" },
            { id: 10, name: "Catalonia" },
            { id: 11, name: "Extremadura" },
            { id: 12, name: "Galicia" },
            { id: 13, name: "La Rioja" },
            { id: 14, name: "Madrid" },
            { id: 15, name: "Murcia" },
            { id: 16, name: "Navarre" },
            { id: 17, name: "Valencian Community" },
            { id: 18, name: "Ceuta" },
            { id: 19, name: "Melilla" }
        ]},
        {country: 'Sweden', regions: [
            { id: 1, name: "Stockholm" },
            { id: 2, name: "Uppsala" },
            { id: 3, name: "Södermanland" },
            { id: 4, name: "Östergötland" },
            { id: 5, name: "Jönköping" },
            { id: 6, name: "Kronoberg" },
            { id: 7, name: "Kalmar" },
            { id: 8, name: "Gotland" },
            { id: 9, name: "Blekinge" },
            { id: 10, name: "Skåne" },
            { id: 11, name: "Halland" },
            { id: 12, name: "Västra Götaland" },
            { id: 13, name: "Värmland" },
            { id: 14, name: "Örebro" },
            { id: 15, name: "Västmanland" },
            { id: 16, name: "Dalarna" },
            { id: 17, name: "Gävleborg" },
            { id: 18, name: "Västernorrland" },
            { id: 19, name: "Jämtland" },
            { id: 20, name: "Västerbotten" },
            { id: 21, name: "Norrbotten" }
        ]},
    ]

    const [selectedCountry, setSelectedCountry] = useState('Austria')
    const [currentRegions, setCurrentRegions] = useState(regions[0].regions)

    useEffect(() => {
        const reg = regions.filter(el => {
            if (el.country === selectedCountry) return el.regions
        })
        setCurrentRegions(reg[0].regions)
    }, [selectedCountry])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [addressLine, setAddressLine] = useState('')
    const [selectedRegion, setSelectedRegion] = useState(currentRegions[0].name)
    const [city, setCity] = useState('')
    const [ZipCode, setZipCode] = useState('')

    const add = () => {
        createAddress({
            firstName,
            lastName,
            telephone,
            addressLine,
            country: selectedCountry,
            region: selectedRegion,
            city,
            ZipCode,
            userId
        }).then(() => {
            fetchUserAddresses(userId).then( data => {
                address.setAddresses(data)
            })
        }).finally(() => {
            onHide()
        })
    }

    return (
        <>
        { isShown &&
        <div>
            <form className="w-full grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                    <label>Name:</label>
                    <div className="grid grid-cols-2 gap-5">
                        <input placeholder="First name"
                            className="border border-brand py-1 px-1"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)} />
                        <input placeholder="Last name"
                            className="border border-brand py-1 px-1"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)} />
                    </div>
                    <label>Address line:</label>
                    <input placeholder="Street number, Company name, C/O"
                        className="border border-brand py-1 px-1"
                        value={addressLine}
                        onChange={e => setAddressLine(e.target.value)} />
                    <label>City/Region:</label>
                    <select className="border border-brand py-1 cursor-pointer"
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}>
                        {
                            euCountries.map(el => {
                                return (
                                    <option key={el.id}>{el.name}</option>
                                )
                            })
                        }
                    </select>
                    <label>City:</label>
                    <input placeholder="Please enter your city"
                        className="border border-brand py-1 px-1"
                        value={city}
                        onChange={e => setCity(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Telephone:</label>
                    <input placeholder="Your phone number"
                        className="border border-brand py-1 px-1"
                        value={telephone}
                        onChange={e => setTelephone(e.target.value)} />
                    <label>Address Line 2 (optional):</label>
                    <input placeholder="Street number, Company name, C/O"
                        className="border border-brand py-1 px-1" />
                    <label>State/Province/Region:</label>
                    <select className="border border-brand py-1"
                        value={selectedRegion}
                        onChange={e => setSelectedRegion(e.target.value)}>
                        {
                            currentRegions.map(region => {
                                return (
                                    <option key={region.id}>
                                        {region.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>ZIP/Post Code:</label>
                    <input placeholder="Your Post Code:"
                        className="border border-brand py-1 px-1"
                        value={ZipCode}
                        onChange={e => setZipCode(e.target.value)} />

                </div>
            </form>
            <div className="mt-20 flex justify-end gap-5 px-10 text-xl">
                <button className="px-10 py-3 border border-brand rounded-xl bg-brand text-white cursor-pointer hover:bg-categories hover:text-brand transition"
                    onClick={onHide}>
                    Cancel
                </button>
                <button className="px-10 py-3 border border-brand rounded-xl bg-brand text-white cursor-pointer hover:bg-categories hover:text-brand transition"
                    onClick={add}>
                    Add Address
                </button>
            </div>
        </div>
        }
        </>
    )
}

export default AddAddressForm