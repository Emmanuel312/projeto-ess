import * as functions from 'firebase-functions';
//import { DataSnapshot } from 'firebase-functions/lib/providers/database';
import {db, bucket} from './firebase'
import { database } from 'firebase-admin';
const path = require('path');
const os = require('os');
const fs = require('fs');

export const onEspDetected = functions.database
.ref('users/{userId}/esps_detectadas/{mac_esp_detectado}')
.onUpdate(async (change, context) => {
    const after = change.after.val();
    console.log('mac da esp detectada')
    console.log(change.after.key)
    const result = await findEspWithUuidOnTimestamp(after.uuid, after.timestamp, change.after.key);
    if(result === null) {
        return null;
    } else {
        if (change.after.ref.parent !== null) {
            if (change.after.ref.parent.parent !== null) {
                const userId = change.after.ref.parent.parent.key
                const pathToUserId = 'users/' + userId
                console.log('UserId: ')
                console.log(pathToUserId)
                const writePartialPresence = await writePartialPresenceOn(pathToUserId, after.timestamp);
                if (writePartialPresence === null) {
                    console.log('Presença parcial do aluno não foi escrita');
                    return null;
                } else {
                    return writePartialPresence;
                }
            } else {
                console.log('User ID não encontrado');
                return null;
            }
        } else {
            console.log('User ID não encontrado');
            return null;
        }
    }
})

export const requestReportOfClass = functions.https.onCall(async (data, context) => {
    const classId = data.text;
    console.log(classId);
    const classPresenceReport = await generatePresenceJson(classId);
    const fileName = classId;

    const tempFilePath = path.join(os.tmpdir(), fileName);
    const filePathOnStorage = 'classReports/' + fileName;

    await fs.writeFile(tempFilePath + ".json", classPresenceReport);

    bucket.upload(tempFilePath, {
        destination: filePathOnStorage,
    }, (err, file) => {
        if(!err) {
            return {
                pathToClassPresenceReport: filePathOnStorage,
            };
        } else {
            return {
                error: err.message,
            };
        }
    });
})

async function generatePresenceJson(classId: string) {
    const pathToStudents = 'agenda' + '/' + classId + '/' + '/alunos_presentes';
    await db.ref(pathToStudents)
    .orderByKey()
    .once('value')
    .then(async (snapshot) => {
        if(snapshot) {
            const userPresenceArray: { name: string; cpf: string; presenca: string; }[] = [];
            const snapshotChilds = snapshotToArray(snapshot);
            snapshotChilds.forEach(async (element) => {
                const userPresence = {
                    name: 'Aluno não identificado',
                    cpf: '00000000000',
                    presenca: 'Indefinida'
                };
                if (element.val().quantidade_parcial_presencas >= 42) {
                    userPresence.presenca = 'Presente';
                } else {
                    userPresence.presenca = 'Faltou';
                }
                const userPath = 'users' + '/' + element.val().referencia
                await db.ref(userPath)
                .orderByKey()
                .once('value')
                .then(async (snapshot2) => {
                    if(snapshot2) {
                        const userValue = snapshot2.val();
                        userPresence.name = userValue.nome;
                        userPresence.cpf = userValue.cpf;
                        userPresenceArray.push(userPresence);
                    } else {
                        console.log('User query failed');
                    }
                })
            })
            const reportString = JSON.stringify(userPresenceArray);
            console.log(reportString);
            return reportString;
        } else {
            console.log('Class query failed');
            return null;
        }
    });
    return null;
}

export const requestReportOfClassTest = functions.https.onCall((data, context) => {
    const classId = data.text;
    console.log(classId);
    return {
        received: classId,
    };
})

async function writePartialPresenceOn (alunoId: string, timestamp: number) {
    const minRange = timestamp - 3600000;
    const maxRange = timestamp + 3599999;
    const query = await db.ref('agenda')
    .orderByChild('inicio')
    .startAt(minRange)
    .endAt(maxRange)
    .once('value')
    .then(async (snapshot) => {
        const value = snapshot.val()
        if (snapshot.key) {
            if (value) {
                const childSnapshotsArray = snapshotToArray(snapshot);
                console.log('Buscando a aula')
                console.log(snapshot)
                console.log(value);
                console.log(childSnapshotsArray[0])
                console.log(snapshot.ref)
                console.log(childSnapshotsArray[0].ref)
                const refAlunosDaAula = snapshot.key + '/' + childSnapshotsArray[0].key + '/alunos_presentes'
                console.log(refAlunosDaAula)
                const query2 = await db.ref(refAlunosDaAula)
                .orderByChild('referencia')
                .equalTo(alunoId)
                .once('value')
                .then(async (snapshot2) => {
                    const value2 = snapshot2.val() 
                    if (value2) {
                        const childSnapshotsArray2 = snapshotToArray(snapshot2);
                        console.log('Buscando o aluno')
                        console.log(snapshot2)
                        console.log(value);
                        console.log(childSnapshotsArray2[0])
                        const writeRef = childSnapshotsArray2[0].ref
                        await writeRef.update({"quantidade_parcial_presencas": (childSnapshotsArray2[0].val().quantidade_parcial_presencas + 1)})
                        return value2;
                    } else {
                        console.log('Não foi encontrado nenhum aluno cadastrado nesta aula');
                        return null;
                    }
                })
                return query2;
            } else {
                console.log('Não foi encontrada aula no horário da detecçao');
                return null;
            }
        } else {
            console.log('Dados da aula possivelmente mal formatados no db');
            return null;
        }
    })
    return query;
}

async function findEspWithUuidOnTimestamp (uuid: string, timestamp: number, macEsp: string) {
    const minRange = timestamp - 60000;
    const maxRange = timestamp + 59999;
    const ref = 'esps/' + macEsp;
    const query = await db.ref(ref)
    .orderByChild('timestamp')
    .startAt(minRange)
    .endAt(maxRange)
    .once('value')
    .then((snapshot) => {
        const value = snapshot.val();
        if (value) {
            console.log('Esp encontrada dentro do timestamp: ');
            console.log(value);
            const childSnapshotsArray = snapshotToArray(snapshot);

            console.log(childSnapshotsArray[0]);
            if (childSnapshotsArray[0].val().uuid === uuid) {
                return value;
            } else {
                console.log('Uuid da esp detectada não bate com a esp ativa no timestamp da detecção');
                return null;
            }
        } else {
            console.log('Não foi encontrada nenhuma esp no bd no timestamp da detecção');
            return null;
        }
    })
    return query;
}

function snapshotToArray(snapshot: database.DataSnapshot) {
    const returnArr: database.DataSnapshot[] = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot;
        //item.key = childSnapshot.key;
        returnArr.push(item);
        return true;
    });

    return returnArr;
};


