// js/app.js
import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", () => {
    loadSukushoData();
    loadStatistics();
});

async function loadSukushoData() {
    const tableBody = document.getElementById('sukushoTableBody');
    if (!tableBody) return;

    try {
        const { data: sukusho, error } = await supabase
            .from('sukusho')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) throw error;

        tableBody.innerHTML = '';

        if (sukusho.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-5">Belum ada data Sukusho yang diunggah ke sistem.</td></tr>`;
            return;
        }

        sukusho.forEach((item) => {
            const row = `
                <tr>
                    <td><strong>#${item.id}</strong></td>
                    <td>${item.title}</td>
                    <td><span class="badge bg-primary-subtle text-primary-emphasis">${item.category}</span></td>
                    <td>
                        <span class="badge ${item.status === 'solved' ? 'bg-success-subtle text-success-emphasis' : 'bg-warning-subtle text-warning-emphasis'}">
                            ${item.status === 'solved' ? 'Solved' : 'Pending'}
                        </span>
                    </td>
                    <td class="text-end"><a href="#" class="btn btn-sm btn-outline-secondary">Lihat</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error('Error:', err.message);
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-5">Gagal terhubung ke database.</td></tr>`;
    }
}

async function loadStatistics() {
    try {
        // Hitung jumlah baris di tabel sukusho
        const { count: sukushoCount } = await supabase
            .from('sukusho')
            .select('*', { count: 'exact', head: true });
            
        // Hitung jumlah baris di tabel publications
        const { count: pubCount } = await supabase
            .from('publications')
            .select('*', { count: 'exact', head: true });

        document.getElementById('statSukusho').innerText = sukushoCount || 0;
        document.getElementById('statPublikasi').innerText = pubCount || 0;

    } catch (err) {
        console.error('Gagal memuat statistik:', err.message);
    }
}