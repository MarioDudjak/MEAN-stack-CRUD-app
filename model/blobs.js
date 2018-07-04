var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  naziv_projekta: String,
  opis_projekta: String,  
  cijena_projekta: Number,
  datum_pocetka: { type: Date, default: Date.now },
  datum_zavrsetka: { type: Date, default: Date.now },
  obavljeni_poslovi: {type:String, default:"none"},  
  clanovi_projekta: [String],  
});
mongoose.model('Blob', blobSchema);