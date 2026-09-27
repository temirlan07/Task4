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
            throw new Error("Не удалось получить данные с сервера (проверьте введённые ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        console.log("Student:", studentData);
        console.log("Building:", buildingData);
        console.log("Room:", roomData);

        let errors = [];

        const isNonResident = studentData.isNonResident ?? studentData.is_non_resident ?? studentData.nonResident ?? studentData.isOutsider;
        if (isNonResident === false) {
            errors.push("Студент не является иногородним.");
        }

        const isForStudents = buildingData.isForStudents ?? buildingData.is_for_students ?? buildingData.forStudents ?? buildingData.studentsOnly;
        if (isForStudents === false) {
            errors.push("Корпус не предназначен для студентов.");
        }

        const isFree = roomData.isFree ?? roomData.is_free ?? roomData.free ?? (roomData.status === 'free');
        if (isFree === false) {
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
