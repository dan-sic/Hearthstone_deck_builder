var expanded = false;
var checkboxes = document.getElementById("checkboxes");

function showCheckboxes() {
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

checkboxes.addEventListener('click', showCheckboxes);