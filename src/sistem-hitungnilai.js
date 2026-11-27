"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
const KKM = 85;
const daftarSiswa = [];
function tentukanStatus(rataRata) {
    if (rataRata < KKM) {
        return {
            status: "REMIDI",
            catatan: "Fokus Tingkatkan Belajarmu",
        };
    }
    else if (rataRata <= 93) {
        return {
            status: "LULUS",
            catatan: "Tingkatkan Prestasimu",
        };
    }
    else {
        return {
            status: "LULUS MEMUASKAN",
            catatan: "PERTAHANKAN!!",
        };
    }
}
let lanjut = "Y";
while (lanjut.toUpperCase() === "Y") {
    console.log("\n=== INPUT DATA NILAI SISWA ===");
    const nis = readlineSync.question("Masukkan NIS Siswa: ");
    const nama = readlineSync.question("Masukkan Nama Siswa: ");
    // Validasi opsi kelas (X, XI, XII)
    let kelas = "";
    let kelasValid = false;
    while (!kelasValid) {
        const inputKelas = readlineSync
            .question("Pilih Kelas (X / XI / XII): ")
            .trim()
            .toUpperCase();
        switch (inputKelas) {
            case "X":
            case "XI":
            case "XII":
                kelas = inputKelas;
                kelasValid = true;
                break;
            default:
                console.log("Kelas tidak ada");
                break;
        }
    }
    // Validasi rentang nilai (0 - 100)
    let ipa = 0;
    let mtk = 0;
    let ips = 0;
    let tugas = 0;
    let nilaiValid = false;
    while (!nilaiValid) {
        ipa = readlineSync.questionFloat("Masukkan Nilai IPA (0-100): ");
        mtk = readlineSync.questionFloat("Masukkan Nilai Matematika (0-100): ");
        ips = readlineSync.questionFloat("Masukkan Nilai IPS (0-100): ");
        tugas = readlineSync.questionFloat("Masukkan Nilai Tugas (0-100): ");
        const semuaValid = ipa >= 0 &&
            ipa <= 100 &&
            mtk >= 0 &&
            mtk <= 100 &&
            ips >= 0 &&
            ips <= 100 &&
            tugas >= 0 &&
            tugas <= 100;
        if (semuaValid) {
            nilaiValid = true;
        }
        else {
            console.log("Nilai tidak valid");
        }
    }
    // Hitung total dan rata-rata
    const total = ipa + mtk + ips + tugas;
    const rataRata = total / 4;
    const hasilEvaluasi = tentukanStatus(rataRata);
    const siswaBaru = {
        nis,
        nama,
        kelas,
        ipa,
        mtk,
        ips,
        tugas,
        total,
        rataRata,
        status: hasilEvaluasi.status,
        catatan: hasilEvaluasi.catatan,
    };
    // Simpan data siswa
    daftarSiswa.push(siswaBaru);
    // Tampilkan hasil nilai, predikat & catatan
    console.log("\n=== HASIL PENILAIAN SISWA ===");
    console.log(`NIS        : ${siswaBaru.nis}`);
    console.log(`Kelas      : ${siswaBaru.kelas}`);
    console.log(`IPA        : ${siswaBaru.ipa}`);
    console.log(`Matematika : ${siswaBaru.mtk}`);
    console.log(`IPS        : ${siswaBaru.ips}`);
    console.log(`Tugas      : ${siswaBaru.tugas}`);
    console.log(`Total Nilai: ${siswaBaru.total}`);
    console.log(`Rata-rata  : ${siswaBaru.rataRata.toFixed(2)}`);
    console.log(`Predikat   : ${siswaBaru.status}`);
    console.log(`Catatan    : ${siswaBaru.catatan}`);
    lanjut = readlineSync.question("\nApakah ingin melanjutkan program (Y/N)? ");
}
console.log("\n=== REKAP DATA SISWA TERSIMPAN ===");
console.table(daftarSiswa.map((s) => ({
    NIS: s.nis,
    Kelas: s.kelas,
    Total: s.total,
    "Rata-rata": Number(s.rataRata.toFixed(2)),
    Predikat: s.status,
})));
console.log("Selesai");
//# sourceMappingURL=sistem-hitungnilai.js.map