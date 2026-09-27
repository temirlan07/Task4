document.getElementById('checkForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const buildingNum = document.getElementById('buildingNum').value;
    const roomNum = document.getElementById('roomNum').value;

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Проверка...';

    try {
        const [studentRes, buildingRes, roomRes] = await Promise.all([
            fetch(`https://example.com/api/student/${studentId}`),
            fetch(`https://example.com/api/building/${buildingNum}`),
            fetch(`https://example.com/api/room/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Ошибка сервера");
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
            resultDiv.textContent = 'Успех: все условия выполнены.';
        } else {
            resultDiv.textContent = 'Отказ:\n' + errors.join('\n');
        }

    } catch (error) {
        resultDiv.textContent = 'Ошибка: ' + error.message;
    }
});