
import * as d3 from 'd3';

const raw = `"item_group","item_category","item_subcategory","total"
"BARANGAN BERBUNGKUS","BERAS",,19
"BARANGAN BERBUNGKUS","BIHUN",,3
"BARANGAN BERBUNGKUS","ESEN DAN RAGI",,6
"BARANGAN BERBUNGKUS","GULA",,4
"BARANGAN BERBUNGKUS","IKAN DALAM TIN",,11
"BARANGAN BERBUNGKUS","KICAP DAN SOS",,20
"BARANGAN BERBUNGKUS","KRIMER DAN SUSU TEPUNG",,23
"BARANGAN BERBUNGKUS","MENTEGA",,2
"BARANGAN BERBUNGKUS","MI SEGERA",,4
"BARANGAN BERBUNGKUS","MINYAK DAN LEMAK",,39
"BARANGAN BERBUNGKUS","REMPAH RATUS (BERBUNGKUS)",,30
"BARANGAN BERBUNGKUS","REMPAH RATUS (TIDAK BERBUNGKUS)",,18
"BARANGAN BERBUNGKUS","ROTI",,4
"BARANGAN BERBUNGKUS","SANTAN (KOTAK)",,4
"BARANGAN BERBUNGKUS","SAPUAN (SPREADS)",,15
"BARANGAN BERBUNGKUS","TEPUNG",,8
"BARANGAN KEDAI SERBANEKA","ALAT TULIS DAN BAHAN BACAAN",,3
"BARANGAN KEDAI SERBANEKA","BERUS GIGI",,1
"BARANGAN KEDAI SERBANEKA","BISKUT",,6
"BARANGAN KEDAI SERBANEKA","COKLAT",,6
"BARANGAN KEDAI SERBANEKA","MAJALAH",,2
"BARANGAN KEDAI SERBANEKA","MAKANAN RINGAN",,4
"BARANGAN KEDAI SERBANEKA","MAKANAN SEGERA",,2
"BARANGAN KEDAI SERBANEKA","MINUMAN",,7
"BARANGAN KEDAI SERBANEKA","MOUTH WASH",,1
"BARANGAN KEDAI SERBANEKA","PENGHALAU NYAMUK",,1
"BARANGAN KEDAI SERBANEKA","PEWANGI RUMAH",,1
"BARANGAN KEDAI SERBANEKA","SABUN BADAN",,1
"BARANGAN KEDAI SERBANEKA","SYAMPU",,2
"BARANGAN KEDAI SERBANEKA","TISU",,1
"BARANGAN KEDAI SERBANEKA","TUALA WANITA",,2
"BARANGAN KEDAI SERBANEKA","UBAT GIGI",,1
"BARANGAN KEDAI SERBANEKA","UBAT-UBATAN",,8
"BARANGAN KERING","BAWANG",,11
"BARANGAN KERING","CILI KERING",,2
"BARANGAN KERING","HASIL LAUT KERING",,3
"BARANGAN KERING","KACANG",,7
"BARANGAN KERING","UBI KENTANG",,3
"BARANGAN SEGAR","AYAM","AYAM BELANDA",1
"BARANGAN SEGAR","AYAM","AYAM BERSIH",2
"BARANGAN SEGAR","AYAM","AYAM HIDUP",2
"BARANGAN SEGAR","AYAM","DADA AYAM",1
"BARANGAN SEGAR","AYAM","KEPAK AYAM",1
"BARANGAN SEGAR","AYAM","PAHA AYAM",3
"BARANGAN SEGAR","BAHAN LAUT","IKAN BAWAL",2
"BARANGAN SEGAR","BAHAN LAUT","IKAN CENCARU",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN DEMUDUK/CUPAK/CERMIN",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN GELAMA",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN JENAHAK",3
"BARANGAN SEGAR","BAHAN LAUT","IKAN KEMBUNG",2
"BARANGAN SEGAR","BAHAN LAUT","IKAN KERAPU",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN KERISI",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN MABUNG",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN MERAH",3
"BARANGAN SEGAR","BAHAN LAUT","IKAN PARANG",2
"BARANGAN SEGAR","BAHAN LAUT","IKAN PARI",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN SELAR",2
"BARANGAN SEGAR","BAHAN LAUT","IKAN SELAYANG/SARDIN",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN SENANGIN",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN SIAKAP",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN TAMBAN",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN TENGGIRI",3
"BARANGAN SEGAR","BAHAN LAUT","IKAN TERUBOK",1
"BARANGAN SEGAR","BAHAN LAUT","IKAN TONGKOL/AYA/KAYU HITAM",1
"BARANGAN SEGAR","BAHAN LAUT","KERANG",1
"BARANGAN SEGAR","BAHAN LAUT","KETAM",1
"BARANGAN SEGAR","BAHAN LAUT","SOTONG",1
"BARANGAN SEGAR","BAHAN LAUT","UDANG",5
"BARANGAN SEGAR","BUAH-BUAHAN","ANGGUR",2
"BARANGAN SEGAR","BUAH-BUAHAN","BETIK",1
"BARANGAN SEGAR","BUAH-BUAHAN","DRAGON FRUIT",1
"BARANGAN SEGAR","BUAH-BUAHAN","EPAL",2
"BARANGAN SEGAR","BUAH-BUAHAN","JAMBU BATU",2
"BARANGAN SEGAR","BUAH-BUAHAN","LAI",1
"BARANGAN SEGAR","BUAH-BUAHAN","LIMAU",1
"BARANGAN SEGAR","BUAH-BUAHAN","NENAS",1
"BARANGAN SEGAR","BUAH-BUAHAN","OREN",1
"BARANGAN SEGAR","BUAH-BUAHAN","PISANG",2
"BARANGAN SEGAR","BUAH-BUAHAN","TEMBIKAI",3
"BARANGAN SEGAR","DAGING","DAGING BABI",5
"BARANGAN SEGAR","DAGING","DAGING KAMBING",13
"BARANGAN SEGAR","DAGING","DAGING KERBAU",7
"BARANGAN SEGAR","DAGING","DAGING LEMBU",7
"BARANGAN SEGAR","IKAN DARAT","IKAN HARUAN",1
"BARANGAN SEGAR","IKAN DARAT","IKAN KELI",1
"BARANGAN SEGAR","IKAN DARAT","IKAN TILAPIA",2
"BARANGAN SEGAR","KELAPA","KELAPA BIJI",1
"BARANGAN SEGAR","KELAPA","KELAPA PARUT",1
"BARANGAN SEGAR","KELAPA","SANTAN",2
"BARANGAN SEGAR","MEE/KUETIAU","KUETIAU",1
"BARANGAN SEGAR","MEE/KUETIAU","MEE",1
"BARANGAN SEGAR","SAYUR-SAYURAN","BAWANG",2
"BARANGAN SEGAR","SAYUR-SAYURAN","BAYAM",2
"BARANGAN SEGAR","SAYUR-SAYURAN","CILI",7
"BARANGAN SEGAR","SAYUR-SAYURAN","HALIA, KUNYIT, LENGKUAS",3
"BARANGAN SEGAR","SAYUR-SAYURAN","KEKACANG",5
"BARANGAN SEGAR","SAYUR-SAYURAN","KUBIS",7
"BARANGAN SEGAR","SAYUR-SAYURAN","LADA BENGGALA",3
"BARANGAN SEGAR","SAYUR-SAYURAN","LIMAU",1
"BARANGAN SEGAR","SAYUR-SAYURAN","SAYUR BUAH, UBI",3
"BARANGAN SEGAR","SAYUR-SAYURAN","SAYUR DAUN",5
"BARANGAN SEGAR","SAYUR-SAYURAN","TERUNG",2
"BARANGAN SEGAR","TAUHU DAN TEMPE","TAUHU",1
"BARANGAN SEGAR","TAUHU DAN TEMPE","TEMPE",1
"BARANGAN SEGAR","TELUR","TELUR AYAM",7
"BARANGAN SEGAR","TELUR","TELUR ITIK",1
"BARANGAN SEGAR","TELUR","TELUR MASIN",2
"BARANGAN SEGAR","TELUR","TELUR PUYUH",1
"MAKANAN SIAP MASAK","LAIN-LAIN",,27
"MAKANAN SIAP MASAK","LAUK",,72
"MAKANAN SIAP MASAK","MEE / BIHUN / KUEY TEOW",,28
"MAKANAN SIAP MASAK","MINUMAN",,40
"MAKANAN SIAP MASAK","NASI",,24
"MINUMAN","BAHAN-BAHAN MINUMAN",,21
"MINUMAN","TERSEDIA MINUM",,25
"PRODUK KEBERSIHAN","PENJAGAAN DIRI",,18
"PRODUK KEBERSIHAN","PENJAGAAN RUMAH",,19
"SUSU DAN BARANGAN BAYI","LAMPIN PAKAI BUANG",,11
"SUSU DAN BARANGAN BAYI","MAKANAN BAYI",,6
"SUSU DAN BARANGAN BAYI","SUSU BAYI",,20`;


const data = d3.csvParse(raw);


data.forEach(d=>{
	d.total = +d.total;
});

export default data;


