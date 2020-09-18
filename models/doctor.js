import LabTestFactory from './lab_tests.js';
import logger from '../utils/logger.js';

export class Doctor {
  constructor(firstName, lastName, speciality) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this._patients = [];
    logger.logCreateDoctor(this);
  }

  get patient() {
    return this._patients;
  }
  
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  addPatient(patient) {
    this._patients.push(patient);
  }

  scheduleLabTest(labTestType, patient, date) {
    const labTest = LabTestFactory.create(labTestType, date, patient);
    patient.scheduleLabTest(labTest);
  }
}

