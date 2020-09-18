import { Doctor } from './doctor.js';
import logger from '../utils/logger.js';

export class Patient {
  constructor(firstName, lastName, JMBG, medicalRecordId) {
    this._doctor = null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.JMBG = JMBG;
    this.medicalRecordId = medicalRecordId;
    this.labTests = [];
    logger.logCreatePatient(this);
  }

  set doctor(doctor) {
    this._doctor = doctor;
    doctor.addPatient(this);
    logger.logChooseDoctor(this, doctor);
  }

  get doctor() {
    return this._doctor;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  scheduleLabTest(test) {
    this.labTests.push(test);
  }

  doLabTest(number) {
    this.labTests[number].simulateResults();
    logger.logLabTest(this, this.labTests[number]);
  }
}