class Week {
	constructor(_yearIndexOfLife, _weekIndexOfYear, myStage = "", myMilestone = true, lived) {
		this._index = {
			week: (_yearIndexOfLife * 52) + _weekIndexOfYear,
			year: _yearIndexOfLife,
			weekOfYear: _weekIndexOfYear,
		}
		this._lived = lived;
		this._stage = myStage;
		this._milestone = myMilestone;
	}
	
	get lived() {
		return this._lived
	}

	get index() {
		return this._index
	}

	get stage() {
		return this._stage
	}

	get milestone() {
		return this._milestone
	}

	set lived(value){
		this._lived = value;
	}

	set stage(name) {
		this._stage = name;
	}
	set milestone(data) {
		const newMilestone = {
			name: data.name,
			accomplishment: data.accomplishment
		}
		this._milestone = newMilestone;
		;
	}
}

class Year {
	constructor(yearIndex, amount = 1, stages, milestones, weeksLived) {
		this.yearIndex = yearIndex;
		this.weeksAmount = amount * 52;
		this._stage = stages.find(stage => this.yearIndex <= stage.endYear);
		this.weeks = [];
		this._milestones = milestones.filter(milestone => this.yearIndex == milestone.index.year);
		this.weeksLived = weeksLived;
	}
	
	get index() {
		return this.yearIndex
	}

	get stage() {
		return this._stage;
	}

	get milestones() {
		return this._milestones
	}



	initialize() {

		// Weeks
		for (let i = 1; i < this.weeksAmount + 1; i++) {
			const hasPassed = this.index * 52 + i > this.weeksLived ? false : true
			let milestoneForWeek = this._milestones.filter(milestone => milestone.index.weekOfYear == i)
			let hasMilestone =  (milestoneForWeek.length != 0) ? milestoneForWeek : false
		
			const newWeek = new Week(this.index, i, this.stage, hasMilestone, hasPassed)
			this.weeks.push(newWeek)
			
		}

		// Accomplishments
		
	}
}

class Milestone {
	constructor(dataMilestones) {
		this._index = {
			week: dataMilestones.week,
			year: dataMilestones.age,
			weekOfYear: (dataMilestones.week - (dataMilestones.age * 52)) ,
		};
		this._name = dataMilestones.name;
		this._accomplishment = dataMilestones.accomplishment;
	}

	get index() {
		return this._index
	}

	set index(value) {
		this._index = value
	}

	get name() {
		return this._name
	}

	set name(value) {
		this._name = value
	}

	get accomplishment() {
		return this._accomplishment
	}

	set accomplishment(value) {
		this._accomplishment = value
	}
}

class Stage {
	constructor(dataStage) {
		this._name = dataStage.name;
		this._yearStart = dataStage.yearStart;
		this._yearEnd = dataStage.yearEnd;
		this._duration = dataStage.duration;
		this.years = [];
	}

	get startYear() {
		return this._yearStart
	}

	get name() {
		return this._name
	}

	get endYear() {
		return this._yearEnd
	}

	get duration() {
		return this._duration
	}

	initialize() {
		
	}

}

class Life {
	constructor(userWeeks) {
		this._expectancy = userWeeks.life /52;
		this._weeksLived = userWeeks.lived;
		this._stages = [];
		this._years = [];
		this._milestones = [];
	}
	get expectancy() {
		return this._expectancy
	}
	
	get years() {
		return this._years;
	}

	get stages() {
		return this._stages
	}

	get milestones() {
		return this._milestones
	}

	get weeksLived() {
		return this._weeksLived
	}

	get weeksData() {
		const data = {
			life: this.expectancy * 52,
			lived: this.weeksLived,
			percentage: Math.floor(this.weeksLived * 1000 / (this.expectancy * 52))/10,
			sleep: Math.floor(this.expectancy*52/3)
		}
		return data
	}


	countDurationYears = 0

	initialize() {

		//	#1		Stages
		lifeStagesData.forEach(stage => {
			const newStage = new Stage(stage);
			this.countDurationYears += newStage.duration
			this._stages.push(newStage)
		});

		//	#2		Milestones
		milestonesData.forEach(milestone => {
			const newMilestone = new Milestone(milestone);
			this._milestones.push(newMilestone)
		});

		//	#3		Years
		const amountCompleteYears = Math.floor(this.expectancy);
		const amountIncompleteYears = this.expectancy % amountCompleteYears;

		for (let i = 0; i <= this._expectancy; i++) {
			const newYearIndex = i																	//What year are we creating
			const newYearAmount = (i == amountCompleteYears) ? amountIncompleteYears : 1			// for the half/quarter years like 10.25
			
			const newYear = new Year(newYearIndex, newYearAmount, this.stages, this.milestones, this.weeksLived); 	// 	// Create a new Year
			newYear.initialize()																	// Create the weeks
			this._years.push(newYear)
		}
	}
}




function convertUserData(inputBorn, myExpectancy) {
	const yearsExpectancy = myExpectancy;

	const dateToday = new Date(Date.now());
	const dateBorn = new Date(inputBorn);
	const dateDie = new Date(dateBorn.valueOf() + (yearsExpectancy * 31556926*1000));

	const weeksInLife = yearsExpectancy * 52
	const weeksLived =  Math.ceil((dateToday - dateBorn)*52/(31556926*1000))
	const weeksToLive = weeksInLife - weeksLived;
	
	const userWeeks = {
		life: weeksInLife,
		lived: weeksLived,
		toLive: weeksToLive,
		sleep: Math.floor(weeksInLife/3)
	}

	return userWeeks
}


// INITIALISATION OF WHOLE THING
let activeChart = new Life({life: 80.75 * 52, lived: 0, toLive: 80.75 * 52});
activeChart.initialize()