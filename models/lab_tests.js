export default class LabTestFactory {
  static create(testType, date, patient) {
    if (!testType.prototype instanceof LabTest) {
      throw new TypeError('The provided class is not a LabTest.');
    }
    return new testType(date, patient);
  }
}

class LabTest {
  constructor(date, patient) {
    if(new.target == LabTest){
      throw new TypeError('LabTest cannot be instantiated directly.');
    }
    this.title = '';
    this.date = date;
    this.patient = patient;
    this.results = {};
  }

  printResults() {
    console.log(`Rezultati pregleda "${this.title}" za pacijenta ${this.patient.fullName}:`);
    for (const key in this.results) {
      console.log(`${key}: ${this.results[key].value} ${this.results[key].unit}`);
    }
    console.log('');
  }
}

class BloodPresureTest extends LabTest {
  constructor(date, patient) {
    super(date, patient);
    this.title = 'Krvni pritisak'
    this.results = {
      upperValue: {unit: 'mmHg'},
      lowerValue: {unit: 'mmHg'},
      pulse: {unit: 'BPM'},
    }
  }

  setResults(upperValue, lowerValue, pulse) {
    this.results.upperValue.value = upperValue;
    this.results.lowerValue.value = lowerValue;
    this.results.pulse.value = pulse;
  }

  simulateResults() {
    this.setResults(
      randomTestResult(90, 150),
      randomTestResult(60, 110),
      randomTestResult(60, 130)
    );
  }
}

class BloodSugarTest extends LabTest {
  constructor(date, patient) {
    super(date, patient);
    this.title = 'Nivo šećera u krvi'
    this.results = {
      sugarLevel: {unit: 'mmol/l'},
      lastMealTime: {unit: ''},
    }
  }

  setResults(sugarLevel, lastMealTime) {
    this.results.sugarLevel.value = sugarLevel;
    this.results.lastMealTime.value = lastMealTime;
  }

  simulateResults() {
    this.setResults(
      randomTestResult(2, 20),
      randomTime(7, 21)
    );
  }
}

class BloodCholesterolTest extends LabTest {
  constructor(date, patient) {
    super(date, patient);
    this.title = 'Nivo holesterola u krvi'
    this.results = {
      cholesterolLevel: {unit: 'mg/dl'},
      lastMealTime: {unit: ''},
    }
  }

  setResults(cholesterolLevel, lastMealTime) {
    this.results.cholesterolLevel.value = cholesterolLevel;
    this.results.lastMealTime.value = lastMealTime;
  }

  simulateResults() {
    this.setResults(
      randomTestResult(100, 300),
      randomTime(7, 21)
    );
  }
}

export const labTestTypes = {
  BLOOD_PRESSURE: BloodPresureTest,
  BLOOD_SUGAR: BloodSugarTest,
  BLOOD_CHOLESTEROL: BloodCholesterolTest,
}

function randomTestResult(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function randomTime(min, max) {
  const randomHour = randomTestResult(min, max).toString().padStart(2, '0');
  const randomMinute = randomTestResult(0, 59).toString().padStart(2, '0');
  return `${randomHour}:${randomMinute}`;
}

