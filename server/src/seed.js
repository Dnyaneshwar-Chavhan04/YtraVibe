import mongoose from "mongoose";
import dotenv from "dotenv";
import { Destination } from "./models.js";
dotenv.config();
const data = [
["Goa","India","Beach", "Sunny beaches, Portuguese-influenced architecture, seafood and lively coastal towns.", "₹2,000–₹5,000/day","November–February",["Palolem Beach","Fontainhas","Dudhsagar Falls"]],
["Jaipur","India","Culture","Explore the Pink City’s forts, palaces, colourful bazaars and Rajasthani food.", "₹1,500–₹4,000/day","October–March",["Amber Fort","Hawa Mahal","City Palace"]],
["Manali","India","Adventure","A Himalayan town for mountain views, cafes, hiking and snow-season escapes.", "₹2,000–₹5,000/day","March–June; December–February",["Solang Valley","Old Manali","Hadimba Temple"]],
["Varanasi","India","Culture","An ancient riverside city known for its ghats, temples, music and food.", "₹1,000–₹3,000/day","October–March",["Dashashwamedh Ghat","Sarnath","Assi Ghat"]],
["Munnar","India","Nature","Rolling tea plantations, misty hills, waterfalls and quiet scenic drives.", "₹2,000–₹4,000/day","September–March",["Tea Museum","Eravikulam National Park","Top Station"]],
["Ladakh","India","Adventure","High-altitude landscapes, monasteries, clear lakes and dramatic mountain passes.", "₹3,000–₹7,000/day","June–September",["Pangong Lake","Nubra Valley","Thiksey Monastery"]],
["Udaipur","India","Culture","Romantic lakeside views, historic palaces, art and traditional markets.", "₹2,000–₹5,000/day","September–March",["City Palace","Lake Pichola","Saheliyon Ki Bari"]],
["Rishikesh","India","Adventure","River rafting, yoga, Himalayan foothills and peaceful riverside walks.", "₹1,500–₹4,000/day","September–November; March–April",["Laxman Jhula area","Triveni Ghat","Neer Garh Waterfall"]],
["Andaman Islands","India","Beach","Clear water, coral reefs, island hopping and relaxed tropical beaches.", "₹3,000–₹7,000/day","October–May",["Radhanagar Beach","Cellular Jail","Elephant Beach"]],
["Hampi","India","History","A remarkable landscape of ancient Vijayanagara ruins, boulders and temples.", "₹1,200–₹3,000/day","October–February",["Virupaksha Temple","Vittala Temple","Matanga Hill"]],
["Meghalaya","India","Nature","Living root bridges, waterfalls, caves and lush green hill towns.", "₹2,000–₹5,000/day","October–April",["Dawki","Nohkalikai Falls","Double Decker Root Bridge"]],
["Mumbai","India","City","A fast-moving coastal city with heritage sites, street food, art and nightlife.", "₹2,500–₹6,000/day","November–February",["Gateway of India","Marine Drive","Sanjay Gandhi National Park"]]
];
await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tripreview");
await Destination.deleteMany({});
await Destination.insertMany(data.map(([name,country,cat,description,budget,bestTime,highlights]) => ({
 name,country,region:country,category:[cat],description,budget,bestTime,duration:"3–5 days",
 image:`https://images.unsplash.com/photo-${({Goa:"1512343879784-a960bf40e7f2",Jaipur:"1599661046827-dacff0c0f09a",Manali:"1626621341517-bbf3d9990a23",Varanasi:"1561361513-2d000a50f0dc",Munnar:"1500530855697-b586d89ba3ee",Ladakh:"1501785888041-af3ef285b470",Udaipur:"1590050752117-238cb0fb12b1",Rishikesh:"1609947017136-9daf32a5eb16", "Andaman Islands":"1519046904884-53103b34b206",Hampi:"1606293926075-69a00dbfde81",Meghalaya:"1516026672322-bc52d61a55d5",Mumbai:"1570168007204-dfb528c6958f"})[name]}?auto=format&fit=crop&w=1200&q=80`,
 gallery:[],budget,bestTime,highlights,travelTips:["Check local weather and transport before departure.","Carry valid identification and keep digital copies of bookings.","Respect local customs and leave natural sites clean."]
})));
console.log(`Seeded ${data.length} destinations.`);
await mongoose.disconnect();
