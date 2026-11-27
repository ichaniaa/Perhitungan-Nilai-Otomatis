// Mengimpor readline-sync untuk input langsung di terminal
import * as readlineSync from "readline-sync";

// Nilai KKM tetap (konstanta)
const KKM: number = 85;

// Array sejajar (sederhana) untuk menyimpan data tiap siswa
const daftarId: string[] = [];
const daftarNis: string[] = [];
const daftarKelas: string[] = [];
const daftarIpa: number[] = [];
const daftarMtk: number[] = [];
const daftarIps: number[] = [];
const daftarTugas: number[] = [];
const daftarTotal: number[] = [];
const daftarRata: number[] = [];
const daftarStatus: string[] = [];
const daftarCatatan: string[] = [];

// Nomor urut untuk membuat ID unik
let nomorId: number = 1;

// Fungsi untuk meminta teks agar tidak kosong
function inputTeksTidakKosong(pesan: string): string {
  // Menyimpan input teks sementara
  let teks: string = "";

  // Mengulang sampai pengguna mengisi teks
  while (teks === "") {
    teks = readlineSync.question(pesan).trim();
    // Jika masih kosong, tampilkan pesan
    if (teks === "") {
      console.log("Input tidak boleh kosong!");
    }
  }

  return teks;
}

// Fungsi untuk meminta pilihan kelas (X, XI, XII) sesuai flowchart
function inputKelas(): string {
  // Menyimpan hasil kelas yang valid
  let kelas: string = "";
  // Penanda apakah kelas sudah benar
  let valid: boolean = false;

  // Mengulang sampai kelas sesuai pilihan
  while (!valid) {
    const pilih: string = readlineSync
      .question("Pilih Kelas (X / XI / XII): ")
      .trim()
      .toUpperCase();

    // Percabangan switch dengan 3 case + default + break
    switch (pilih) {
      case "X":
        kelas = "X";
        valid = true;
        break;
      case "XI":
        kelas = "XI";
        valid = true;
        break;
      case "XII":
        kelas = "XII";
        valid = true;
        break;
      default:
        // Peringatan sesuai flowchart
        console.log('Peringatan: "Kelas tidak ada"');
        break;
    }
  }

  return kelas;
}

// Fungsi untuk meminta 1 nilai dengan validasi angka 0 - 100
function inputNilaiValid(namaKomponen: string): number {
  // Nilai awal sebelum divalidasi
  let nilai: number = -1;
  // Penanda validitas nilai
  let valid: boolean = false;

  // Mengulang sampai nilai berada di rentang 0 sampai 100
  while (!valid) {
    nilai = readlineSync.questionFloat(`Masukkan Nilai ${namaKomponen} (0-100): `);

    // Cek angka valid dan di antara 0 dan 100
    if (!Number.isNaN(nilai) && nilai >= 0 && nilai <= 100) {
      valid = true;
    } else {
      console.log('Peringatan: "Nilai tidak valid"');
    }
  }

  return nilai;
}

// Fungsi menghitung total 3 mapel dan rata-rata + bonus nilai tugas (+=)
function hitungNilaiAkhir(
  ipa: number,
  mtk: number,
  ips: number,
  tugas: number
): { total: number; rataAkhir: number } {
  // Total dihitung dari 3 mata pelajaran (IPA, Matematika, IPS)
  const total: number = ipa + mtk + ips;

  // Rata-rata awal dihitung hanya dari 3 mata pelajaran (dibagi 3)
  let rataAkhir: number = total / 3;

  // Nilai tugas hanya menjadi bonus: misal 5% dari nilai tugas (0 s.d. 5 poin)
  const bonusTugas: number = tugas * 0.05;

  // Menambahkan bonus nilai tugas ke rata-rata menggunakan operator +=
  rataAkhir += bonusTugas;

  // Menjaga agar nilai rata-rata akhir tidak melebihi 100
  if (rataAkhir > 100) {
    rataAkhir = 100;
  }

  return { total, rataAkhir };
}

// Fungsi menentukan predikat dan catatan berdasarkan rata-rata akhir
function cekPredikat(rata: number): [string, string] {
  // Rantai if / else if / else sesuai flowchart
  if (rata < KKM) {
    return ["REMIDI", "Fokus Tingkatkan Belajarmu"];
  } else if (rata <= 93) {
    return ["LULUS", "Tingkatkan Prestasimu"];
  } else {
    return ["LULUS MEMUASKAN", "PERTAHANKAN!!"];
  }
}

// 1. Tambah data siswa baru
function tambahData(): void {
  console.log("\n--- TAMBAH DATA SISWA ---");

  // Input NIS dan kelas
  const nis: string = inputTeksTidakKosong("Masukkan NIS Siswa: ");
  const kelas: string = inputKelas();

  // Input nilai 3 mapel dan nilai tugas (bonus)
  const ipa: number = inputNilaiValid("IPA");
  const mtk: number = inputNilaiValid("Matematika");
  const ips: number = inputNilaiValid("IPS");
  const tugas: number = inputNilaiValid("Tugas (Bonus)");

  // Hitung total 3 mapel dan rata-rata akhir (sudah termasuk bonus tugas via +=)
  const { total, rataAkhir } = hitungNilaiAkhir(ipa, mtk, ips, tugas);

  // Tentukan status dan catatan
  const [status, catatan] = cekPredikat(rataAkhir);

  // Buat ID unik dan perbarui nomor urut dengan compound (+=)
  const idBaru: string = `ID-${nomorId}`;
  nomorId += 1;

  // Simpan ke masing-masing array
  daftarId.push(idBaru);
  daftarNis.push(nis);
  daftarKelas.push(kelas);
  daftarIpa.push(ipa);
  daftarMtk.push(mtk);
  daftarIps.push(ips);
  daftarTugas.push(tugas);
  daftarTotal.push(total);
  daftarRata.push(rataAkhir);
  daftarStatus.push(status);
  daftarCatatan.push(catatan);

  // Tampilkan hasil
  console.log("\nData tersimpan! ID Anda:", idBaru);
  console.log(
    `NIS: ${nis} | Kelas: ${kelas} | Total (3 Mapel): ${total} | Tugas (Bonus): ${tugas} | Rata-rata Akhir: ${rataAkhir.toFixed(2)}`
  );
  console.log(`Predikat: ${status} | Catatan: ${catatan}`);
}

// 2. Tampilkan seluruh data
function tampilkanSemua(): void {
  console.log("\n--- SELURUH DATA SISWA ---");

  // Pesan jika belum ada data
  if (daftarId.length === 0) {
    console.log("Data masih kosong.");
    return;
  }

  // Cetak seluruh data menggunakan perulangan for
  for (let i: number = 0; i < daftarId.length; i++) {
    console.log(
      `${i + 1}. ID: ${daftarId[i]} | NIS: ${daftarNis[i]} | Kelas: ${daftarKelas[i]} | Total: ${daftarTotal[i]} | Bonus Tugas: ${daftarTugas[i]} | Rata-rata: ${daftarRata[i].toFixed(2)} | ${daftarStatus[i]}`
    );
  }
}

// 3. Tampilkan detail satu data berdasarkan ID
function detailById(): void {
  console.log("\n--- DETAIL DATA BERDASARKAN ID ---");

  // Cek jika data kosong
  if (daftarId.length === 0) {
    console.log("Data masih kosong.");
    return;
  }

  const cariId: string = inputTeksTidakKosong("Masukkan ID: ").toUpperCase();
  let indeksDitemukan: number = -1;

  // Cari posisi ID di array
  for (let i: number = 0; i < daftarId.length; i++) {
    if (daftarId[i].toUpperCase() === cariId) {
      indeksDitemukan = i;
    }
  }

  // Tampilkan detail jika ketemu
  if (indeksDitemukan !== -1) {
    console.log(`ID            : ${daftarId[indeksDitemukan]}`);
    console.log(`NIS           : ${daftarNis[indeksDitemukan]}`);
    console.log(`Kelas         : ${daftarKelas[indeksDitemukan]}`);
    console.log(`IPA           : ${daftarIpa[indeksDitemukan]}`);
    console.log(`MTK           : ${daftarMtk[indeksDitemukan]}`);
    console.log(`IPS           : ${daftarIps[indeksDitemukan]}`);
    console.log(`Total (3 Mapel) : ${daftarTotal[indeksDitemukan]}`);
    console.log(`Tugas (Bonus) : ${daftarTugas[indeksDitemukan]}`);
    console.log(`Rata-rata Akhir: ${daftarRata[indeksDitemukan].toFixed(2)}`);
    console.log(`Predikat      : ${daftarStatus[indeksDitemukan]}`);
    console.log(`Catatan       : ${daftarCatatan[indeksDitemukan]}`);
  } else {
    console.log("ID tidak ditemukan.");
  }
}

// 4. Ubah data berdasarkan ID (termasuk jalur nested 3 tingkat)
function ubahData(): void {
  console.log("\n--- UBAH DATA BERDASARKAN ID ---");

  // Cek jika data kosong
  if (daftarId.length === 0) {
    console.log("Data masih kosong.");
    return;
  }

  const cariId: string = inputTeksTidakKosong("Masukkan ID yang ingin diubah: ").toUpperCase();
  let idx: number = -1;

  for (let i: number = 0; i < daftarId.length; i++) {
    if (daftarId[i].toUpperCase() === cariId) {
      idx = i;
    }
  }

  // Tingkat 1: jika ID ditemukan
  if (idx !== -1) {
    console.log("1. Ubah Kelas\n2. Ubah Nilai & Tugas Bonus");
    const pilihUbah: number = readlineSync.questionInt("Pilih (1/2): ");

    // Tingkat 2: switch pilihan ubah
    switch (pilihUbah) {
      case 1:
        daftarKelas[idx] = inputKelas();
        console.log("Kelas berhasil diubah.");
        break;
      case 2: {
        const ipaBaru: number = inputNilaiValid("IPA");
        const mtkBaru: number = inputNilaiValid("Matematika");
        const ipsBaru: number = inputNilaiValid("IPS");
        const tugasBaru: number = inputNilaiValid("Tugas (Bonus)");

        const yakin: string = readlineSync
          .question("Simpan perubahan nilai? (Y/N): ")
          .trim()
          .toUpperCase();

        // Tingkat 3: konfirmasi Y/N di dalam case 2 di dalam if idx !== -1
        if (yakin === "Y") {
          daftarIpa[idx] = ipaBaru;
          daftarMtk[idx] = mtkBaru;
          daftarIps[idx] = ipsBaru;
          daftarTugas[idx] = tugasBaru;

          const { total, rataAkhir } = hitungNilaiAkhir(
            ipaBaru,
            mtkBaru,
            ipsBaru,
            tugasBaru
          );
          const [statusBaru, catatanBaru] = cekPredikat(rataAkhir);

          daftarTotal[idx] = total;
          daftarRata[idx] = rataAkhir;
          daftarStatus[idx] = statusBaru;
          daftarCatatan[idx] = catatanBaru;

          console.log("Nilai dan bonus tugas berhasil diperbarui.");
        } else {
          console.log("Perubahan dibatalkan.");
        }
        break;
      }
      default:
        console.log("Pilihan tidak valid.");
        break;
    }
  } else {
    console.log("ID tidak ditemukan.");
  }
}

// 5. Hapus data berdasarkan ID dengan konfirmasi (Y/N)
function hapusData(): void {
  console.log("\n--- HAPUS DATA BERDASARKAN ID ---");

  // Cek jika data kosong
  if (daftarId.length === 0) {
    console.log("Data masih kosong.");
    return;
  }

  const cariId: string = inputTeksTidakKosong("Masukkan ID yang ingin dihapus: ").toUpperCase();
  let idx: number = -1;

  for (let i: number = 0; i < daftarId.length; i++) {
    if (daftarId[i].toUpperCase() === cariId) {
      idx = i;
    }
  }

  // Jika ID ditemukan, minta konfirmasi Y/N
  if (idx !== -1) {
    const konfirmasi: string = readlineSync
      .question(`Yakin hapus data ID ${daftarId[idx]}? (Y/N): `)
      .trim()
      .toUpperCase();

    if (konfirmasi === "Y") {
      // Hapus 1 elemen di posisi idx pada tiap array
      daftarId.splice(idx, 1);
      daftarNis.splice(idx, 1);
      daftarKelas.splice(idx, 1);
      daftarIpa.splice(idx, 1);
      daftarMtk.splice(idx, 1);
      daftarIps.splice(idx, 1);
      daftarTugas.splice(idx, 1);
      daftarTotal.splice(idx, 1);
      daftarRata.splice(idx, 1);
      daftarStatus.splice(idx, 1);
      daftarCatatan.splice(idx, 1);
      console.log("Data berhasil dihapus.");
    } else {
      console.log("Penghapusan dibatalkan.");
    }
  } else {
    console.log("ID tidak ditemukan.");
  }
}

// 6. Pencarian kata kunci (huruf besar/kecil sama saja) + filter kelas
function cariDanFilter(): void {
  console.log("\n--- CARI & FILTER DATA ---");

  // Cek jika data kosong
  if (daftarId.length === 0) {
    console.log("Data masih kosong.");
    return;
  }

  const kataKunci: string = inputTeksTidakKosong(
    "Masukkan kata kunci (ID, NIS, atau Predikat): "
  ).toLowerCase();

  const filterKelas: string = readlineSync
    .question("Filter kelas (X / XI / XII / SEMUA): ")
    .trim()
    .toUpperCase();

  let jumlahCocok: number = 0;

  // Periksa tiap data menggunakan perulangan for
  for (let i: number = 0; i < daftarId.length; i++) {
    const cocokKata: boolean =
      daftarId[i].toLowerCase().includes(kataKunci) ||
      daftarNis[i].toLowerCase().includes(kataKunci) ||
      daftarStatus[i].toLowerCase().includes(kataKunci);

    const cocokKelas: boolean =
      filterKelas === "SEMUA" || daftarKelas[i] === filterKelas;

    if (cocokKata && cocokKelas) {
      jumlahCocok += 1;
      console.log(
        `${jumlahCocok}. ID: ${daftarId[i]} | NIS: ${daftarNis[i]} | Kelas: ${daftarKelas[i]} | Rata-rata: ${daftarRata[i].toFixed(2)} | ${daftarStatus[i]}`
      );
    }
  }

  if (jumlahCocok === 0) {
    console.log("Data yang dicari tidak ditemukan.");
  }
}

// Menu utama berulang sampai memilih keluar (0)
let jalan: boolean = true;

while (jalan) {
  console.log("\n=== MENU PERHITUNGAN NILAI OTOMATIS ===");
  console.log("1. Tambah Data");
  console.log("2. Tampilkan Semua Data");
  console.log("3. Lihat Detail berdasarkan ID");
  console.log("4. Ubah Data berdasarkan ID");
  console.log("5. Hapus Data berdasarkan ID");
  console.log("6. Cari & Filter Data");
  console.log("0. Keluar");

  const menu: number = readlineSync.questionInt("Pilih menu (0-6): ");

  // Percabangan switch untuk menu utama
  switch (menu) {
    case 1:
      tambahData();
      break;
    case 2:
      tampilkanSemua();
      break;
    case 3:
      detailById();
      break;
    case 4:
      ubahData();
      break;
    case 5:
      hapusData();
      break;
    case 6:
      cariDanFilter();
      break;
    case 0:
      jalan = false;
      console.log("Program selesai.");
      break;
    default:
      console.log("Menu tidak valid! Pilih angka 0 sampai 6.");
      break;
  }
}