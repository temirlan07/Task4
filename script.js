document.getElementById('checkForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const buildingNum = document.getElementById('buildingNum').value.trim();
    const roomNum = document.getElementById('roomNum').value.trim();

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Проверка...';

    const baseUrl = 'https://inai-col1.fishrungames.com';

    try {
        const [studentRes, buildingRes, roomRes] = await Promise.all([
            fetch(`${baseUrl}/students/${studentId}`),
            fetch(`${baseUrl}/buildings/${buildingNum}`),
            fetch(`${baseUrl}/rooms/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные (проверьте ID или номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        console.log("Student:", studentData);
        console.log("Building:", buildingData);
        console.log("Room:", roomData);

        let errors = [];

        const isNonResident = 
            studentData.isNonResident ?? 
            studentData.is_non_resident ?? 
            studentData.nonResident ?? 
            studentData.is_nonresident ??
            studentData.outsider ??
            (studentData.isResident === false) ??
            (studentData.is_resident === false) ??
            (studentData.resident === false);

        if (isNonResident === false) {
            errors.push("Студент не является иногородним.");
        }

        const isForStudents = 
            buildingData.isForStudents ?? 
            buildingData.is_for_students ?? 
            buildingData.forStudents ?? 
            buildingData.for_students ??
            buildingData.studentsOnly ??
            (buildingData.type && buildingData.type.toLowerCase().includes('student'));

        if (isForStudents === false) {
            errors.push("Корпус не предназначен для студентов.");
        }


        let roomIsFree = true;

        if ('isFree' in roomData) roomIsFree = Boolean(roomData.isFree);
        else if ('is_free' in roomData) roomIsFree = Boolean(roomData.is_free);
        else if ('free' in roomData) roomIsFree = Boolean(roomData.free);
        else if ('isBusy' in roomData) roomIsFree = !roomData.isBusy;
        else if ('is_busy' in roomData) roomIsFree = !roomData.is_busy;
        else if ('busy' in roomData) roomIsFree = !roomData.busy;
        else if ('occupied' in roomData) roomIsFree = !roomData.occupied;
        else if ('is_occupied' in roomData) roomIsFree = !roomData.is_occupied;
        else if (typeof roomData.status === 'string') {
            const st = roomData.status.toLowerCase();
            roomIsFree = (st === 'free' || st === 'available' || st === 'vacant');
        } else if (Array.isArray(roomData.students)) {
            roomIsFree = roomData.students.length === 0;
        } else if (Array.isArray(roomData.residents)) {
            roomIsFree = roomData.residents.length === 0;
        }

        if (!roomIsFree) {
            errors.push("Комната занята.");
        }

        if (errors.length === 0) {
            resultDiv.textContent = 'Успех: все условия выполнены. Заселение разрешено.';
        } else {
            resultDiv.textContent = 'Отказ:\n' + errors.join('\n');
        }

    } catch (error) {
        resultDiv.textContent = 'Ошибка: ' + error.message;
    }
});
