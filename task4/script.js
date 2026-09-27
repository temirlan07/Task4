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
            fetch(`${baseUrl}/student/${studentId}`),
            fetch(`${baseUrl}/building/${buildingNum}`),
            fetch(`${baseUrl}/room/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные с сервера (проверьте введённые ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        let errors = [];

        if (!studentData.isNonResident) {
            errors.push("Студент не является иногородним.");
        }

        if (!buildingData.isForStudents) {
            errors.push("Корпус не предназначен для студентов.");
        }

        if (!roomData.isFree) {
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
});document.getElementById('checkForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const buildingNum = document.getElementById('buildingNum').value.trim();
    const roomNum = document.getElementById('roomNum').value.trim();

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Проверка...';

    const baseUrl = 'https://inai-col1.fishrungames.com';

    try {
        const [studentRes, buildingRes, roomRes] = await Promise.all([
            fetch(`${baseUrl}/student/${studentId}`),
            fetch(`${baseUrl}/building/${buildingNum}`),
            fetch(`${baseUrl}/room/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные с сервера (проверьте введённые ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        let errors = [];

        if (!studentData.isNonResident) {
            errors.push("Студент не является иногородним.");
        }

        if (!buildingData.isForStudents) {
            errors.push("Корпус не предназначен для студентов.");
        }

        if (!roomData.isFree) {
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
});document.getElementById('checkForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const buildingNum = document.getElementById('buildingNum').value.trim();
    const roomNum = document.getElementById('roomNum').value.trim();

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Проверка...';

    const baseUrl = 'https://inai-col1.fishrungames.com';

    try {
        const [studentRes, buildingRes, roomRes] = await Promise.all([
            fetch(`${baseUrl}/student/${studentId}`),
            fetch(`${baseUrl}/building/${buildingNum}`),
            fetch(`${baseUrl}/room/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные с сервера (проверьте введённые ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        let errors = [];

        if (!studentData.isNonResident) {
            errors.push("Студент не является иногородним.");
        }

        if (!buildingData.isForStudents) {
            errors.push("Корпус не предназначен для студентов.");
        }

        if (!roomData.isFree) {
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