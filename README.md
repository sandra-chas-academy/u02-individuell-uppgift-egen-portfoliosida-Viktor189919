

För säkerhets skull så vill jag upplysa om ett felmeddelande jag alltid får i konsolen oavsett JS: 
contact.html:1 Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.

Sammanfattning av projekt:

Interaktiv funktion 1: Man kan visa menyn på alla sidor genom tryck på "burger-menu". Finns i base.js.
Funktion 2: En “visningskarusell” av projekten på projects sidan när skärmbredden < 600. Karusellen och kod för hämtning från github finns i projects.js. 
About sidan har en .js för hämtning från about.json.
Använde separata filer för att javascript inte ska köras när det inte behövs.
JS-funktionerna är ganska skräddarsydda för uppgiften. Skulle kunna vara mer anpassade för potentiell utökning av projects och då automatisk anpassning av pagination. 

Teoretiska frågor:

--Vad kan man utveckla m.h.a av Javascript inom frontend?--

Används för att skapa dynamiskt innehåll och interaktivitet för
användare. Kan nästan ohämmat manipulera ett dokument och dess innehåll och styling. Används för matematiska beräkningar.
Används för kommunikation med webservers och hämtning från API:er genom HTTP eller andra internetprotokoll.

--Vad är JSON och hur används det inom frontend?--

Ett sätt att formatera data för lagring och transferering. Lagrar data i key/value par och syntaxen är nästan identisk med JS syntax för objekt. Det är snabbt och väl anpassat för JS och därför användbart inom frontendutveckling.

--Vad är HTTP och var bör man som frontendutvecklare ha kunskap om det och dess protokoll?--

Det första och överlägset mest använda internetprotokollet. Använder ett request/response protokoll för att skicka data mellan en browser (klient) och en webserver. 
Viktigt för utvecklare att förstå den huvudsakliga kommunikationen över internet och hur man hämtar och skickar data från/till en webserver med metoder som ex. GET, POST.

