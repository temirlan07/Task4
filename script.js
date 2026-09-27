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
            throw new Error("Не удалось получить данные с сервера (проверьте введенные ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        const studentName = studentData.name || studentData.student_name || `Студент #${studentId}`;
        const isNonResident = 
            studentData.isNonResident ?? 
            studentData.is_non_resident ?? 
            studentData.nonResident ?? 
            studentData.outsider ?? 
            (studentData.isResident === false) ?? 
            (studentData.is_resident === false) ?? 
            (studentData.resident === false);

        const isForStudents = 
            buildingData.isForStudents ?? 
            buildingData.is_for_students ?? 
            buildingData.forStudents ?? 
            (buildingData.type && buildingData.type.toLowerCase().includes('student'));

        let roomIsFree = true;
        if ('isFree' in roomData) roomIsFree = Boolean(roomData.isFree);
        else if ('is_free' in roomData) roomIsFree = Boolean(roomData.is_free);
        else if ('free' in roomData) roomIsFree = Boolean(roomData.free);
        else if ('isBusy' in roomData) roomIsFree = !roomData.isBusy;
        else if ('is_busy' in roomData) roomIsFree = !roomData.is_busy;
        else if ('busy' in roomData) roomIsFree = !roomData.busy;
        else if ('occupied' in roomData) roomIsFree = !roomData.occupied;
        else if (typeof roomData.status === 'string') {
            const st = roomData.status.toLowerCase();
            roomIsFree = (st === 'free' || st === 'available' || st === 'vacant');
        } else if (Array.isArray(roomData.students)) {
            roomIsFree = roomData.students.length === 0;
        }

        const studentStatusText = isNonResident 
            ? `[+] СТУДЕНТ: ${studentName} является иногородним`
            : `[-] СТУДЕНТ: ${studentName} не является иногородним`;

        const buildingStatusText = isForStudents
            ? `[+] КОРПУС: Корпус №${buildingNum} предназначен для студентов`
            : `[-] КОРПУС: Корпус №${buildingNum} не предназначен для студентов`;

        const roomStatusText = roomIsFree
            ? `[+] КОМНАТА: Комната №${roomNum} свободна`
            : `[-] КОМНАТА: Комната №${roomNum} занята`;

        let failedCount = 0;
        if (!isNonResident) failedCount++;
        if (!isForStudents) failedCount++;
        if (!roomIsFree) failedCount++;

        let headerText = '';
        if (failedCount === 0) {
            headerText = 'Успех: заселение разрешено (выполнены все условия 3 из 3)\n';
        } else {
            headerText = `Отказ в заселении (не выполнено условий: ${failedCount} из 3)\n`;
        }

        resultDiv.textContent = headerText + '\n' + [
            studentStatusText,
            buildingStatusText,
            roomStatusText
        ].join('\n');

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
            fetch(`${baseUrl}/students/${studentId}`),
            fetch(`${baseUrl}/buildings/${buildingNum}`),
            fetch(`${baseUrl}/rooms/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные с сервера (проверьте введенные ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        const studentName = studentData.name || studentData.student_name || `Студент #${studentId}`;
        const isNonResident = 
            studentData.isNonResident ?? 
            studentData.is_non_resident ?? 
            studentData.nonResident ?? 
            studentData.outsider ?? 
            (studentData.isResident === false) ?? 
            (studentData.is_resident === false) ?? 
            (studentData.resident === false);

        const isForStudents = 
            buildingData.isForStudents ?? 
            buildingData.is_for_students ?? 
            buildingData.forStudents ?? 
            (buildingData.type && buildingData.type.toLowerCase().includes('student'));

        let roomIsFree = true;
        if ('isFree' in roomData) roomIsFree = Boolean(roomData.isFree);
        else if ('is_free' in roomData) roomIsFree = Boolean(roomData.is_free);
        else if ('free' in roomData) roomIsFree = Boolean(roomData.free);
        else if ('isBusy' in roomData) roomIsFree = !roomData.isBusy;
        else if ('is_busy' in roomData) roomIsFree = !roomData.is_busy;
        else if ('busy' in roomData) roomIsFree = !roomData.busy;
        else if ('occupied' in roomData) roomIsFree = !roomData.occupied;
        else if (typeof roomData.status === 'string') {
            const st = roomData.status.toLowerCase();
            roomIsFree = (st === 'free' || st === 'available' || st === 'vacant');
        } else if (Array.isArray(roomData.students)) {
            roomIsFree = roomData.students.length === 0;
        }

        const studentStatusText = isNonResident 
            ? `[+] СТУДЕНТ: ${studentName} является иногородним`
            : `[-] СТУДЕНТ: ${studentName} не является иногородним`;

        const buildingStatusText = isForStudents
            ? `[+] КОРПУС: Корпус №${buildingNum} предназначен для студентов`
            : `[-] КОРПУС: Корпус №${buildingNum} не предназначен для студентов`;

        const roomStatusText = roomIsFree
            ? `[+] КОМНАТА: Комната №${roomNum} свободна`
            : `[-] КОМНАТА: Комната №${roomNum} занята`;

        let failedCount = 0;
        if (!isNonResident) failedCount++;
        if (!isForStudents) failedCount++;
        if (!roomIsFree) failedCount++;

        let headerText = '';
        if (failedCount === 0) {
            headerText = 'Успех: заселение разрешено (выполнены все условия 3 из 3)\n';
        } else {
            headerText = `Отказ в заселении (не выполнено условий: ${failedCount} из 3)\n`;
        }

        resultDiv.textContent = headerText + '\n' + [
            studentStatusText,
            buildingStatusText,
            roomStatusText
        ].join('\n');

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
            fetch(`${baseUrl}/students/${studentId}`),
            fetch(`${baseUrl}/buildings/${buildingNum}`),
            fetch(`${baseUrl}/rooms/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные с сервера (проверьте введенные ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        const studentName = studentData.name || studentData.student_name || `Студент #${studentId}`;
        const isNonResident = 
            studentData.isNonResident ?? 
            studentData.is_non_resident ?? 
            studentData.nonResident ?? 
            studentData.outsider ?? 
            (studentData.isResident === false) ?? 
            (studentData.is_resident === false) ?? 
            (studentData.resident === false);

        const isForStudents = 
            buildingData.isForStudents ?? 
            buildingData.is_for_students ?? 
            buildingData.forStudents ?? 
            (buildingData.type && buildingData.type.toLowerCase().includes('student'));

        let roomIsFree = true;
        if ('isFree' in roomData) roomIsFree = Boolean(roomData.isFree);
        else if ('is_free' in roomData) roomIsFree = Boolean(roomData.is_free);
        else if ('free' in roomData) roomIsFree = Boolean(roomData.free);
        else if ('isBusy' in roomData) roomIsFree = !roomData.isBusy;
        else if ('is_busy' in roomData) roomIsFree = !roomData.is_busy;
        else if ('busy' in roomData) roomIsFree = !roomData.busy;
        else if ('occupied' in roomData) roomIsFree = !roomData.occupied;
        else if (typeof roomData.status === 'string') {
            const st = roomData.status.toLowerCase();
            roomIsFree = (st === 'free' || st === 'available' || st === 'vacant');
        } else if (Array.isArray(roomData.students)) {
            roomIsFree = roomData.students.length === 0;
        }

        const studentStatusText = isNonResident 
            ? `[+] СТУДЕНТ: ${studentName} является иногородним`
            : `[-] СТУДЕНТ: ${studentName} не является иногородним`;

        const buildingStatusText = isForStudents
            ? `[+] КОРПУС: Корпус №${buildingNum} предназначен для студентов`
            : `[-] КОРПУС: Корпус №${buildingNum} не предназначен для студентов`;

        const roomStatusText = roomIsFree
            ? `[+] КОМНАТА: Комната №${roomNum} свободна`
            : `[-] КОМНАТА: Комната №${roomNum} занята`;

        let failedCount = 0;
        if (!isNonResident) failedCount++;
        if (!isForStudents) failedCount++;
        if (!roomIsFree) failedCount++;

        let headerText = '';
        if (failedCount === 0) {
            headerText = 'Успех: заселение разрешено (выполнены все условия 3 из 3)\n';
        } else {
            headerText = `Отказ в заселении (не выполнено условий: ${failedCount} из 3)\n`;
        }

        resultDiv.textContent = headerText + '\n' + [
            studentStatusText,
            buildingStatusText,
            roomStatusText
        ].join('\n');

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
            fetch(`${baseUrl}/students/${studentId}`),
            fetch(`${baseUrl}/buildings/${buildingNum}`),
            fetch(`${baseUrl}/rooms/${roomNum}`)
        ]);

        if (!studentRes.ok || !buildingRes.ok || !roomRes.ok) {
            throw new Error("Не удалось получить данные с сервера (проверьте введенные ID и номера)");
        }

        const studentData = await studentRes.json();
        const buildingData = await buildingRes.json();
        const roomData = await roomRes.json();

        const studentName = studentData.name || studentData.student_name || `Студент #${studentId}`;
        const isNonResident = 
            studentData.isNonResident ?? 
            studentData.is_non_resident ?? 
            studentData.nonResident ?? 
            studentData.outsider ?? 
            (studentData.isResident === false) ?? 
            (studentData.is_resident === false) ?? 
            (studentData.resident === false);

        const isForStudents = 
            buildingData.isForStudents ?? 
            buildingData.is_for_students ?? 
            buildingData.forStudents ?? 
            (buildingData.type && buildingData.type.toLowerCase().includes('student'));

        let roomIsFree = true;
        if ('isFree' in roomData) roomIsFree = Boolean(roomData.isFree);
        else if ('is_free' in roomData) roomIsFree = Boolean(roomData.is_free);
        else if ('free' in roomData) roomIsFree = Boolean(roomData.free);
        else if ('isBusy' in roomData) roomIsFree = !roomData.isBusy;
        else if ('is_busy' in roomData) roomIsFree = !roomData.is_busy;
        else if ('busy' in roomData) roomIsFree = !roomData.busy;
        else if ('occupied' in roomData) roomIsFree = !roomData.occupied;
        else if (typeof roomData.status === 'string') {
            const st = roomData.status.toLowerCase();
            roomIsFree = (st === 'free' || st === 'available' || st === 'vacant');
        } else if (Array.isArray(roomData.students)) {
            roomIsFree = roomData.students.length === 0;
        }

        const studentStatusText = isNonResident 
            ? `[+] СТУДЕНТ: ${studentName} является иногородним`
            : `[-] СТУДЕНТ: ${studentName} не является иногородним`;

        const buildingStatusText = isForStudents
            ? `[+] КОРПУС: Корпус №${buildingNum} предназначен для студентов`
            : `[-] КОРПУС: Корпус №${buildingNum} не предназначен для студентов`;

        const roomStatusText = roomIsFree
            ? `[+] КОМНАТА: Комната №${roomNum} свободна`
            : `[-] КОМНАТА: Комната №${roomNum} занята`;

        let failedCount = 0;
        if (!isNonResident) failedCount++;
        if (!isForStudents) failedCount++;
        if (!roomIsFree) failedCount++;

        let headerText = '';
        if (failedCount === 0) {
            headerText = 'Успех: заселение разрешено (выполнены все условия 3 из 3)\n';
        } else {
            headerText = `Отказ в заселении (не выполнено условий: ${failedCount} из 3)\n`;
        }

        resultDiv.textContent = headerText + '\n' + [
            studentStatusText,
            buildingStatusText,
            roomStatusText
        ].join('\n');

    } catch (error) {
        resultDiv.textContent = 'Ошибка: ' + error.message;
    }
});
