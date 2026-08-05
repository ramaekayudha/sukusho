// js/dashboard.js
import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", () => {
    loadAdminData();
});

async function loadAdminData() {
    const tableBody = document.getElementById('adminTableBody');
    if (!tableBody) return;

    try {
        const { data: sukusho, error } = await supabase
            .from('sukusho')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        tableBody.innerHTML = '';

        if (sukusho.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-5">Belum ada data. Silakan unggah Sukusho baru.</td></tr>`;
            return;
        }

        sukusho.forEach((item) => {
            const row = `
                <tr>
                    <td><strong>#${item.id}</strong></td>
                    <td><img src="${item.image_url || 'https://via.placeholder.com/80x60'}" alt="Screenshot" width="80" height="60" class="rounded object-fit-cover"></td>
                    <td>${item.title}</td>
                    <td><span class="badge bg-primary-subtle text-primary-emphasis">${item.category}</span></td>
                    <td>
                        <span class="badge ${item.status === 'solved' ? 'bg-success-subtle text-success-emphasis' : 'bg-warning-subtle text-warning-emphasis'}">
                            ${item.status}
                        </span>
                    </td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-danger" onclick="deleteSukusho(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error('Error:', err.message);
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-5">Gagal memuat data.</td></tr>`;
    }
}

// Fungsi Delete (Attach ke window object agar bisa dipanggil dari inline HTML onclick)
window.deleteSukusho = async function(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
        const { error } = await supabase.from('sukusho').delete().eq('id', id);
        if (error) throw error;
        
        alert('Data berhasil dihapus.');
        loadAdminData(); // Refresh tabel
    } catch (err) {
        alert('Gagal menghapus data: ' + err.message);
    }
};