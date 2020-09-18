import logger from './utils/logger.js';
import { Doctor } from './models/doctor.js';
import { Patient } from './models/patient.js';
import { labTestTypes } from './models/lab_tests.js';

logger.log('Pokrenuta simulacija');

let doctor = new Doctor('Milan', 'Milanović', 'Opšta medicina');
let patient = new Patient('Dragan', 'Draganić', '1312995234212', '123123');

patient.doctor = doctor;

doctor.scheduleLabTest(labTestTypes.BLOOD_SUGAR, patient, new Date(2020, 10, 10, 12, 30));
doctor.scheduleLabTest(labTestTypes.BLOOD_PRESSURE, patient, new Date(2020, 10, 10, 13, 30));

patient.doLabTest(0);
patient.doLabTest(1);

patient.labTests.forEach(labTest => labTest.printResults());