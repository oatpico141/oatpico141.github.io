// ========== Global Utility Functions ==========

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    if (type === 'error') {
        notification.style.background = '#ef4444';
    } else if (type === 'warning') {
        notification.style.background = '#f59e0b';
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Initialize demo data if localStorage is empty
 */
function initializeDemoData() {
    // Check if data already exists
    const patients = JSON.parse(localStorage.getItem('patients'));
    if (patients && patients.length > 0) {
        return; // Data already exists
    }

    // Create demo patients
    const demoPatients = [
        {
            id: '1',
            hn: 'HN001001',
            firstName: 'สมชาย',
            lastName: 'ใจดี',
            birthDate: '1980-05-15',
            gender: 'ชาย',
            idCard: '1234567890123',
            phone: '081-234-5678',
            address: '123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
            chronicDiseases: 'ความดันโลหิตสูง',
            allergies: 'Penicillin',
            notes: '',
            registeredDate: '2025-01-15'
        },
        {
            id: '2',
            hn: 'HN001002',
            firstName: 'สมหญิง',
            lastName: 'มีสุข',
            birthDate: '1990-08-20',
            gender: 'หญิง',
            idCard: '9876543210987',
            phone: '082-345-6789',
            address: '456 ถ.พระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
            chronicDiseases: '',
            allergies: '',
            notes: '',
            registeredDate: '2025-02-10'
        },
        {
            id: '3',
            hn: 'HN001003',
            firstName: 'วิชัย',
            lastName: 'รักษ์ดี',
            birthDate: '1975-12-10',
            gender: 'ชาย',
            idCard: '5555555555555',
            phone: '083-456-7890',
            address: '789 ถ.ลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ 10900',
            chronicDiseases: 'เบาหวาน, ความดันโลหิตสูง',
            allergies: 'Aspirin',
            notes: 'ต้องติดตามอย่างสม่ำเสมอ',
            registeredDate: '2024-12-20'
        }
    ];

    // Create demo appointments
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const demoAppointments = [
        {
            id: '1',
            patientId: '1',
            patientName: 'สมชาย ใจดี',
            patientHN: 'HN001001',
            date: today,
            time: '09:00',
            queueNumber: '001',
            status: 'รอพบแพทย์',
            notes: 'ตรวจสุขภาพประจำปี',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            patientId: '2',
            patientName: 'สมหญิง มีสุข',
            patientHN: 'HN001002',
            date: today,
            time: '10:00',
            queueNumber: '002',
            status: 'รอพบแพทย์',
            notes: '',
            createdAt: new Date().toISOString()
        },
        {
            id: '3',
            patientId: '3',
            patientName: 'วิชัย รักษ์ดี',
            patientHN: 'HN001003',
            date: tomorrow,
            time: '14:00',
            queueNumber: '001',
            status: 'รอพบแพทย์',
            notes: 'ตรวจติดตามโรคเบาหวาน',
            createdAt: new Date().toISOString()
        }
    ];

    // Create demo medical records
    const demoRecords = [
        {
            id: '1',
            patientId: '1',
            patientName: 'สมชาย ใจดี',
            patientHN: 'HN001001',
            date: '2025-01-20',
            time: '09:30',
            chiefComplaint: 'ปวดหัว เวียนศีรษะ',
            presentIllness: 'ปวดหัวมา 2 วัน เวียนศีรษะเล็กน้อย',
            temperature: '36.8',
            bloodPressure: '150/95',
            pulse: '78',
            weight: '75',
            physicalExam: 'ตรวจร่างกายทั่วไป ปกติ',
            diagnosis: 'Hypertension, Headache',
            treatment: 'Amlodipine 5mg 1x1 หลังอาหารเช้า, Paracetamol 500mg เมื่อปวดหัว',
            followUp: 'นัดตรวจติดตาม 1 เดือน',
            notes: '',
            createdAt: new Date('2025-01-20').toISOString()
        }
    ];

    // Create demo billings
    const demoBillings = [
        {
            id: '1',
            receiptNumber: 'RC20250120001',
            date: '2025-01-20',
            patientId: '1',
            patientName: 'สมชาย ใจดี',
            patientHN: 'HN001001',
            items: [
                { description: 'ค่าตรวจรักษา', quantity: 1, price: 300, total: 300 },
                { description: 'Amlodipine 5mg', quantity: 30, price: 5, total: 150 },
                { description: 'Paracetamol 500mg', quantity: 10, price: 2, total: 20 }
            ],
            subtotal: 470,
            discount: 0,
            total: 470,
            paymentStatus: 'ชำระแล้ว',
            paymentMethod: 'เงินสด',
            notes: '',
            createdAt: new Date('2025-01-20').toISOString()
        }
    ];

    // Save to localStorage
    localStorage.setItem('patients', JSON.stringify(demoPatients));
    localStorage.setItem('appointments', JSON.stringify(demoAppointments));
    localStorage.setItem('medicalRecords', JSON.stringify(demoRecords));
    localStorage.setItem('billings', JSON.stringify(demoBillings));

    console.log('Demo data initialized successfully');
}

/**
 * Export data to JSON file
 */
function exportData() {
    const data = {
        patients: JSON.parse(localStorage.getItem('patients')) || [],
        appointments: JSON.parse(localStorage.getItem('appointments')) || [],
        medicalRecords: JSON.parse(localStorage.getItem('medicalRecords')) || [],
        billings: JSON.parse(localStorage.getItem('billings')) || [],
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `clinic-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showNotification('ส่งออกข้อมูลสำเร็จ');
}

/**
 * Import data from JSON file
 */
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.patients) localStorage.setItem('patients', JSON.stringify(data.patients));
            if (data.appointments) localStorage.setItem('appointments', JSON.stringify(data.appointments));
            if (data.medicalRecords) localStorage.setItem('medicalRecords', JSON.stringify(data.medicalRecords));
            if (data.billings) localStorage.setItem('billings', JSON.stringify(data.billings));

            showNotification('นำเข้าข้อมูลสำเร็จ');
            location.reload();
        } catch (error) {
            showNotification('ไฟล์ข้อมูลไม่ถูกต้อง', 'error');
        }
    };
    reader.readAsText(file);
}

/**
 * Clear all data (with confirmation)
 */
function clearAllData() {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        if (confirm('ยืนยันอีกครั้ง: ข้อมูลทั้งหมดจะถูกลบอย่างถาวร')) {
            localStorage.removeItem('patients');
            localStorage.removeItem('appointments');
            localStorage.removeItem('medicalRecords');
            localStorage.removeItem('billings');
            showNotification('ลบข้อมูลทั้งหมดสำเร็จ');
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    }
}

// Initialize demo data on first load
document.addEventListener('DOMContentLoaded', function() {
    initializeDemoData();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to search (if search box exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.querySelector('input[type="text"]');
        if (searchBox) searchBox.focus();
    }
});
