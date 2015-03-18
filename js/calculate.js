function isNumberKey(e) {
	var charCode = (e.which) ? e.which : e.keyCode;
	return !(charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
}

function calculatePrice() {
	var percent = getSelectedDropdownText('percent');
	var value = document.getElementById('value').value;
	var downPay = percent == 0 ? 0 : (value * percent / 100);

	document.getElementById('downPay').textContent = downPay;
	document.getElementById('price').textContent = value - downPay;
}

function populateDownPayment() {
	var content;
	for (var x = 0; x <= 100; x += 5) {
		content += '<option>' + x + '</option>';
	}

	var el = document.getElementById('percent');
	el.innerHTML = content;
	el.selectedIndex = 0;
}

function populateAmortization() {
	var content;
	for (var x = 1; x <= 30; x++) {
		content += '<option>' + x + '</option>';
	}

	var el = document.getElementById('amortization');
	el.innerHTML = content;
	el.selectedIndex = el.options.length - 1;
}

function calculateMortgage() {
	var p = document.getElementById('price').textContent;
	var i = document.getElementById('rate').value / 100 / 12;
	var n = getSelectedDropdownText('amortization') * 12;

	var x = Math.pow(1 + i, n);
	var mortgage = p * (x * i / (x - 1));
	document.getElementById('mortgage').textContent = mortgage.toFixed(2);
}

function getSelectedDropdownText(dropElId) {
	var dropEl = document.getElementById(dropElId);
	var index = dropEl.selectedIndex;

	if (index == -1) {
		return 0;
	}

	return dropEl.options[index].textContent;
}

function calculateCashflow() {
	var mortgage = document.getElementById('mortgage').textContent;
	var utilities = document.getElementById('utilities').value;
	var costs = document.getElementById('costs').value;
	var tax = document.getElementById('tax').value;
	var insurance = document.getElementById('insurance').value;
	var rent = document.getElementById('rent').value;
	var cashflow = rent - mortgage - costs - utilities - tax - insurance;

	var cashflowEl = document.getElementById('cashflow')
	cashflowEl.textContent = cashflow.toFixed(2);

	if (cashflow < 0) {
		cashflowEl.className = "well well-sm text-danger";
	} else {
		cashflowEl.className = "well well-sm text-success";
	}
}

function updateValues() {
	calculatePrice();
	calculateMortgage();
	calculateCashflow();
}

function addUpdateEvent(id, event) {
	$('#' + id).on(event, updateValues);
	//var el = document.getElementById(id);
	//el.addEventListener(event, updateValues, false);
}

populateDownPayment();
populateAmortization();
updateValues();

addUpdateEvent('value', 'blur');
addUpdateEvent('percent', 'change');
addUpdateEvent('price', 'blur');
addUpdateEvent('rate', 'blur');
addUpdateEvent('amortization', 'change');
addUpdateEvent('utilities', 'change');
addUpdateEvent('costs', 'change');
addUpdateEvent('rent', 'change');
addUpdateEvent('tax', 'change');
addUpdateEvent('insurance', 'change');