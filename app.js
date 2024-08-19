const btnAddBirthday = document.getElementById("btnAddBirthday")
btnAddBirthday.addEventListener("click", addPersonalData)
let customLifeChart;

function addPersonalData() {
	const inputMyBirth = document.getElementById("inputMyBirth")
	
	const birthday = inputMyBirth.value
	const lifeDuration = 80.75

	const customData = convertUserData(birthday, lifeDuration)
	customLifeChart = new Life(customData)
	customLifeChart.initialize()

	renderLife(customLifeChart)
	renderAtGlance(customLifeChart)
}