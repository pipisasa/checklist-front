class ChecklistDate{
  #start_date;
  // #end_date;
  #diapazone;
  #mode;

  static mode = {
    'WEEK':{
      title: 'WEEK',
      diapazone: 6,
    },
    'DAY':{
      title: 'DAY',
      diapazone: 0,
    },
  }
  
  static clearDate(date=new Date()){
    date.setHours(0,0,0,0);
    return date;
  }
  static getOnlyDate(date=new Date()){
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,0)}-${d.getDate().toString().padStart(2,0)}`
  }

  constructor(
    start_date=Date.now(),
    // end_date,
    // diapazone=6,
    mode=ChecklistDate.mode.WEEK.title,
  ){
    this.start_date = start_date;
    // this.end_date = end_date;
    this.mode = mode;
    // this.diapazone = diapazone; 
  }

  get start_date(){
    return this.#start_date;
  }
  set start_date(val){
    this.#start_date = new Date(val);
    this.#start_date.setHours(0,0,0,0);
  }
  get end_date(){
    return new Date(this.#start_date.getTime()+this.#diapazone*86400000);
  }
  set end_date(val){
    let a = new Date(val);
    a.setHours(0,0,0,0);
    this.#diapazone = (a.getTime() - this.#start_date.getTime())/86400000;
  }
  get mode(){
    return this.#mode;
  }
  set mode(val){
    this.#mode = ChecklistDate.mode[val].title;
    this.diapazone = ChecklistDate.mode[val].diapazone;
  }
  get diapazone(){
    return this.#diapazone;
  }
  set diapazone(val){
    if(!isNaN(parseInt(val))){
      this.#diapazone = val;
    }
  }
  setStartMonday(){
    this.#start_date.setDate(this.#start_date.getDate()-this.#start_date.getDay()+1);
    // this.#end_date = new Date(this.#start_date);
    // this.#end_date.setDate(this.#end_date.getDate()+6);
  }
  toNext(){
    this.start_date = this.end_date.getTime()+86400000
  }
  toPrev(){
    this.start_date = this.start_date.getTime()-this.diapazone*86400000
  }
}

export default ChecklistDate;