import fs from 'fs';
import moment from 'moment';

class Logger {
  constructor() {
      this.logs = [];
  }

  log(message) {
      const timestamp = moment(new Date()).format('DD.MM.YYYY HH:mm');
      this.logs.push({ timestamp, message });
      this.logToFile('log.txt', timestamp, message);
  }

  logToFile(filename, timestamp, message) {
    const logString = `[${timestamp}] ${message}\n`
    fs.appendFile(filename, logString, (err) => {
      if (err) throw err;
    });
  }

  logCreateDoctor(doctor) {
    this.log(`Kreiran doktor ${doctor.fullName}`);
  }

  logCreatePatient(patient) {
    this.log(`Kreiran pacijent ${patient.fullName}`);
  }

  logChooseDoctor(patient, doctor) {
    this.log(`Pacijent ${patient.fullName} bira doktora ${doctor.fullName}`);
  }

  logLabTest(patient, labTest) {
    this.log(`Pacijent ${patient.fullName} obavlja laboratorijski pregled "${labTest.title}"`);
  }

  printLogs() {
    this.logs.forEach(log => console.log(log));
  }
}

export default new Logger();