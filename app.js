let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
let amplopData = {
    "Belanja Dapur": 500000,
    "Listrik & Air": 300000,
    "Kebutuhan Anak": 400000,
};
document.addEventListener("DOMContentLoaded", () => {
    renderAmplop();
    renderDaftar();
    document
    .getElementById("transaction-form")
    .addEventListener("submit", tambahTransaksi);
});
function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(num);
}
function renderAmplop() {
    const container = document.getElementById("amplop-container");
    container.innerHTML = "";
    for (let pos in amplopData) {
        let div = document.createElement("div");
        div.className = "amplop-card";
        div.innerHTML = `<strong>${pos}</strong><br>Alokasi: ${formatRupiah(amplopData[pos])}`;
        container.appendChild(div);
    }
}
function tambahTransaksi(e) {
    e.preventDefault();
    const tgl = document.getElementById("tanggal").value;
    const jns = document.getElementById("jenis").value;
    const kat = document.getElementById("kategori-amplop").value;
    const nom = parseFloat(document.getElementById("nominal").value);
    const cat = document.getElementById("catatan").value;

    if (!tgl || !jns || isNaN(nom)) return;

    transaksi.unshift({
        id: Date.now(),
        tanggal: tgl,
        jenis: jns,
        kategori: kat,
        nominal: nom,
        catatan: cat,
    });
    localStorage.setItem("transaksi", JSON.stringify(transaksi));
    renderDaftar();
    e.target.reset();
}
function renderDaftar() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";
    transaksi.forEach((t) => {
        let item = document.createElement("div");
        item.className = "transaction-item";
        item.innerHTML = `
                <div><b>${t.kategori}</b> (${t.tanggal})<br><small>${t.catatan || "-"}</small></div>
                <div>
                    <span style="color: ${t.jenis === "pemasukan" ? "#16a34a" : "#dc2626"}; font-weight:bold;">
                        ${t.jenis === "pemasukan" ? "+" : "-"} ${formatRupiah(t.nominal)}
                    </span>
                    <button class="btn-hapus" onclick="hapus(${t.id})">Hapus</button>
                </div>
            `;
        list.appendChild(item);
    });
}
function hapus(id) {
    if (confirm("Hapus transaksi ini?")) {
        transaksi = transaksi.filter((t) => t.id !== id);
        localStorage.setItem("transaksi", JSON.stringify(transaksi));
        renderDaftar();
    }
}
