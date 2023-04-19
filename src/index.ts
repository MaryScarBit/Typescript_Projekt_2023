// Erforderliche Abhängigkeiten importieren
var mysql = require('mysql');

// Verbindung zur MySQL-Datenbank herstellen
var con = mysql.createConnection({
  host: "MarieBleickert",        // Der Hostname des MySQL-Servers
  user: "Marie",    // Ihr Benutzername für die MySQL-Datenbank
  password: "123",// Ihr Passwort für die MySQL-Datenbank
  database: "rezepte"         // Der Name Ihrer erstellten MySQL-Datenbank
});

// Verbindung zur Datenbank herstellen
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
  
  // Hier können Sie Ihre MySQL-Datenbank-Operationen durchführen
});

  // Daten für die INSERT-Abfrage
  var data = {name: "Röstapfel", Sterne: 1 , Eigenschaft: "Herzen"};
  
  // INSERT-Abfrage ausführen
  con.query("INSERT INTO tablename SET ?", data, function (err, result) {
    if (err) throw err;
    console.log("Data inserted:", result);
  });

