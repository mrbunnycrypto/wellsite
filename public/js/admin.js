document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Dashboard loaded!');
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Data submitted!');
    });
});
