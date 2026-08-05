// js/form-sukusho.js
import { supabase } from './supabase.js';

const form = document.getElementById('sukushoForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Mengunggah...`;

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('imageFile').files[0];

    let imageUrl = null;

    try {
        // 1. Upload Gambar ke Supabase Storage
        if (imageFile) {
            const fileName = `${Date.now()}_${imageFile.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('sukusho-images')
                .upload(fileName, imageFile);
            
            if (uploadError) throw uploadError;
            
            // Dapatkan URL Publik dari gambar yang diunggah
            const { data } = supabase.storage.from('sukusho-images').getPublicUrl(fileName);
            imageUrl = data.publicUrl;
        }

        // 2. Simpan Data ke Tabel Database
        const { error: insertError } = await supabase.from('sukusho').insert([{
            title: title,
            category: category,
            status: status,
            description: description,
            image_url: imageUrl
        }]);

        if (insertError) throw insertError;

        alert('Sukusho berhasil dipublikasikan!');
        window.location.href = 'dashboard.html'; // Redirect ke dashboard

    } catch (err) {
        alert('Terjadi kesalahan: ' + err.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="bi bi-cloud-arrow-up me-1"></i> Publikasikan`;
    }
});